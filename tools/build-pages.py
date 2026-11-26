import os
import re
import shutil
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.references = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if "id" in attributes:
            self.ids.add(attributes["id"])
        self.references.extend(attributes[key] for key in ("src", "href")
                               if attributes.get(key))


def team_video_embed(value):
    if not value:
        return ""
    url = urlsplit(value)
    video_id = value
    parts = url.path.strip("/").split("/")
    if url.scheme == "https" and not url.username and not url.password and url.port is None:
        if url.hostname == "youtu.be" and len(parts) == 1:
            video_id = parts[0]
        elif url.hostname in ("youtube.com", "www.youtube.com", "www.youtube-nocookie.com"):
            if url.path == "/watch":
                video_id = parse_qs(url.query).get("v", [""])[0]
            elif len(parts) == 2 and parts[0] in ("embed", "shorts"):
                video_id = parts[1]
    if not re.fullmatch(r"[A-Za-z0-9_-]{11}", video_id):
        raise SystemExit("SMARTGN_TEAM_VIDEO_URL must be a YouTube video link or ID")
    return f"https://www.youtube-nocookie.com/embed/{video_id}"


def main():
    root = Path(__file__).resolve().parents[1]
    output = root / "dist"
    gateway = os.environ.get("SMARTGN_GATEWAY_URL", "").strip()
    if gateway:
        url = urlsplit(gateway)
        if (url.scheme != "https" or not url.hostname or url.username is not None
                or url.query or url.fragment or url.path not in ("", "/")
                or any(char.isspace() or char == "\\" for char in gateway)
                or "?" in gateway or "#" in gateway
                or (url.port is not None and not 1 <= url.port <= 65535)):
            raise SystemExit("SMARTGN_GATEWAY_URL must be an HTTPS origin")

    source = (root / "index.html").read_text(encoding="utf-8")
    marker = 'data-gateway-url=""'
    if source.count(marker) != 1:
        raise SystemExit("Expected one empty checkout gateway attribute")
    source = source.replace(marker, f'data-gateway-url="{escape(gateway.rstrip("/"))}"')
    video = team_video_embed(os.environ.get("SMARTGN_TEAM_VIDEO_URL", "").strip())
    video_marker = 'data-video-url=""'
    if source.count(video_marker) != 1:
        raise SystemExit("Expected one empty team video attribute")
    source = source.replace(video_marker, f'data-video-url="{escape(video)}"')
    page = Page()
    page.feed(source)
    files = ("index.html", "styles.css", "script.js", "legal-content.js")
    for reference in page.references:
        link = urlsplit(reference)
        if link.scheme or link.netloc:
            continue
        path = Path(unquote(link.path))
        if link.path and (path.is_absolute() or not path.parts or ".." in path.parts
                          or (path.parts[0] != "assets" and path.as_posix() not in files)
                          or not (root / path).is_file()):
            raise SystemExit(f"Missing or invalid Pages asset: {reference}")
        if not link.path and link.fragment and unquote(link.fragment) not in page.ids:
            raise SystemExit(f"Missing page anchor: {reference}")

    output.mkdir(exist_ok=True)
    for filename in files[1:]:
        shutil.copyfile(root / filename, output / filename)
    shutil.copytree(root / "assets", output / "assets", dirs_exist_ok=True)
    (output / "index.html").write_text(source, encoding="utf-8")


if __name__ == "__main__":
    main()

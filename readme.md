# SmartGN Landing Page

A responsive landing page for SmartGN, a natural gas monitoring service by Ventrax.

## Includes

- Product overview, plans, and coverage.
- English by default, with Spanish available.
- Installation request form in the same page.

## Run locally

The [integrated startup guide](https://github.com/ventrax-upc/smartgn-api-gateway/blob/develop/README.md#start-all-13-repositories-locally) covers all 13 repositories.

Start the integrated SmartGN stack from `smartgn-api-gateway`. Serve this
repository with `py -m http.server 5500 --bind 127.0.0.1` and open
`http://localhost:5500/#request-installation`.
Opening `index.html` as a local file shows the Gateway connection message
and disables **Send code**.

Start by entering your email and requesting a six-digit code. Local Compose
delivers it to the existing delivery fixture. Read it with an authenticated
`GET /fixtures/messages?email=<address>` on the internal delivery container
using the fixture admin token. Select the latest `CHECKOUT_EMAIL` message.
The installation fields remain visible and become editable after you verify the code.

From a terminal, the local delivery container can make the request using its
own fixture credential. Enter the address you used when prompted.

```powershell
$email = Read-Host 'Email entered on the Landing Page'
@'
import json
import os
import sys
from urllib.parse import urlencode
from urllib.request import Request, urlopen

email = sys.argv[1].strip().lower()
url = "http://localhost:8091/fixtures/messages?" + urlencode({"email": email})
request = Request(url, headers={"Authorization": "Bearer " + os.environ["FIXTURE_ADMIN_TOKEN"]})
with urlopen(request) as response:
    messages = json.load(response)
print(next((m["code"] for m in reversed(messages) if m["purpose"] == "CHECKOUT_EMAIL"), "No verification code found for this email."))
'@ | docker exec -i smartgn-dev-delivery-1 python - $email
```

The form then creates a verified installation request and a Billing order
through the Gateway at `http://localhost:8000`. Use Billing's authenticated local provider
fixture to confirm the order. The Landing Page checks the simulator
automatically for up to five minutes. Keep the tab open while testing so the form can retain the
private order secret in memory.

## Publish with GitHub Pages

Start the backend using the [Gateway AWS guide](https://github.com/ventrax-upc/smartgn-api-gateway/blob/develop/README.md#deploy-the-backend-and-spa-on-aws).
GitHub Pages serves the static Landing. The browser sends checkout requests
to the public HTTPS Gateway.

| GitHub Actions repository variable | Example | Purpose |
| --- | --- | --- |
| `SMARTGN_GATEWAY_URL` | `https://api.smartgn.example` | Optional public Gateway HTTPS origin, without an API path. Required to enable hosted checkout. |
| `SMARTGN_TEAM_VIDEO_URL` | `https://youtu.be/VIDEO_ID` | Optional YouTube link or video ID for About Us. Leave empty to show an inactive play button. YouTube loads after the visitor presses play. Rerun the workflow on `main` after editing it. |

1. In the Landing repository, open **Settings → Secrets and variables →
   Actions → Variables** and add `SMARTGN_GATEWAY_URL`. Resend and Niubiz
   credentials are set on AWS in the services that use them.
2. Set the Gateway's `CORS_ORIGINS` to include the Pages origin, typically
   `https://ventrax-upc.github.io`. Use the custom domain origin if
   configured. Omit the repository path from the origin.
3. In **Settings → Pages → Build and deployment → Source**, choose
   **GitHub Actions**. Restrict the `github-pages` deployment environment
   to `main`.
4. Merge the release to `main`, or run **Actions → Landing CI and GitHub
   Pages → Run workflow** on `main`. Rerun after changing the URL. The
   workflow validates pull requests and pushes to `develop` and `main`.
5. Open the published URL from the deployment job. Verify the checkout
   using a test inbox and Niubiz Sandbox. Check that the email request
   reaches the public Gateway and that the activation link opens the SPA.

Both variables can be omitted. The site still publishes, with an inactive video
placeholder and checkout showing a configuration message. Checkout checks the
Gateway's `/health` endpoint and disables its actions while disconnected.
For a local check of the Pages bundle, run `node --check script.js` and
`python tools/build-pages.py`. Open the generated `dist` through a local
HTTP server to check its assets.

## Try Niubiz Sandbox

Enable `NIUBIZ_SANDBOX_ENABLED=true` in the integrated Gateway's ignored
`.local/integrated.env` and set `NIUBIZ_SANDBOX_MERCHANT`,
`NIUBIZ_SANDBOX_USER` and `NIUBIZ_SANDBOX_PASSWORD` for a PEN test merchant.
Recreate Billing to load the settings. Keep the credentials in Billing's
environment. GitHub Pages still needs only the public Gateway URL.

After verifying your email and submitting the installation request, the
Niubiz Sandbox form opens in the order summary when you select
**Continue to payment**. For PEN sandbox tests use the approval card ending in
`8059` (12/2030, CVV 123) or the decline card ending in `9058`
(12/2030, CVV 111). See the full test numbers in the
[Niubiz test card table](https://docs.deuna.com/docs/integrate-niubiz/#testing-details).
To return to the SmartGN simulator, set `NIUBIZ_SANDBOX_ENABLED=false` and
recreate Billing.

If authorization times out or returns an unverifiable result, the order
shows an uncertain status and blocks a second authorization. Check the order
and reconcile the purchase in the sandbox before retrying with a new order.

## Acceptance scenarios

See the [Gherkin acceptance scenarios](docs/acceptance/scenarios.gherkin). They
describe the AV4 acceptance scope.

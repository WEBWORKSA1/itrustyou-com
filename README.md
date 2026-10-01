# ITrustYou.com — Trust, verified.

ITrustYou is a free scam-checker and online-safety hub. It includes:
- tools for checking websites, links, messages, phone numbers, emails and wallets, plus a password lab
- a scam library and scam alerts
- a recovery planner
- a Scam IQ quiz, contests, donations, careers and an advertising page
- dedicated lead-generation pages: a Personal Safety Plan and a Business Trust Audit

It is pure static HTML, CSS and vanilla JS with no build step, which makes it ready for the **GitHub Pages free plan**.

## Go live
1. Edit **`assets/js/config.js`** to set the AdSense ID, GA4, donation links, social links and affiliate links.
2. Submit any form once. FormSubmit sends an activation email to the site inbox; click it to start receiving submissions. The inbox address never appears on the site because it is assembled only at submit time.
3. Add or expand content in `assets/data/scams.js` and `assets/data/alerts.js`. Pages render automatically.
4. Custom domain: add a `CNAME` file with `itrustyou.com`, then point DNS to GitHub Pages.

See [`docs/STRATEGY-AND-BUILD-PROMPT.md`](docs/STRATEGY-AND-BUILD-PROMPT.md) for the business strategy, the 40-site competitive audit and the phase-wise build prompt.

## Trademark
ITrustYou.com is independent. It is not affiliated with TrustYou GmbH or any similarly named company. See `disclosures.html`.

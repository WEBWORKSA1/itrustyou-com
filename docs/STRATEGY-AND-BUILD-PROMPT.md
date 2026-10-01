# ITrustYou.com — Strategy & Phase-Wise Build Prompt

## 1. The idea: a consumer "Trust & Safety Hub"

**ITrustYou.com: "I trust you, but let's verify first."** A free scam-checker and online-safety hub. Visitors can check websites, links, messages, phone numbers, emails and crypto wallets. They can also read scam alerts, report scams, follow a recovery plan, and get protected.

### Why this beats other uses of the domain

| Option | Search demand | Monetization | Trademark risk | Verdict |
|---|---|---|---|---|
| **Scam checker / online-safety hub** | Very high and evergreen ("is this a scam", "is X legit", "scam text"). Volume rises with every new scam wave | Ads in security and finance categories, high-value affiliate offers (identity theft protection, VPNs, password managers), B2B leads, sponsorship | Low, if hospitality is avoided | **Chosen** |
| Business reviews / reputation platform | High | SaaS | **High**: TrustYou GmbH runs a hotel reputation platform called "TrustYou" | Rejected |
| Dating trust / verification | Medium | Subscriptions | Medium, and needs heavy moderation | Later vertical |
| Escrow / transaction trust | Low organic | Fees | Needs regulation and licensing | Rejected |

**Why it wins:**
- The domain name *is* the product promise.
- Scam searches are emotional and urgent. That gives high click-through and strong lead intent.
- Advertisers in security and fintech pay premium rates.
- Tools such as checkers and quizzes earn backlinks and repeat visits.
- YouTube content is easy to produce ("Scam of the week").

### Revenue model (scenario estimates, not guarantees)

| Stream | Mechanism | Month-12 scenario at 100k pageviews/month |
|---|---|---|
| Google AdSense | Placements on tools, alerts and guides. Estimated RPM for security/finance content is about $8–20 | ≈ $800–2,000 |
| Affiliate | Password managers, VPNs, identity theft protection, data removal. Commissions are often $20–100+ per sale | 0.1% of visitors convert × ~$40 ≈ $4,000 |
| Lead generation | Personal Safety Plan leads go to protection partners. Business Trust Audit leads go to MSPs and security consultants (about $50–200 per B2B lead) | ≈ $2,000–4,000 |
| YouTube | "Scam of the week" Shorts and explainers. AdSense revenue plus sponsor segments | Grows with the channel |
| Sponsorship and ads sold directly | Newsletter sponsor, sponsored guides, contest prizes | $500–3,000 per deal |
| Donations | Buy Me a Coffee, Ko-fi, PayPal, Patreon, GitHub Sponsors, Stripe | Small, but builds goodwill |

**Bold path:** turn the checker into an API or browser extension plus a B2B "Trust Badge" (verified-business seal) subscription. Comparable businesses: ScamAdviser.biz, Trustpilot Business, BBB.
**Safe path:** content, ads and affiliates only.

## 2. Competitive audit (40 sites reviewed)

Sites reviewed: ScamAdviser, Scamwatch, FTC Consumer Advice, ReportFraud.ftc.gov, AARP Fraud Watch, BBB Scam Tracker, Trustpilot, Sitejabber, Get Safe Online, Have I Been Pwned, VirusTotal, URLVoid, Scam-Detector, StaySafeOnline, IdentityTheft.gov, IC3, Action Fraud, the Canadian Anti-Fraud Centre, Consumer Reports Security Planner, KrebsOnSecurity, the Malwarebytes blog, Norton, Aura, LifeLock, Mozilla \*Privacy Not Included, Privacy Guides, EFF SSD, ScamShield SG, Which?, Snopes, the CFPB, ITRC, ScamSpotter, Social Catfish, CISA Secure Our World, Google's Phishing Quiz, NCSC, Fraud.org, Security.org and SafetyDetectives.

Patterns adopted:
- **Hero:** a single paste-anything input with tool chips underneath (from HIBP, ScamAdviser and Social Catfish).
- **Navigation:** Check / Scams / Get Help / Protect / Community.
- **Tools:** risk score from 0–100 with red flags explained, and outbound links to deep scanners (VirusTotal, URLVoid, Google Safe Browsing, WHOIS).
- **Report form:** scam type, channel, identifier, date, amount, payment method, story, screenshot, country, and consent (from BBB, IC3 and CAFC).
- **Recovery:** a personalised plan with country-specific agencies (from IdentityTheft.gov).
- **Engagement:** a Scam IQ quiz with share buttons (Google, ScamAdviser) and the 3-rule framework (Scamwatch's Stop/Check/Protect, ScamSpotter).
- **Trust signals:** methodology, editorial standards, "we will never ask you to pay to recover funds", and affiliate disclosure placed next to CTAs.
- **Monetization:** comparison tables with "Visit" CTAs (Security.org, SafetyDetectives), newsletter capture, sponsorship and donations (Privacy Guides, EFF, ITRC).

## 3. Phase-wise build prompt

> Use these prompts in order with any AI coding assistant. Each phase is self-contained.

### Phase 0 — Foundations
```
Build a static, dependency-free website for ITrustYou.com ("Trust, verified.") — a consumer scam-checker
and online-safety hub. Hosting: GitHub Pages free plan (static HTML/CSS/vanilla JS, relative links, .nojekyll,
404.html, sitemap.xml, robots.txt, ads.txt, manifest). Design: modern, trustworthy (navy #0b1b33, teal #0e9f8a,
indigo #4f46e5), Inter + Space Grotesk, light/dark mode with toggle, WCAG AA, mobile-first, 16px gutters,
no horizontal scroll. One config file (assets/js/config.js) holds AdSense ID, GA4 ID, donation links,
social links and affiliate links. Every page starts with a top bar: "Contact, if you are interested in this
website / domain name / Sponsorship / Advertisement / Partnership" linking to https://web.works/contact.
Shared header (mega-dropdown nav: Check, Scams, Get Help, Protect, Community, Advertise + "Report a scam"
button) and footer injected by one JS file.
```

### Phase 1 — Core tools (traffic engine)
```
Create check.html with 4 tabbed tools (URL-hash deep-linkable, all client-side, nothing transmitted):
1) Website/link checker: parse URL, flag raw IPs, punycode, '@' tricks, shorteners, risky TLDs, stacked
subdomains, hyphens/numbers, credential keywords, brand impersonation (50+ brands with official domains,
look-alike detection via digit-to-letter normalisation + Levenshtein ≤2). Output 0–100 score, colour meter,
explained flags, and outbound deep-check links (Google Safe Browsing, VirusTotal, URLVoid, ICANN WHOIS).
2) Message analyzer: 20 weighted regex rules (urgency, threats, gift cards, crypto, OTP requests, prizes,
government impersonation, delivery/toll lures, job/task, romance, 'Hi Mum', remote access, secrecy) + link scoring.
3) Phone/email/wallet: disguised Caribbean/premium area codes, free-mail 'support' addresses, disposable
domains, BTC/ETH/TRON wallet detection. 4) Password lab: entropy + pattern strength meter and
crypto-random password/passphrase generator. Home hero: one paste-anything box with auto-detect routing.
```

### Phase 2 — Content engine (SEO)
```
Add data-driven pages: scams.html (A–Z library from assets/data/scams.js: name, category, channel, risk,
summary, red flags, what-to-do; searchable + filterable, deep-link anchors), alerts.html (assets/data/alerts.js
feed with severity/category/region filters and official source links), guides.html (7 signs of a scam,
2FA, credit freeze, protecting parents, safe shopping, small-business fraud), videos.html (privacy-enhanced
lite YouTube embeds + creator collaboration form). Unique title/description/canonical/OG per page;
Organization + WebSite SearchAction JSON-LD.
```

### Phase 3 — Lead generation (revenue engine)
```
Build protect.html as the dedicated conversion page: split hero, two multi-step forms with progress bars:
(a) Personal Safety Plan (who → worries/devices → contact + budget + consent),
(b) Business Trust Audit (company/site/size/industry → main concern → contact).
Repeat a 3-step lead block on the home page and a recovery-consultation form on help.html.
Trust microcopy: free, no passwords, never charge to recover funds, reply in 1–2 days.
All forms: honeypot, client validation, AJAX submit to FormSubmit with the destination inbox stored
encoded in config and only assembled at submit time (never visible in HTML), success/error states,
GA4 generate_lead event.
```

### Phase 4 — Community, contests, donations, hiring
```
report.html: 3-step scam report (type, channel, identifier, date, country → impact, amount, payment,
story, screenshot link → optional contact, publish consent) + official agency links per country.
help.html: recovery-plan generator (payment method × country → ordered checklist, printable).
quiz.html: 10-question Scam IQ (scam/legit) with explanations, score, WhatsApp/X/Facebook share,
contest entry form. contests.html: live countdown, 3 contests, entry form, official rules
(no purchase necessary, skill-testing question for Canada, never pay to claim).
support.html: donation tiers, provider buttons from config (fallback to pledge form), allocation chart
(research, operations, outreach/marketing, hiring, contests/prizes). careers.html: roles + application form.
advertise.html: ad products + inquiry form + brand-safety standards.
```

### Phase 5 — Monetization, compliance, launch
```
AdSense: responsive ad slots that load only when a publisher ID is set and consent isn't denied;
labelled "Advertisement"; house ads otherwise. Cookie consent banner. reviews.html: category comparison
table with affiliate buttons (rel="sponsored"), disclosure beside CTAs, methodology. Legal: privacy
(AdSense cookie language, GDPR/PIPEDA/Law 25/CCPA/DPDP rights), terms, disclosures (trademark
non-affiliation with TrustYou GmbH, copyright, affiliate, ads, educational disclaimer, donations).
QA: Playwright across pages (console errors, no horizontal scroll at 390px, forms post, tools score).
Deploy: push to GitHub and enable Pages; add custom domain via CNAME + DNS.
```

### Phase 6 — Growth (post-launch)
- Publish 3 alerts and 1 YouTube Short every week. Each alert gets its own page for long-tail SEO.
- Build programmatic pages such as "Is [brand]-[keyword].com legit?" from the report database (needs a backend: Supabase or Cloudflare Workers).
- Ship a browser extension and a public API (B2B).
- Translate into FR, ES and HI.
- Sell a Trust Badge subscription for verified small businesses.
- Partner with banks and telcos for sponsored senior-outreach programs.

## 4. Go-live checklist
1. Submit any form once. FormSubmit emails an activation link to the inbox; click it. Optionally put the random alias you receive into `formKey` and set `formAlias: true`.
2. Apply for AdSense, then paste the `ca-pub-…` ID into `config.js` and your line into `ads.txt`.
3. Add GA4, donation links, social links and affiliate links in `config.js`.
4. Custom domain: add a `CNAME` file containing `itrustyou.com`. At your DNS provider, set A records to 185.199.108.153, .109.153, .110.153 and .111.153, and a `www` CNAME to `webworksa1.github.io`. Then enable "Enforce HTTPS".
5. Submit `sitemap.xml` in Google Search Console.

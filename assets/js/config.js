/* ============================================================
   ITrustYou.com — SITE CONFIG. Edit this one file to go live.
   ============================================================ */
window.SITE = {
  name: "ITrustYou",
  domain: "itrustyou.com",
  tagline: "Trust, verified.",
  inquiryUrl: "https://web.works/contact",

  /* Form delivery (FormSubmit.co). The destination inbox is stored encoded
     and only assembled in the browser at submit time, so it never appears
     on any page. After the first submission, FormSubmit emails an activation
     link to the inbox — click it once. Optionally replace `formKey` with the
     random alias FormSubmit gives you and set `formAlias: true`. */
  formKey: ["bW9jLmxp", "YW1nQDFh", "c2tyb3di", "ZXc="],
  formAlias: false,

  /* Google AdSense — paste your publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
     and slot IDs. Leave empty to show house placeholders. */
  adsense: { client: "", slots: { top: "", inline: "", footer: "" } },

  /* Google Analytics 4 measurement ID, e.g. "G-XXXXXXX" (optional) */
  ga4: "",

  /* Donation / support links — add yours; empty ones fall back to the pledge form */
  donate: {
    buymeacoffee: "",   // https://buymeacoffee.com/yourname
    kofi: "",           // https://ko-fi.com/yourname
    paypal: "",         // https://paypal.me/yourname
    patreon: "",        // https://patreon.com/yourname
    githubSponsors: "", // https://github.com/sponsors/yourname
    stripe: ""          // Stripe Payment Link
  },

  /* Social & YouTube */
  social: { youtube: "", x: "", facebook: "", instagram: "", linkedin: "", tiktok: "" },

  /* Affiliate links for the Reviews page — replace with your tracked links */
  affiliate: {
    passwordManager: "#", vpn: "#", identity: "#", antivirus: "#", dataRemoval: "#", creditMonitor: "#"
  }
};

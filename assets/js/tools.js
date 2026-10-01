/* ITrustYou.com — client-side safety tools. Nothing you type leaves your browser. */
(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  /* ---------- Shared data ---------- */
  var BRANDS = {
    paypal: ["paypal.com"], amazon: ["amazon.com", "amazon.ca", "amazon.co.uk", "amazon.in", "amazon.de", "amazon.com.au", "amazon.fr"],
    apple: ["apple.com", "icloud.com"], microsoft: ["microsoft.com", "live.com", "office.com", "outlook.com"],
    google: ["google.com", "gmail.com", "youtube.com"], netflix: ["netflix.com"], facebook: ["facebook.com", "fb.com"],
    instagram: ["instagram.com"], whatsapp: ["whatsapp.com"], coinbase: ["coinbase.com"], binance: ["binance.com"],
    usps: ["usps.com"], fedex: ["fedex.com"], dhl: ["dhl.com"], ups: ["ups.com"], canadapost: ["canadapost-postescanada.ca", "canadapost.ca"],
    royalmail: ["royalmail.com"], irs: ["irs.gov"], wellsfargo: ["wellsfargo.com"], chase: ["chase.com"], bankofamerica: ["bankofamerica.com"],
    citi: ["citi.com"], hsbc: ["hsbc.com", "hsbc.co.uk"], barclays: ["barclays.co.uk"], rbc: ["rbc.com", "rbcroyalbank.com"],
    td: ["td.com"], scotiabank: ["scotiabank.com"], interac: ["interac.ca"], walmart: ["walmart.com"], ebay: ["ebay.com"],
    steam: ["steampowered.com", "steamcommunity.com"], metamask: ["metamask.io"], docusign: ["docusign.com", "docusign.net"],
    dropbox: ["dropbox.com"], linkedin: ["linkedin.com"], sbi: ["onlinesbi.sbi", "sbi.co.in"], hdfc: ["hdfcbank.com"], icici: ["icicibank.com"], paytm: ["paytm.com"]
  };
  var OFFICIAL = []; Object.keys(BRANDS).forEach(function (k) { OFFICIAL = OFFICIAL.concat(BRANDS[k]); });
  var RISKY_TLD = ["zip", "mov", "xyz", "top", "click", "country", "gq", "tk", "ml", "cf", "ga", "work", "support", "rest", "fit", "loan", "win", "bid", "kim", "cam", "icu", "monster", "buzz", "sbs", "cfd", "lol", "quest", "beauty", "hair", "shop", "online", "site", "live", "store", "vip", "cyou"];
  var SHORTENERS = ["bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd", "buff.ly", "rebrand.ly", "cutt.ly", "shorturl.at", "rb.gy", "t.ly", "s.id", "tiny.cc"];
  var MULTI = ["co.uk", "com.au", "co.in", "co.nz", "com.br", "co.za", "org.uk", "gov.uk", "ac.uk", "com.mx", "co.jp", "com.sg", "gc.ca", "gov.in", "gov.au"];
  var DISPOSABLE = ["mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "temp-mail.org", "yopmail.com", "trashmail.com", "sharklasers.com", "getnada.com", "dispostable.com", "maildrop.cc"];
  var FREEMAIL = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "icloud.com", "proton.me", "protonmail.com", "gmx.com", "mail.com", "yandex.com", "zoho.com"];

  function lev(a, b) {
    var m = [], i, j;
    for (i = 0; i <= b.length; i++) m[i] = [i];
    for (j = 0; j <= a.length; j++) m[0][j] = j;
    for (i = 1; i <= b.length; i++) for (j = 1; j <= a.length; j++)
      m[i][j] = b[i - 1] === a[j - 1] ? m[i - 1][j - 1] : Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);
    return m[b.length][a.length];
  }
  function registrable(host) {
    var p = host.split("."); if (p.length <= 2) return host;
    var last2 = p.slice(-2).join(".");
    return MULTI.indexOf(last2) > -1 ? p.slice(-3).join(".") : last2;
  }
  function deskeleton(s) { return s.replace(/0/g, "o").replace(/1/g, "l").replace(/rn/g, "m").replace(/vv/g, "w").replace(/3/g, "e").replace(/5/g, "s").replace(/\$/g, "s"); }

  function render(el, score, verdict, flags, extra) {
    var color = score >= 70 ? "var(--ok)" : score >= 40 ? "var(--warn)" : "var(--danger)";
    var label = score >= 70 ? "Lower risk" : score >= 40 ? "Be cautious" : "High risk";
    el.innerHTML = '<div class="card"><div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap"><div class="score" style="color:' + color + '">' + score +
      '<small style="font-size:1rem;color:var(--muted)">/100</small></div><div style="flex:1;min-width:200px"><b style="color:' + color + '">' + label + "</b> — " + esc(verdict) +
      '<div class="meter mt-2"><span style="width:0;background:' + color + '"></span></div></div></div><ul class="flags">' +
      flags.map(function (f) { return '<li class="' + f[0] + '">' + f[1] + "</li>"; }).join("") + "</ul>" + (extra || "") +
      '<p class="disclosure-inline mt-2">Heuristic estimate only — a high score is not a guarantee. Always verify through an official channel you look up yourself.</p></div>';
    el.classList.add("show");
    setTimeout(function () { var s = el.querySelector(".meter span"); if (s) s.style.width = score + "%"; }, 50);
    if (window.gtag) gtag("event", "tool_use", { tool: el.id, score: score });
  }

  /* ---------- Website / link checker ---------- */
  function checkUrl(raw) {
    var flags = [], score = 100, input = raw.trim();
    if (!/^[a-z]+:\/\//i.test(input)) input = "http://" + input;
    var u; try { u = new URL(input); } catch (e) { return null; }
    var host = u.hostname.toLowerCase().replace(/^www\./, ""), reg = registrable(host), tld = host.split(".").pop(), name = reg.split(".")[0];
    function hit(n, cls, msg) { score -= n; flags.push([cls, msg]); }

    if (OFFICIAL.indexOf(reg) > -1) flags.push(["good", "✔ <b>" + esc(reg) + "</b> is a known official domain for a major brand. Still check the full address carefully."]);
    if (/^https:/i.test(raw.trim())) flags.push(["good", "✔ Uses HTTPS (encryption only — scam sites use it too)."]);
    else if (/^http:/i.test(raw.trim())) hit(15, "bad", "✖ Uses plain HTTP — no encryption. Never enter passwords or card details here.");
    if (/^\d+\.\d+\.\d+\.\d+$/.test(host) || host.indexOf(":") > -1) hit(35, "bad", "✖ The address is a raw IP number instead of a name — a classic phishing trick.");
    if (host.indexOf("xn--") > -1) hit(30, "bad", "✖ Punycode domain (xn--) — may use look-alike foreign characters to imitate a real brand.");
    if (u.href.indexOf("@") > -1 && u.username) hit(30, "bad", "✖ Contains “@” — everything before it is ignored by the browser; the real destination is after it.");
    if (SHORTENERS.indexOf(host) > -1) hit(20, "warn", "⚠ Shortened link — the real destination is hidden. Expand it with a link-preview service before clicking.");
    if (RISKY_TLD.indexOf(tld) > -1) hit(15, "warn", "⚠ The ." + esc(tld) + " ending is cheap and disproportionately used in scam campaigns.");
    var subs = host.split(".").length - reg.split(".").length;
    if (subs >= 3) hit(15, "warn", "⚠ Many sub-domains (" + subs + ") — scammers stack words like “secure.login.bank” in front of their own domain.");
    var hy = (name.match(/-/g) || []).length; if (hy >= 2) hit(10, "warn", "⚠ Several hyphens in the domain name — common in throwaway scam domains.");
    if (/\d{3,}/.test(name)) hit(8, "warn", "⚠ Long number strings in the domain name.");
    if (name.length > 24) hit(8, "warn", "⚠ Unusually long domain name.");
    var kw = (host + u.pathname).match(/login|signin|verify|verification|secure|update|account|wallet|unlock|suspend|billing|refund|claim|gift|bonus|free|prize|reward|airdrop|support|helpdesk|recover/gi);
    if (kw && OFFICIAL.indexOf(reg) < 0) hit(Math.min(kw.length * 6, 18), "warn", "⚠ Pressure / credential words in the address: <b>" + esc(Array.from(new Set(kw.map(function (k) { return k.toLowerCase(); }))).join(", ")) + "</b>.");

    if (OFFICIAL.indexOf(reg) < 0) {
      var sk = deskeleton(name), found = null;
      Object.keys(BRANDS).some(function (b) {
        if (host.indexOf(b) > -1 || sk.indexOf(b) > -1) { found = [b, "contains"]; return true; }
        if (b.length >= 5 && lev(sk, b) <= 2) { found = [b, "looks like"]; return true; }
      });
      if (found) hit(40, "bad", "✖ The domain " + found[1] + " “<b>" + found[0] + "</b>” but is NOT an official " + found[0] + " domain (" + esc(BRANDS[found[0]].join(", ")) + "). Likely impersonation.");
    }
    if (u.href.length > 120) hit(6, "warn", "⚠ Very long URL — often used to hide the real domain on small screens.");
    if ((u.href.match(/%[0-9a-f]{2}/gi) || []).length > 6) hit(8, "warn", "⚠ Heavily encoded characters in the URL.");
    if (flags.filter(function (f) { return f[0] !== "good"; }).length === 0) flags.push(["good", "✔ No structural red flags found in the address itself."]);
    score = Math.max(3, Math.min(100, score));
    var q = encodeURIComponent(host);
    var extra = '<h3 class="mt-4">Deep-check with independent scanners</h3><div class="pill-list">' +
      [["Google Safe Browsing", "https://transparencyreport.google.com/safe-browsing/search?url=" + q],
       ["VirusTotal", "https://www.virustotal.com/gui/domain/" + q],
       ["URLVoid", "https://www.urlvoid.com/scan/" + q + "/"],
       ["Domain age (ICANN WHOIS)", "https://lookup.icann.org/en/lookup?name=" + encodeURIComponent(reg)],
       ["ScamAdviser", "https://www.scamadviser.com/check-website/" + q]].map(function (l) {
        return '<a class="btn btn-ghost btn-sm" target="_blank" rel="noopener nofollow" href="' + l[1] + '">' + l[0] + " ↗</a>";
      }).join("") + "</div><p class='muted mt-2' style='font-size:.9rem'>Tip: a domain registered in the last 6 months selling “70% off” brand goods is the #1 fake-shop pattern.</p>";
    return { score: score, verdict: "Domain analysed: " + reg, flags: flags, extra: extra };
  }

  /* ---------- Message analyzer ---------- */
  var RULES = [
    [/urgent|immediately|within (24|48) hours|act now|final notice|last chance|expires? today|right away|asap/i, 14, "Urgency pressure — scammers rush you so you don't think."],
    [/suspend|locked|disabled|unusual (activity|sign.?in)|compromised|unauthori[sz]ed/i, 14, "Account-threat language (“your account is suspended/locked”)."],
    [/gift ?card|itunes|google play card|steam card|apple card|vanilla (visa|card)/i, 30, "Asks for gift cards — no legitimate business or agency accepts these as payment."],
    [/bitcoin|crypto|usdt|tether|wallet address|ethereum|btc|binance/i, 18, "Crypto payment or wallet mention — irreversible and a favourite of scammers."],
    [/wire transfer|western union|moneygram|zelle|cash app|venmo|e-?transfer|interac|upi|bank transfer/i, 12, "Requests a fast, hard-to-reverse payment method."],
    [/(verification|security|one.?time|otp|6.?digit) code|passcode|pin\b/i, 25, "Asks for a code or PIN — never share one-time codes with anyone."],
    [/password|login details|sign in to (confirm|verify)|confirm your (identity|details|account)/i, 18, "Asks you to log in or confirm credentials via a link."],
    [/congratulations|you('ve| have) won|winner|lottery|prize|claim your|selected|reward/i, 18, "Prize / winner bait you never entered."],
    [/irs|cra|hmrc|social security|ssn|tax (refund|debt)|police|arrest|warrant|court|customs|immigration/i, 16, "Government / law-enforcement impersonation threat."],
    [/package|parcel|delivery (failed|attempt)|redeliver|customs fee|usps|fedex|dhl|canada post|royal mail/i, 12, "Delivery-problem lure (the #1 text scam)."],
    [/toll|unpaid (toll|fine|invoice)|outstanding balance|overdue/i, 12, "Unpaid toll / fine / invoice lure."],
    [/guaranteed (return|profit)|double your|passive income|risk.?free|\d{2,3}% (return|profit)|investment opportunity|trading (platform|signal)/i, 22, "Unrealistic investment returns."],
    [/work from home|earn \$?\d+.*(day|hour)|no experience|hiring.*(telegram|whatsapp)|task.?based|like (videos|posts) for money/i, 20, "Too-good-to-be-true job / task offer."],
    [/(whatsapp|telegram|signal) (me|us)|move (this|the) conversation|text me on|add me on/i, 12, "Pushes you to move to another messaging app."],
    [/remote (access|desktop)|anydesk|teamviewer|ultraviewer|install (this|the) app/i, 24, "Asks you to install remote-access software."],
    [/kindly|dear (customer|user|sir|madam|beneficiary)|valued customer/i, 8, "Generic greeting / unusual phrasing typical of mass scams."],
    [/my love|darling|soulmate|military|deployed|oil rig|widow(er)?|inheritance/i, 14, "Romance / inheritance story markers."],
    [/hi (mum|mom|dad)|new number|lost my phone|broke my phone/i, 20, "“Hi Mum/Dad, new number” family-impersonation pattern."],
    [/refund|overpaid|overpayment|send (back|the difference)/i, 14, "Refund / overpayment trick."],
    [/don'?t tell|keep (this )?(confidential|secret)|do not discuss/i, 18, "Asks for secrecy — a major manipulation tactic."]
  ];
  function checkMessage(text) {
    var flags = [], risk = 0;
    RULES.forEach(function (r) { if (r[0].test(text)) { risk += r[1]; flags.push([r[1] >= 18 ? "bad" : "warn", (r[1] >= 18 ? "✖ " : "⚠ ") + r[2]]); } });
    var links = text.match(/(https?:\/\/[^\s]+|www\.[^\s]+|\b[a-z0-9-]+\.(com|net|org|info|xyz|top|ly|io|co|me|link|click|shop)\/[^\s]*)/gi) || [];
    links.forEach(function (l) {
      var r = checkUrl(l); if (!r) return;
      if (r.score < 70) { risk += (70 - r.score) / 2; flags.push(["bad", "✖ Suspicious link: <b>" + esc(l.slice(0, 80)) + "</b> (link score " + r.score + "/100)."]); }
      else flags.push(["warn", "⚠ Contains a link: " + esc(l.slice(0, 80)) + " — type the official address yourself instead of tapping."]);
    });
    if ((text.match(/!/g) || []).length >= 3) { risk += 5; flags.push(["warn", "⚠ Excessive exclamation marks."]); }
    if (/[A-Z]{6,}/.test(text) && /[A-Z]{6,}.*[A-Z]{6,}/.test(text)) { risk += 4; flags.push(["warn", "⚠ Shouting in capitals."]); }
    if (!flags.length) flags.push(["good", "✔ No common scam patterns detected. If it asks for money, codes or personal data, verify independently anyway."]);
    var score = Math.max(2, Math.round(100 - Math.min(98, risk)));
    var verdict = score < 40 ? "This message matches several well-known scam scripts. Do not reply, click, or pay." :
      score < 70 ? "Some warning signs. Verify with the sender using contact details you find yourself." : "Fewer warning signs — but stay alert.";
    return { score: score, verdict: verdict, flags: flags };
  }

  /* ---------- Phone / email / wallet ---------- */
  var PHONE_RISK = { "876": "Jamaica (one-ring/lottery scams)", "809": "Dominican Republic", "829": "Dominican Republic", "849": "Dominican Republic", "284": "British Virgin Islands", "473": "Grenada", "649": "Turks & Caicos", "268": "Antigua", "664": "Montserrat", "767": "Dominica", "900": "premium-rate", "976": "premium-rate" };
  function checkContact(v) {
    v = v.trim(); var flags = [], score = 85;
    if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(v) || /^0x[a-fA-F0-9]{40}$/.test(v) || /^T[a-zA-Z0-9]{33}$/.test(v)) {
      score = 25;
      flags.push(["bad", "✖ This is a cryptocurrency wallet address (" + (v[0] === "0" ? "Ethereum/EVM" : v[0] === "T" ? "TRON/USDT" : "Bitcoin") + "). Payments are irreversible."]);
      flags.push(["warn", "⚠ Governments, banks, utilities and real employers never ask for payment to a crypto wallet."]);
      flags.push(["good", "→ Search this address on a blockchain explorer and in our <a href='alerts.html'>alert database</a> before sending anything."]);
      return { score: score, verdict: "Crypto wallet detected", flags: flags };
    }
    if (/@/.test(v)) {
      var dom = v.split("@").pop().toLowerCase(), reg = registrable(dom), local = v.split("@")[0].toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return null;
      if (DISPOSABLE.indexOf(reg) > -1) { score -= 45; flags.push(["bad", "✖ Disposable / throwaway email provider."]); }
      if (FREEMAIL.indexOf(reg) > -1) {
        var b = Object.keys(BRANDS).filter(function (k) { return local.indexOf(k) > -1; })[0];
        if (b || /support|security|billing|admin|helpdesk|service|official|team|hr|recruit/.test(local)) { score -= 40; flags.push(["bad", "✖ Claims to be a company/support team but uses a free personal email (" + esc(reg) + "). Real companies email from their own domain."]); }
        else flags.push(["warn", "⚠ Free personal email account — fine for individuals, a red flag for any “company”."]);
      }
      if (OFFICIAL.indexOf(reg) > -1) flags.push(["good", "✔ Domain matches an official brand domain. Note: the display name and reply-to can still be spoofed — check headers."]);
      else {
        var r = checkUrl(dom); if (r) r.flags.forEach(function (f) { if (f[0] !== "good") { flags.push(f); score -= 10; } });
      }
      if (!flags.length) flags.push(["good", "✔ No obvious red flags in the address format."]);
      return { score: Math.max(5, score), verdict: "Email address analysed: " + reg, flags: flags };
    }
    var d = v.replace(/[^\d+]/g, "");
    if (d.replace("+", "").length < 7) return null;
    var nd = d.replace(/^\+?1/, "");
    var area = nd.slice(0, 3);
    if (/^\+?1/.test(d) && PHONE_RISK[area]) { score -= 45; flags.push(["bad", "✖ Area code " + area + " looks domestic but is " + PHONE_RISK[area] + " — international/premium charges and a known scam pattern."]); }
    if (/^\+(234|233|232|225|229|371|381|62|92|880|63|855)/.test(d)) { score -= 20; flags.push(["warn", "⚠ International number from a country frequently used in unsolicited call/text scams. Don't call back unknown numbers."]); }
    if (/^\+?1?(800|888|877|866|855|844|833)/.test(d)) flags.push(["warn", "⚠ Toll-free numbers can be legitimate — but scammers buy them too. Look up the company's number on their official site."]);
    flags.push(["warn", "⚠ Caller ID can be spoofed: even a real bank number may be faked. Hang up and call back using the number on your card."]);
    flags.push(["good", "→ Search this number in our <a href='alerts.html'>alerts</a> and <a href='report.html'>report it</a> if it contacted you unsolicited."]);
    return { score: Math.max(5, score), verdict: "Phone number analysed", flags: flags };
  }

  /* ---------- Password lab ---------- */
  var COMMON = ["123456", "password", "123456789", "12345678", "12345", "qwerty", "abc123", "111111", "123123", "password1", "iloveyou", "admin", "welcome", "monkey", "dragon", "letmein", "football", "sunshine", "princess", "qwerty123", "1q2w3e4r", "000000", "trustno1", "baseball", "master"];
  function pwStrength(p) {
    var pool = 0; if (/[a-z]/.test(p)) pool += 26; if (/[A-Z]/.test(p)) pool += 26; if (/\d/.test(p)) pool += 10; if (/[^a-zA-Z0-9]/.test(p)) pool += 33;
    var bits = p.length * Math.log2(pool || 1), flags = [];
    if (COMMON.indexOf(p.toLowerCase()) > -1) { bits = 5; flags.push(["bad", "✖ This is one of the most common passwords — cracked instantly."]); }
    if (/(.)\1{2,}/.test(p)) { bits -= 10; flags.push(["warn", "⚠ Repeated characters."]); }
    if (/(abc|123|qwe|asd|zxc|password|admin)/i.test(p)) { bits -= 12; flags.push(["warn", "⚠ Contains a predictable sequence or word."]); }
    if (/(19|20)\d{2}/.test(p)) { bits -= 6; flags.push(["warn", "⚠ Looks like it contains a year — easy to guess from social media."]); }
    if (p.length < 12) flags.push(["warn", "⚠ Shorter than 12 characters. Length beats complexity."]);
    bits = Math.max(0, bits);
    var secs = Math.pow(2, bits) / 1e10 / 2, t;
    t = secs < 1 ? "instantly" : secs < 3600 ? Math.round(secs / 60) + " minutes" : secs < 86400 * 365 ? Math.round(secs / 86400) + " days" : secs < 3.15e7 * 1e6 ? Math.round(secs / 3.15e7).toLocaleString() + " years" : "millions of years+";
    if (bits >= 75) flags.push(["good", "✔ Strong. Use it for one account only and store it in a password manager."]);
    var score = Math.max(2, Math.min(100, Math.round(bits / 1.0)));
    return { score: score, verdict: "Estimated offline crack time: " + t + " (≈" + Math.round(bits) + " bits)", flags: flags };
  }
  var WORDS = "anchor apple arrow autumn bamboo beacon breeze bridge canyon cedar comet coral cosmos crystal dawn delta ember falcon fern forest galaxy garnet glacier harbor hazel horizon island jade jasmine kettle lagoon lantern lemon maple meadow mint nebula oasis ocean olive orbit pebble pepper pilot planet prairie quartz raven river rocket saffron sierra silver spruce summit thunder tiger timber topaz tulip valley velvet violet walnut willow winter zephyr".split(" ");
  function rand(n) { var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
  function genPassword(len, sym) {
    var cs = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789" + (sym ? "!@#$%^&*-_=+?" : ""), s = "";
    for (var i = 0; i < len; i++) s += cs[rand(cs.length)];
    return s;
  }
  function genPhrase(n) { var w = []; for (var i = 0; i < n; i++) w.push(WORDS[rand(WORDS.length)]); return w.join("-") + "-" + rand(100); }

  /* ---------- Wire-up ---------- */
  function bind(formId, inputId, outId, fn, errMsg) {
    var f = document.getElementById(formId); if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = document.getElementById(inputId).value, out = document.getElementById(outId);
      if (!v.trim()) return;
      var r = fn(v);
      if (!r) { out.innerHTML = '<div class="notice">' + errMsg + "</div>"; out.classList.add("show"); return; }
      render(out, r.score, r.verdict, r.flags, r.extra);
    });
  }
  bind("fUrl", "inUrl", "outUrl", checkUrl, "That doesn't look like a web address. Try e.g. <b>example-shop.com</b>.");
  bind("fMsg", "inMsg", "outMsg", checkMessage, "Paste the message text to analyse.");
  bind("fContact", "inContact", "outContact", checkContact, "Enter a phone number, email address, or crypto wallet address.");

  var pw = $("#inPw");
  if (pw) {
    pw.addEventListener("input", function () {
      var out = $("#outPw"); if (!pw.value) { out.classList.remove("show"); return; }
      var r = pwStrength(pw.value); render(out, r.score, r.verdict, r.flags);
    });
    var tg = $("#pwShow"); if (tg) tg.addEventListener("click", function () { pw.type = pw.type === "password" ? "text" : "password"; });
  }
  var gen = $("#genBtn");
  if (gen) {
    var go = function () {
      var mode = $("#genMode").value, len = +$("#genLen").value;
      $("#genLenVal").textContent = len;
      $("#genOut").value = mode === "phrase" ? genPhrase(Math.max(4, Math.round(len / 5))) : genPassword(len, $("#genSym").checked);
    };
    gen.addEventListener("click", go); $("#genLen").addEventListener("input", go); $("#genMode").addEventListener("change", go); $("#genSym").addEventListener("change", go);
    $("#genCopy").addEventListener("click", function () { var o = $("#genOut"); o.select(); try { navigator.clipboard.writeText(o.value); } catch (e) { document.execCommand("copy"); } this.textContent = "Copied ✓"; var b = this; setTimeout(function () { b.textContent = "Copy"; }, 1500); });
    go();
  }

  /* Hero scanner (home) → routes to the right tool */
  var hs = $("#heroScan");
  if (hs) {
    var mode = "auto";
    document.querySelectorAll("#heroChips .chip").forEach(function (c) {
      c.addEventListener("click", function () {
        document.querySelectorAll("#heroChips .chip").forEach(function (x) { x.classList.remove("active"); });
        c.classList.add("active"); mode = c.dataset.mode; $("#heroInput").placeholder = c.dataset.ph;
      });
    });
    hs.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = $("#heroInput").value.trim(); if (!v) return;
      var m = mode;
      if (m === "auto") m = /\s/.test(v) && v.split(/\s+/).length > 4 ? "message" : (/@|^\+?[\d\s().-]{7,}$|^0x[a-f0-9]{40}$|^(bc1|[13])[a-z0-9]{25,}$/i.test(v) ? "contact" : "website");
      location.href = "check.html?q=" + encodeURIComponent(v) + "#" + m;
    });
  }
  /* Deep link ?q= on check page */
  var q = new URLSearchParams(location.search).get("q");
  if (q && $("#inUrl")) {
    var h = location.hash.slice(1) || "website";
    var map = { website: ["inUrl", "fUrl"], message: ["inMsg", "fMsg"], contact: ["inContact", "fContact"] }[h];
    if (map) { document.getElementById(map[0]).value = q; document.getElementById(map[1]).dispatchEvent(new Event("submit", { cancelable: true })); }
  }
})();

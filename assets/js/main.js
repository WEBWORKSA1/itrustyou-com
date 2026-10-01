/* ITrustYou.com — layout, theme, forms, ads, embeds. Vanilla JS, no dependencies. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Theme ---------- */
  var saved = store.get("iy-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  var LOGO = '<svg viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#12c2a6"/><stop offset="1" stop-color="#4f46e5"/></linearGradient></defs><path d="M20 2 5 8v11c0 9.4 6.4 17.2 15 19 8.6-1.8 15-9.6 15-19V8L20 2z" fill="url(#lg)"/><path d="m13 20 5 5 9-10" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var NAV = [
    { t: "Check", items: [
      ["check.html#website", "Website & Link Checker", "Is this site legit? Get a risk score"],
      ["check.html#message", "Message Analyzer", "Paste a text, email or DM"],
      ["check.html#contact", "Phone / Email / Wallet", "Spot spoofed or risky identifiers"],
      ["check.html#password", "Password Lab", "Strength test + generator"]
    ]},
    { t: "Scams", items: [
      ["scams.html", "Scam Library A–Z", "30 scam types, red flags & fixes"],
      ["alerts.html", "Scam Alerts", "Latest warnings, by region"],
      ["guides.html", "Safety Guides", "Step-by-step protection"],
      ["videos.html", "Videos", "Watch & learn in 3 minutes"]
    ]},
    { t: "Get Help", items: [
      ["help.html", "I've Been Scammed", "Personal recovery plan"],
      ["report.html", "Report a Scam", "Warn others in 2 minutes"]
    ]},
    { t: "Protect", items: [
      ["protect.html", "Free Safety Plan", "Personal protection consult"],
      ["protect.html#business", "Business Trust Audit", "For SMBs, shops & creators"],
      ["reviews.html", "Best Protection Tools", "VPN, ID theft, password managers"]
    ]},
    { t: "Community", items: [
      ["quiz.html", "Scam IQ Quiz", "Can you spot the fake?"],
      ["contests.html", "Contests & Prizes", "Win for protecting others"],
      ["careers.html", "Join the Team", "Writers, analysts, creators"],
      ["support.html", "Support Our Mission", "Donate or sponsor"]
    ]}
  ];

  function header() {
    var here = location.pathname.split("/").pop() || "index.html";
    var li = NAV.map(function (g, i) {
      return '<li><button class="dd" aria-haspopup="true">' + g.t + ' ▾</button><div class="dropdown">' +
        g.items.map(function (it) {
          var cur = it[0].split("#")[0] === here ? ' aria-current="page"' : "";
          return '<a href="' + it[0] + '"' + cur + ">" + it[1] + "<small>" + it[2] + "</small></a>";
        }).join("") + "</div></li>";
    }).join("");
    return '<div class="container nav"><a class="logo" href="index.html" aria-label="ITrustYou home">' + LOGO +
      '<span>ITrust<b>You</b></span></a><ul class="nav-links" id="navlinks">' + li +
      '<li><a href="advertise.html">Advertise</a></li></ul><div class="nav-cta">' +
      '<a class="btn btn-danger btn-sm btn-report" href="report.html">Report a scam</a>' +
      '<button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>' +
      '<button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div></div>';
  }

  function footer() {
    var soc = S.social || {}, s = "";
    var icons = { youtube: "▶", x: "𝕏", facebook: "f", instagram: "◎", linkedin: "in", tiktok: "♪" };
    Object.keys(icons).forEach(function (k) { if (soc[k]) s += '<a href="' + soc[k] + '" target="_blank" rel="noopener" aria-label="' + k + '">' + icons[k] + "</a>"; });
    return '<div class="container"><div class="foot-grid"><div><a class="logo" href="index.html" style="color:#fff">' + LOGO +
      '<span>ITrust<b>You</b></span></a><p class="mt-2">Independent consumer trust &amp; online-safety hub. Check before you trust, report what you find, and help others stay safe.</p>' +
      '<p><a href="' + S.inquiryUrl + '" target="_blank" rel="noopener">Interested in this website, domain, sponsorship or partnership? →</a></p>' +
      (s ? '<div class="social">' + s + "</div>" : "") + "</div>" +
      '<div><h4>Check</h4><ul><li><a href="check.html#website">Website checker</a></li><li><a href="check.html#message">Message analyzer</a></li><li><a href="check.html#contact">Phone &amp; email check</a></li><li><a href="check.html#password">Password lab</a></li><li><a href="quiz.html">Scam IQ quiz</a></li></ul></div>' +
      '<div><h4>Learn</h4><ul><li><a href="scams.html">Scam library</a></li><li><a href="alerts.html">Scam alerts</a></li><li><a href="guides.html">Safety guides</a></li><li><a href="videos.html">Videos</a></li><li><a href="reviews.html">Protection tools</a></li></ul></div>' +
      '<div><h4>Act</h4><ul><li><a href="report.html">Report a scam</a></li><li><a href="help.html">I\'ve been scammed</a></li><li><a href="protect.html">Free safety plan</a></li><li><a href="protect.html#business">Business trust audit</a></li><li><a href="contests.html">Contests</a></li></ul></div>' +
      '<div><h4>Company</h4><ul><li><a href="about.html">About &amp; methodology</a></li><li><a href="support.html">Support us</a></li><li><a href="careers.html">Careers</a></li><li><a href="advertise.html">Advertise</a></li><li><a href="contact.html">Contact</a></li></ul></div></div>' +
      '<div class="foot-bottom"><span>© <span data-year></span> ITrustYou.com. All rights reserved. ITrustYou is an independent publication and is not affiliated with any government agency or with any company using a similar name. Information is educational, not legal or financial advice.</span>' +
      '<span><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="disclosures.html">Disclosures &amp; Trademarks</a> · <a href="#" data-cookie-reset>Cookie settings</a></span></div></div>';
  }

  var NEWSLETTER = '<section><div class="container"><div class="band reveal"><div><h2>Get the weekly Scam Alert</h2><p>The 5 scams spreading right now, in 3 minutes. Free. Unsubscribe anytime.</p></div>' +
    '<form data-form="Newsletter signup" class="nl"><input type="email" name="email" required placeholder="you@example.com" aria-label="Email address"><input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off"><button class="btn btn-dark">Subscribe</button><div class="form-status" role="status" style="flex-basis:100%"></div></form></div></div></section>';

  var SUPPORT = '<section class="section-alt"><div class="container split"><div class="reveal"><span class="kicker">Reader-supported</span><h2>Keep scam warnings free for everyone</h2><p class="muted">Every check, alert and guide on ITrustYou is free. Your support funds research, server costs, outreach to vulnerable communities, new hires and monthly prize contests.</p>' +
    '<div class="pill-list"><a class="btn btn-primary" href="support.html">Donate / Support</a><a class="btn btn-ghost" href="advertise.html">Become a sponsor</a></div></div>' +
    '<div class="card reveal"><div class="alloc">' +
    [["Research & tools", 35], ["Operations", 20], ["Outreach & marketing", 20], ["Hiring talent", 15], ["Contests & prizes", 10]].map(function (a) {
      return "<div><span>" + a[0] + '</span><div class="meter"><span style="width:' + a[1] + '%;background:var(--brand)"></span></div><b>' + a[1] + "%</b></div>";
    }).join("") + "</div></div></div></section>";

  function inject() {
    var h = $("#site-header"); if (h) { h.className = "site-header"; h.innerHTML = header(); }
    var f = $("#site-footer"); if (f) { f.className = "site-footer"; f.innerHTML = footer(); }
    $$('[data-include="newsletter"]').forEach(function (el) { el.outerHTML = NEWSLETTER; });
    $$('[data-include="support"]').forEach(function (el) { el.outerHTML = SUPPORT; });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- Behaviour ---------- */
  function bindNav() {
    var t = $("#themeBtn");
    if (t) t.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var dark = cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      var next = dark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next); store.set("iy-theme", next);
    });
    var m = $("#menuBtn"), l = $("#navlinks");
    if (m && l) m.addEventListener("click", function () {
      var o = l.classList.toggle("open"); m.setAttribute("aria-expanded", o); m.innerHTML = o ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>' : MENU;
    });
  }

  /* Form delivery — destination is assembled at runtime only */
  function endpoint() {
    var k = (S.formKey || []).join("");
    var dest = S.formAlias ? k : atob(k).split("").reverse().join("");
    return "https://formsubmit.co/ajax/" + dest;
  }
  function serialize(form) {
    var data = {};
    new FormData(form).forEach(function (v, k) {
      if (v instanceof File) return;
      data[k] = data[k] ? data[k] + ", " + v : v;
    });
    return data;
  }
  function bindForms() {
    $$("form[data-form]").forEach(function (form) {
      if (form._bound) return; form._bound = 1;
      form.setAttribute("novalidate", "");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = $(".form-status", form);
        var active = $(".step.active", form);
        if (active && !validate(active)) return;
        if (!active && !validate(form)) return;
        var data = serialize(form);
        if (data._honey) return;
        delete data._honey;
        data._subject = "[ITrustYou] " + form.getAttribute("data-form") + (data.name ? " — " + data.name : "");
        data._template = "table"; data._captcha = "false";
        data["Form"] = form.getAttribute("data-form");
        data["Page"] = location.href;
        data["Submitted"] = new Date().toISOString();
        if (data.email) data._replyto = data.email;
        setStatus(status, "busy", "Sending securely…");
        var btn = form.querySelector('button[type="submit"],button:not([type])'); if (btn) btn.disabled = true;
        fetch(endpoint(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
          .then(function (res) {
            if (!res.ok || String(res.j.success) === "false") throw new Error(res.j.message || "Failed");
            setStatus(status, "ok", form.getAttribute("data-success") || "✓ Received. Thank you — we'll be in touch soon.");
            form.reset(); resetSteps(form);
            if (window.gtag) gtag("event", "generate_lead", { form_name: form.getAttribute("data-form") });
          })
          .catch(function () { setStatus(status, "err", "Couldn't send right now. Please try again in a minute."); })
          .then(function () { if (btn) btn.disabled = false; });
      });
    });
  }
  function setStatus(el, cls, msg) { if (!el) return; el.className = "form-status " + cls; el.textContent = msg; }
  function validate(scope) {
    var ok = true;
    $$("input,select,textarea", scope).forEach(function (i) {
      if (!i.checkValidity()) { ok = false; i.style.borderColor = "var(--danger)"; }
      else i.style.borderColor = "";
    });
    if (!ok) { var first = $$("input:invalid,select:invalid,textarea:invalid", scope)[0]; if (first) first.focus(); }
    return ok;
  }

  /* Multi-step forms: .step blocks, [data-next] / [data-prev] buttons, .steps progress */
  function bindSteps() {
    $$("form[data-steps]").forEach(function (form) {
      var steps = $$(".step", form), bar = $(".steps", form);
      if (bar) bar.innerHTML = steps.map(function () { return "<i></i>"; }).join("");
      function show(n) {
        steps.forEach(function (s, i) { s.classList.toggle("active", i === n); });
        if (bar) $$("i", bar).forEach(function (b, i) { b.classList.toggle("on", i <= n); });
        form.dataset.cur = n;
      }
      form.addEventListener("click", function (e) {
        var n = +form.dataset.cur || 0;
        if (e.target.matches("[data-next]")) { e.preventDefault(); if (validate(steps[n])) show(Math.min(n + 1, steps.length - 1)); }
        if (e.target.matches("[data-prev]")) { e.preventDefault(); show(Math.max(n - 1, 0)); }
      });
      form._show = show; show(0);
    });
  }
  function resetSteps(form) { if (form._show) form._show(0); }

  /* Tabs: [role=tablist] with [role=tab][aria-controls]; supports URL hash */
  function bindTabs() {
    $$("[role=tablist]").forEach(function (list) {
      var tabs = $$("[role=tab]", list);
      function sel(tab) {
        tabs.forEach(function (t) {
          var on = t === tab; t.setAttribute("aria-selected", on);
          var p = document.getElementById(t.getAttribute("aria-controls")); if (p) p.classList.toggle("active", on);
        });
      }
      tabs.forEach(function (t) { t.addEventListener("click", function () { sel(t); history.replaceState(null, "", "#" + t.dataset.hash); }); });
      function fromHash(init) {
        var h = location.hash.slice(1), match = tabs.filter(function (t) { return t.dataset.hash === h; })[0];
        if (match || init) sel(match || tabs[0]);
      }
      fromHash(true);
      window.addEventListener("hashchange", function () { fromHash(false); });
    });
  }

  /* AdSense or house placeholders */
  function ads() {
    var a = S.adsense || {}, slots = $$(".ad-slot");
    if (!a.client) {
      slots.forEach(function (s) {
        s.innerHTML = '<div class="ad-label">Advertisement</div><div class="ad-inner"><span>Your brand here — reach people who care about online safety. <a href="advertise.html">Advertise with us →</a></span></div>';
      });
      return;
    }
    if (store.get("iy-consent") === "deny") return;
    var sc = document.createElement("script");
    sc.async = true; sc.crossOrigin = "anonymous";
    sc.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + a.client;
    document.head.appendChild(sc);
    slots.forEach(function (s) {
      var slot = (a.slots || {})[s.dataset.ad] || "";
      s.innerHTML = '<div class="ad-label">Advertisement</div><ins class="adsbygoogle" style="display:block" data-ad-client="' + a.client + '"' + (slot ? ' data-ad-slot="' + slot + '"' : "") + ' data-ad-format="auto" data-full-width-responsive="true"></ins>';
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }

  function analytics() {
    if (!S.ga4 || store.get("iy-consent") === "deny") return;
    var sc = document.createElement("script"); sc.async = true;
    sc.src = "https://www.googletagmanager.com/gtag/js?id=" + S.ga4; document.head.appendChild(sc);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", S.ga4);
  }

  function cookie() {
    if (store.get("iy-consent")) return;
    var c = document.createElement("div"); c.className = "cookie show"; c.setAttribute("role", "dialog");
    c.innerHTML = "<b>Cookies & ads</b><p class='muted' style='margin:6px 0 0'>We use cookies for analytics and to show ads that keep this site free. See our <a href='privacy.html'>privacy policy</a>.</p><div class='btns'><button class='btn btn-primary btn-sm' data-c='accept'>Accept</button><button class='btn btn-ghost btn-sm' data-c='deny'>Essential only</button></div>";
    document.body.appendChild(c);
    c.addEventListener("click", function (e) {
      var v = e.target.getAttribute("data-c"); if (!v) return;
      store.set("iy-consent", v); c.remove(); if (v === "accept") { analytics(); }
    });
  }

  /* Lite YouTube: [data-yt="VIDEO_ID"] */
  function videos() {
    $$("[data-yt]").forEach(function (v) {
      var id = v.dataset.yt;
      v.innerHTML = '<img loading="lazy" alt="" src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg"><div class="play"><span>▶</span></div>';
      v.setAttribute("role", "button"); v.setAttribute("tabindex", "0"); v.setAttribute("aria-label", "Play video: " + (v.dataset.title || ""));
      function play() { v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="' + (v.dataset.title || "Video") + '"></iframe>'; }
      v.addEventListener("click", play, { once: true });
      v.addEventListener("keydown", function (e) { if (e.key === "Enter") play(); });
    });
  }

  function reveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return;
        x.target.classList.add("in"); io.unobserve(x.target);
        $$("[data-count]", x.target).forEach(count);
      });
    }, { threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  }
  function count(el) {
    if (el._done) return; el._done = 1;
    var end = parseFloat(el.dataset.count), pre = el.dataset.pre || "", suf = el.dataset.suf || "", dec = +(el.dataset.dec || 0), t0 = null;
    function step(t) {
      t0 = t0 || t; var p = Math.min((t - t0) / 1400, 1), v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = pre + v.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* Donation buttons: [data-donate="kofi"] — falls back to pledge form */
  function donate() {
    var d = S.donate || {};
    $$("[data-donate]").forEach(function (b) {
      var url = d[b.dataset.donate];
      if (url) { b.href = url; b.target = "_blank"; b.rel = "noopener"; }
      else { b.href = "#pledge"; }
    });
    $$("[data-aff]").forEach(function (a) {
      var url = (S.affiliate || {})[a.dataset.aff];
      if (url && url !== "#") { a.href = url; a.target = "_blank"; a.rel = "sponsored noopener"; }
      else { a.href = "protect.html"; }
    });
  }

  document.addEventListener("click", function (e) {
    if (e.target.matches("[data-cookie-reset]")) { e.preventDefault(); try { localStorage.removeItem("iy-consent"); } catch (x) {} cookie(); }
  });

  window.IY = { $: $, $$: $$, store: store };
  window.IY_bindForms = bindForms;
  inject(); bindNav(); bindSteps(); bindForms(); bindTabs(); ads(); donate(); videos(); reveal();
  if (store.get("iy-consent") === "accept") analytics();
  cookie();
})();

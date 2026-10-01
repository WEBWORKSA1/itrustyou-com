/* Scam IQ quiz */
(function () {
  "use strict";
  var Q = [
    { m: "From: +1 (213) 555-0148\nUSPS: Your package is pending due to an incomplete address. Update within 12 hrs or it will be returned: https://usps-parcel-redeliver.top/us", a: "scam", e: "USPS doesn't text links on its own; the .top domain isn't usps.com and the 12-hour deadline is pressure." },
    { m: "From: Netflix <info@mailer.netflix.com>\nYour sign-in code is 482910. If you didn't request this, you can ignore this email.", a: "legit", e: "A code you requested, from a netflix.com sub-domain, that asks for nothing. Legit — but never read that code to anyone who calls you." },
    { m: "Hi Mum, this is my new number, my phone broke 😩 can you message me on WhatsApp? I need to pay a bill urgently today.", a: "scam", e: "Classic 'Hi Mum' scam: new number, can't call, urgent bill. Call your child on their old number." },
    { m: "Amazon Security: A purchase of iPhone 16 Pro ($1,249.00) was made. If this wasn't you, call 1-888-555-0199 immediately.", a: "scam", e: "Callback phishing. The number connects you to scammers who will ask for remote access. Check orders in the official app." },
    { m: "From: HR <careers@yourcompany.com>\nReminder: open enrolment for benefits closes Friday. Log in through the usual HR portal from the intranet.", a: "legit", e: "No link, no urgency beyond a normal deadline, and it tells you to use the usual portal yourself." },
    { m: "Congratulations! You've been selected for a remote job: like YouTube videos, earn $50–$300/day. No experience. Contact our HR on Telegram: @hr_jessica_recruit", a: "scam", e: "Task scam. Real jobs don't pay to like videos, and recruiters don't hire over Telegram." },
    { m: "Bank Fraud Team: we detected unusual activity. To secure your funds, transfer your balance to this protected account. Don't tell branch staff — they may be involved.", a: "scam", e: "'Safe account' + secrecy = scam every time. Banks never ask you to move money to protect it." },
    { m: "E-ZPass: You have an unpaid toll of $4.15. Avoid a $50 late fee — pay now: ezpass-tolls.com-pay.info", a: "scam", e: "Look closely: the real domain is com-pay.info. Toll agencies don't collect via texted links." },
    { m: "Your Google Account: New sign-in on Windows. If this was you, you don't need to do anything. If not, we'll help you secure your account. — Check activity in your Google Account settings.", a: "legit", e: "Matches Google's real security alert format and directs you to your account settings rather than a strange link." },
    { m: "Hi! I'm Olivia, an investment advisor. I made 380% in 2 months with this AI crypto platform. Here's my referral code — minimum deposit only $500 💎", a: "scam", e: "Guaranteed huge returns from a stranger = pig-butchering investment scam." }
  ];
  var el = document.getElementById("quiz"); if (!el) return;
  var i = 0, score = 0;
  function q() {
    var it = Q[i];
    el.innerHTML = '<div class="steps">' + Q.map(function (_, k) { return '<i class="' + (k <= i ? "on" : "") + '"></i>'; }).join("") + '</div><div class="muted">Question ' + (i + 1) + " of " + Q.length + '</div><p class="quiz-q mt-2">Scam or legit?</p><div class="quiz-msg">' + it.m.replace(/</g, "&lt;") + '</div><div class="quiz-opts"><button class="btn btn-ghost btn-lg" data-v="scam">🚩 Scam</button><button class="btn btn-ghost btn-lg" data-v="legit">✅ Legit</button></div><div class="explain" id="ex"></div>';
    el.querySelectorAll("[data-v]").forEach(function (b) {
      b.addEventListener("click", function () {
        var right = b.dataset.v === it.a; if (right) score++;
        el.querySelectorAll("[data-v]").forEach(function (x) { x.disabled = true; if (x.dataset.v === it.a) x.classList.add("right"); else if (x === b) x.classList.add("wrong"); });
        var ex = document.getElementById("ex"); ex.style.display = "block";
        ex.innerHTML = "<b>" + (right ? "✔ Correct!" : "✖ Not quite.") + "</b> " + it.e + '<div class="mt-2"><button class="btn btn-primary" id="nx">' + (i < Q.length - 1 ? "Next →" : "See my score") + "</button></div>";
        document.getElementById("nx").addEventListener("click", function () { i++; i < Q.length ? q() : done(); });
      });
    });
  }
  function done() {
    var lvl = score >= 9 ? "Scam-proof 🛡️" : score >= 7 ? "Sharp-eyed 👀" : score >= 5 ? "Getting there 📚" : "At risk ⚠️";
    var share = "I scored " + score + "/10 on the ITrustYou Scam IQ Challenge. Can you beat me?";
    var url = location.href.split("#")[0];
    el.innerHTML = '<div class="center"><div class="score" style="color:var(--brand)">' + score + '/10</div><h2 class="mt-2">' + lvl + '</h2><p class="muted">' + (score >= 8 ? "Excellent! You qualify for this month's Scam Spotter contest." : "Review the scam library and try again — then share it with someone you care about.") + '</p><div class="pill-list" style="justify-content:center"><a class="btn btn-primary" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(share + " " + url) + '">Share on WhatsApp</a><a class="btn btn-ghost" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(share) + "&url=" + encodeURIComponent(url) + '">Share on X</a><a class="btn btn-ghost" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '">Share on Facebook</a><button class="btn btn-ghost" id="again">Retake</button></div></div>' +
      '<hr style="border:0;border-top:1px solid var(--border);margin:28px 0"><h3>Enter the monthly Scam Spotter contest</h3><form class="form" data-form="Quiz contest entry" data-success="✓ You\'re entered! Winners are announced on the Contests page."><input type="hidden" name="quiz_score" value="' + score + '/10"><div class="row"><div><label for="qn">Name</label><input id="qn" name="name" required></div><div><label for="qe">Email</label><input id="qe" name="email" type="email" required></div></div><label class="check"><input type="checkbox" name="newsletter" value="yes" checked> Send me the weekly Scam Alert</label><label class="check"><input type="checkbox" name="consent" value="yes" required> I accept the <a href="contests.html#rules">contest rules</a> and <a href="privacy.html">privacy policy</a>.</label><input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off"><button class="btn btn-primary">Enter contest</button><div class="form-status" role="status"></div></form>';
    document.getElementById("again").addEventListener("click", function () { i = 0; score = 0; q(); });
    if (window.IY_bindForms) window.IY_bindForms();
    if (window.gtag) gtag("event", "quiz_complete", { score: score });
  }
  q();
})();

/* Prime Resources Private — gate + login
   Login password: 1111
*/
(function () {
  var LOGIN_PASSWORD = "WANTUSAWAN";
  var COUNTDOWN_SECS = 6;

  var screenEntry = document.getElementById("screenEntry");
  var serverLock = document.getElementById("serverLock");
  var mainContent = document.getElementById("mainContent");
  var btnEnterGate = document.getElementById("btnEnterGate");
  var passwordInput = document.getElementById("serverPassword");
  var enterBtn = document.getElementById("enterBtn");
  var lockError = document.getElementById("lockError");
  var lockTogglePw = document.getElementById("lockTogglePw");
  var countNum = document.getElementById("countNum");
  var lockCountdown = document.getElementById("lockCountdown");
  var scanStatus = document.getElementById("scanStatus");

  var canEnter = false;
  var remaining = COUNTDOWN_SECS;

  // Screen 1 → Screen 2
  btnEnterGate && btnEnterGate.addEventListener("click", function () {
    if (screenEntry) screenEntry.style.display = "none";
    if (serverLock) serverLock.style.display = "flex";
    startCountdown();
    startScan();
  });

  function startCountdown() {
    canEnter = false;
    remaining = COUNTDOWN_SECS;
    if (enterBtn) {
      enterBtn.disabled = true;
      enterBtn.textContent = "ENTER SERVER";
    }
    if (lockCountdown) lockCountdown.style.display = "block";
    if (countNum) countNum.textContent = String(remaining);

    var t = setInterval(function () {
      remaining--;
      if (countNum) countNum.textContent = String(Math.max(0, remaining));
      if (remaining <= 0) {
        clearInterval(t);
        canEnter = true;
        if (enterBtn) enterBtn.disabled = false;
        if (lockCountdown) {
          lockCountdown.textContent = "Ready — enter password to proceed.";
        }
      }
    }, 1000);
  }

  var scanTimer = null;
  function startScan() {
    var dots = 0;
    if (scanTimer) clearInterval(scanTimer);
    scanTimer = setInterval(function () {
      dots = (dots % 3) + 1;
      if (scanStatus) scanStatus.textContent = "Anti-Cheat Scanning" + ".".repeat(dots);
    }, 500);
  }

  function tryLogin() {
    if (!canEnter) return;
    var entered = (passwordInput && passwordInput.value || "").trim();
    if (entered !== LOGIN_PASSWORD) {
      if (lockError) {
        lockError.style.display = "block";
        setTimeout(function () { lockError.style.display = "none"; }, 2500);
      }
      if (passwordInput) {
        passwordInput.focus();
        passwordInput.select();
      }
      return;
    }
    if (serverLock) serverLock.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
    if (scanTimer) clearInterval(scanTimer);
    try {
      sessionStorage.setItem("pb_pkg_authed", "1");
    } catch (e) {}
  }

  enterBtn && enterBtn.addEventListener("click", tryLogin);
  passwordInput && passwordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      tryLogin();
    }
  });

  lockTogglePw && lockTogglePw.addEventListener("click", function () {
    if (!passwordInput) return;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.textContent = "🙈";
    } else {
      passwordInput.type = "password";
      this.textContent = "👁";
    }
  });

  // Resume if already authed this session
  try {
    if (sessionStorage.getItem("pb_pkg_authed") === "1") {
      if (screenEntry) screenEntry.style.display = "none";
      if (serverLock) serverLock.style.display = "none";
      if (mainContent) mainContent.style.display = "block";
    }
  } catch (e) {}

  // Light anti-devtools (optional)
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && "ijc".indexOf(e.key.toLowerCase()) >= 0)) {
      e.preventDefault();
    }
  });
})();

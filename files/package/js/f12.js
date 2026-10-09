/* Prime Resources Private — gate + login
   Credentials: Username Primeadmin / Password Primeadmin
   Session uses sessionStorage → cleared when the tab/window is closed.
   Refresh keeps the session; closing the package page forces re-login.
*/
(function () {
  var LOGIN_USER = "Primeadmin";
  var LOGIN_PASSWORD = "Primeadmin";
  var AUTH_KEY = "pb_pkg_authed";
  var COUNTDOWN_SECS = 6;

  var screenEntry = document.getElementById("screenEntry");
  var serverLock = document.getElementById("serverLock");
  var mainContent = document.getElementById("mainContent");
  var btnEnterGate = document.getElementById("btnEnterGate");
  var usernameInput = document.getElementById("serverUsername");
  var passwordInput = document.getElementById("serverPassword");
  var enterBtn = document.getElementById("enterBtn");
  var lockError = document.getElementById("lockError");
  var lockTogglePw = document.getElementById("lockTogglePw");
  var countNum = document.getElementById("countNum");
  var lockCountdown = document.getElementById("lockCountdown");
  var scanStatus = document.getElementById("scanStatus");
  var lockStatus = document.getElementById("lockStatus");
  var pkgLogoutBtn = document.getElementById("pkgLogoutBtn");

  var canEnter = false;
  var remaining = COUNTDOWN_SECS;
  var loggingIn = false;

  function clearAuth() {
    try { sessionStorage.removeItem(AUTH_KEY); } catch (e) {}
  }

  function setAuth() {
    try {
      sessionStorage.setItem(AUTH_KEY, JSON.stringify({
        ok: true,
        user: LOGIN_USER,
        ts: Date.now()
      }));
    } catch (e) {}
  }

  function isAuthed() {
    try {
      var raw = sessionStorage.getItem(AUTH_KEY);
      if (!raw) return false;
      // Support both old "1" value and new JSON
      if (raw === "1") return true;
      var data = JSON.parse(raw);
      return !!(data && data.ok === true);
    } catch (e) {
      return false;
    }
  }

  function showMain() {
    if (screenEntry) screenEntry.style.display = "none";
    if (serverLock) serverLock.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
  }

  function showLogin() {
    if (screenEntry) screenEntry.style.display = "none";
    if (mainContent) mainContent.style.display = "none";
    if (serverLock) serverLock.style.display = "flex";
    startCountdown();
    startScan();
    if (usernameInput) setTimeout(function () { usernameInput.focus(); }, 80);
  }

  // Screen 1 → Screen 2
  btnEnterGate && btnEnterGate.addEventListener("click", function () {
    showLogin();
  });

  function startCountdown() {
    canEnter = false;
    remaining = COUNTDOWN_SECS;
    if (enterBtn) {
      enterBtn.disabled = true;
      enterBtn.textContent = "ENTER SERVER";
    }
    if (lockCountdown) {
      lockCountdown.style.display = "block";
      lockCountdown.innerHTML = 'Wait <span id="countNum">' + remaining + "</span>s to activate…";
    }
    if (lockStatus) lockStatus.textContent = "";

    var t = setInterval(function () {
      remaining--;
      var el = document.getElementById("countNum");
      if (el) el.textContent = String(Math.max(0, remaining));
      if (remaining <= 0) {
        clearInterval(t);
        canEnter = true;
        if (enterBtn) enterBtn.disabled = false;
        if (lockCountdown) {
          lockCountdown.textContent = "Ready — enter credentials to proceed.";
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

  function showError(msg) {
    if (lockError) {
      lockError.textContent = msg || "Incorrect username or password. Access denied.";
      lockError.style.display = "block";
      setTimeout(function () { lockError.style.display = "none"; }, 2800);
    }
    if (lockStatus) lockStatus.textContent = "Access denied.";
  }

  function tryLogin() {
    if (!canEnter || loggingIn) return;
    var user = (usernameInput && usernameInput.value || "").trim();
    var pass = (passwordInput && passwordInput.value || "").trim();

    if (!user || !pass) {
      showError("Please enter both username and password.");
      return;
    }

    loggingIn = true;
    if (enterBtn) {
      enterBtn.disabled = true;
      enterBtn.textContent = "VERIFYING…";
    }
    if (lockStatus) lockStatus.textContent = "Authenticating…";

    // Short loading feedback
    setTimeout(function () {
      if (user !== LOGIN_USER || pass !== LOGIN_PASSWORD) {
        loggingIn = false;
        showError("Incorrect username or password. Access denied.");
        if (enterBtn) {
          enterBtn.disabled = false;
          enterBtn.textContent = "ENTER SERVER";
        }
        if (passwordInput) {
          passwordInput.focus();
          passwordInput.select();
        }
        return;
      }

      // Success
      if (lockStatus) lockStatus.textContent = "Access granted.";
      if (enterBtn) enterBtn.textContent = "SUCCESS";
      setAuth();
      if (scanTimer) clearInterval(scanTimer);
      setTimeout(function () {
        loggingIn = false;
        showMain();
      }, 320);
    }, 450);
  }

  enterBtn && enterBtn.addEventListener("click", tryLogin);
  passwordInput && passwordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      tryLogin();
    }
  });
  usernameInput && usernameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (passwordInput) passwordInput.focus();
    }
  });

  // Show / hide password
  lockTogglePw && lockTogglePw.addEventListener("click", function () {
    if (!passwordInput) return;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.textContent = "🙈";
      this.setAttribute("aria-label", "Hide password");
    } else {
      passwordInput.type = "password";
      this.textContent = "👁";
      this.setAttribute("aria-label", "Show password");
    }
  });

  // Manual logout
  function doLogout() {
    if (!confirm("Are you sure you want to log out?")) return;
    clearAuth();
    if (mainContent) mainContent.style.display = "none";
    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";
    // Return to entry card so user can go through the gate again
    if (serverLock) serverLock.style.display = "none";
    if (screenEntry) screenEntry.style.display = "flex";
  }

  pkgLogoutBtn && pkgLogoutBtn.addEventListener("click", doLogout);

  // Resume if already authed this browser session (survives refresh, dies on tab close)
  try {
    if (isAuthed()) {
      showMain();
    }
  } catch (e) {}

  // pagehide: sessionStorage already clears when the tab closes.
  // We do NOT clear on pagehide so refresh keeps the user logged in.
  window.addEventListener("pagehide", function () {
    // Intentionally empty — sessionStorage handles tab-close logout.
  });

  // Light anti-devtools (optional, kept from original)
  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && "ijc".indexOf(e.key.toLowerCase()) >= 0)) {
      e.preventDefault();
    }
  });
})();

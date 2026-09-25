/* Prime Resources Private — download modal + per-file passwords
   CFPT: 1107 | Resource 1101: 1101 | Resource 1105: 1105
*/
(function () {
  var modal = document.getElementById("dlModal");
  var modalClose = document.getElementById("modalClose");
  var modalTitle = document.getElementById("modalTitle");
  var modalSub = document.getElementById("modalSub");
  var progressLabel = document.getElementById("progressLabel");
  var progressPct = document.getElementById("progressPct");
  var progressFill = document.getElementById("progressFill");
  var modalReady = document.getElementById("modalReady");
  var btnProceed = document.getElementById("btnProceed");
  var filePassword = document.getElementById("filePassword");
  var fileTogglePw = document.getElementById("fileTogglePw");
  var btnConfirmPw = document.getElementById("btnConfirmPw");
  var filePwError = document.getElementById("filePwError");

  var current = null; // { file, password, name }
  var progressDone = false;
  var unlocked = false;
  var progressTimer = null;

  function openModal(meta) {
    current = meta;
    progressDone = false;
    unlocked = false;
    if (filePassword) filePassword.value = "";
    if (filePwError) filePwError.style.display = "none";
    if (modalReady) modalReady.style.display = "none";
    if (btnProceed) btnProceed.style.display = "none";
    if (progressFill) progressFill.style.width = "0%";
    if (progressPct) progressPct.textContent = "0%";
    if (progressLabel) progressLabel.textContent = "Initializing…";
    if (modalTitle) modalTitle.textContent = "Preparing Download…";
    if (modalSub) modalSub.textContent = "Verifying authorization…";
    if (modal) modal.style.display = "flex";
    runProgress();
  }

  function closeModal() {
    if (progressTimer) clearInterval(progressTimer);
    if (modal) modal.style.display = "none";
    current = null;
  }

  function runProgress() {
    var pct = 0;
    var steps = [
      { at: 15, label: "Checking access…" },
      { at: 40, label: "Verifying package…" },
      { at: 70, label: "Preparing secure link…" },
      { at: 100, label: "Ready to proceed" }
    ];
    if (progressTimer) clearInterval(progressTimer);
    progressTimer = setInterval(function () {
      pct += 4;
      if (pct > 100) pct = 100;
      if (progressFill) progressFill.style.width = pct + "%";
      if (progressPct) progressPct.textContent = pct + "%";
      for (var i = 0; i < steps.length; i++) {
        if (pct >= steps[i].at) {
          if (progressLabel) progressLabel.textContent = steps[i].label;
        }
      }
      if (pct >= 100) {
        clearInterval(progressTimer);
        progressDone = true;
        if (modalTitle) modalTitle.textContent = "Ready";
        if (modalSub) modalSub.textContent = (current && current.name ? current.name + " — " : "") + "authorization verified";
        if (modalReady) modalReady.style.display = "block";
        if (btnProceed) btnProceed.style.display = "inline-flex";
      }
    }, 50);
  }

  function startDownload() {
    if (!current || !current.file) return;
    var a = document.createElement("a");
    a.href = current.file;
    a.download = current.file.split("/").pop() || "download.rar";
    document.body.appendChild(a);
    a.click();
    a.remove();
    closeModal();
  }

  // Bind download buttons
  document.querySelectorAll(".btn-download").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".file-card");
      if (!card) return;
      openModal({
        id: card.getAttribute("data-id"),
        file: card.getAttribute("data-file"),
        password: card.getAttribute("data-password"),
        name: card.getAttribute("data-name") || "File"
      });
    });
  });

  btnProceed && btnProceed.addEventListener("click", function () {
    // Show password focus
    if (filePassword) filePassword.focus();
  });

  function confirmFilePassword() {
    if (!current || !progressDone) return;
    var entered = (filePassword && filePassword.value || "").trim();
    if (entered !== String(current.password || "")) {
      if (filePwError) {
        filePwError.style.display = "block";
        setTimeout(function () { filePwError.style.display = "none"; }, 2500);
      }
      return;
    }
    unlocked = true;
    startDownload();
  }

  btnConfirmPw && btnConfirmPw.addEventListener("click", confirmFilePassword);
  filePassword && filePassword.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      confirmFilePassword();
    }
  });

  fileTogglePw && fileTogglePw.addEventListener("click", function () {
    if (!filePassword) return;
    if (filePassword.type === "password") {
      filePassword.type = "text";
      this.textContent = "🙈";
    } else {
      filePassword.type = "password";
      this.textContent = "👁";
    }
  });

  modalClose && modalClose.addEventListener("click", closeModal);
  modal && modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
})();

/* =========================================================
   PRIME BLOG — MAINTENANCE MODE
   - Master switch ON/OFF
   - No password / no bypass
   - Allowlist for maintenance page + assets only
   ========================================================= */

(() => {
  // ✅ MASTER SWITCH — true = site under maintenance
  const MAINTENANCE_ON = false;

  // Optional end time for countdown (null = hide countdown)
  // Example: "2026-09-28T18:00:00+08:00"
  const MAINTENANCE_END_ISO = "2026-09-25T23:59:00+08:00";

  // Pages always allowed during maintenance
  const ALLOWLIST = [
    "/maintenance.html"
  ];

  // Asset folders always allowed
  const ALLOW_FOLDERS = [
    "/css/",
    "/js/",
    "/images/",
    "/files/",
    "/sounds/"
  ];

  const MAINTENANCE_PAGE = "maintenance.html";

  const stripQSHash = (s) => (s || "").split("?")[0].split("#")[0];
  const path = stripQSHash(window.location.pathname);
  const currentPath = path.endsWith("/") ? path + "index.html" : path;
  const baseDir = currentPath.substring(0, currentPath.lastIndexOf("/") + 1);

  const isAllowedByPage = () =>
    ALLOWLIST.some((p) => currentPath.endsWith(p) || path.endsWith(p));

  const isAllowedByFolder = () =>
    ALLOW_FOLDERS.some((folder) => currentPath.includes(folder) || path.includes(folder));

  const allowed = isAllowedByPage() || isAllowedByFolder();

  if (MAINTENANCE_ON && !allowed) {
    window.location.replace(baseDir + MAINTENANCE_PAGE);
    return;
  }

  // Public info for maintenance.html (no bypass API)
  window.LU_MAINT = {
    on: MAINTENANCE_ON,
    endISO: MAINTENANCE_END_ISO
  };
})();

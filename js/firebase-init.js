(function () {
  var cfg = window.PB_FIREBASE && window.PB_FIREBASE.config;
  if (!cfg || !window.firebase) return;
  if (!firebase.apps.length) firebase.initializeApp(cfg);
})();

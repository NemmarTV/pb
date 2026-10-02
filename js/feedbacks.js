(function () {
  function db() { return firebase.firestore(); }
  window.PB_FEEDBACK = {
    async like(pageId) {
      pageId = pageId || "home";
      var key = "pb_liked_" + pageId;
      if (localStorage.getItem(key)) return { ok: false, reason: "already_liked" };
      var ref = db().collection("likes").doc(pageId);
      await db().runTransaction(async function (tx) {
        var snap = await tx.get(ref);
        var count = snap.exists ? (snap.data().count || 0) : 0;
        tx.set(ref, { count: count + 1, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
      });
      localStorage.setItem(key, "1");
      return { ok: true };
    },
    async getLikes(pageId) {
      pageId = pageId || "home";
      var snap = await db().collection("likes").doc(pageId).get();
      return snap.exists ? (snap.data().count || 0) : 0;
    },
    async sendFeedback(name, message, page) {
      name = (name || "").trim().slice(0, 80);
      message = (message || "").trim().slice(0, 1000);
      if (!message) throw new Error("Message required");
      await db().collection("feedbacks").add({
        name: name || "Anonymous", message: message, page: page || location.pathname,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { ok: true };
    },
    async listFeedbacks(limit) {
      var snap = await db().collection("feedbacks").orderBy("createdAt", "desc").limit(limit || 20).get();
      return snap.docs.map(function (d) {
        var x = d.data();
        return { id: d.id, name: x.name, message: x.message, page: x.page, createdAt: x.createdAt };
      });
    }
  };
})();

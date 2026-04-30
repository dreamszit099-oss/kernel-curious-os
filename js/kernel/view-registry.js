/**
 * K.E.R.N.E.L. View Registry
 * Centraliza TODAS las vistas del sistema
 */

(function () {
  if (!window.KernelRouter) {
    console.warn("[REGISTRY] Router not found");
    return;
  }

  const register = (name, renderer) => {
    window.KernelRouter.registerView(name, renderer);
  };

  // =========================
  // CORE VIEWS
  // =========================

  register("dashboard", () => {
    const div = document.createElement("div");
    div.innerHTML = "<h2>🏠 Dashboard</h2>";
    return div;
  });

  register("ai", () => {
    const div = document.createElement("div");
    div.innerHTML = "<h2>🤖 AI Helper</h2><p>Offline assistant ready.</p>";
    return div;
  });

  register("support", () => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>☕ Support</h2>
      <p>This project runs on limited resources.</p>
    `;
    return div;
  });

})();

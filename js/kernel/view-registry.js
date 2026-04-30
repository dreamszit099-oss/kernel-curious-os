/**
 * K.E.R.N.E.L. View Registry (Base)
 */

(function () {
  const r = window.KernelRouter;

  if (!r) return;

  const createView = (title, text) => {
    const div = document.createElement("div");
    div.style.padding = "20px";
    div.innerHTML = `<h2>${title}</h2><p>${text}</p>`;
    return div;
  };

  r.registerView("dashboard", () => {
    if (window.DashboardView?.loader) {
      const container = document.createElement("div");
      window.DashboardView.loader(container);
      return container;
    }
    return createView("Dashboard", "Loading...");
  });

  r.registerView("games", () =>
    createView("🎮 Games", "Educational games coming soon.")
  );

  r.registerView("ai", () =>
    createView("🤖 AI Helper", "Offline assistant ready.")
  );

  r.registerView("support", () =>
    createView("☕ Support", "Built with limited resources.")
  );

})();

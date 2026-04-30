/**
 * K.E.R.N.E.L. View Router (Refactored - OS Stable Version)
 * Single-root, DOM-safe, modular rendering system
 */

const KernelRouter = (() => {
  let currentView = "dashboard";
  const viewMap = new Map();

  // 🔧 ROOT FIXED MOUNT POINT
  const getRoot = () => document.getElementById("app");

  // =========================
  // REGISTER VIEW
  // =========================
  const registerView = (name, renderer, loader) => {
    viewMap.set(name, { renderer, loader });
  };

  // =========================
  // MAIN RENDER ENGINE
  // =========================
  const render = async (viewName) => {
    const view = viewMap.get(viewName);

    if (!view) {
      console.error(`[ROUTER] View not registered: ${viewName}`);
      return;
    }

    const root = getRoot();

    if (!root) {
      console.error("[ROUTER] #app root container not found");
      return;
    }

    // 🧹 CLEAR ENTIRE APP (OS STYLE)
    root.innerHTML = "";

    try {
      // ⚙️ LOAD DATA / PREP (optional)
      if (typeof view.loader === "function") {
        await view.loader();
      }

      // 🖥️ RENDER VIEW
      if (typeof view.renderer === "function") {
        const ui = view.renderer();

        // renderer can return DOM node or HTML string
        if (ui instanceof HTMLElement) {
          root.appendChild(ui);
        } else if (typeof ui === "string") {
          root.innerHTML = ui;
        }
      }

      currentView = viewName;
      updateSidebar();

      console.log(`[ROUTER] View loaded: ${viewName}`);
    } catch (err) {
      console.error("[ROUTER] Render error:", err);
    }
  };

  // =========================
  // SIDEBAR STATE UPDATE
  // =========================
  const updateSidebar = () => {
    const items = document.querySelectorAll(".sidebar-item");

    if (!items.length) return;

    items.forEach((item) => {
      const view = item.dataset.view;

      if (view === currentView) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // =========================
  // PUBLIC API
  // =========================
  return {
    registerView,
    render,
    getCurrentView: () => currentView,
  };
})();

// expose globally (important for modules)
window.KernelRouter = KernelRouter;

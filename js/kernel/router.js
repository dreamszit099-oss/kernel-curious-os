/**
 * K.E.R.N.E.L. Router (Stable v2)
 */

const KernelRouter = (() => {
  let currentView = null;
  const views = new Map();

  const getContainer = () => {
    let el = document.getElementById("kernel-view");

    if (!el) {
      el = document.createElement("div");
      el.id = "kernel-view";
      document.getElementById("app")?.appendChild(el);
    }

    return el;
  };

  const registerView = (name, renderer) => {
    views.set(name, renderer);
  };

  const render = async (name) => {
    if (!views.has(name)) {
      console.warn(`[ROUTER] View not registered: ${name}`);
      return;
    }

    const container = getContainer();
    const renderer = views.get(name);

    if (!container) {
      console.error("[ROUTER] Container not found");
      return;
    }

    try {
      container.innerHTML = "";

      const view = await renderer();
      if (view) container.appendChild(view);

      currentView = name;
      console.log(`[ROUTER] View loaded: ${name}`);

    } catch (err) {
      console.error("[ROUTER] Render error:", err);
    }
  };

  return {
    registerView,
    render,
    getCurrentView: () => currentView
  };
})();

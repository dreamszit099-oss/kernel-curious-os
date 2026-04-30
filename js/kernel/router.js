/**
 * K.E.R.N.E.L. View Router
 * Simple, lightweight internal navigation system
 */

const KernelRouter = (() => {
  let currentView = 'dashboard';
  const viewMap = new Map();

  const registerView = (name, renderer, loader) => {
    viewMap.set(name, { renderer, loader });
  };

  const render = async (viewName) => {
    if (!viewMap.has(viewName)) {
      console.error(`[ROUTER] View "${viewName}" not registered`);
      return;
    }

    const view = viewMap.get(viewName);
    const container = document.querySelector('.content-body');
    const header = document.querySelector('.content-header h2');

    // Hide all views
    document.querySelectorAll('.view-container').forEach(el => {
      el.classList.remove('active');
    });

    // Load data if needed
    if (view.loader) {
      await view.loader();
    }

    // Render new view
    const viewContainer = document.getElementById(`view-${viewName}`);
    if (viewContainer) {
      viewContainer.classList.add('active');
      if (header) header.textContent = viewName.toUpperCase();
      currentView = viewName;
      updateSidebarActive();
    }
  };

  const updateSidebarActive = () => {
    document.querySelectorAll('.sidebar-item').forEach(item => {
      if (item.dataset.view === currentView) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  return {
    registerView,
    render,
    getCurrentView: () => currentView,
  };
})();

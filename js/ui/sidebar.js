/**
 * K.E.R.N.E.L. Sidebar Component
 * Navigation menu for system views
 */

const SidebarUI = (() => {
  const render = () => {
    const mainUI = document.getElementById('main-ui');
    
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
      <div class="sidebar-title">K.E.R.N.E.L EDU</div>
      <div style="font-size: 10px; color: var(--text-secondary); margin-bottom: 16px; text-transform: uppercase;">Operating System</div>
      <div class="sidebar-menu">
        <button class="sidebar-item active" data-view="dashboard">Dashboard</button>
        <button class="sidebar-item" data-view="wiki">Wiki</button>
        <button class="sidebar-item" data-view="ai">AI Assistant</button>
        <button class="sidebar-item" data-view="education">Education</button>
        <button class="sidebar-item" data-view="terminal">Terminal</button>
      </div>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); font-size: 10px; color: var(--text-secondary);">
        <div id="kiosk-status" style="margin-bottom: 8px;">MODE: STUDENT</div>
        <div style="font-size: 9px;">Offline Mode</div>
      </div>
    `;

    const contentWrapper = document.createElement('div');
    contentWrapper.style.flex = '1';
    contentWrapper.style.display = 'flex';
    contentWrapper.style.flexDirection = 'column';
    contentWrapper.innerHTML = `
      <div class="content-header"><h2>Dashboard</h2></div>
      <div class="content-body"></div>
      <div class="footer">MIT License | K.E.R.N.E.L. EDU OS v0.2.0 | Offline-First Educational OS</div>
    `;

    mainUI.innerHTML = '';
    mainUI.appendChild(sidebar);
    mainUI.appendChild(contentWrapper);

    // Add event listeners
    document.querySelectorAll('.sidebar-item').forEach((item) => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        if (KioskMode.canAccessView(view)) {
          KernelRouter.render(view);
        } else {
          console.warn(`[KIOSK] Access denied to view: ${view}`);
        }
      });
    });

    // Update kiosk status
    const updateKioskStatus = () => {
      const modeInfo = KioskMode.getModeInfo();
      const statusEl = document.getElementById('kiosk-status');
      if (statusEl) {
        statusEl.textContent = `MODE: ${modeInfo.mode.toUpperCase()}`;
      }
    };

    updateKioskStatus();
  };

  return {
    render,
  };
})();

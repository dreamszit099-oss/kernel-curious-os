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
      <div class="sidebar-title">K.E.R.N.E.L</div>
      <div class="sidebar-menu">
        <button class="sidebar-item active" data-view="dashboard">Dashboard</button>
        <button class="sidebar-item" data-view="terminal">Terminal</button>
        <button class="sidebar-item" data-view="repository">Repository</button>
        <button class="sidebar-item" data-view="sovereignty">Sovereignty</button>
      </div>
    `;

    const contentWrapper = document.createElement('div');
    contentWrapper.style.flex = '1';
    contentWrapper.style.display = 'flex';
    contentWrapper.style.flexDirection = 'column';
    contentWrapper.innerHTML = `
      <div class="content-header"><h2>Dashboard</h2></div>
      <div class="content-body"></div>
      <div class="footer">MIT License | K.E.R.N.E.L. Curious Architecture Layer</div>
    `;

    mainUI.innerHTML = '';
    mainUI.appendChild(sidebar);
    mainUI.appendChild(contentWrapper);

    // Add event listeners
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        KernelRouter.render(view);
      });
    });
  };

  return {
    render,
  };
})();

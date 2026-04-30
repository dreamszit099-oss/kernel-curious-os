/**
 * K.E.R.N.E.L. EDU OS - Sidebar Navigation Component
 * Child-friendly navigation menu
 */

const SidebarUI = (() => {
  const render = () => {
    const mainUI = document.getElementById('main-ui');
    
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
        <div class="sidebar-logo">🧠</div>
        <div>
          <div class="sidebar-title" style="margin: 0;">KERNEL</div>
          <div style="font-size: 10px; color: rgba(255, 215, 0, 0.8); margin: 0;">EDU OS</div>
        </div>
      </div>
      <div class="sidebar-menu">
        <button class="sidebar-item active" data-view="dashboard">🏠 Dashboard</button>
        <button class="sidebar-item" data-view="education">📚 Learn</button>
        <button class="sidebar-item" data-view="games">🎮 Games</button>
        <button class="sidebar-item" data-view="ai">🤖 AI Help</button>
        <button class="sidebar-item" data-view="support">💙 Support</button>
      </div>
    `;

    const contentWrapper = document.createElement('div');
    contentWrapper.style.flex = '1';
    contentWrapper.style.display = 'flex';
    contentWrapper.style.flexDirection = 'column';
    contentWrapper.style.overflow = 'hidden';
    contentWrapper.innerHTML = `
      <div class="content-header">
        <h2 id="page-title">Welcome to K.E.R.N.E.L. EDU OS</h2>
      </div>
      <div class="content-body"></div>
      <div class="footer">🌍 Open-Source Educational OS | Offline-First Learning | For Global Education Access</div>
    `;

    mainUI.innerHTML = '';
    mainUI.appendChild(sidebar);
    mainUI.appendChild(contentWrapper);

    // Add event listeners
    document.querySelectorAll('.sidebar-item').forEach((item) => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        document.querySelectorAll('.sidebar-item').forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
        KernelRouter.render(view);
      });
    });
  };

  return {
    render,
  };
})();

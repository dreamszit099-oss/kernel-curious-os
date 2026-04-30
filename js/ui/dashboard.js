/**
 * K.E.R.N.E.L. Dashboard View
 * System control panel and status overview
 */

const DashboardView = (() => {
  const render = (data) => {
    const html = `
      <div class="view-container active" id="view-dashboard">
        <div class="panel-grid">
          <div class="panel">
            <div class="panel-title">System Status</div>
            <div class="panel-content">
              ${data.systemStatus.map(s => `<div>✓ ${s}</div>`).join('')}
            </div>
          </div>
          <div class="panel">
            <div class="panel-title">Resource Usage</div>
            <div class="panel-content">
              ${data.resources.map(r => `<div>${r.name}: ${r.usage}</div>`).join('')}
            </div>
          </div>
          <div class="panel">
            <div class="panel-title">Kernel Status</div>
            <div class="panel-content">
              <div>Version: ${data.kernelVersion}</div>
              <div>Uptime: ${data.uptime}</div>
            </div>
          </div>
        </div>
        
        <div class="panel-grid">
          <div class="panel">
            <div class="panel-title">Active Projects</div>
            <div class="panel-content" id="projects-list"></div>
          </div>
          <div class="panel">
            <div class="panel-title">Terminal Access</div>
            <div class="panel-content">
              <div>Access the terminal view for direct kernel commands</div>
              <button class="sidebar-item" style="margin-top: 12px; width: 100%;" onclick="KernelRouter.render('terminal')">Open Terminal</button>
            </div>
          </div>
        </div>
      </div>
    `;
    return html;
  };

  const loader = async () => {
    const status = await KernelDataLoader.getStatus();
    const projects = await KernelDataLoader.getProjects();
    
    const contentBody = document.querySelector('.content-body');
    if (!status) {
      contentBody.innerHTML = '<div class="panel"><div class="panel-title">Error</div><div class="panel-content">Unable to load dashboard data</div></div>';
      return;
    }

    contentBody.innerHTML = render(status);

    // Populate projects
    if (projects) {
      const projectsList = document.getElementById('projects-list');
      if (projectsList) {
        projectsList.innerHTML = projects.projects
          .map(p => `<div class="status-badge ${p.status === 'ACTIVE' ? '' : 'inactive'}">${p.name}: ${p.status}</div>`)
          .join('');
      }
    }
  };

  return {
    loader,
  };
})();

KernelRouter.registerView('dashboard', null, DashboardView.loader);

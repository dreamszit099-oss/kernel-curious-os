/**
 * K.E.R.N.E.L. Sovereignty View
 * Digital sovereignty and open-source philosophy
 */

const SovereigntyView = (() => {
  const render = (data) => {
    const html = `
      <div class="view-container active" id="view-sovereignty">
        <div class="panel">
          <div class="panel-title">${data.title}</div>
          <div class="panel-content">${data.mission}</div>
        </div>
        
        <div class="panel-grid" id="sovereignty-items"></div>
      </div>
    `;
    return html;
  };

  const staticData = {
    title: 'Digital Sovereignty',
    mission: 'K.E.R.N.E.L. Curious is built on the principles of digital sovereignty, open-source collaboration, and technological independence. We believe that technology should empower individuals and communities, not lock them into proprietary ecosystems.',
    principles: [
      {
        title: 'Open Source',
        description: 'All code is released under MIT License. Full transparency and community-driven development.'
      },
      {
        title: 'Independence',
        description: 'Zero cloud lock-in. Run locally, on your own infrastructure, or on GitHub Pages.'
      },
      {
        title: 'Low-Resource',
        description: 'Designed for edge devices and legacy hardware. Minimal dependencies, maximum efficiency.'
      },
      {
        title: 'Educational',
        description: 'Built to support learning communities and democratize access to AI infrastructure.'
      }
    ]
  };

  const loader = async () => {
    const contentBody = document.querySelector('.content-body');
    contentBody.innerHTML = render(staticData);

    // Populate principles
    const itemsContainer = document.getElementById('sovereignty-items');
    if (itemsContainer) {
      itemsContainer.innerHTML = staticData.principles
        .map(principle => `
          <div class="panel">
            <div class="panel-title">${principle.title}</div>
            <div class="panel-content">${principle.description}</div>
          </div>
        `)
        .join('');
    }
  };

  return {
    loader,
  };
})();

KernelRouter.registerView('sovereignty', null, SovereigntyView.loader);

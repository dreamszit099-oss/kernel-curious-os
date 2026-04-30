/**
 * K.E.R.N.E.L. Repository View
 * Knowledge base and edge computing resources
 */

const RepositoryView = (() => {
  const render = (data) => {
    const html = `
      <div class="view-container active" id="view-repository">
        <div class="panel">
          <div class="panel-title">Repository Overview</div>
          <div class="panel-content">${data.overview}</div>
        </div>
        
        <div id="knowledge-items"></div>
      </div>
    `;
    return html;
  };

  const loader = async () => {
    const knowledge = await KernelDataLoader.getKnowledge();
    
    const contentBody = document.querySelector('.content-body');
    if (!knowledge) {
      contentBody.innerHTML = '<div class="panel"><div class="panel-title">Error</div><div class="panel-content">Unable to load repository data</div></div>';
      return;
    }

    contentBody.innerHTML = render(knowledge);

    // Populate knowledge items
    const itemsContainer = document.getElementById('knowledge-items');
    if (itemsContainer && knowledge.items) {
      itemsContainer.innerHTML = knowledge.items
        .map(item => `
          <div class="card">
            <div class="card-title">${item.title}</div>
            <div class="card-text">${item.description}</div>
          </div>
        `)
        .join('');
    }
  };

  return {
    loader,
  };
})();

KernelRouter.registerView('repository', null, RepositoryView.loader);

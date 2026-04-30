/**
 * K.E.R.N.E.L. Wiki Mini - Offline Educational Wiki System
 * Local Wikipedia-like knowledge base
 */

const WikiModule = (() => {
  let wikiData = {};
  let currentSearch = '';
  let currentCategory = 'all';

  const categories = ['all', 'science', 'math', 'civic'];

  const loadData = async () => {
    try {
      const [science, math, civic] = await Promise.all([
        KernelDataLoader.load('wiki_science.json'),
        KernelDataLoader.load('wiki_math.json'),
        KernelDataLoader.load('wiki_civic.json'),
      ]);

      wikiData = {
        science: science?.items || [],
        math: math?.items || [],
        civic: civic?.items || [],
      };
      console.log('[WIKI] Data loaded');
    } catch (error) {
      console.error('[WIKI] Error loading data:', error);
    }
  };

  const getAllItems = () => {
    if (currentCategory === 'all') {
      return [...wikiData.science, ...wikiData.math, ...wikiData.civic];
    }
    return wikiData[currentCategory] || [];
  };

  const search = (query) => {
    const items = getAllItems();
    const searchTerm = query.toLowerCase();
    return items.filter(
      (item) =>
        item.topic.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm)
    );
  };

  const getByTopic = (topic) => {
    const items = getAllItems();
    return items.find((item) => item.topic.toLowerCase() === topic.toLowerCase());
  };

  const renderSearchUI = (container) => {
    const html = `
      <div class="view-container active" id="view-wiki">
        <div class="wiki-controls" style="margin-bottom: 16px;">
          <input type="text" id="wiki-search" class="search-input" placeholder="Search wiki topics..." style="width: 100%; padding: 8px 12px; background-color: #000; border: 1px solid var(--border-color); color: var(--text-primary); font-family: var(--font-family); margin-bottom: 12px; border-radius: 2px;" />
          <div class="wiki-categories" style="display: flex; gap: 8px; margin-bottom: 12px;">
            ${categories.map(
              (cat) => `
              <button class="category-btn ${cat === currentCategory ? 'active' : ''}" data-category="${cat}" style="padding: 6px 12px; background-color: ${cat === currentCategory ? 'rgba(34, 197, 94, 0.3)' : 'transparent'}; border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer; font-family: var(--font-family); font-size: 11px; text-transform: uppercase; border-radius: 2px;">${cat}</button>
            `
            ).join('')}
          </div>
        </div>
        <div id="wiki-results" style="display: grid; gap: 12px;"></div>
      </div>
    `;
    container.innerHTML = html;

    // Attach event listeners
    document.getElementById('wiki-search').addEventListener('input', (e) => {
      currentSearch = e.target.value;
      updateWikiResults();
    });

    document.querySelectorAll('.category-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        currentCategory = e.target.dataset.category;
        document.querySelectorAll('.category-btn').forEach((b) => {
          b.classList.toggle('active', b === e.target);
          b.style.backgroundColor = b === e.target ? 'rgba(34, 197, 94, 0.3)' : 'transparent';
        });
        updateWikiResults();
      });
    });
  };

  const updateWikiResults = () => {
    const resultsContainer = document.getElementById('wiki-results');
    if (!resultsContainer) return;

    let results;
    if (currentSearch) {
      results = search(currentSearch);
    } else {
      results = getAllItems();
    }

    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="panel"><div class="panel-content">No results found. Try a different search.</div></div>';
      return;
    }

    resultsContainer.innerHTML = results
      .map(
        (item) => `
        <div class="card">
          <div class="card-title">${item.topic}</div>
          <div class="card-text">${item.content}</div>
          <div style="margin-top: 8px; font-size: 10px; color: var(--text-secondary);">
            <span class="status-badge">${item.level || 'general'}</span>
          </div>
        </div>
      `
      )
      .join('');
  };

  const loader = async () => {
    await loadData();
    const contentBody = document.querySelector('.content-body');
    renderSearchUI(contentBody);
    updateWikiResults();
  };

  return {
    loader,
    search,
    getByTopic,
    getAllItems,
  };
})();

KernelRouter.registerView('wiki', null, WikiModule.loader);

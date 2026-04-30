/**
 * K.E.R.N.E.L. Education Module
 * Structured educational content for students
 */

const EducationModule = (() => {
  let educationData = {};
  let currentLevel = 'basic'; // basic | intermediate | advanced

  const loadData = async () => {
    try {
      const data = await KernelDataLoader.load('education.json');
      educationData = data || {};
      console.log('[EDUCATION] Data loaded');
    } catch (error) {
      console.error('[EDUCATION] Error loading data:', error);
    }
  };

  const renderEducation = (container) => {
    const html = `
      <div class="view-container active" id="view-education">
        <div class="panel" style="margin-bottom: 16px;">
          <div class="panel-title">Educational Resources</div>
          <div class="panel-content">Explore structured learning materials for different subjects.</div>
        </div>
        
        <div style="margin-bottom: 16px;">
          <div style="font-size: 12px; text-transform: uppercase; color: var(--text-accent); margin-bottom: 8px;">Difficulty Level</div>
          <div style="display: flex; gap: 8px;">
            <button class="level-btn active" data-level="basic" style="padding: 6px 12px; background-color: rgba(34, 197, 94, 0.3); border: 1px solid var(--text-accent); color: var(--text-primary); cursor: pointer; font-family: var(--font-family); font-size: 11px;">Basic</button>
            <button class="level-btn" data-level="intermediate" style="padding: 6px 12px; background-color: transparent; border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer; font-family: var(--font-family); font-size: 11px;">Intermediate</button>
            <button class="level-btn" data-level="advanced" style="padding: 6px 12px; background-color: transparent; border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer; font-family: var(--font-family); font-size: 11px;">Advanced</button>
          </div>
        </div>
        
        <div id="education-content"></div>
      </div>
    `;
    container.innerHTML = html;

    // Attach level button listeners
    document.querySelectorAll('.level-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        currentLevel = e.target.dataset.level;
        document.querySelectorAll('.level-btn').forEach((b) => {
          b.style.backgroundColor = b === e.target ? 'rgba(34, 197, 94, 0.3)' : 'transparent';
          b.style.borderColor = b === e.target ? 'var(--text-accent)' : 'var(--border-color)';
          b.classList.toggle('active', b === e.target);
        });
        updateContent();
      });
    });
  };

  const updateContent = () => {
    const contentContainer = document.getElementById('education-content');
    if (!contentContainer) return;

    const courses = educationData.courses || [];

    contentContainer.innerHTML = courses
      .map(
        (course) => `
        <div class="card">
          <div class="card-title">${course.title}</div>
          <div class="card-text">${course.description}</div>
          <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-color);">
            ${(course.content[currentLevel] || 'Content not available for this level.')}
          </div>
          <div style="margin-top: 8px; font-size: 10px; color: var(--text-secondary);">
            <strong>Key terms:</strong> ${(course.keywords || []).join(', ')}
          </div>
        </div>
      `
      )
      .join('');
  };

  const loader = async () => {
    await loadData();
    const contentBody = document.querySelector('.content-body');
    renderEducation(contentBody);
    updateContent();
  };

  return {
    loader,
  };
})();

KernelRouter.registerView('education', null, EducationModule.loader);

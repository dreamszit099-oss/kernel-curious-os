/**
 * K.E.R.N.E.L. EDU OS - Dashboard
 * Child-friendly home screen with content
 */

const DashboardView = (() => {
  const render = (container) => {
    const html = `
      <div class="view-container active" id="view-dashboard">
        <div class="card" style="background: linear-gradient(135deg, var(--color-primary), var(--color-accent));">
          <div style="font-size: 48px; margin-bottom: 10px; text-align: center;">🎓</div>
          <div class="card-title" style="text-align: center; font-size: 24px;">Welcome to K.E.R.N.E.L. EDU OS!</div>
          <div class="card-content" style="text-align: center; color: var(--text-dark);">
            <p>Your offline learning platform where education is accessible to everyone.</p>
            <p style="margin-top: 15px; font-weight: bold;">Pick what you want to do:</p>
          </div>
        </div>

        <div class="grid">
          <div class="game-card" onclick="KernelRouter.render('education')" style="cursor: pointer;">
            <div class="game-icon">📚</div>
            <div class="game-title">Learn</div>
            <div class="game-description">Find lessons for your level</div>
          </div>
          <div class="game-card" onclick="KernelRouter.render('games')" style="cursor: pointer;">
            <div class="game-icon">🎮</div>
            <div class="game-title">Games</div>
            <div class="game-description">Play and learn together</div>
          </div>
          <div class="game-card" onclick="KernelRouter.render('ai')" style="cursor: pointer;">
            <div class="game-icon">🤖</div>
            <div class="game-title">AI Helper</div>
            <div class="game-description">Ask questions anytime</div>
          </div>
        </div>

        <div style="background: linear-gradient(135deg, rgba(255,215,0,0.15), rgba(50,205,50,0.15)); border: 3px solid var(--color-primary); border-radius: 12px; padding: 20px; margin-top: 20px;">
          <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold; color: var(--text-dark);">✨ Why K.E.R.N.E.L. EDU OS?</div>
          <ul style="list-style: none; padding: 0; color: var(--text-dark);">
            <li style="padding: 8px 0;">✅ Works offline - no internet needed</li>
            <li style="padding: 8px 0;">✅ Free for everyone</li>
            <li style="padding: 8px 0;">✅ For kids and teachers</li>
            <li style="padding: 8px 0;">✅ Runs on any computer</li>
          </ul>
        </div>

        <div style="background: linear-gradient(135deg, rgba(30,144,255,0.15), rgba(0,206,209,0.15)); border: 3px solid var(--color-secondary); border-radius: 12px; padding: 20px; margin-top: 20px;">
          <div style="font-size: 20px; margin-bottom: 10px; font-weight: bold; color: var(--text-dark);">🌍 Global Education for All</div>
          <p style="color: var(--text-dark);">This project supports education in communities with limited resources. Learn anytime, anywhere, without needing the internet.</p>
          <button class="btn" style="margin-top: 15px;" onclick="KernelRouter.render('support')">Learn More About Our Mission</button>
        </div>
      </div>
    `;
    container.innerHTML = html;
  };

  const loader = (container) => {
    const header = document.querySelector('.content-header h2');
    if (header) header.textContent = '🏠 Welcome to K.E.R.N.E.L. EDU OS';
    render(container);
  };

  return { loader };
})();

KernelRouter.registerView('dashboard', null, DashboardView.loader);

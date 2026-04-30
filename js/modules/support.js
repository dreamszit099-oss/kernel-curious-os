/**
 * K.E.R.N.E.L. EDU OS - Support Module
 * Transparent support and contribution information
 */

const SupportModule = (() => {
  const renderSupport = (container) => {
    const html = `
      <div class="view-container active" id="view-support">
        <div class="support-container">
          <div class="support-hero">
            <h1>💙 Supporting K.E.R.N.E.L. EDU OS</h1>
            <p>Help us make education accessible to everyone</p>
          </div>

          <div class="support-message">
            <p><strong>About This Project</strong></p>
            <p>K.E.R.N.E.L. EDU OS is being developed with <strong>limited resources and independent effort</strong> to support global education access.</p>
            <p style="margin-top: 15px;">This is an <strong>open-source, non-commercial educational tool</strong> designed to:</p>
            <ul style="margin-top: 10px; margin-left: 20px;">
              <li>✅ Work offline for communities without internet</li>
              <li>✅ Run on low-resource devices (old computers, tablets)</li>
              <li>✅ Provide free educational content</li>
              <li>✅ Support teachers and students globally</li>
              <li>✅ Be transparent and community-driven</li>
            </ul>
          </div>

          <div style="background: linear-gradient(90deg, rgba(255, 215, 0, 0.1), rgba(50, 205, 50, 0.1)); padding: 20px; border-radius: 12px; margin-bottom: 30px; border-left: 5px solid var(--color-primary);">
            <p><strong>🌍 Mission</strong></p>
            <p>To democratize access to quality education through open-source technology, enabling children in low-resource environments to learn and grow.</p>
          </div>

          <div style="margin-bottom: 30px;">
            <h2 style="font-size: 24px; color: var(--color-secondary); margin-bottom: 15px;">☕ Ways to Support</h2>
            <p style="margin-bottom: 20px;">If you believe in accessible education, consider supporting this independent project through these platforms:</p>
          </div>

          <div class="support-links">
            <a href="https://www.buymeacoffee.com" target="_blank" class="support-link-card">
              <div class="support-link-icon">☕</div>
              <div class="support-link-title">Buy Me a Coffee</div>
              <div class="support-link-description">Small donations to support development</div>
            </a>
            <a href="https://ko-fi.com" target="_blank" class="support-link-card">
              <div class="support-link-icon">💙</div>
              <div class="support-link-title">Ko-fi</div>
              <div class="support-link-description">Support creators and projects</div>
            </a>
            <a href="https://github.com/sponsors" target="_blank" class="support-link-card">
              <div class="support-link-icon">🧠</div>
              <div class="support-link-title">GitHub Sponsors</div>
              <div class="support-link-description">Sponsor open-source development</div>
            </a>
          </div>

          <div style="background: var(--bg-card); border: 3px solid var(--color-accent); border-radius: 12px; padding: 25px; margin-bottom: 30px;">
            <h3 style="color: var(--color-secondary); margin-bottom: 15px;">🤝 Other Ways to Help</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 8px 0;">✅ <strong>Share the project</strong> with teachers and communities</li>
              <li style="padding: 8px 0;">✅ <strong>Report bugs and issues</strong> on GitHub</li>
              <li style="padding: 8px 0;">✅ <strong>Contribute code</strong> to improve features</li>
              <li style="padding: 8px 0;">✅ <strong>Create educational content</strong> for the platform</li>
              <li style="padding: 8px 0;">✅ <strong>Translate</strong> the interface to other languages</li>
              <li style="padding: 8px 0;">✅ <strong>Provide feedback</strong> from educators and students</li>
            </ul>
          </div>

          <div style="background: linear-gradient(90deg, rgba(30, 144, 255, 0.1), rgba(0, 206, 209, 0.1)); padding: 25px; border-radius: 12px; border-left: 5px solid var(--color-secondary);">
            <h3 style="color: var(--color-secondary); margin-bottom: 15px;">🔒 Your Privacy</h3>
            <p><strong>Important:</strong> K.E.R.N.E.L. EDU OS stores <strong>NO sensitive data</strong>:</p>
            <ul style="margin-top: 10px; margin-left: 20px;">
              <li>❌ No personal information collected</li>
              <li>❌ No tracking or analytics</li>
              <li>❌ No payment information stored</li>
              <li>❌ No user accounts required</li>
              <li>✅ All learning happens locally on your device</li>
            </ul>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #ccc;">
            <p style="text-align: center; color: #666; font-size: 14px;">
              <strong>K.E.R.N.E.L. EDU OS</strong> — Built with ❤️ for global education<br>
              MIT License | Open Source | Community-Driven<br>
              © 2026 - Independent Educational Project
            </p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
  };

  const loader = (container) => {
    renderSupport(container);
  };

  return {
    loader,
  };
})();

KernelRouter.registerView('support', null, SupportModule.loader);

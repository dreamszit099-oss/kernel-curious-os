/**
 * K.E.R.N.E.L. EDU OS - Dashboard
 * Router-compatible renderer (NO container dependency)
 * Fully modular OS-style view
 */

const DashboardView = (() => {

  // =========================
  // SAFE ELEMENT CREATOR
  // =========================
  const el = (tag, className, html) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  };

  // =========================
  // HERO CARD
  // =========================
  const createHero = () => {
    const card = el("div", "card");
    card.style.background =
      "linear-gradient(135deg, var(--color-primary), var(--color-accent))";

    const icon = el("div", null, "🎓");
    icon.style.fontSize = "48px";
    icon.style.textAlign = "center";
    icon.style.marginBottom = "10px";

    const title = el(
      "div",
      "card-title",
      "Welcome to K.E.R.N.E.L. EDU OS!"
    );
    title.style.textAlign = "center";
    title.style.fontSize = "24px";

    const content = el(
      "div",
      "card-content",
      `
        <p style="text-align:center;">
          Offline-first education system for global learning.
        </p>
        <p style="margin-top:15px; font-weight:bold; text-align:center;">
          Choose an option below:
        </p>
      `
    );

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(content);

    return card;
  };

  // =========================
  // NAV GRID
  // =========================
  const createGrid = () => {
    const grid = el("div", "grid");

    const items = [
      { icon: "📚", title: "Learn", desc: "Lessons by level", view: "education" },
      { icon: "🎮", title: "Games", desc: "Play & learn", view: "games" },
      { icon: "🤖", title: "AI Helper", desc: "Ask questions", view: "ai" }
    ];

    items.forEach(item => {
      const card = el("div", "game-card");

      card.innerHTML = `
        <div class="game-icon">${item.icon}</div>
        <div class="game-title">${item.title}</div>
        <div class="game-description">${item.desc}</div>
      `;

      card.addEventListener("click", () => {
        window.KernelRouter?.render?.(item.view);
      });

      grid.appendChild(card);
    });

    return grid;
  };

  // =========================
  // INFO BLOCK
  // =========================
  const createInfo = () => {
    const block = el("div");
    block.style.background =
      "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(50,205,50,0.15))";
    block.style.border = "3px solid var(--color-primary)";
    block.style.borderRadius = "12px";
    block.style.padding = "20px";
    block.style.marginTop = "20px";

    block.innerHTML = `
      <div style="font-size:20px; font-weight:bold; margin-bottom:10px;">
        ✨ Why K.E.R.N.E.L. EDU OS?
      </div>
      <ul style="list-style:none; padding:0;">
        <li>✅ Works offline</li>
        <li>✅ Free access learning</li>
        <li>✅ Designed for kids & teachers</li>
        <li>✅ Runs on low-end devices</li>
      </ul>
    `;

    return block;
  };

  // =========================
  // MISSION BLOCK
  // =========================
  const createMission = () => {
    const block = el("div");
    block.style.background =
      "linear-gradient(135deg, rgba(30,144,255,0.15), rgba(0,206,209,0.15))";
    block.style.border = "3px solid var(--color-secondary)";
    block.style.borderRadius = "12px";
    block.style.padding = "20px";
    block.style.marginTop = "20px";

    const btn = el("button", "btn", "Learn More About Our Mission");
    btn.style.marginTop = "15px";

    btn.addEventListener("click", () => {
      window.KernelRouter?.render?.("support");
    });

    block.innerHTML = `
      <div style="font-size:20px; font-weight:bold; margin-bottom:10px;">
        🌍 Global Education for All
      </div>
      <p>
        Built with limited resources to support education in low-connectivity environments.
      </p>
    `;

    block.appendChild(btn);

    return block;
  };

  // =========================
  // RENDER (NO CONTAINER)
  // =========================
  const renderer = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "view-container active";
    wrapper.id = "view-dashboard";

    wrapper.appendChild(createHero());
    wrapper.appendChild(createGrid());
    wrapper.appendChild(createInfo());
    wrapper.appendChild(createMission());

    return wrapper;
  };

  // =========================
  // OPTIONAL LOADER
  // =========================
  const loader = async () => {
    const header = document.querySelector(".content-header h2");
    if (header) header.textContent = "🏠 K.E.R.N.E.L. EDU OS";
  };

  return { renderer, loader };
})();

// =========================
// REGISTER VIEW (ROUTER V2)
// =========================
window.KernelRouter?.registerView(
  "dashboard",
  DashboardView.renderer,
  DashboardView.loader
);

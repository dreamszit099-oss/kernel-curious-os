/**
 * K.E.R.N.E.L. EDU OS - Dashboard (Refactored)
 * Stable OS-like renderer (safe DOM creation, no fragile innerHTML dependency)
 */

const DashboardView = (() => {

  // Helper: create element safely
  const el = (tag, className, innerHTML) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (innerHTML !== undefined) node.innerHTML = innerHTML;
    return node;
  };

  const createCard = () => {
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
        Your offline learning platform where education is accessible to everyone.
      </p>
      <p style="margin-top:15px; font-weight:bold; text-align:center;">
        Pick what you want to do:
      </p>
      `
    );

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(content);

    return card;
  };

  const createGrid = () => {
    const grid = el("div", "grid");

    const items = [
      {
        icon: "📚",
        title: "Learn",
        desc: "Find lessons for your level",
        view: "education"
      },
      {
        icon: "🎮",
        title: "Games",
        desc: "Play and learn together",
        view: "games"
      },
      {
        icon: "🤖",
        title: "AI Helper",
        desc: "Ask questions anytime",
        view: "ai"
      }
    ];

    items.forEach(item => {
      const card = el("div", "game-card");
      card.style.cursor = "pointer";

      card.innerHTML = `
        <div class="game-icon">${item.icon}</div>
        <div class="game-title">${item.title}</div>
        <div class="game-description">${item.desc}</div>
      `;

      card.addEventListener("click", () => {
        if (window.KernelRouter?.render) {
          window.KernelRouter.render(item.view);
        }
      });

      grid.appendChild(card);
    });

    return grid;
  };

  const createInfoBlock = () => {
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
        <li>✅ Works offline - no internet needed</li>
        <li>✅ Free for everyone</li>
        <li>✅ For kids and teachers</li>
        <li>✅ Runs on any computer</li>
      </ul>
    `;

    return block;
  };

  const createMissionBlock = () => {
    const block = el("div");
    block.style.background =
      "linear-gradient(135deg, rgba(30,144,255,0.15), rgba(0,206,209,0.15))";
    block.style.border = "3px solid var(--color-secondary)";
    block.style.borderRadius = "12px";
    block.style.padding = "20px";
    block.style.marginTop = "20px";

    const button = el("button", "btn", "Learn More About Our Mission");
    button.style.marginTop = "15px";

    button.addEventListener("click", () => {
      window.KernelRouter?.render?.("support");
    });

    block.innerHTML = `
      <div style="font-size:20px; font-weight:bold; margin-bottom:10px;">
        🌍 Global Education for All
      </div>
      <p>
        This project supports education in communities with limited resources.
        Learn anytime, anywhere, without needing the internet.
      </p>
    `;

    block.appendChild(button);

    return block;
  };

  const render = (container) => {
    // 🔐 FIX PRINCIPAL DE TU ERROR
    if (!container) {
      console.warn("[Dashboard] container is undefined");
      return;
    }

    container.innerHTML = "";

    const wrapper = el("div", "view-container active");
    wrapper.id = "view-dashboard";

    wrapper.appendChild(createCard());
    wrapper.appendChild(createGrid());
    wrapper.appendChild(createInfoBlock());
    wrapper.appendChild(createMissionBlock());

    container.appendChild(wrapper);
  };

  const loader = (container) => {
    const header = document.querySelector(".content-header h2");
    if (header) header.textContent = "🏠 Welcome to K.E.R.N.E.L. EDU OS";

    render(container);
  };

  return { loader };
})();

// Register safely
if (window.KernelRouter?.registerView) {
  window.KernelRouter.registerView("dashboard", null, DashboardView.loader);
}

/**
 * K.E.R.N.E.L. EDU OS - Education Content Module
 * Age-based educational content with full display
 */

const EducationContentModule = (() => {
  const content = {
    kindergarten: {
      title: 'Kindergarten Learning',
      icon: '👶',
      lessons: [
        {
          title: 'Colors of the Rainbow',
          content: 'Red 🔴, Orange 🟠, Yellow 🟡, Green 🟢, Blue 🔵, Purple 🟣. Each color is special and beautiful!',
          icon: '🌈',
        },
        {
          title: 'Shapes Around Us',
          content: 'Circle ⭕, Square ⬜, Triangle 🔺, Rectangle ▭. Look for shapes everywhere!',
          icon: '🔷',
        },
        {
          title: 'Numbers 1-10',
          content: '1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 Count with your fingers!',
          icon: '1️⃣',
        },
        {
          title: 'Animals',
          content: 'Dogs 🐕, Cats 🐈, Birds 🐦, Fish 🐟, Elephants 🐘, Lions 🦁. Do you like animals?',
          icon: '🦁',
        },
      ],
    },
    primary: {
      title: 'Primary School',
      icon: '🧒',
      lessons: [
        {
          title: 'Basic Addition',
          content: '2 + 3 = 5. When you add two numbers, you count them together. Try: 1 + 4 = ?',
          icon: '➕',
        },
        {
          title: 'Introduction to Science',
          content: 'Science is learning how things work. The sun ☀️ gives us light and heat. Plants 🌱 grow from seeds!',
          icon: '🔬',
        },
        {
          title: 'Reading Skills',
          content: 'Start with simple words: CAT, DOG, RUN, JUMP. Read slowly and have fun!',
          icon: '📖',
        },
        {
          title: 'Interactive Quiz',
          content: 'Test what you have learned! Answer fun questions and earn stars ⭐.',
          icon: '❓',
        },
      ],
    },
    secondary: {
      title: 'Secondary School',
      icon: '🧑',
      lessons: [
        {
          title: 'Algebra Basics',
          content: 'Use letters like x to find unknown numbers. If x + 5 = 10, then x = 5. You can solve these!',
          icon: '📐',
        },
        {
          title: 'Introduction to Biology',
          content: 'Biology is the study of life. Learn about cells, plants 🌿, and animals 🦁. Everything alive is fascinating!',
          icon: '🔬',
        },
        {
          title: 'Physics Fundamentals',
          content: 'Physics explains how things move and work. Gravity pulls objects down 📎. Energy makes things happen ⚡.',
          icon: '⚡',
        },
        {
          title: 'Critical Thinking',
          content: 'Ask questions! Why? How? What if? Think deeply about problems and find creative solutions.',
          icon: '💭',
        },
      ],
    },
  };

  const renderEducation = (container) => {
    const html = `
      <div class="view-container active" id="view-education">
        <div class="card" style="background: linear-gradient(135deg, var(--color-primary), var(--color-warning));">
          <div class="card-title" style="text-align: center; font-size: 24px;">📚 Educational Content</div>
          <div class="card-content" style="text-align: center; color: var(--text-dark);">Choose your level and start learning!</div>
        </div>
        <div class="grid">
          ${['kindergarten', 'primary', 'secondary']
            .map(
              (level) => `
            <div class="game-card" onclick="EducationContentModule.showLevel('${level}')" style="cursor: pointer;">
              <div class="game-icon" style="font-size: 56px;">${content[level].icon}</div>
              <div class="game-title">${content[level].title}</div>
            </div>
          `
            )
            .join('')}
        </div>
        <div id="education-content"></div>
      </div>
    `;
    container.innerHTML = html;
  };

  const showLevel = (level) => {
    const contentDiv = document.getElementById('education-content');
    const lessons = content[level].lessons;

    const lessonsHTML = `
      <div style="margin-top: 30px;">
        <h3 style="color: var(--color-secondary); margin-bottom: 20px; font-size: 26px; text-align: center;">${content[level].title} - Lessons</h3>
        <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
          ${lessons
            .map(
              (lesson, idx) => `
            <div class="card" style="border: 4px solid var(--color-accent);">
              <div style="font-size: 48px; margin-bottom: 15px; text-align: center;">${lesson.icon}</div>
              <div class="card-title" style="text-align: center; font-size: 18px;">${lesson.title}</div>
              <div class="card-content" style="text-align: center; color: var(--text-dark); font-size: 14px;">${lesson.content}</div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
    contentDiv.innerHTML = lessonsHTML;
  };

  const loader = (container) => {
    const header = document.querySelector('.content-header h2');
    if (header) header.textContent = '📚 Educational Content';
    renderEducation(container);
  };

  return {
    loader,
    showLevel,
  };
})();

KernelRouter.registerView('education', null, EducationContentModule.loader);

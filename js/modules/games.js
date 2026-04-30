/**
 * K.E.R.N.E.L. EDU OS - Games Module
 * Interactive educational games for children
 */

const GamesModule = (() => {
  const games = {
    mathChallenge: {
      name: 'Math Challenge',
      icon: '🧮',
      description: 'Addition & Subtraction',
    },
    memoryMatch: {
      name: 'Memory Match',
      icon: '🎴',
      description: 'Find Matching Pairs',
    },
    patternGame: {
      name: 'Pattern Master',
      icon: '🎯',
      description: 'Repeat the Pattern',
    },
    quizMaster: {
      name: 'Quiz Master',
      icon: '❓',
      description: 'Answer Questions',
    },
  };

  let currentGame = null;
  let gameState = {};

  const renderGamesMenu = (container) => {
    const html = `
      <div class="view-container active" id="view-games">
        <div class="card">
          <div class="card-title">🎮 Educational Games</div>
          <div class="card-content">Choose a game to play and learn!</div>
        </div>
        <div class="games-grid">
          ${Object.entries(games)
            .map(
              ([key, game]) => `
            <div class="game-card" onclick="GamesModule.startGame('${key}')">
              <div class="game-icon">${game.icon}</div>
              <div class="game-title">${game.name}</div>
              <div class="game-description">${game.description}</div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
    container.innerHTML = html;
  };

  // Math Challenge Game
  const mathChallenge = (() => {
    let score = 0;
    let streak = 0;
    let problems = 0;

    const generateProblem = () => {
      const operations = ['+', '-'];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      const num1 = Math.floor(Math.random() * 20) + 1;
      const num2 = Math.floor(Math.random() * 20) + 1;

      let answer;
      if (operation === '+') {
        answer = num1 + num2;
      } else {
        answer = Math.abs(num1 - num2);
      }

      return { problem: `${num1} ${operation} ${num2}`, answer };
    };

    const render = (container) => {
      const { problem, answer } = generateProblem();
      gameState.currentProblem = { problem, answer };
      problems++;

      const html = `
        <div class="view-container active" id="view-game-math">
          <div class="quiz-container">
            <button class="btn" onclick="GamesModule.endGame()">← Back to Games</button>
            <div style="margin: 20px 0;">
              <div style="font-size: 14px; color: var(--text-dark);">Score: ${score} | Streak: ${streak}</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${(problems / 10) * 100}%"></div>
              </div>
            </div>
            <div class="math-problem">${problem}</div>
            <input type="number" id="mathAnswer" class="math-input" placeholder="Your answer" />
            <button class="btn btn-primary" onclick="GamesModule.checkMathAnswer()">Check Answer</button>
            <div id="mathFeedback"></div>
          </div>
        </div>
      `;
      container.innerHTML = html;
      document.getElementById('mathAnswer').focus();
    };

    const checkAnswer = (userAnswer) => {
      const { answer } = gameState.currentProblem;
      const isCorrect = parseInt(userAnswer) === answer;

      if (isCorrect) {
        score += 10;
        streak++;
      } else {
        streak = 0;
      }

      const feedbackEl = document.getElementById('mathFeedback');
      if (feedbackEl) {
        if (isCorrect) {
          feedbackEl.innerHTML = `<div class="feedback success">✓ Correct! Well done!</div>`;
          setTimeout(() => {
            if (problems < 10) render(document.querySelector('.content-body'));
          }, 800);
        } else {
          feedbackEl.innerHTML = `<div class="feedback error">✗ Wrong! The answer is ${answer}</div>`;
          setTimeout(() => {
            if (problems < 10) render(document.querySelector('.content-body'));
          }, 1000);
        }
      }
    };

    return { render, checkAnswer };
  })();

  // Memory Match Game
  const memoryMatch = (() => {
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    let cards = [];
    let flipped = [];
    let matched = [];
    let moves = 0;
    let score = 0;

    const initCards = () => {
      cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
      flipped = [];
      matched = [];
      moves = 0;
      score = 0;
    };

    const render = (container) => {
      const contentBody = container;
      initCards();

      const html = `
        <div class="view-container active" id="view-game-memory">
          <div class="quiz-container">
            <button class="btn" onclick="GamesModule.endGame()">← Back to Games</button>
            <div style="margin: 20px 0;">
              <div style="font-size: 14px; color: var(--text-dark);">Score: ${score} | Moves: ${moves}</div>
            </div>
            <div class="memory-grid" id="memoryGrid"></div>
            <div id="memoryFeedback"></div>
          </div>
        </div>
      `;
      contentBody.innerHTML = html;

      const memoryGrid = document.getElementById('memoryGrid');
      cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.textContent = '?';
        card.onclick = () => flipCard(index, card);
        memoryGrid.appendChild(card);
      });
    };

    const flipCard = (index, cardEl) => {
      if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;

      cardEl.classList.add('flipped');
      cardEl.textContent = cards[index];
      flipped.push(index);

      if (flipped.length === 2) {
        moves++;
        const [idx1, idx2] = flipped;
        if (cards[idx1] === cards[idx2]) {
          matched.push(idx1, idx2);
          score += 10;
          setTimeout(() => {
            document.querySelector(`[data-index="${idx1}"]`).classList.add('matched');
            document.querySelector(`[data-index="${idx2}"]`).classList.add('matched');
            flipped = [];
            if (matched.length === cards.length) {
              document.getElementById('memoryFeedback').innerHTML = `<div class="feedback success">🎉 You won! Score: ${score}</div>`;
            }
          }, 500);
        } else {
          setTimeout(() => {
            document.querySelector(`[data-index="${idx1}"]`).classList.remove('flipped');
            document.querySelector(`[data-index="${idx2}"]`).classList.remove('flipped');
            document.querySelector(`[data-index="${idx1}"]`).textContent = '?';
            document.querySelector(`[data-index="${idx2}"]`).textContent = '?';
            flipped = [];
          }, 800);
        }
      }
    };

    return { render };
  })();

  // Pattern Game
  const patternGame = (() => {
    let sequence = [];
    let userSequence = [];
    let level = 1;
    let colors = ['🔴', '🟢', '🔵', '🟡'];

    const generateNextColor = () => {
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const render = (container) => {
      sequence = [generateNextColor()];
      userSequence = [];

      const html = `
        <div class="view-container active" id="view-game-pattern">
          <div class="quiz-container">
            <button class="btn" onclick="GamesModule.endGame()">← Back to Games</button>
            <div style="margin: 20px 0;">
              <div style="font-size: 14px; color: var(--text-dark);">Level: ${level}</div>
            </div>
            <div style="padding: 20px; background: rgba(0,0,0,0.05); border-radius: 8px; margin-bottom: 20px;">
              <div style="font-size: 14px; margin-bottom: 10px;">Watch the sequence and repeat it:</div>
              <div class="pattern-display" id="patternDisplay"></div>
            </div>
            <button class="btn btn-primary" onclick="GamesModule.playPatternSequence()">Play Sequence Again</button>
          </div>
        </div>
      `;
      container.innerHTML = html;

      renderPatternBoxes();
      setTimeout(() => playPatternSequence(), 1000);
    };

    const renderPatternBoxes = () => {
      const display = document.getElementById('patternDisplay');
      display.innerHTML = colors
        .map(
          (color, idx) => `
        <div class="pattern-box" onclick="GamesModule.selectPatternColor(${idx})">${color}</div>
      `
        )
        .join('');
    };

    const playPatternSequence = () => {
      let delay = 0;
      sequence.forEach((color, idx) => {
        setTimeout(() => {
          const boxes = document.querySelectorAll('.pattern-box');
          const colorIdx = colors.indexOf(color);
          boxes[colorIdx].classList.add('active');
          setTimeout(() => boxes[colorIdx].classList.remove('active'), 300);
        }, delay);
        delay += 600;
      });
    };

    const selectColor = (colorIdx) => {
      userSequence.push(colors[colorIdx]);
      const boxes = document.querySelectorAll('.pattern-box');
      boxes[colorIdx].classList.add('active');
      setTimeout(() => boxes[colorIdx].classList.remove('active'), 300);

      if (userSequence[userSequence.length - 1] !== sequence[userSequence.length - 1]) {
        document.querySelector('.quiz-container').innerHTML += '<div class="feedback error">✗ Game Over! You made a mistake.</div>';
        return;
      }

      if (userSequence.length === sequence.length) {
        level++;
        setTimeout(() => {
          sequence.push(generateNextColor());
          userSequence = [];
          render(document.querySelector('.content-body'));
        }, 800);
      }
    };

    return { render, selectColor };
  })();

  // Quiz Master
  const quizMaster = (() => {
    let quizzes = [
      { q: 'What color is the sky?', options: ['Blue', 'Green', 'Red'], correct: 0 },
      { q: 'How many legs does a dog have?', options: ['2', '4', '6'], correct: 1 },
      { q: 'What animal says "Moo"?', options: ['Dog', 'Cat', 'Cow'], correct: 2 },
      { q: '2 + 3 = ?', options: ['4', '5', '6'], correct: 1 },
      { q: 'Which is the biggest?', options: ['Ant', 'Elephant', 'Mouse'], correct: 1 },
    ];

    let currentQ = 0;
    let score = 0;

    const render = (container) => {
      if (currentQ >= quizzes.length) {
        const html = `
          <div class="view-container active">
            <div class="quiz-container">
              <div style="text-align: center;">
                <div class="feedback success" style="font-size: 24px;">🎉 Quiz Complete!</div>
                <div style="font-size: 32px; color: var(--color-primary); margin: 20px 0;">Score: ${score}/${quizzes.length}</div>
                <button class="btn" onclick="GamesModule.endGame()">Back to Games</button>
              </div>
            </div>
          </div>
        `;
        container.innerHTML = html;
        return;
      }

      const quiz = quizzes[currentQ];
      const html = `
        <div class="view-container active" id="view-game-quiz">
          <div class="quiz-container">
            <div style="font-size: 14px; color: var(--text-dark); margin-bottom: 20px;">
              Question ${currentQ + 1} of ${quizzes.length}
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${((currentQ + 1) / quizzes.length) * 100}%"></div>
            </div>
            <div class="quiz-question">${quiz.q}</div>
            <div class="quiz-options">
              ${quiz.options
                .map(
                  (option, idx) => `
                <div class="quiz-option" onclick="GamesModule.selectQuizOption(${idx}, ${quiz.correct})">
                  ${option}
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      `;
      container.innerHTML = html;
    };

    const selectOption = (selected, correct) => {
      const options = document.querySelectorAll('.quiz-option');
      options.forEach((opt) => {
        opt.onclick = null;
        opt.style.pointerEvents = 'none';
      });

      options[selected].classList.add(selected === correct ? 'correct' : 'incorrect');
      options[correct].classList.add('correct');

      if (selected === correct) {
        score++;
      }

      setTimeout(() => {
        currentQ++;
        render(document.querySelector('.content-body'));
      }, 800);
    };

    return { render, selectOption };
  })();

  const startGame = (gameKey) => {
    const contentBody = document.querySelector('.content-body');
    switch (gameKey) {
      case 'mathChallenge':
        mathChallenge.render(contentBody);
        break;
      case 'memoryMatch':
        memoryMatch.render(contentBody);
        break;
      case 'patternGame':
        patternGame.render(contentBody);
        break;
      case 'quizMaster':
        quizMaster.render(contentBody);
        break;
    }
  };

  const checkMathAnswer = () => {
    const answer = document.getElementById('mathAnswer').value;
    mathChallenge.checkAnswer(answer);
  };

  const selectPatternColor = (colorIdx) => {
    patternGame.selectColor(colorIdx);
  };

  const selectQuizOption = (selected, correct) => {
    quizMaster.selectOption(selected, correct);
  };

  const playPatternSequence = () => {
    const contentBody = document.querySelector('.content-body');
    const display = contentBody.querySelector('.pattern-display');
    if (display) {
      const boxes = display.querySelectorAll('.pattern-box');
      boxes.forEach((box) => box.classList.remove('active'));
      setTimeout(() => patternGame.render(contentBody), 100);
    }
  };

  const endGame = () => {
    const contentBody = document.querySelector('.content-body');
    loader(contentBody);
  };

  const loader = (container) => {
    renderGamesMenu(container);
  };

  return {
    loader,
    startGame,
    checkMathAnswer,
    selectPatternColor,
    selectQuizOption,
    playPatternSequence,
    endGame,
  };
})();

KernelRouter.registerView('games', null, GamesModule.loader);

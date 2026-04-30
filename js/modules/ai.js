/**
 * K.E.R.N.E.L. EDU OS - AI Educational Assistant
 * Child-friendly offline AI helper with full display
 */

const AIModule = (() => {
  const knowledge = {
    math: {
      keywords: ['math', 'add', 'plus', 'number', 'count', 'subtract', 'times', 'divide', 'problema'],
      response: '🧮 In math, we learn numbers and how they work together. You can add (2+3=5), subtract (5-2=3), multiply, and divide!',
    },
    science: {
      keywords: ['science', 'plant', 'animal', 'water', 'sun', 'light', 'nature', 'ciencia'],
      response: '🔬 Science is learning how nature works! Plants grow from seeds 🌱, animals live everywhere 🦁, and the sun ☀️ gives us light and heat.',
    },
    history: {
      keywords: ['history', 'long ago', 'old', 'past', 'ancient', 'historia'],
      response: '🏛️ History is about what happened a long time ago. People did amazing things that we can learn from today!',
    },
    reading: {
      keywords: ['read', 'book', 'story', 'word', 'letter', 'lectura'],
      response: '📖 Reading is fun! Start with short words and small books. Every time you read, you get smarter and more creative!',
    },
    creativity: {
      keywords: ['draw', 'art', 'color', 'paint', 'create', 'imagine', 'dibujar', 'arte'],
      response: '🎨 Art and creativity are amazing! Draw, paint, color, and create whatever you imagine. You are an artist!',
    },
    default: {
      response: '🤖 That\'s a great question! Keep asking and learning. You can also explore the other lessons and games. I\'m here to help!',
    },
  };

  let messages = [];

  const findAnswer = (question) => {
    const query = question.toLowerCase();
    for (const [topic, data] of Object.entries(knowledge)) {
      if (data.keywords && data.keywords.some((keyword) => query.includes(keyword))) {
        return data.response;
      }
    }
    return knowledge.default.response;
  };

  const renderChat = (container) => {
    const html = `
      <div class="view-container active" id="view-ai">
        <div class="card" style="background: linear-gradient(135deg, var(--color-secondary), var(--color-accent));">
          <div class="card-title" style="text-align: center; font-size: 24px;">🤖 AI Helper - Ask Me Anything!</div>
          <div class="card-content" style="text-align: center; color: var(--text-dark);">I'm here to help you learn. Ask me about math, science, reading, and more!</div>
        </div>
        
        <div class="quiz-container" style="max-width: 800px;">
          <div id="chat-messages" class="terminal-output" style="height: 350px; background: var(--bg-card); border: 3px solid var(--color-secondary); padding: 15px; border-radius: 8px; overflow-y: auto; display: flex; flex-direction: column;">
            <div style="padding: 10px; color: var(--color-secondary); font-weight: bold;">🤖 AI: Hello! I'm here to help you learn. What would you like to know?</div>
          </div>
          
          <div style="display: flex; gap: 10px; margin-top: 15px;">
            <input type="text" id="ai-input" class="math-input" style="flex: 1; padding: 12px; font-size: 14px;" placeholder="Ask me a question..." />
            <button class="btn btn-primary" onclick="AIModule.sendMessage()">Send</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML = html;
    setTimeout(() => {
      const input = document.getElementById('ai-input');
      if (input) input.focus();
    }, 100);
  };

  const sendMessage = () => {
    const input = document.getElementById('ai-input');
    const messagesDiv = document.getElementById('chat-messages');
    
    if (!input || !messagesDiv) return;
    
    const question = input.value.trim();
    if (!question) return;

    // Add user message
    const userMsg = document.createElement('div');
    userMsg.style.cssText = 'padding: 10px 12px; margin: 8px 0; background: linear-gradient(90deg, var(--color-secondary), #0051cc); color: white; border-radius: 12px 4px 12px 12px; max-width: 80%; align-self: flex-end; word-wrap: break-word; font-weight: bold;';
    userMsg.textContent = `👤 You: ${question}`;
    messagesDiv.appendChild(userMsg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // Get AI response
    const response = findAnswer(question);
    setTimeout(() => {
      const aiMsg = document.createElement('div');
      aiMsg.style.cssText = 'padding: 10px 12px; margin: 8px 0; background: linear-gradient(90deg, var(--color-primary), var(--color-accent)); color: var(--text-dark); border-radius: 4px 12px 12px 12px; max-width: 80%; align-self: flex-start; word-wrap: break-word;';
      aiMsg.textContent = response;
      messagesDiv.appendChild(aiMsg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 400);

    input.value = '';
    input.focus();
  };

  const loader = (container) => {
    const header = document.querySelector('.content-header h2');
    if (header) header.textContent = '🤖 AI Helper';
    renderChat(container);
    setTimeout(() => {
      const input = document.getElementById('ai-input');
      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') sendMessage();
        });
      }
    }, 100);
  };

  return {
    loader,
    sendMessage,
  };
})();

KernelRouter.registerView('ai', null, AIModule.loader);

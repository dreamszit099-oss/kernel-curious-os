/**
 * K.E.R.N.E.L. AI Educational Assistant
 * Offline rule-based intelligent learning assistant
 */

const AIModule = (() => {
  let aiKnowledge = {};
  let conversationHistory = [];

  const loadKnowledge = async () => {
    try {
      const data = await KernelDataLoader.load('ai_knowledge.json');
      aiKnowledge = data || {};
      console.log('[AI] Knowledge base loaded');
    } catch (error) {
      console.error('[AI] Error loading knowledge:', error);
    }
  };

  const explain = async (query) => {
    const cleanQuery = query.toLowerCase().trim();

    // Search knowledge base
    if (aiKnowledge.topics) {
      const topic = aiKnowledge.topics.find(
        (t) => t.keywords && t.keywords.some((k) => cleanQuery.includes(k.toLowerCase()))
      );

      if (topic) {
        return {
          found: true,
          simple: topic.simple_explanation,
          advanced: topic.advanced_explanation,
          related: topic.related_topics || [],
        };
      }
    }

    // Fallback for unknown topics
    return {
      found: false,
      simple: `I don't have specific information about "${query}" in my offline knowledge base.`,
      advanced: 'Try searching the wiki or asking about a different topic.',
      related: [],
    };
  };

  const renderConversation = (container) => {
    const html = `
      <div class="view-container active" id="view-ai">
        <div class="panel" style="margin-bottom: 16px;">
          <div class="panel-title">K.E.R.N.E.L. AI Assistant</div>
          <div class="panel-content">Ask me about science, math, civic topics, and more. I work completely offline.</div>
        </div>
        <div id="ai-conversation" class="terminal-output" style="height: 400px; margin-bottom: 12px;">
          <div class="terminal-line">AI: Hello! I'm here to help you learn. Type your question and press Enter.</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <input type="text" id="ai-input" class="terminal-input" placeholder="Ask me anything..." style="flex: 1;" />
          <button id="ai-submit" class="terminal-button">SEND</button>
        </div>
        <div id="ai-response" style="margin-top: 16px;"></div>
      </div>
    `;
    container.innerHTML = html;

    // Attach event listeners
    const input = document.getElementById('ai-input');
    const submit = document.getElementById('ai-submit');
    const conversation = document.getElementById('ai-conversation');

    const sendMessage = async () => {
      const query = input.value.trim();
      if (!query) return;

      // Add user message
      const userLine = document.createElement('div');
      userLine.className = 'terminal-line';
      userLine.textContent = `You: ${query}`;
      conversation.appendChild(userLine);

      // Get AI response
      const response = await explain(query);

      // Add AI response
      const aiLine = document.createElement('div');
      aiLine.className = 'terminal-line';
      aiLine.innerHTML = `<strong>AI:</strong> ${response.simple}`;
      conversation.appendChild(aiLine);

      if (response.advanced) {
        const advLine = document.createElement('div');
        advLine.className = 'terminal-line';
        advLine.style.fontSize = '11px';
        advLine.style.color = 'var(--text-secondary)';
        advLine.innerHTML = `<em>${response.advanced}</em>`;
        conversation.appendChild(advLine);
      }

      if (response.related.length > 0) {
        const relatedLine = document.createElement('div');
        relatedLine.className = 'terminal-line';
        relatedLine.style.fontSize = '11px';
        relatedLine.style.color = 'var(--text-secondary)';
        relatedLine.innerHTML = `<em>Related: ${response.related.join(', ')}</em>`;
        conversation.appendChild(relatedLine);
      }

      // Clear input
      input.value = '';
      conversation.scrollTop = conversation.scrollHeight;
    };

    submit.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  };

  const loader = async () => {
    await loadKnowledge();
    const contentBody = document.querySelector('.content-body');
    renderConversation(contentBody);
  };

  return {
    loader,
    explain,
  };
})();

KernelRouter.registerView('ai', null, AIModule.loader);

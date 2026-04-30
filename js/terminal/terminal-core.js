/**
 * K.E.R.N.E.L. Terminal Core
 * Browser-based CLI interface
 */

const TerminalCore = (() => {
  let history = [];
  let historyIndex = -1;
  const MAX_OUTPUT_LINES = 200;

  const formatOutput = (output, type = 'normal') => {
    const div = document.createElement('div');
    div.className = `terminal-line ${type}`;
    div.textContent = output;
    return div;
  };

  const appendOutput = (container, output, type = 'normal') => {
    container.appendChild(formatOutput(output, type));
    
    // Keep output manageable
    const lines = container.querySelectorAll('.terminal-line');
    if (lines.length > MAX_OUTPUT_LINES) {
      lines[0].remove();
    }
    
    container.scrollTop = container.scrollHeight;
  };

  const execute = async (container, input) => {
    if (!input.trim()) return;

    // Add command to history
    history.push(input);
    historyIndex = history.length;

    // Display command
    const prompt = document.createElement('div');
    prompt.className = 'terminal-line command';
    prompt.textContent = `$ ${input}`;
    container.appendChild(prompt);

    // Parse and execute
    const result = await CommandParser.parse(input);

    if (result.type === 'empty') {
      // Do nothing for empty input
    } else if (result.type === 'error') {
      appendOutput(container, result.output, 'error');
    } else if (result.output === 'CLEAR') {
      container.innerHTML = '';
      appendOutput(container, 'K.E.R.N.E.L. Curious initialized...');
      appendOutput(container, 'Type \'help\' to explore commands');
    } else {
      // Split multi-line output
      result.output.split('\n').forEach(line => {
        appendOutput(container, line);
      });
    }

    container.scrollTop = container.scrollHeight;
  };

  const handleKeypress = (event, inputElement, outputContainer) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const input = inputElement.value;
      execute(outputContainer, input);
      inputElement.value = '';
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inputElement.value = history[historyIndex];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        inputElement.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        inputElement.value = '';
      }
    }
  };

  const initialize = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`[TERMINAL] Container #${containerId} not found`);
      return;
    }

    // Clear and initialize
    container.innerHTML = '';
    appendOutput(container, 'K.E.R.N.E.L. Curious initialized...');
    appendOutput(container, 'Type \'help\' to explore commands');
  };

  return {
    execute,
    initialize,
    handleKeypress,
    appendOutput,
  };
})();

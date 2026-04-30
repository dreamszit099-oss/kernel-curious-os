/**
 * K.E.R.N.E.L. Application Initialization
 * Main entry point
 */

(async () => {
  console.log('[APP] K.E.R.N.E.L. Curious OS initializing...');

  // Boot sequence
  await KernelBoot.initialize();

  // Render sidebar and layout
  SidebarUI.render();

  // Special handler for terminal view
  const terminalViewHandler = async () => {
    const contentBody = document.querySelector('.content-body');
    const html = `
      <div class="view-container active" id="view-terminal">
        <div class="panel" style="margin-bottom: 16px;">
          <div class="panel-title">Kernel Terminal</div>
          <div class="panel-content">Direct command interface to K.E.R.N.E.L. system</div>
        </div>
        <div class="terminal-container">
          <div class="terminal-output" id="terminal-output"></div>
          <div class="terminal-input-container">
            <span class="terminal-prompt">$</span>
            <input class="terminal-input" id="terminal-input" type="text" placeholder="Enter command..." />
            <button class="terminal-button" id="terminal-exec">RUN</button>
          </div>
        </div>
      </div>
    `;
    contentBody.innerHTML = html;
    
    // Initialize terminal
    TerminalCore.initialize('terminal-output');
    
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const execBtn = document.getElementById('terminal-exec');
    
    const handleCommand = () => {
      const cmd = input.value;
      TerminalCore.execute(output, cmd);
      input.value = '';
    };
    
    input.addEventListener('keypress', (e) => {
      TerminalCore.handleKeypress(e, input, output);
    });
    
    execBtn.addEventListener('click', handleCommand);
    
    input.focus();
  };

  KernelRouter.registerView('terminal', null, terminalViewHandler);

  // Load initial dashboard
  await KernelRouter.render('dashboard');

  console.log('[APP] K.E.R.N.E.L. Curious OS ready');
})();

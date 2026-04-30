/**
 * K.E.R.N.E.L. EDU OS - Application Initialization
 * Educational Operating System with Kiosk Mode
 */

(async () => {
  console.log('[APP] K.E.R.N.E.L. EDU OS initializing...');

  // Initialize kiosk mode
  const urlParams = new URLSearchParams(window.location.search);
  const kioskMode = urlParams.get('mode') || 'student';
  await KioskMode.initialize(kioskMode);

  // Boot sequence
  await KernelBoot.initialize();

  // Render sidebar and layout
  SidebarUI.render();

  // Register terminal view handler
  const terminalViewHandler = async () => {
    const contentBody = document.querySelector('.content-body');
    const html = `
      <div class="view-container active" id="view-terminal">
        <div class="panel" style="margin-bottom: 16px;">
          <div class="panel-title">K.E.R.N.E.L. Terminal</div>
          <div class="panel-content">Educational shell with system commands and learning tools</div>
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

  // Register new commands for educational system
  CommandParser.register('mode', async (args) => {
    const newMode = args[0];
    if (newMode && KioskMode.setMode(newMode)) {
      return `Mode changed to: ${newMode}`;
    }
    const modeInfo = KioskMode.getModeInfo();
    return `Current mode: ${modeInfo.mode}. Available: student, teacher, exploration`;
  }, 'Switch operating modes');

  CommandParser.register('wiki', async (args) => {
    if (args[0] === 'search' && args.length > 1) {
      const query = args.slice(1).join(' ');
      const results = WikiModule.search(query);
      if (results.length === 0) return `No wiki results for: ${query}`;
      return results.map((r) => `${r.topic}: ${r.content}`).join('\n');
    }
    return 'Usage: wiki search [topic]';
  }, 'Search offline wiki');

  CommandParser.register('ai', async (args) => {
    if (args[0] === 'explain' && args.length > 1) {
      const query = args.slice(1).join(' ');
      const response = await AIModule.explain(query);
      let output = response.simple;
      if (response.advanced) output += `\n${response.advanced}`;
      return output;
    }
    return 'Usage: ai explain [topic]';
  }, 'Ask AI assistant');

  CommandParser.register('fullscreen', async () => {
    await KioskMode.requestFullscreen();
    return 'Fullscreen requested';
  }, 'Request fullscreen mode');

  CommandParser.register('status', async () => {
    const modeInfo = KioskMode.getModeInfo();
    return `K.E.R.N.E.L. EDU OS\nMode: ${modeInfo.mode}\nStatus: ONLINE\nOffline: YES`;
  }, 'Show system status');

  // Load initial dashboard
  await KernelRouter.render('dashboard');

  console.log('[APP] K.E.R.N.E.L. EDU OS ready');
})();

/**
 * K.E.R.N.E.L. Command Parser
 * Parses and executes terminal commands
 */

const CommandParser = (() => {
  const commands = new Map();

  const register = (name, handler, help = '') => {
    commands.set(name.toLowerCase(), { handler, help });
  };

  const parse = async (input) => {
    const tokens = input.trim().split(/\s+/);
    const command = tokens[0]?.toLowerCase();
    const args = tokens.slice(1);

    if (!command) return { type: 'empty', output: '' };

    if (commands.has(command)) {
      const { handler } = commands.get(command);
      try {
        const output = await handler(args);
        return { type: 'success', output };
      } catch (error) {
        return { type: 'error', output: `Error: ${error.message}` };
      }
    }

    return { type: 'unknown', output: `kernel: ${command}: command not found` };
  };

  const getHelp = () => {
    const help = ['Available commands:'];
    for (const [name, { help: cmdHelp }] of commands) {
      help.push(`  ${name.padEnd(15)} ${cmdHelp}`);
    }
    return help.join('\n');
  };

  // Built-in commands
  register('kernel', async (args) => {
    const flag = args[0];
    switch (flag) {
      case '--about':
        return 'K.E.R.N.E.L. Curious OS - Hybrid Systems Architecture & AI Infrastructure';
      case '--version':
        return 'K.E.R.N.E.L. v0.1.0';
      case '--status':
        const status = await KernelDataLoader.getStatus();
        if (!status) return 'Status unavailable';
        return status.systemStatus.join(' | ');
      case '--projects':
        const projects = await KernelDataLoader.getProjects();
        if (!projects) return 'Projects unavailable';
        return projects.projects.map(p => `${p.name}: ${p.status}`).join('\n  ');
      case '--help':
        return 'Usage: kernel [--about|--version|--status|--projects|--help]';
      default:
        return 'kernel: invalid flag. Use "kernel --help"';
    }
  }, 'Kernel system information');

  register('help', async () => {
    return getHelp();
  }, 'Display available commands');

  register('clear', () => {
    return 'CLEAR';
  }, 'Clear terminal output');

  register('echo', async (args) => {
    return args.join(' ');
  }, 'Echo text');

  register('whoami', () => {
    return 'kernel@curious:~';
  }, 'Display current user');

  return {
    parse,
    register,
    getHelp,
  };
})();

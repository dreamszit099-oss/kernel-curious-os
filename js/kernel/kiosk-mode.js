/**
 * K.E.R.N.E.L. Kiosk Mode System
 * Educational lock system with mode management
 */

const KioskMode = (() => {
  let currentMode = 'student'; // student | teacher | exploration
  let isKioskActive = true;

  const modes = {
    student: {
      name: 'Student Mode',
      restrictions: ['No refresh', 'Navigation locked'],
      allowedViews: ['dashboard', 'wiki', 'ai', 'education', 'terminal'],
    },
    teacher: {
      name: 'Teacher Mode',
      restrictions: ['Limited navigation'],
      allowedViews: ['dashboard', 'wiki', 'ai', 'education', 'terminal'],
    },
    exploration: {
      name: 'Exploration Mode',
      restrictions: ['None'],
      allowedViews: ['dashboard', 'wiki', 'ai', 'education', 'terminal'],
    },
  };

  const requestFullscreen = async () => {
    const elem = document.documentElement;
    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
      console.log('[KIOSK] Fullscreen requested');
    } catch (error) {
      console.warn('[KIOSK] Fullscreen request denied:', error);
    }
  };

  const preventBrowserEscape = () => {
    // Prevent F11 (fullscreen toggle)
    window.addEventListener('keydown', (e) => {
      if (isKioskActive && e.key === 'F11') {
        e.preventDefault();
      }
      // Prevent Alt+F4
      if (isKioskActive && e.altKey && e.key === 'F4') {
        e.preventDefault();
      }
      // Prevent Ctrl+W (close tab)
      if (isKioskActive && e.ctrlKey && e.key === 'w') {
        e.preventDefault();
      }
      // Prevent right-click context menu
      if (isKioskActive && e.key === 'F12') {
        e.preventDefault();
      }
    });

    // Prevent right-click
    document.addEventListener('contextmenu', (e) => {
      if (isKioskActive) {
        e.preventDefault();
      }
    });
  };

  const setMode = (mode) => {
    if (!modes[mode]) {
      console.error(`[KIOSK] Unknown mode: ${mode}`);
      return false;
    }
    currentMode = mode;
    console.log(`[KIOSK] Mode changed to: ${mode}`);
    return true;
  };

  const initialize = async (mode = 'student') => {
    console.log('[KIOSK] Initializing kiosk mode...');
    setMode(mode);
    preventBrowserEscape();
    
    // Request fullscreen on mobile
    if (window.innerWidth < 1024) {
      await requestFullscreen();
    }

    // Lock orientation on mobile
    if (screen.orientation && screen.orientation.lock) {
      try {
        await screen.orientation.lock('portrait-primary');
        console.log('[KIOSK] Orientation locked');
      } catch (error) {
        console.warn('[KIOSK] Orientation lock failed:', error);
      }
    }
  };

  const canAccessView = (viewName) => {
    const modeConfig = modes[currentMode];
    return modeConfig.allowedViews.includes(viewName);
  };

  const getModeInfo = () => {
    return {
      mode: currentMode,
      config: modes[currentMode],
    };
  };

  const toggleMode = () => {
    const modeList = Object.keys(modes);
    const currentIndex = modeList.indexOf(currentMode);
    const nextMode = modeList[(currentIndex + 1) % modeList.length];
    setMode(nextMode);
    return nextMode;
  };

  return {
    initialize,
    setMode,
    toggleMode,
    canAccessView,
    getModeInfo,
    requestFullscreen,
    isActive: () => isKioskActive,
  };
})();

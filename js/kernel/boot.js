/**
 * K.E.R.N.E.L. Boot Sequence
 * Lightweight initialization system
 */

const KernelBoot = (() => {
  const BOOT_DURATION = 1200; // milliseconds
  const BOOT_SCREEN = document.getElementById('boot-screen');
  const MAIN_UI = document.getElementById('main-ui');

  const animateProgress = () => {
    const progressBar = document.querySelector('.boot-progress-bar');
    if (!progressBar) return;
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;
      progressBar.style.width = progress + '%';
      
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  const initialize = () => {
    console.log('[KERNEL] Boot sequence initiated...');
    animateProgress();

    return new Promise((resolve) => {
      setTimeout(() => {
        BOOT_SCREEN.classList.add('hidden');
        MAIN_UI.classList.remove('hidden');
        console.log('[KERNEL] Boot sequence complete. System online.');
        resolve();
      }, BOOT_DURATION);
    });
  };

  return {
    initialize,
  };
})();

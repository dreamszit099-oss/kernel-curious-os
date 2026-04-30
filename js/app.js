/**
 * K.E.R.N.E.L. EDU OS - Application Initialization
 * Educational Operating System for Global Learning
 */

(async () => {
  console.log('[APP] K.E.R.N.E.L. EDU OS initializing...');

  // Boot sequence
  await KernelBoot.initialize();

  // Render sidebar and layout
  SidebarUI.render();

  // Load initial dashboard
  await KernelRouter.render('dashboard');

  console.log('[APP] K.E.R.N.E.L. EDU OS ready for learning');
})();

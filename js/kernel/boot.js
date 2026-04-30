/**
 * K.E.R.N.E.L. Boot Sequence (Stable)
 * Safe initialization + no DOM race conditions
 */

const KernelBoot = (() => {
  const BOOT_DURATION = 800; // más rápido y consistente

  const getBootScreen = () => document.getElementById("boot-screen");

  const animateProgress = () => {
    const bar = document.querySelector(".boot-progress-bar");
    if (!bar) return;

    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 25;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }

      bar.style.width = progress + "%";
    }, 80);
  };

  const hideBoot = () => {
    const boot = getBootScreen();

    // 🔥 FIX CLAVE (evita tu error actual)
    boot?.classList.add("hidden");
  };

  const startRouter = () => {
    if (window.KernelRouter?.render) {
      window.KernelRouter.render("dashboard");
    } else {
      console.warn("[KERNEL] Router not available");
    }
  };

  const initialize = () => {
    console.log("[KERNEL] Boot sequence initiated...");

    animateProgress();

    return new Promise((resolve) => {
      setTimeout(() => {
        hideBoot();
        startRouter();

        console.log("[KERNEL] Boot sequence complete. System online.");
        resolve();
      }, BOOT_DURATION);
    });
  };

  // 🔒 ANTI DOBLE BOOT
  const safeInit = () => {
    if (window.__KERNEL_BOOT__) {
      console.warn("[KERNEL] Boot already executed");
      return;
    }

    window.__KERNEL_BOOT__ = true;

    window.addEventListener("DOMContentLoaded", () => {
      initialize();
    });
  };

  return {
    init: safeInit,
  };
})();

// 🔥 AUTO START
KernelBoot.init();

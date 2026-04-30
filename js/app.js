/**
 * K.E.R.N.E.L. App Entry (Stable)
 */

console.log("[APP] K.E.R.N.E.L. EDU OS initializing...");

// ❌ NO vuelvas a llamar initialize()
// KernelBoot ya se auto-ejecuta

window.addEventListener("DOMContentLoaded", () => {
  console.log("[APP] DOM ready");

  // fallback seguro
  setTimeout(() => {
    if (window.KernelRouter?.getCurrentView?.() !== "dashboard") {
      console.warn("[APP] Forcing dashboard render...");
      window.KernelRouter?.render?.("dashboard");
    }
  }, 1200);
});

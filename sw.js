/**
 * K.E.R.N.E.L. EDU OS - Service Worker (Stable Production Version)
 * Strategy: Stale-While-Revalidate + Safe Offline Fallback
 */

const CACHE_VERSION = "kernel-edu-v2";
const STATIC_CACHE = `static-${CACHE_VERSION}`;

const ASSETS = [
  "./",
  "./index.html",
  "./styles/main.css",
  "./js/app.js",
  "./js/kernel/boot.js",
  "./js/kernel/router.js",
  "./js/ui/dashboard.js",
  "./js/ui/sidebar.js"
];

// =========================
// INSTALL
// =========================
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );

  self.skipWaiting(); // fuerza nueva versión
});

// =========================
// ACTIVATE
// =========================
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE) {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim(); // toma control inmediato
});

// =========================
// FETCH STRATEGY (CRÍTICO)
// =========================
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Solo GET
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Ignorar requests externos no necesarios
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          if (!networkRes || networkRes.status !== 200) {
            return networkRes;
          }

          const clone = networkRes.clone();

          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(req, clone);
          });

          return networkRes;
        })
        .catch(() => cached);

      // 🔥 estrategia híbrida
      return cached || fetchPromise;
    })
  );
});

// =========================
// UPDATE NOTIFICATION (IMPORTANTE)
// =========================
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

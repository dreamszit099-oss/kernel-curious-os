/**
 * K.E.R.N.E.L. EDU OS - Service Worker
 * Offline-first caching strategy for PWA
 */

const CACHE_NAME = 'kernel-edu-v1';
const ASSETS_TO_CACHE = [
  '/kernel-curious-os/',
  '/kernel-curious-os/index.html',
  '/kernel-curious-os/styles/main.css',
  '/kernel-curious-os/js/kernel/boot.js',
  '/kernel-curious-os/js/kernel/router.js',
  '/kernel-curious-os/js/kernel/data-loader.js',
  '/kernel-curious-os/js/kernel/kiosk-mode.js',
  '/kernel-curious-os/js/terminal/terminal-core.js',
  '/kernel-curious-os/js/terminal/command-parser.js',
  '/kernel-curious-os/js/ui/sidebar.js',
  '/kernel-curious-os/js/ui/dashboard.js',
  '/kernel-curious-os/js/modules/wiki.js',
  '/kernel-curious-os/js/modules/ai.js',
  '/kernel-curious-os/js/modules/education.js',
  '/kernel-curious-os/js/app.js',
  '/kernel-curious-os/data/status.json',
  '/kernel-curious-os/data/projects.json',
  '/kernel-curious-os/data/wiki_science.json',
  '/kernel-curious-os/data/wiki_math.json',
  '/kernel-curious-os/data/wiki_civic.json',
  '/kernel-curious-os/data/ai_knowledge.json',
  '/kernel-curious-os/data/education.json',
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching core assets...');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[SW] Some assets could not be cached:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only cache GET requests
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      // Return cached response if available
      if (response) {
        return response;
      }

      // Try network if not cached
      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Cache successful responses
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Offline fallback
        return new Response('Offline - Content not available', {
          status: 503,
          statusText: 'Service Unavailable',
        });
      });
    })
  );
});

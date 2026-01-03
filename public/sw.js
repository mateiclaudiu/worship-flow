// Worship Flow Service Worker - Offline Support
const CACHE_NAME = 'worship-flow-v8';

// Files to cache for offline use
const STATIC_ASSETS = [
  '/',
  '/dirigent',
  '/live',
  '/mixer',
  '/monitor',
  '/cheatsheet.html',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip WebSocket connections
  if (url.protocol === 'ws:' || url.protocol === 'wss:') {
    return;
  }

  // Mixer API: cache config, skip live control
  const mixerConfigRoutes = ['/api/mixer/config', '/api/mixer/autogain'];
  const isMixerConfig = mixerConfigRoutes.some(route => url.pathname.startsWith(route));

  // Skip live mixer control (faders, mutes, etc.) - these go direct to Soundcraft
  if (url.pathname.startsWith('/api/mixer') && !isMixerConfig) {
    return;
  }

  // For API routes (including mixer config) - network first, cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone and cache the response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Offline - serve from cache
          console.log('[SW] Offline, serving from cache:', url.pathname);
          return caches.match(event.request);
        })
    );
    return;
  }

  // For HTML pages - network first (always get latest)
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') ||
      url.pathname === '/' || url.pathname === '/live' || url.pathname === '/dirigent' ||
      url.pathname === '/mixer' || url.pathname === '/monitor') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache for offline use
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Offline - serve from cache
          console.log('[SW] Offline, serving cached page:', url.pathname);
          return caches.match(event.request);
        })
    );
    return;
  }

  // For other static assets (js, css, images) - cache first, network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version, but update cache in background
        fetch(event.request).then((response) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response);
          });
        }).catch(() => {});
        return cachedResponse;
      }

      // Not in cache - fetch from network and cache
      return fetch(event.request).then((response) => {
        // Don't cache non-ok responses
        if (!response || response.status !== 200) {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});

// Listen for messages from the app
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }

  // Force update cache
  if (event.data === 'updateCache') {
    console.log('[SW] Force updating cache...');
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    });
  }
});
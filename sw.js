const CACHE_NAME = 'photopea-cache-v1';
const urlsToCache = [
  '/',
  '/index2.html',
  '/manifest.json',
  '/image-256.png'
];

// Install event - caching core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found; otherwise, fetch from network.
        return response || fetch(event.request);
      })
  );
});

// Activate event - cleanup outdated caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('photopea-cache').then(cache => {
      return cache.addAll([
        './',
        'index2.html',
        'manifest.json',
        'image-256.png',
        'image-512.png',
        // Add other assets as needed
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

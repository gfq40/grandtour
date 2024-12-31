const CACHE_NAME = 'ultrasky-pwa-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/scarabeo.png'
  // Aggiungi qui i tuoi css/js/img, etc.
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if(key !== CACHE_NAME){
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request);
    })
  );
});




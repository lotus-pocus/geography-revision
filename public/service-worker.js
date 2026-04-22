/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'geo-revision-v9';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/images/lotus-pocus.png',
  '/fav.png',
  '/manifest.json',
];

// On install: cache assets and immediately take control
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// On activate: delete ALL old caches and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// On fetch: always go to network for HTML page loads, network-first for everything else
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // HTML navigations always fetch fresh - prevents blank page on first load
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request));
    return;
  }

  // Everything else: network first, cache as offline fallback
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
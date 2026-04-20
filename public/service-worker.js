/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'geo-revision-v1';

// All the files your app needs to work offline
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/images/lotus-pocus.png',
  '/fav.png',
  '/manifest.json',
];

// On install: cache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// On activate: delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// On fetch: serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
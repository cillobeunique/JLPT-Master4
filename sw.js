/**
 * JLPT N4 Master - Service Worker
 * Enables PWA standalone installation on iOS & Android, offline caching, and instant load.
 */

const CACHE_NAME = 'jlpt-n4-master-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './favicon.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './css/style.css',
  './css/components.css',
  './css/responsive.css',
  './js/app.js',
  './js/storage.js',
  './js/audio.js',
  './js/flashcards.js',
  './js/quiz.js',
  './js/grammar-test.js',
  './js/explore.js',
  './js/mock-exam.js',
  './js/chat.js',
  './js/data/kanji.js',
  './js/data/vocab.js',
  './js/data/grammar.js',
  './js/data/listening.js',
  './js/data/mock-exam.js',
  './js/data/chat-scenarios.js'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale While Revalidate / Cache Fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});

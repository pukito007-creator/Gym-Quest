/* Gym Quest service worker — network-first updates with offline fallback. */
const CACHE_NAME = 'gymquest-pwa-v5-one-interface';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      await cache.addAll(APP_FILES);
    } catch (error) {
      // Still allow installation if an optional icon or manifest is unavailable.
      await Promise.all(APP_FILES.map(async path => {
        try {
          const response = await fetch(path, { cache: 'no-store' });
          if (response.ok) await cache.put(path, response.clone());
        } catch (_) {}
      }));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('gymquest-pwa-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      // Prefer the newest published file; the cache is the offline fallback.
      const response = await fetch(request, { cache: 'no-store' });
      if (response && response.ok) {
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const home = await cache.match('./index.html');
        if (home) return home;
      }
      return new Response('You are offline. Reconnect and reopen Gym Quest to get the latest version.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  })());
});

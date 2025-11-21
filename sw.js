// Simple service worker for static asset caching
const CACHE_NAME = 'adviento-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/TituloCalendarioAdviento.gif',
  '/ColorFondo.png',
  '/galleta.gif'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? null : caches.delete(k))))
    ).then(() => self.clients.claim())
  );
});

function isSameOrigin(url) {
  try {
    const u = new URL(url);
    return u.origin === self.location.origin;
  } catch (_) { return false; }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (!isSameOrigin(request.url)) return;

  const dest = request.destination;
  const url = new URL(request.url);
  const isImage = dest === 'image' || /\.(?:png|jpg|jpeg|gif|webp|avif)$/i.test(url.pathname);
  const isAudio = dest === 'audio' || /\.(?:mp3|ogg|m4a|wav)$/i.test(url.pathname);
  const isStatic = dest === 'style' || dest === 'script' || dest === 'document';

  // Cache-first for heavy media; SWR for static shell
  if (isImage || isAudio || url.pathname.includes('/Iconos_gif_dias/') || url.pathname.includes('/Regalo_Cupones/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchAndCache = fetch(request).then((resp) => {
          const respClone = resp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, respClone)).catch(() => {});
          return resp;
        }).catch(() => cached);
        return cached || fetchAndCache;
      })
    );
    return;
  }

  if (isStatic) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        const network = fetch(request).then((resp) => {
          cache.put(request, resp.clone()).catch(() => {});
          return resp;
        }).catch(() => cached);
        return cached || network;
      })
    );
  }
});


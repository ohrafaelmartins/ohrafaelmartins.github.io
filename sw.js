// Service Worker para cache de recursos estáticos
const CACHE_NAME = 'atacama-guide-v3';
const urlsToCache = [
    '/',
    '/index.html',
    '/index.css',
    '/index.js',
    '/icons.css',
    '/capa-ebook.jpg',
    '/capa-ebook.webp',
    '/turista-confuso.png',
    '/turista-confuso.webp',
    '/tatio-mock.jpg',
    '/tatio-mock.webp'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    // Ignorar requests para domínios externos (Facebook, etc.)
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    // Fallback silencioso para evitar erros no console
                    return new Response(null, { status: 404 });
                });
            })
    );
});

// Limpar cache antigo
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 
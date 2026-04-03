const current_cache_name = 'v1.0.0';

self.addEventListener('install', ev => {
    ev.waitUntil(
        caches.open(current_cache_name).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
            ]);
        })
    );
});

self.addEventListener('fetch', ev => {
    ev.respondWith(
        caches.match(ev.request).then(res => {
            return res || fetch(ev.request);
        })
    );
});

self.addEventListener('activate', ev => {
    ev.waitUntil(
        caches.keys().then(names => {
            return Promise.all(
                names.map(name => {
                    if (name !== current_cache_name) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

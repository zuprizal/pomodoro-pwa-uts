const cacheName = "pomodoro-cache-v1";
const assets = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/icon.png"
];

// Install event untuk caching aset aplikasi
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Fetch event untuk menangani permintaan aset, menggunakan cache jika tersedia
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Jika aset ditemukan dalam cache, gunakan itu, jika tidak, lakukan fetch
      return cachedResponse || fetch(event.request);
    })
  );
});

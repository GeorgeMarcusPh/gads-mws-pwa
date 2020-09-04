const staticCacheName = 'pwa-weather-app-cache';
const urls = [
  /*index.html file and the root folder*/
  './',
  'index.html',

  /*the css and js files*/
  './css/styles.css',
  './css/bootstrap.min.css',
  './js/main.js',
  './js/weather-helper.js',

  /*assets*/
  './assets/android-chrome-192x192.png',
  './assets/android-chrome-512x512.png',
  './assets/apple-touch-icon.png',
  './assets/favicon.ico',
  './assets/favicon-16x16.png',
  './assets/favicon-32x32.png',
  './assets/mstile-144x144.png',
  './assets/mstile-150x150.png',
  './assets/safari-pinned-tab.svg',
  './assets/browserconfig.xml',

  /* Wether Pack Colorful Photos */
  './weather icon packs/colorful/01d.png',
  './weather icon packs/colorful/01n.png',
  './weather icon packs/colorful/02d.png',
  './weather icon packs/colorful/02n.png',
  './weather icon packs/colorful/03d.png',
  './weather icon packs/colorful/03n.png',
  './weather icon packs/colorful/04d.png',
  './weather icon packs/colorful/04n.png',
  './weather icon packs/colorful/09d.png',
  './weather icon packs/colorful/09n.png',
  './weather icon packs/colorful/10d.png',
  './weather icon packs/colorful/10n.png',
  './weather icon packs/colorful/11d.png',
  './weather icon packs/colorful/11n.png',
  './weather icon packs/colorful/13d.png',
  './weather icon packs/colorful/13n.png',
  './weather icon packs/colorful/50d.png',
  './weather icon packs/colorful/50n.png',
];

// Install the Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName)
      .then( (cache) => {
        return cache.addAll(urls);
      })
  );
});

// Activate the Service Worker
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
          .then( (cacheNames) => {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('pwa-weather') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
          })
    );
});


// Fetch offline data
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

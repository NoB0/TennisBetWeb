self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/TP2/',
        '/TP2/index.html',
        '/TP2/app.js',
        '/TP2/controllers/',
        '/TP2/controllers/betController.js',
        '/TP2/controllers/generalController.js',
        '/TP2/controllers/listMatchController.js',
        '/TP2/controllers/matchController.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
        });  
        return response;
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheKeeplist = ['v2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
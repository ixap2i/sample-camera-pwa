// @ts-nocheck
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cache-v1')
      .then(function(cache) {
        return cache.addAll([
          '/',
          '/styles.css',
          'app.js',
          '/images/default.png'
        ]);
      })
  );
  var fetchRequest = event.request.clone();
  return fetch(fetchRequest)
    .then(
      function(response) {
        // 有効な応答を受信したかどうかを確認します
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        // 有効な応答を受信したようなので、キャッシュに追加していきます。
        // 重要：リクエストと同様の理由により、レスポンスも複製します。
        var responseToCache = response.clone();
        caches.open('cache-v1')
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
      }
    );
});

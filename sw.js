/* Service worker: برآورد قیمت نادری
   - فایل‌های خود برنامه: فوری از حافظه گوشی باز می‌شود، و در پس‌زمینه نسخه جدید گرفته می‌شود (در بار بعدی باز کردن اعمال می‌شود)
   - فونت‌های گوگل: یک بار که دانلود شد در حافظه می‌ماند؛ اگر نبود حداکثر ۳ ثانیه صبر می‌کند
   وقتی index.html را عوض کردی، عدد VERSION را یکی بالا ببر. */
var VERSION = 'naderi-v7';
var SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function withTimeout(promise, ms) {
  return new Promise(function (resolve, reject) {
    var t = setTimeout(function () { reject(new Error('timeout')); }, ms);
    promise.then(function (v) { clearTimeout(t); resolve(v); }, function (err) { clearTimeout(t); reject(err); });
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(
      caches.open(VERSION).then(function (cache) {
        return cache.match(req, { ignoreSearch: true }).then(function (hit) {
          var update = fetch(req).then(function (res) {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          }).catch(function () { return null; });
          if (hit) { e.waitUntil(update); return hit; }
          return update.then(function (res) { return res || cache.match('./index.html'); });
        });
      })
    );
    return;
  }

  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(VERSION).then(function (cache) {
        return cache.match(req).then(function (hit) {
          if (hit) return hit;
          return withTimeout(fetch(req), 3000).then(function (res) {
            if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
            return res;
          }).catch(function () { return Response.error(); });
        });
      })
    );
  }
});

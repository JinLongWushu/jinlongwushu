const cacheName = 'v1';

// Cached assets required for individual assets
// const cacheAssets = [
// 	'index.html',
// 	'/About/about.html',
// 	'/css/global.css',
// 	'/js/main.js'
// ];

// Call install event
self.addEventListener('install', (e) => {
	// console.log('Service Worker: Installed');

	// Required for caching individual assets
	// e.waitUntil(
	// 	caches
	// 		.open(cacheName)
	// 		.then(cache => {
	// 			console.log('Service Worker: Caching files');
	// 			cache.addAll(cacheAssets);
	// 		})
	// 		.then(() => self.skipWaiting())
	// );
})

// Call activate event
self.addEventListener('activate', (e) => {
	// console.log('Service Worker: Activated');
	// Remove unwanted caches
	e.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if(cache !== cacheName) {
						// console.log('Service Worker: clearing old cache')
						return caches.delete(cache);
					}
				})
				)
		})
	);
})

// Call Fetch event
self.addEventListener('fetch', e => {
	// console.log('Service Worker: fetching');
	e.respondWith(
		fetch(e.request)
			.then(res => {
				// Make copy clone of reponse
				const resClone = res.clone();
				// Open Cache
				caches
					.open(cacheName)
					.then(cache => {
						// Add reponse to cache
						cache.put(e.request, resClone);
					});
					return res;
			}).catch(err => caches.match(e.request).then(res => res))
	);
})
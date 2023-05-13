// self.addEventListener('install', () => {
//     console.log('Service Worker: Installed');
//     self.skipWaiting();
// });

// self.addEventListener('activate', () => {
//     console.log('Service Worker: Activated');
// });

// self.addEventListener('fetch', (event) => {
//     console.log('Service Worker: Fetching');

//     event.respondWith(fetch(event.request));
// });


import { precacheAndRoute } from 'workbox-precaching';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', (event) => {
    console.log('Service Worker: Pushed');
});
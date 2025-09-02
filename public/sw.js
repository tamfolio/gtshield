// public/sw.js - Service Worker file
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(clients.claim());
  });
  
  // Listen for push events
  self.addEventListener('push', (event) => {
    console.log('Push event received:', event);
  
    let notificationData = {
      title: 'New Notification',
      body: 'You have a new message',
      icon: '/assets/icon-192x192.png',
      badge: '/assets/badge-72x72.png',
      tag: 'default-notification',
      requireInteraction: false,
      actions: [
        {
          action: 'view',
          title: 'View',
          icon: '/assets/view-icon.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
          icon: '/assets/dismiss-icon.png'
        }
      ],
      data: {
        url: '/',
        timestamp: Date.now()
      }
    };
  
    // Parse push data if available
    if (event.data) {
      try {
        const pushData = event.data.json();
        notificationData = {
          ...notificationData,
          ...pushData
        };
      } catch (error) {
        console.error('Error parsing push data:', error);
        notificationData.body = event.data.text() || notificationData.body;
      }
    }
  
    const promiseChain = self.registration.showNotification(
      notificationData.title,
      {
        body: notificationData.body,
        icon: notificationData.icon,
        badge: notificationData.badge,
        tag: notificationData.tag,
        requireInteraction: notificationData.requireInteraction,
        actions: notificationData.actions,
        data: notificationData.data,
        vibrate: [200, 100, 200],
        timestamp: notificationData.data.timestamp
      }
    );
  
    event.waitUntil(promiseChain);
  });
  
  // Handle notification clicks
  self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
  
    const notification = event.notification;
    const action = event.action;
    const data = notification.data;
  
    // Close the notification
    notification.close();
  
    if (action === 'dismiss') {
      // Just close the notification, no further action
      return;
    }
  
    // Default action or 'view' action
    const urlToOpen = data.url || '/';
  
    const promiseChain = clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then((windowClients) => {
      // Check if there's already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
  
      // If no existing window/tab, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
    .catch((error) => {
      console.error('Error handling notification click:', error);
    });
  
    event.waitUntil(promiseChain);
  });
  
  // Handle notification close
  self.addEventListener('notificationclose', (event) => {
    console.log('Notification closed:', event.notification.tag);
    
    // You can track notification close events here
    // For example, send analytics data
  });
  
  // Handle push subscription changes
  self.addEventListener('pushsubscriptionchange', (event) => {
    console.log('Push subscription changed:', event);
    
    const promiseChain = self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: event.oldSubscription.options.applicationServerKey
      })
      .then((newSubscription) => {
        // Send new subscription to your server
        return fetch('/api/push/update-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            oldSubscription: event.oldSubscription,
            newSubscription: newSubscription
          })
        });
      });
  
    event.waitUntil(promiseChain);
  });
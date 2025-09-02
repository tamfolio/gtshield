// utils/pushNotificationService.js
class PushNotificationService {
    constructor() {
      this.vapidPublicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;
      this.isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
    }
  
    // Check if push notifications are supported
    isNotificationSupported() {
      return this.isSupported;
    }
  
    // Request permission for notifications
    async requestPermission() {
      if (!this.isSupported) {
        throw new Error('Push notifications are not supported in this browser');
      }
  
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
  
    // Get current permission status
    getPermissionStatus() {
      if (!this.isSupported) return 'unsupported';
      return Notification.permission;
    }
  
    // Register service worker
    async registerServiceWorker() {
      if (!this.isSupported) {
        throw new Error('Service Worker is not supported');
      }
  
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', registration);
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        throw error;
      }
    }
  
    // Convert VAPID key to Uint8Array
    urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
  
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
  
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
  
    // Subscribe user to push notifications
    async subscribeUser() {
      try {
        const registration = await navigator.serviceWorker.ready;
        
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
        });
  
        console.log('User subscribed to push notifications:', subscription);
        return subscription;
      } catch (error) {
        console.error('Failed to subscribe user:', error);
        throw error;
      }
    }
  
    // Send subscription to server
    async sendSubscriptionToServer(subscription, userToken) {
      try {
        const response = await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({
            subscription: subscription,
            userAgent: navigator.userAgent
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to save subscription on server');
        }
  
        const result = await response.json();
        console.log('Subscription saved on server:', result);
        return result;
      } catch (error) {
        console.error('Error sending subscription to server:', error);
        throw error;
      }
    }
  
    // Unsubscribe from push notifications
    async unsubscribeUser() {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
  
        if (subscription) {
          await subscription.unsubscribe();
          console.log('User unsubscribed from push notifications');
          return true;
        }
        return false;
      } catch (error) {
        console.error('Failed to unsubscribe user:', error);
        throw error;
      }
    }
  
    // Get current subscription
    async getCurrentSubscription() {
      try {
        const registration = await navigator.serviceWorker.ready;
        return await registration.pushManager.getSubscription();
      } catch (error) {
        console.error('Failed to get current subscription:', error);
        return null;
      }
    }
  
    // Initialize push notifications
    async initialize(userToken) {
      if (!this.isSupported) {
        console.warn('Push notifications are not supported');
        return { success: false, error: 'Not supported' };
      }
  
      try {
        // Request permission
        const hasPermission = await this.requestPermission();
        if (!hasPermission) {
          return { success: false, error: 'Permission denied' };
        }
  
        // Register service worker
        await this.registerServiceWorker();
  
        // Subscribe user
        const subscription = await this.subscribeUser();
  
        // Send subscription to server
        await this.sendSubscriptionToServer(subscription, userToken);
  
        return { success: true, subscription };
      } catch (error) {
        console.error('Failed to initialize push notifications:', error);
        return { success: false, error: error.message };
      }
    }
  }
  
  export default new PushNotificationService();
import React, { useState, useEffect } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import pushNotificationService from './pushNotificationService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PushNotificationManager = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  // Get user token from Redux store
  const token = useSelector(state => state.user?.currentUser?.tokens?.access?.token);

  useEffect(() => {
    // Check support and current status
    const checkNotificationStatus = async () => {
      const supported = pushNotificationService.isNotificationSupported();
      setIsSupported(supported);

      if (supported) {
        const currentPermission = pushNotificationService.getPermissionStatus();
        setPermission(currentPermission);

        // Check if user is already subscribed
        const subscription = await pushNotificationService.getCurrentSubscription();
        setIsSubscribed(!!subscription);

        // Show prompt if permission is default and user is not subscribed
        if (currentPermission === 'default' && !subscription) {
          // Show prompt after a short delay to not interrupt initial page load
          setTimeout(() => setShowPrompt(true), 3000);
        }
      }
    };

    checkNotificationStatus();
  }, []);

  const handleEnableNotifications = async () => {
    setIsLoading(true);
    try {
      const result = await pushNotificationService.initialize(token);
      
      if (result.success) {
        setPermission('granted');
        setIsSubscribed(true);
        setShowPrompt(false);
        toast.success('Push notifications enabled successfully!');
      } else {
        if (result.error === 'Permission denied') {
          setPermission('denied');
          toast.error('Please enable notifications in your browser settings');
        } else {
          toast.error(`Failed to enable notifications: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast.error('An error occurred while enabling notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setIsLoading(true);
    try {
      const success = await pushNotificationService.unsubscribeUser();
      if (success) {
        setIsSubscribed(false);
        toast.success('Push notifications disabled');
      }
    } catch (error) {
      console.error('Error disabling notifications:', error);
      toast.error('Failed to disable notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissPrompt = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('notificationPromptDismissed', 'true');
  };

  // Don't show anything if not supported
  if (!isSupported) {
    return null;
  }

  // Notification prompt banner
  if (showPrompt && permission === 'default') {
    return (
      <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-6 w-6" />
            <div>
              <p className="font-medium">Stay updated with notifications</p>
              <p className="text-sm text-blue-100">
                Get instant alerts for important updates and messages
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleEnableNotifications}
              disabled={isLoading}
              className="bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              {isLoading ? 'Enabling...' : 'Enable'}
            </button>
            <button
              onClick={handleDismissPrompt}
              className="text-blue-100 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Settings component (can be used in settings page)
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isSubscribed ? (
            <Bell className="h-6 w-6 text-green-600" />
          ) : (
            <BellOff className="h-6 w-6 text-gray-400" />
          )}
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Push Notifications
            </h3>
            <p className="text-sm text-gray-500">
              {isSubscribed 
                ? 'You\'ll receive notifications for important updates'
                : 'Enable notifications to stay updated'
              }
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {permission === 'denied' && (
            <span className="text-sm text-red-600">
              Please enable in browser settings
            </span>
          )}
          
          {permission === 'granted' && (
            <button
              onClick={isSubscribed ? handleDisableNotifications : handleEnableNotifications}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${
                isSubscribed
                  ? 'bg-red-50 text-red-700 hover:bg-red-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading 
                ? (isSubscribed ? 'Disabling...' : 'Enabling...') 
                : (isSubscribed ? 'Disable' : 'Enable')
              }
            </button>
          )}
          
          {permission === 'default' && (
            <button
              onClick={handleEnableNotifications}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Enabling...' : 'Enable Notifications'}
            </button>
          )}
        </div>
      </div>

      {permission === 'denied' && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            Notifications are blocked. To enable them:
            <br />
            1. Click the lock icon in your browser's address bar
            <br />
            2. Change notifications to "Allow"
            <br />
            3. Refresh this page
          </p>
        </div>
      )}
    </div>
  );
};

export default PushNotificationManager;
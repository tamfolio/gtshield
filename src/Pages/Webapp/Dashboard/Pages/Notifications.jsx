import React, { useState } from 'react';
import { 
  Shield, 
  Lightbulb, 
  WifiOff, 
  Cloud, 
  BarChart3, 
  UserCheck, 
  RefreshCw, 
  AlertTriangle, 
  Settings, 
  Tv,
  Home,
  Bell
} from 'lucide-react';
import Navbar from '../../../../Components/Website/Navbar';


const NotificationItem = ({ icon: Icon, title, message, time, color = "blue", isNew = false }) => (
  <div className={`flex items-start space-x-3 p-4 rounded-lg transition-colors hover:bg-gray-50 ${isNew ? 'bg-white' : 'bg-white'}`}>
    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-${color}-100`}>
      <Icon className={`w-5 h-5 text-${color}-600`} />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 flex items-center">
          {title}
          {isNew && <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>}
        </h3>
        <span className="text-xs text-gray-500 ml-2">{time}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{message}</p>
    </div>
  </div>
);

function Notifications() {
  const [showAll, setShowAll] = useState(false);

  const newNotifications = [
    {
      icon: Shield,
      title: "Security Alert",
      message: "Door left unlocked! Lock it remotely for enhanced home security.",
      time: "1h",
      color: "red",
      isNew: true
    },
    {
      icon: Lightbulb,
      title: "Energy Saver Tip",
      message: "Did you know? Lower your energy bill by setting smart schedules for your lights and thermostat.",
      time: "15m",
      color: "green",
      isNew: true
    },
    {
      icon: WifiOff,
      title: "Device Offline",
      message: "Oops! It seems your smart plug is offline. Tap to troubleshoot and get it back online.",
      time: "25m",
      color: "red",
      isNew: true
    },
    {
      icon: Cloud,
      title: "Weather Automation",
      message: "Rainy day ahead! Your smart blinds can close automatically. Adjust settings now.",
      time: "15m",
      color: "blue",
      isNew: true
    },
    {
      icon: Lightbulb,
      title: "Energy Reminder",
      message: "Your lamp has been on for an extended period. Tap to control and manage your lighting.",
      time: "30m",
      color: "yellow",
      isNew: true
    }
  ];

  const todayNotifications = [
    {
      icon: AlertTriangle,
      title: "Motion Detected",
      message: "Motion detected in your living room! Tap to view live feed and ensure everything is secure.",
      time: "1d",
      color: "red"
    },
    {
      icon: WifiOff,
      title: "Device Offline",
      message: "Uh-oh! One of your smart plug is offline. Reconnect to resume control.",
      time: "1d",
      color: "yellow"
    },
    {
      icon: BarChart3,  
      title: "Energy Usage Snapshot",
      message: "Get insights! Your energy usage report is ready. Tap to review and optimize.",
      time: "1d",
      color: "blue"
    },
    {
      icon: UserCheck,
      title: "Guest Access Granted",
      message: "Welcome your guest! Grant access to your smart lock with a simple tap.",
      time: "1d",
      color: "blue"
    }
  ];

  const yesterdayNotifications = [
    {
      icon: RefreshCw,
      title: "Update Available",
      message: "Exciting news! A new update for your smart devices is ready. Tap to upgrade now.",
      time: "4d",
      color: "blue"
    },
    {
      icon: Lightbulb,
      title: "Surprise Activation",
      message: "Unexpected device activation. Verify and control your smart devices.",
      time: "4d",
      color: "yellow"
    },
    {
      icon: Settings,
      title: "Maintenance Notice",
      message: "Scheduled maintenance tonight. Expect brief disruptions. Apologies for any inconvenience.",
      time: "1d",
      color: "red"
    },
    {
      icon: Tv,
      title: "Device Standby Alert",
      message: "Your smart TV and Air Conditioner has been inactive. Turn it off to save energy.",
      time: "1d",
      color: "yellow"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true}/>
      
      <div className="max-w-4xl mx-auto px-4 py-6 bg-[#FAFAFA]">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Home className="w-4 h-4" />
          <span>/</span>
          <span>Notification</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Notification</h1>
        </div>

        {/* New Notifications Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">New Notification</h2>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Mark all as read
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {newNotifications.map((notification, index) => (
              <NotificationItem key={index} {...notification} />
            ))}
          </div>
        </div>

        {/* Today Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Today</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {todayNotifications.map((notification, index) => (
              <NotificationItem key={index} {...notification} />
            ))}
          </div>
        </div>

        {/* Yesterday Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Yesterday</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {yesterdayNotifications.map((notification, index) => (
              <NotificationItem key={index} {...notification} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
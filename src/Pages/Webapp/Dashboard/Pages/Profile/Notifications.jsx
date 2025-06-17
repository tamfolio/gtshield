import React, { useState } from 'react';

const ProfileNotifications = () => {
  const [settings, setSettings] = useState({
    reportStatus: {
      push: true,
      email: true,
    },
    emergencyAlerts: {
      push: true,
      email: false,
    },
    moreActivity: {
      push: false,
      email: false,
    },
  });

  const handleToggle = (category, type) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type],
      },
    }));
  };

  const ToggleSwitch = ({ isOn, onToggle, disabled = false }) => (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isOn ? 'bg-blue-600' : 'bg-gray-200'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
          isOn ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const NotificationSection = ({ title, description, category, showEmailToggle = true }) => (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Push</span>
          <ToggleSwitch
            isOn={settings[category].push}
            onToggle={() => handleToggle(category, 'push')}
          />
        </div>
        
        {showEmailToggle && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <ToggleSwitch
              isOn={settings[category].email}
              onToggle={() => handleToggle(category, 'email')}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl bg-[#FAFAFA] px-5 py-5">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Notification settings</h2>
        <p className="text-sm text-gray-600">
          We may still send you important notifications about your account outside of your notification settings.
        </p>
      </div>

      <div className="space-y-8">
        <NotificationSection
          title="Report Status Updates"
          description="These are notifications for updates on your reported incident."
          category="reportStatus"
        />

        <NotificationSection
          title="Emergency Alerts"
          description="These are notifications to alert you of incidents happening within your area"
          category="emergencyAlerts"
        />

        <NotificationSection
          title="More activity about you"
          description="These are notifications for posts on your profile, likes and other reactions to your posts, and more."
          category="moreActivity"
        />
      </div>
    </div>
  );
};

export default ProfileNotifications;
import React, { useState } from "react";
import Navbar from "../../Components/Website/Navbar";
import SignUpFirstPage from "../../Components/Webapp/Auth/SignUpFirst";
import SignUpSecondPage from "../../Components/Webapp/Auth/SignUpSecondPage";

const NotificationPermission = ({ onAllow, onDontAllow }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
        <h2 className="text-lg font-semibold mb-4">
          "GATEWAY SHIELD" Would Like to Send You Notifications
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Notifications may include alerts, sounds, and icon badges. These can
          be configured in Settings.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onDontAllow}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Don't Allow
          </button>
          <button
            onClick={onAllow}
            className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};

// Background Location Permission Component
const BackgroundLocationPermission = ({
  onAlwaysAllow,
  onKeepOnlyWhileUsing,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
        <h2 className="text-lg font-semibold mb-4">
          Allow "GATEWAY SHIELD" to also use your location even when you are not
          using the app?
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Gateway Shield uses your background location to alert you if something
          unsafe is happening nearby
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onAlwaysAllow}
            className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Change to Always Allow
          </button>
          <button
            onClick={onKeepOnlyWhileUsing}
            className="py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Keep Only While Using
          </button>
        </div>
      </div>
    </div>
  );
};

// Location Permission Component
const LocationPermission = ({
  onAllowWhileUsing,
  onAllowOnce,
  onDontAllow,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
        <h2 className="text-lg font-semibold mb-4">
          Allow "GATEWAY SHIELD" to use your location?
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Gateway Shield uses your location to display nearby safety
          information.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onAllowWhileUsing}
            className="py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Allow While Using App
          </button>
          <button
            onClick={onAllowOnce}
            className="py-3 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
          >
            Allow Once
          </button>
          <button
            onClick={onDontAllow}
            className="py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Don't Allow
          </button>
        </div>
      </div>
    </div>
  );
};

function SignUp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPermission, setCurrentPermission] = useState(0);

  const goToNextPage = () => {
    setCurrentPage(2);
  };

  const goToPreviousPage = () => {
    setCurrentPage(1);
  };

  const handleSecondPageSubmit = () => {
    // Start the permission flow
    setCurrentPermission(1);
  };
  
  const handleNotificationPermission = (allowed) => {
    console.log("Notification permission:", allowed ? "allowed" : "denied");
    setCurrentPermission(2); // Move to background location permission
  };

  const handleBackgroundLocationPermission = (always) => {
    console.log(
      "Background location permission:",
      always ? "always" : "while using"
    );
    setCurrentPermission(3); // Move to location permission
  };

  const handleLocationPermission = (permission) => {
    console.log("Location permission:", permission);
    setCurrentPermission(0); // End permission flow
    // Here you can redirect to the main app or dashboard
    alert("All permissions handled! Redirecting to app...");
  };

  return (
    <div>
      <Navbar />
      {currentPage === 1 && <SignUpFirstPage onNext={goToNextPage} />}
      {currentPage === 2 && <SignUpSecondPage onPrevious={goToPreviousPage} onSubmit={handleSecondPageSubmit}/>}
      {currentPermission === 1 && (
        <NotificationPermission
          onAllow={() => handleNotificationPermission(true)}
          onDontAllow={() => handleNotificationPermission(false)}
        />
      )}

      {currentPermission === 2 && (
        <BackgroundLocationPermission
          onAlwaysAllow={() => handleBackgroundLocationPermission(true)}
          onKeepOnlyWhileUsing={() => handleBackgroundLocationPermission(false)}
        />
      )}

      {currentPermission === 3 && (
        <LocationPermission
          onAllowWhileUsing={() => handleLocationPermission("while-using")}
          onAllowOnce={() => handleLocationPermission("once")}
          onDontAllow={() => handleLocationPermission("denied")}
        />
      )}
    </div>
  );
}

export default SignUp;

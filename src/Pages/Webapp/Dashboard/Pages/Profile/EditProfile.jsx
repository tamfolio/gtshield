import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'; // or your preferred toast library
import { userRequest } from "../../../../../requestMethod";
import { updateUserPhone } from "../../../../../Redux/LoginSlice";// Import the action

const EditProfile = ({ onCancel, existingIncident }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user?.currentUser?.user);
  const [formData, setFormData] = useState({
    phoneNumber: userData?.phoneNumber || '',
    // Add station data from existing incident if available
    stationId: existingIncident?.station?.id || '',
    stationFormation: existingIncident?.station?.formation || '',
    // Add location data for station API
    longitude: null,
    latitude: null,
    radius: 10, // Default radius as required
    address: existingIncident?.address || '' // Decoded address for display
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [stations, setStations] = useState([]);
  const [isLoadingStations, setIsLoadingStations] = useState(false);
  
  const token = useSelector(
    (state) => state?.user?.currentUser?.tokens?.access?.token
  );

  // Function to fetch nearby stations whenever location params change
  const fetchNearbyStations = async (lat, lng, rad) => {
    if (!lat || !lng) return;

    try {
      setIsLoadingStations(true);
      const response = await userRequest(token).get('/stations/nearby', {
        params: {
          latitude: lat,
          longitude: lng,
          radius: rad || 20
        }
      });
      
      console.log("Nearby stations:", response.data);
      setStations(response.data?.stations || []);
      
    } catch (error) {
      console.error("Error fetching stations:", error);
      toast.error("Failed to fetch nearby stations");
      setStations([]);
    } finally {
      setIsLoadingStations(false);
    }
  };

  // Auto-fetch stations when location parameters change
  React.useEffect(() => {
    if (formData.latitude && formData.longitude) {
      fetchNearbyStations(formData.latitude, formData.longitude, formData.radius);
    }
  }, [formData.latitude, formData.longitude, formData.radius]);

  const onChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to get user's current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange("latitude", position.coords.latitude);
        onChange("longitude", position.coords.longitude);
        toast.success("Location obtained successfully");
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Failed to get current location");
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      }
    );
  };

  const handlePhoneUpdate = async () => {
    // Validate phone number
    if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
      alert("Please enter a valid phone number");
      return;
    }

    // Optional: Add phone number format validation
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert("Please enter a valid phone number format");
      return;
    }

    setIsLoading(true);

    try {
      const bodyData = {
        phoneNumber: formData.phoneNumber.trim(),
        // Include station data if available
        ...(formData.stationId && {
          stationId: formData.stationId,
          stationFormation: formData.stationFormation
        })
      };

      console.log("🚀 Updating profile with data:", bodyData);

      const res = await userRequest(token).patch("/user/update/basic", bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Profile updated:", res.data);
      
      // Update Redux state immediately after successful API call
      dispatch(updateUserPhone(formData.phoneNumber.trim()));
      
      // Show success message
      toast.success("Profile updated successfully!");
      
      // Navigate back or close edit mode
      if (onCancel) {
        onCancel();
      }
      
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      
      // Handle different error scenarios
      if (err.response?.status === 400) {
        toast.error("Invalid data format");
      } else if (err.response?.status === 409) {
        toast.error("Phone number already exists");
      } else {
        toast.error(err.response?.data?.message || "Failed to update profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Personal Information
        </h1>
        <p className="text-gray-600">
          Update your phone number and view location information. Other details are read-only.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Personal Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600">
                  {userData?.fullName || "Not provided"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600">
                  {userData?.email || "Not provided"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600">
                  {userData?.userName || "Not provided"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600">
                  {userData?.gender || "Not specified"}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => onChange("phoneNumber", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Station Information */}
          {formData.stationFormation && (
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Station Assignment</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Station</label>
                <div className="w-full border rounded-lg px-3 py-2.5 bg-blue-50 text-blue-700 font-medium">
                  {formData.stationFormation}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Location & Address */}
        <div className="space-y-6">
          {/* Address Section */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Address</label>
              <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600 min-h-[60px] flex items-center">
                {formData.address || userData?.address || "No address available"}
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Location Coordinates</h2>
              <button
                onClick={getCurrentLocation}
                disabled={isLoadingLocation}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                {isLoadingLocation ? "Getting..." : "Get My Location"}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.latitude || ''}
                  onChange={(e) => onChange("latitude", parseFloat(e.target.value) || null)}
                  placeholder="Enter latitude"
                  className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.longitude || ''}
                  onChange={(e) => onChange("longitude", parseFloat(e.target.value) || null)}
                  placeholder="Enter longitude"
                  className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Radius (km)</label>
              <input
                type="number"
                value={formData.radius}
                onChange={(e) => onChange("radius", parseInt(e.target.value) || 20)}
                min="1"
                max="100"
                className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Nearby Stations */}
          {(formData.latitude && formData.longitude) && (
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Nearby Police Stations</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {isLoadingStations ? "Loading..." : `${stations.length} found`}
                </span>
              </div>
              
              {isLoadingStations ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Searching for stations...</span>
                </div>
              ) : stations.length > 0 ? (
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {stations.map((station, index) => (
                    <div key={station.id || index} className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors">
                      <div className="font-medium text-gray-900 mb-1">
                        {station.formation || station.name || `Station ${index + 1}`}
                      </div>
                      {station.address && (
                        <div className="text-gray-600 text-sm mb-2">{station.address}</div>
                      )}
                      {station.distance && (
                        <div className="text-blue-600 text-sm font-medium">
                          📍 {station.distance} km away
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🔍</div>
                  <p>No stations found within {formData.radius}km radius</p>
                  <p className="text-sm mt-1">Try increasing the search radius</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handlePhoneUpdate}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-w-[120px]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Updating...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
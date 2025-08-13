import React, { useState, useCallback, useEffect, useRef } from "react";
import { userRequest } from "../../../requestMethod";
import { Upload, MapPin, Search, X, Check } from "lucide-react";
import Select from "react-select";
import { fetchIncidentTypes } from "../../../Api/incidentApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  OgunStateAddressAutocomplete,
  fetchOgunStateStations,
  isCoordinateInOgunState,
} from "./OgunStateAddressAutocomplete";
// Alternative approach using fetch API for geocoding
const GOOGLE_MAPS_API_KEY = "AIzaSyALniH6V8qHvDGFQzIM6dAWetIwQbx6ueU";

// Simple Address Input Component (no Google API complexity)
const AddressAutocomplete = ({ value, onChange, disabled, placeholder }) => {
  return (
    <input
      type="text"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

// Fetch nearby stations using the correct API endpoint
const fetchNearbyStations = async (latitude, longitude) => {
  try {
    const url = `https://admin-api.thegatewayshield.com/api/v1/feedback/caseReview/stations?longitude=${longitude}&latitude=${latitude}`;
    console.log("Fetching stations from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Stations API response:", data);

    if (data.success && data.data && Array.isArray(data.data)) {
      const stations = data.data.map((station) => ({
        label: `${
          station.formation || station.name || `Station ${station.id}`
        } ${station.distance ? `(${station.distance.toFixed(1)}km away)` : ""}`,
        value: station.id,
        latitude: station.latitude,
        longitude: station.longitude,
        distance: station.distance || 0,
        formation: station.formation,
        name: station.name,
      }));

      // Sort by distance
      stations.sort((a, b) => a.distance - b.distance);

      console.log(`Found ${stations.length} stations:`, stations);
      return stations;
    }

    console.log("No stations found in response");
    return [];
  } catch (error) {
    console.error("Error fetching nearby stations:", error);
    throw error; // Re-throw to handle in calling function
  }
};
function ReportAnIncident({ setCurrentPage, setTrackingId }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userData = useSelector((state) => state.user?.currentUser?.user);
  const token = useSelector(
    (state) => state.user?.currentUser?.tokens?.access?.token
  );

  const [formData, setFormData] = useState({
    incidentType: "",
    description: "",
    address: "",
    useMyLocation: true,
    nearestPoliceStation: "",
    images: [],
    video: null,
    hideIdentity: false,
  });

  const [stations, setStations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingStations, setIsLoadingStations] = useState(false);
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [showDraftSuccess, setShowDraftSuccess] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);

  // Load Google Maps API if not already loaded (with async loading)
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps && window.google.maps.places) {
        return;
      }

      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      // Add callback function to window
      window.initMap = () => {
        console.log("Google Maps API loaded successfully");
      };

      script.onerror = () => {
        console.error("Failed to load Google Maps API");
      };

      document.head.appendChild(script);
    };

    loadGoogleMapsAPI();
  }, []);

  // Function to reverse geocode coordinates to address using direct API call
  const reverseGeocode = useCallback(async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}&region=ng&language=en`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        console.error("Geocoding failed:", data.status);
        return `${latitude}, ${longitude}`;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      // Fallback to coordinates if geocoding fails
      return `${latitude}, ${longitude}`;
    }
  }, []);

  // Address validation function
  const validateAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GOOGLE_MAPS_API_KEY}&region=ng&language=en`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;

        // Check if the address is in Nigeria
        const isInNigeria = result.address_components.some(
          (component) =>
            component.types.includes("country") && component.short_name === "NG"
        );

        if (!isInNigeria) {
          throw new Error("Please enter a valid Nigerian address");
        }

        return {
          isValid: true,
          coordinates: { latitude: lat, longitude: lng },
          formattedAddress: result.formatted_address,
        };
      } else {
        throw new Error("Address not found. Please enter a valid address.");
      }
    } catch (error) {
      return {
        isValid: false,
        error: error.message || "Invalid address",
      };
    }
  };

  // Function to get user's current location
  const getCurrentLocation = useCallback(() => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          try {
            const address = await reverseGeocode(latitude, longitude);

            setFormData((prev) => ({
              ...prev,
              address: address,
              useMyLocation: true,
              nearestPoliceStation: null,
            }));

            // Fetch nearby stations
            setIsLoadingStations(true);
            try {
              const nearbyStations = await fetchNearbyStations(
                latitude,
                longitude
              );
              setStations(nearbyStations);
            } catch (error) {
              console.error("Error fetching stations:", error);
              setStations([]);
            } finally {
              setIsLoadingStations(false);
            }
          } catch (error) {
            setFormData((prev) => ({
              ...prev,
              address: `${latitude}, ${longitude}`,
              useMyLocation: true,
            }));
          }

          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);

          let errorMessage =
            "Unable to get your location. Please enter your address manually.";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Location access denied. Please enable location permissions and try again.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage =
                "Location information is unavailable. Please enter your address manually.";
              break;
            case error.TIMEOUT:
              errorMessage =
                "Location request timed out. Please try again or enter your address manually.";
              break;
          }

          alert(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000, // Increased timeout
          maximumAge: 300000, // 5 minutes
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert("Geolocation is not supported by this browser.");
    }
  }, [reverseGeocode]);

  // Fetch incident types on component mount
  useEffect(() => {
    const getTypes = async () => {
      try {
        const rawData = await fetchIncidentTypes();
        console.log("API response:", rawData);
        const formattedData = rawData?.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setIncidentTypes(formattedData);
      } catch (error) {
        console.error("Error fetching incident types:", error);
      }
    };

    getTypes();
  }, []);

  const handleDescriptionChange = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleAddressChange = async (e) => {
    const newAddress = e.target.value;
    setFormData((prev) => ({ ...prev, address: newAddress }));
    setAddressError("");

    // Clear stations when address changes manually
    if (!formData.useMyLocation) {
      setFormData((prev) => ({ ...prev, nearestPoliceStation: null }));
      setStations([]);

      // Only validate if user typed a substantial address (not from autocomplete)
      if (newAddress.length > 15 && !newAddress.includes(",")) {
        setIsValidatingAddress(true);

        clearTimeout(window.validationTimeout);
        window.validationTimeout = setTimeout(async () => {
          const validation = await validateAddress(newAddress);

          if (validation.isValid) {
            setUserLocation(validation.coordinates);

            setIsLoadingStations(true);
            const nearbyStations = await fetchNearbyStations(
              validation.coordinates.latitude,
              validation.coordinates.longitude
            );
            setStations(nearbyStations);
            setIsLoadingStations(false);
          } else {
            setAddressError(validation.error);
            setUserLocation(null);
            setStations([]);
          }

          setIsValidatingAddress(false);
        }, 2000);
      }
    }
  };
  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.filter((file) => file.type.startsWith("image/"));
    const newVideos = files.filter((file) => file.type.startsWith("video/"));

    const oversized = files.find((file) => file.size > 10 * 1024 * 1024);
    if (oversized) {
      alert("Each file must be less than 10MB.");
      return;
    }

    if (newImages.length + formData.images.length > 3) {
      alert("You can upload up to 3 images only.");
      return;
    }

    if (newVideos.length > 1 || (formData.video && newVideos.length > 0)) {
      alert("Only one video can be uploaded.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
      video: newVideos[0] || prev.video,
    }));
  };

  const handleIncidentTypeChange = useCallback((selectedOption) => {
    if (!selectedOption || typeof selectedOption !== "object") {
      setFormData((prev) => ({ ...prev, incidentType: null }));
      return;
    }
    setFormData((prev) => ({ ...prev, incidentType: selectedOption }));
  }, []);

  const handleStationChange = useCallback((selected) => {
    setFormData((prev) => ({ ...prev, nearestPoliceStation: selected }));
  }, []);

const getCurrentLocationOgunState = useCallback(() => {
  setIsLoadingLocation(true);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        // Check if user is in Ogun State
        const inOgunState = isCoordinateInOgunState(latitude, longitude);
        
        if (!inOgunState) {
          const confirmProceed = window.confirm(
            'Your current location appears to be outside Ogun State. Do you want to continue or would you prefer to enter an Ogun State address manually?'
          );
          
          if (!confirmProceed) {
            setIsLoadingLocation(false);
            setFormData(prev => ({ ...prev, useMyLocation: false }));
            return;
          }
        }

        try {
          const address = await reverseGeocode(latitude, longitude);
          
          setFormData((prev) => ({
            ...prev,
            address: address,
            useMyLocation: true,
            nearestPoliceStation: null
          }));

          // Fetch Ogun State stations using your working API
          setIsLoadingStations(true);
          const nearbyStations = await fetchOgunStateStations(latitude, longitude);
          setStations(nearbyStations);
          
          if (inOgunState && nearbyStations.length > 0) {
            console.log(`Found ${nearbyStations.length} police stations in Ogun State near you`);
          }
          
          setIsLoadingStations(false);
        } catch (error) {
          setFormData((prev) => ({
            ...prev,
            address: `${latitude}, ${longitude}`,
            useMyLocation: true,
          }));
          setIsLoadingStations(false);
        }

        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLoadingLocation(false);
        
        let errorMessage = "Unable to get your location. Please enter your Ogun State address manually.";
        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );
  } else {
    setIsLoadingLocation(false);
    alert("Geolocation is not supported by this browser. Please enter your Ogun State address manually.");
  }
}, [reverseGeocode]);


  const handleHideIdentityChange = (e) => {
    setFormData((prev) => ({ ...prev, hideIdentity: e.target.checked }));
  };

  const handleRedirectToDashboard = () => {
    setShowSuccess(false);
    setShowDraftSuccess(false);
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/";
    }
  };

  const handleSaveAsDraft = async () => {
    if (!formData.incidentType || !formData.description || !formData.address) {
      alert(
        "Please fill in all required fields (Incident Type, Description, and Address)"
      );
      return;
    }

    try {
      const bodyData = {
        incidentTypeId: formData.incidentType?.value,
        isDraft: true,
        address: formData.address,
        description: formData.description,
        isIdentityHidden: formData.hideIdentity,
        isLocationHidden: false,
        isAnonymous: false,
        channel: "web",
        stationId: formData.nearestPoliceStation?.value || null,
        userId: userData.id,
        ...(userLocation && {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }),
      };

      console.log("🚀 Submitting form with data:", formData);
      console.log("🚀 Body data:", bodyData);

      const formPayload = new FormData();
      formPayload.append("data", JSON.stringify(bodyData));

      // Append images correctly
      formData.images.forEach((image, index) => {
        formPayload.append(`images`, image);
      });

      // Append video if exists
      if (formData.video) {
        formPayload.append("video", formData.video);
      }

      const res = await userRequest(token).post("/incident/new", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowDraftSuccess(true);
      console.log("✅ Incident reported:", res.data);

      if (setCurrentPage) {
        setCurrentPage("confirmation");
      }
    } catch (err) {
      console.error("❌ Failed to submit incident:", err);
      toast(err.response.data.message);
    }
  };

  const handleSubmit = async () => {
    if (!formData.incidentType || !formData.description || !formData.address) {
      alert(
        "Please fill in all required fields (Incident Type, Description, and Address)"
      );
      return;
    }

    try {
      const bodyData = {
        incidentTypeId: formData.incidentType?.value,
        isDraft: false,
        address: formData.address,
        description: formData.description,
        isIdentityHidden: formData.hideIdentity,
        isLocationHidden: false,
        isAnonymous: false,
        channel: "web",
        stationId: formData.nearestPoliceStation?.value || null,
        userId: userData.id,
        ...(userLocation && {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }),
      };

      console.log("🚀 Submitting form with data:", formData);
      console.log("🚀 Body data:", bodyData);

      const formPayload = new FormData();
      formPayload.append("data", JSON.stringify(bodyData));

      // Append images correctly
      formData.images.forEach((image, index) => {
        formPayload.append(`images`, image);
      });

      // Append video if exists
      if (formData.video) {
        formPayload.append("video", formData.video);
      }

      const res = await userRequest(token).post("/incident/new", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Incident reported:", res.data);
      setShowSuccess(true);
      setTicketId(res.data.data.ticketId);
      setTrackingId(res.data.data.ticketId);

      if (setCurrentPage) {
        setCurrentPage("confirmation");
      }
    } catch (err) {
      console.error("❌ Failed to submit incident:", err);
      toast(err.response.data.message);
    }
  };

  const handleAnonSubmit = async () => {
    if (!formData.incidentType || !formData.description) {
      alert(
        "Please fill in all required fields (Incident Type and Description)"
      );
      return;
    }

    try {
      const bodyData = {
        incidentTypeId: formData.incidentType?.value,
        isDraft: false,
        address: "",
        description: formData.description,
        isIdentityHidden: null,
        isLocationHidden: false,
        isAnonymous: true,
        channel: "web",
        stationId: null,
        userId: null,
      };

      console.log("🚀 Submitting form with data:", formData);
      console.log("🚀 Body data:", bodyData);

      const formPayload = new FormData();
      formPayload.append("data", JSON.stringify(bodyData));

      // Append images correctly for anonymous submission too
      formData.images.forEach((image, index) => {
        formPayload.append(`images`, image);
      });

      // Append video if exists
      if (formData.video) {
        formPayload.append("video", formData.video);
      }

      const res = await userRequest(token).post("/incident/new", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Incident reported:", res.data);
      setShowSuccess(true);
      setTrackingId(res.data.data.ticketId);
      setTicketId(res.data.data.ticketId);

      if (setCurrentPage) {
        setCurrentPage("confirmation");
      }
    } catch (err) {
      console.error("❌ Failed to submit incident:", err);
      toast(err.response.data.message);
    }
  };

  const SuccessDraftModal = () => (
    <div
      className="fixed inset-0 bg-[rgba(16,24,40,0.7)] bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowDraftSuccess(false)}
    >
      <div
        className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowDraftSuccess(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Saved As Draft
        </h2>

        <p className="text-gray-600 mb-6">Report Saved as Draft</p>

        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            View Draft
          </button>

          <button
            onClick={() => setShowDraftSuccess(false)}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Stay on Page
          </button>

          <button
            onClick={handleRedirectToDashboard}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Redirect to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  const SuccessModal = () => (
    <div
      className="fixed inset-0 bg-[rgba(16,24,40,0.7)] bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowSuccess(false)}
    >
      <div
        className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowSuccess(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Report submitted successfully
        </h2>

        <p className="text-gray-600 mb-6">
          Your Ticket ID is <span className="font-medium">{ticketId}</span>
        </p>

        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            View Report
          </button>

          <button
            onClick={() => setShowSuccess(false)}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Stay on Page
          </button>

          <button
            onClick={handleRedirectToDashboard}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Redirect to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
 const handleOgunStatePlaceSelect = async (addressData) => {
  console.log('🏠 Ogun State place selected:', addressData);
  
  setUserLocation(addressData.coordinates);
  setAddressError("");
  
  setFormData((prev) => ({
    ...prev,
    address: addressData.formatted_address,
    nearestPoliceStation: null
  }));
  
  // Show location context
  if (addressData.isInOgunState) {
    console.log('✅ Address confirmed in Ogun State');
  } else {
    console.log('⚠️ Address outside Ogun State - will show nearest available stations');
  }
  
  setIsLoadingStations(true);
  
  try {
    const nearbyStations = await fetchOgunStateStations(
      addressData.coordinates.latitude, 
      addressData.coordinates.longitude
    );
    
    if (nearbyStations.length === 0) {
      console.warn('No police stations found near this location');
    } else {
      console.log(`✅ Loaded ${nearbyStations.length} Ogun State stations`);
    }
    
    setStations(nearbyStations);
    
  } catch (error) {
    console.error('❌ Error loading Ogun State stations:', error);
    setStations([]);
  } finally {
    setIsLoadingStations(false);
  }
};
  const handleQuickAreaSelect = async (area) => {
    console.log(`🎯 Quick selecting area: ${area}`);

    // Use Google Geocoding to get coordinates for the area
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          area + ", Ogun State, Nigeria"
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );

      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;

        const addressData = {
          formatted_address: result.formatted_address,
          coordinates: { latitude: lat, longitude: lng },
          isInOgunState: true,
        };

        setFormData((prev) => ({ ...prev, address: result.formatted_address }));
        await handleOgunStatePlaceSelect(addressData);
      }
    } catch (error) {
      console.error("Error with quick area select:", error);
      toast.error(`Failed to load ${area} location`);
    }
  };

const getOgunStationPlaceholder = () => {
  if (isLoadingStations) return "Searching for stations...";
  if (!userLocation) return "Please enter an address first";
  if (stations.length === 0) return "No stations found nearby";
  return "Select nearest police station";
};

  const getOgunStationNoOptionsMessage = () => {
    if (!userLocation)
      return "Enter a valid Ogun State address to see nearby stations";
    return "No police stations found in Ogun State near this location. You can still submit your report.";
  };

  // Enhanced getCurrentLocation for Ogun State context
const handleLocationCheckboxChange = useCallback(
  async (checked) => {
    if (checked) {
      getCurrentLocationOgunState(); 
    } else {
      setFormData((prev) => ({
        ...prev,
        useMyLocation: false,
        address: "",
        nearestPoliceStation: null,
      }));
      setUserLocation(null);
      setStations([]);
      setAddressError("");
    }
  },
  [getCurrentLocationOgunState] // Now this dependency exists
);



  // Enhanced placeholder messages for police stations select
  const getStationPlaceholder = () => {
    if (isLoadingStations) return "Loading nearby stations...";
    if (!userLocation) return "Please enter a valid address first";
    if (stations.length === 0)
      return "No stations found nearby - try a different address";
    return "Select nearest police station";
  };

  const getStationNoOptionsMessage = () => {
    if (!userLocation) return "Enter a valid address to see nearby stations";
    return "No stations found nearby. The area might not have registered stations.";
  };

  useEffect(() => {
    if (isAuthenticated && formData.useMyLocation) {
      handleLocationCheckboxChange(true);
    }
  }, [isAuthenticated]);

  const handlePlaceSelect = async (addressData) => {
    console.log("Place selected:", addressData);

    setUserLocation(addressData.coordinates);
    setAddressError(""); // Clear any previous errors

    // Update form data with the selected address
    setFormData((prev) => ({
      ...prev,
      address: addressData.formatted_address,
      nearestPoliceStation: null, // Clear previous station selection
    }));

    // Fetch nearby stations
    setIsLoadingStations(true);
    try {
      const nearbyStations = await fetchNearbyStations(
        addressData.coordinates.latitude,
        addressData.coordinates.longitude
      );
      setStations(nearbyStations);
    } catch (error) {
      console.error("Error fetching nearby stations:", error);
      setStations([]);
    } finally {
      setIsLoadingStations(false);
    }
  };

  return (
    <>
      <div>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {!isAuthenticated && (
              <div className="flex gap-2 mb-8 justify-start">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50">
                  Report An Incident
                </button>
                <button
                  onClick={() => setCurrentPage("track")}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50"
                >
                  Track an Anonymous Report
                </button>
              </div>
            )}

            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
              {!isAuthenticated && (
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Report An Incident
                  </h1>
                  <p className="text-gray-600">
                    Explain what happened and elaborate on the incident you
                    would like to report.
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {/* Incident Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Type *
                  </label>
                  <Select
                    options={incidentTypes}
                    value={formData.incidentType}
                    onChange={handleIncidentTypeChange}
                    placeholder="Select incident type"
                    isSearchable
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>

                {/* Address */}
             {isAuthenticated && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Address *
    </label>
    
    <OgunStateAddressAutocomplete
      value={formData.address}
      onChange={handleAddressChange}
      disabled={formData.useMyLocation}
      placeholder="Start typing your address in Ogun State..."
      onPlaceSelect={handleOgunStatePlaceSelect}
    />
    
    {/* Location validation feedback */}
    {isValidatingAddress && (
      <p className="mt-1 text-sm text-blue-600 flex items-center">
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-2"></div>
        Validating address...
      </p>
    )}
    
    {addressError && (
      <p className="mt-1 text-sm text-red-600">{addressError}</p>
    )}
    
    {userLocation && !addressError && !isValidatingAddress && (
      <div className="mt-1">
        {isCoordinateInOgunState(userLocation.latitude, userLocation.longitude) ? (
          <p className="text-sm text-green-600 flex items-center">
            <Check className="w-3 h-3 mr-1" />
            Address verified
          </p>
        ) : (
          <p className="text-sm text-amber-600 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            Address outside Ogun State - closest stations will be shown
          </p>
        )}
      </div>
    )}

    <div className="mt-2 flex items-center">
      <input
        type="checkbox"
        id="useMyLocation"
        checked={formData.useMyLocation}
        onChange={(e) => handleLocationCheckboxChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label
        htmlFor="useMyLocation"
        className="ml-2 text-sm text-gray-700 flex items-center"
      >
        <MapPin className="w-4 h-4 mr-1" />
        Use my current location
        {isLoadingLocation && (
          <span className="ml-2 text-blue-500">
            Getting location...
          </span>
        )}
      </label>
    </div>
    
    {/* Quick location suggestions */}
    {/* <div className="mt-2">
      <p className="text-xs text-gray-500 mb-1">Quick select areas:</p>
      <div className="flex flex-wrap gap-1">
        {['Abeokuta', 'Ijebu Ode', 'Sagamu', 'Ilaro', 'Ota', 'Sango Ota'].map(area => (
          <button
            key={area}
            type="button"
            onClick={() => handleQuickAreaSelect(area)}
            className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border text-gray-600"
          >
            {area}
          </button>
        ))}
      </div>
    </div> */}
  </div>
)}

                {isAuthenticated && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Nearest Police Station
      {stations.length > 0 && (
        <span className="text-xs text-gray-500 ml-1">
          ({stations.length} stations found)
        </span>
      )}
      {isLoadingStations && (
        <span className="text-xs text-blue-600 ml-1">
          Searching stations...
        </span>
      )}
    </label>

    <Select
      options={stations}
      value={formData.nearestPoliceStation}
      onChange={handleStationChange}
      placeholder={getOgunStationPlaceholder()}
      isSearchable
      isClearable
      isDisabled={!userLocation || isLoadingStations}
      isLoading={isLoadingStations}
      noOptionsMessage={() => getOgunStationNoOptionsMessage()}
      className="react-select-container"
      classNamePrefix="react-select"
      formatOptionLabel={(option) => (
        <div>
          <div className="font-medium text-sm">
            {option.formation || option.name}
          </div>
          {option.distance && (
            <div className="text-xs text-gray-500">
              {option.distance.toFixed(1)}km away
            </div>
          )}
        </div>
      )}
    />

    {/* Station selection guidance */}
    {/* {stations.length === 0 && userLocation && !isLoadingStations && (
      <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded">
        <p className="text-sm text-amber-700">
          No police stations found near this location.
        </p>
        <p className="text-xs text-amber-700 mt-1">
          You can still submit your report - it will be routed to the appropriate authorities.
        </p>
      </div>
    )} */}
  </div>
)}



                {/* Incident Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Description *
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                    placeholder="Tell us about what happened..."
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>

                {/* Upload Media */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Media
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <div className="text-sm text-gray-600 mb-2">
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700"
                        onClick={() =>
                          document.getElementById("file-upload").click()
                        }
                      >
                        Click to upload
                      </button>
                      <span> or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF or MP4 (max size per file: 10MB)
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept=".png,.jpg,.jpeg,.gif,.mp4"
                      className="hidden"
                      onChange={handleMediaUpload}
                    />
                  </div>

                  {formData.images.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Images:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {formData.images.map((img, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between"
                          >
                            {img.name}
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  images: prev.images.filter(
                                    (_, i) => i !== index
                                  ),
                                }))
                              }
                              className="text-red-500 text-xs"
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {formData.video && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Video:
                      </h4>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        {formData.video.name}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              video: null,
                            }))
                          }
                          className="text-red-500 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hide Identity Checkbox */}
                {isAuthenticated && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hideIdentity"
                      checked={formData.hideIdentity}
                      onChange={handleHideIdentityChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="hideIdentity"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Hide my identity from police officers
                    </label>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={isAuthenticated ? handleSubmit : handleAnonSubmit}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                  >
                    Submit
                  </button>
                  {isAuthenticated && (
                    <button
                      type="button"
                      onClick={handleSaveAsDraft}
                      className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                    >
                      Save as draft
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSuccess && <SuccessModal />}
      {showDraftSuccess && <SuccessDraftModal />}
    </>
  );
}

export default ReportAnIncident;

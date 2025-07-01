import React, { useState, useCallback, useEffect } from "react";
import { userRequest } from "../../../requestMethod";
import { Upload, MapPin, Search, X, Check } from "lucide-react";
import Select from "react-select";
import { fetchIncidentTypes, fetchStations } from "../../../Api/incidentApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ReportAnIncident({ setCurrentPage }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
 // Update your selectors to match the normalized structure
const userData = useSelector((state) => state.user?.currentUser?.user);
const token = useSelector((state) => state.user?.currentUser?.tokens?.access?.token);
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
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [showDraftSuccess, setShowDraftSuccess] = useState(false);

  // Fetch police stations on component mount
  useEffect(() => {
    const getTypes = async () => {
      try {
        const rawData = await fetchIncidentTypes();
        console.log("API response:", rawData); // fetch from API
        const formattedData = rawData?.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        setIncidentTypes(formattedData);
      } catch (error) {
        console.error("Error fetching incident types:", error);
      }
    };
    const getStations = async () => {
      try {
        const rawData = await fetchStations();
        console.log("Stations API response:", rawData);
        const formattedData = rawData?.data.map((item) => ({
          label: item.formation,
          value: item.id,
        }));
        setStations(formattedData);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    getStations();
    getTypes();
  }, []);

  // Function to get user's current location
  const getCurrentLocation = useCallback(() => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // You might want to use a geocoding service to convert coordinates to address
          // For now, we'll just set the coordinates as the address
          setFormData((prev) => ({
            ...prev,
            address: `${latitude}, ${longitude}`,
            useMyLocation: true,
          }));

          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          alert(
            "Unable to get your location. Please enter your address manually."
          );
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleDescriptionChange = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleAddressChange = (e) => {
    setFormData((prev) => ({ ...prev, address: e.target.value }));
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
    if (!selectedOption || typeof selectedOption !== 'object') {
      setFormData((prev) => ({ ...prev, incidentType: null }));
      return;
    }
  
    setFormData((prev) => ({ ...prev, incidentType: selectedOption }));
  }, []);
  

  const handleStationChange = useCallback((selected) => {
    setFormData((prev) => ({ ...prev, nearestPoliceStation: selected }));
  }, []);

  const SuccessModal = () => (
    <div
      className="fixed inset-0 bg-[rgba(16,24,40,0.7)] bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowSuccess(false)} // close on backdrop click
    >
      <div
        className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()} // prevent modal click from closing
      >
        {/* Close button */}
        <button
          onClick={() => setShowSuccess(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Report submitted successfully
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Your Ticket ID is <span className="font-medium">{ticketId}</span>
        </p>

        {/* Buttons */}
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

          <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <Link to={isAuthenticated === "true" ? "/home" : "/"}>
              Redirect to Dashboard
            </Link>
          </button>
        </div>
      </div>
    </div>
  );

  const SuccessDraftModal = () => (
    <div
      className="fixed inset-0 bg-[rgba(16,24,40,0.7)] bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowDraftSuccess(false)} // close on backdrop click
    >
      <div
        className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()} // prevent modal click from closing
      >
        {/* Close button */}
        <button
          onClick={() => setShowDraftSuccess(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Saved As Draft
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-6">Report Saved as Draft</p>

        {/* Buttons */}
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

          <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            <Link to="/home">Redirect to Dashboard</Link>
          </button>
        </div>
      </div>
    </div>
  );

  const handleLocationCheckboxChange = useCallback(
    (checked) => {
      if (checked) {
        getCurrentLocation();
      } else {
        setFormData((prev) => ({
          ...prev,
          useMyLocation: false,
          address: "",
        }));
        setUserLocation(null);
      }
    },
    [getCurrentLocation]
  );

  const handleHideIdentityChange = (e) => {
    setFormData((prev) => ({ ...prev, hideIdentity: e.target.checked }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.incidentType || !formData.description || !formData.address) {
      alert(
        "Please fill in all required fields (Incident Type, Description, and Address)"
      );
      return;
    }

    try {
      const bodyData = {
        incidentTypeId: formData.incidentType?.value,
        isDraft: false, // Set to false for actual submission
        address: formData.address,
        description: formData.description,
        isIdentityHidden: formData.hideIdentity,
        isLocationHidden: false, // You can add another checkbox for this if needed
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
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const res = await userRequest(token).post("/incident/new", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Incident reported:", res.data);
      setShowSuccess(true);
      setTicketId(res.data.data.ticketId);

      // Navigate to confirmation page or show success message
      if (setCurrentPage) {
        setCurrentPage("confirmation");
      }
    } catch (err) {
      console.error("❌ Failed to submit incident:", err);
      toast(err.response.data.message);
    }
  };

  const handleAnonSubmit = async () => {
    // Validate required fields
    if (!formData.incidentType || !formData.description) {
      alert(
        "Please fill in all required fields (Incident Type, Description, and Address)"
      );
      return;
    }

    try {
      const bodyData = {
        incidentTypeId: formData.incidentType?.value,
        isDraft: null, // Set to false for actual submission
        address: null,
        description: formData.description,
        isIdentityHidden: null,
        isLocationHidden: false, // You can add another checkbox for this if needed
        isAnonymous: false,
        channel: "web",
        stationId: null,
        userId: null,
      };

      console.log("🚀 Submitting form with data:", formData);
      console.log("🚀 Body data:", bodyData);

      const formPayload = new FormData();
      formPayload.append("data", JSON.stringify(bodyData));
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const res = await userRequest(token).post("/incident/new", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Incident reported:", res.data);
      setShowSuccess(true);
      setTicketId(res.data.data.ticketId);

      // Navigate to confirmation page or show success message
      if (setCurrentPage) {
        setCurrentPage("confirmation");
      }
    } catch (err) {
      console.error("❌ Failed to submit incident:", err);
      toast(err.response.data.message);
    }
  };

  const handleSaveAsDraft = async () => {
    // Validate required fields
    if (!formData.incidentType || !formData.description || !formData.address) {
      alert(
        "Please fill in all required fields (Incident Type, Description, and Address)"
      );
      return;
    }

    try {
      const bodyData = {
        incidentTypeId: formData.incidentType?.value,
        isDraft: true, // Set to false for actual submission
        address: formData.address,
        description: formData.description,
        isIdentityHidden: formData.hideIdentity,
        isLocationHidden: false, // You can add another checkbox for this if needed
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
      if (formData.image) {
        formPayload.append("image", formData.image);
      }

      const res = await userRequest(token).post("/incident/new", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowDraftSuccess(true);

      console.log("✅ Incident reported:", res.data);

      // Navigate to confirmation page or show success message
      if (setCurrentPage) {
        setCurrentPage("confirmation");
      }
    } catch (err) {
      console.error("❌ Failed to submit incident:", err);
      toast(err.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated && formData.useMyLocation) {
      handleLocationCheckboxChange(true); // or directly call the function that gets location
    }
  }, [isAuthenticated]);

  //   try {
  //     const bodyData = {
  //       incidentTypeId: formData.incidentType,
  //       isDraft: true,
  //       address: formData.address,
  //       description: formData.description,
  //       isIdentityHidden: formData.hideIdentity,
  //       isLocationHidden: false,
  //       isAnonymous: false,
  //       stationId: formData.nearestPoliceStation || null,
  //       userId: "01JX7KE5HB162HF41SYZ6PWJGV",
  //       ...(userLocation && {
  //         latitude: userLocation.latitude,
  //         longitude: userLocation.longitude,
  //       }),
  //     };

  //     const formPayload = new FormData();
  //     formPayload.append("data", JSON.stringify(bodyData));
  //     if (formData.image) {
  //       formPayload.append("image", formData.image);
  //     }

  //     const res = await userRequest.post("/incident/new", formPayload, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log("✅ Draft saved:", res.data);
  //     alert("Report saved as draft successfully!");
  //   } catch (err) {
  //     console.error("❌ Failed to save draft:", err);
  //     alert("Failed to save draft. Please try again.");
  //   }
  // };

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
                    Explain what happens and elaborate on the incident you would
                    like to report.
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
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Address"
                      value={formData.address}
                      onChange={handleAddressChange}
                      disabled={formData.useMyLocation}
                      required
                    />

                    {/* Use My Location Checkbox */}
                    <div className="mt-2 flex items-center">
                      <input
                        type="checkbox"
                        id="useMyLocation"
                        checked={formData.useMyLocation}
                        onChange={(e) =>
                          handleLocationCheckboxChange(e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="useMyLocation"
                        className="ml-2 text-sm text-gray-700 flex items-center"
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        Use my Location
                        {isLoadingLocation && (
                          <span className="ml-2 text-blue-500">
                            Getting location...
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                )}

                {/* Nearest Police Station */}
                {isAuthenticated && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nearest Police Station
                    </label>
                    <Select
                      options={stations}
                      value={formData.nearestPoliceStation}
                      onChange={handleStationChange}
                      placeholder="Search for nearest police station"
                      isSearchable
                      isClearable
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
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

import React, { useState, useCallback, useEffect } from "react";
import { userRequest } from "../../../../requestMethod";
import { Upload, MapPin, ArrowLeft } from "lucide-react";
import Select from "react-select";
import { fetchIncidentTypes, fetchStations } from "../../../../Api/incidentApi";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../../../Components/Website/Navbar";

function EditDraftIncident() {
  const { id } = useParams(); // Get incident ID from URL params
  const navigate = useNavigate();
  
  const userData = useSelector((state) => state.user?.currentUser?.user);
  const token = useSelector((state) => state.user?.currentUser?.tokens?.access?.token);
  
  const [loading, setLoading] = useState(true);
  const [incident, setIncident] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    incidentType: "",
    description: "",
    address: "",
    useMyLocation: false,
    nearestPoliceStation: "",
    images: [],
    video: null,
    hideIdentity: false,
  });

  const [stations, setStations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [incidentTypes, setIncidentTypes] = useState([]);

  // Fetch incident types and stations
  useEffect(() => {
    const getTypes = async () => {
      try {
        const rawData = await fetchIncidentTypes();
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
        const formattedData = rawData?.data.map((item) => ({
          label: item.formation,
          value: item.id,
        }));
        setStations(formattedData);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    getTypes();
    getStations();
  }, []);

  // Fetch incident data
  useEffect(() => {
    const fetchIncident = async () => {
      try {
        setLoading(true);
        const res = await userRequest(token).get(`/incident/${id}`);
        const incidentData = res.data.data.incident;
        setIncident(incidentData);

        // Populate form with incident data
        setFormData(prev => ({
          ...prev,
          description: incidentData.description || "",
          address: incidentData.address || "",
          hideIdentity: incidentData.isIdentityHidden || false,
        }));

      } catch (error) {
        console.error("❌ Failed to fetch incident:", error);
        toast.error("Failed to load incident data");
        navigate("/reports"); // Redirect back if error
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchIncident();
    }
  }, [id, token, navigate]);

  // Set incident type when both incident data and incident types are loaded
  useEffect(() => {
    if (incident && incidentTypes.length > 0) {
      const matchingType = incidentTypes.find(
        type => type.label === incident.incidentType
      );
      if (matchingType) {
        setFormData(prev => ({
          ...prev,
          incidentType: matchingType
        }));
      }
    }
  }, [incident, incidentTypes]);

  // Function to get user's current location
  const getCurrentLocation = useCallback(() => {
    setIsLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
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
          toast.error("Unable to get your location. Please enter your address manually.");
        }
      );
    } else {
      setIsLoadingLocation(false);
      toast.error("Geolocation is not supported by this browser.");
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
      toast.error("Each file must be less than 10MB.");
      return;
    }

    if (newImages.length + formData.images.length > 3) {
      toast.error("You can upload up to 3 images only.");
      return;
    }

    if (newVideos.length > 1 || (formData.video && newVideos.length > 0)) {
      toast.error("Only one video can be uploaded.");
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

  const handleLocationCheckboxChange = useCallback(
    (checked) => {
      if (checked) {
        getCurrentLocation();
      } else {
        setFormData((prev) => ({
          ...prev,
          useMyLocation: false,
          address: incident?.address || "",
        }));
        setUserLocation(null);
      }
    },
    [getCurrentLocation, incident?.address]
  );

  const handleHideIdentityChange = (e) => {
    setFormData((prev) => ({ ...prev, hideIdentity: e.target.checked }));
  };

  const handleBackToReports = () => {
    navigate("/reports", { state: { activeTab: 'Drafts' } });
  };

  const handleSubmit = async () => {
    // Comprehensive validation
    const errors = [];

    if (!formData.incidentType) {
      errors.push("Incident Type is required");
    }
    if (!formData.description.trim()) {
      errors.push("Incident Description is required");
    }
    if (!formData.address.trim()) {
      errors.push("Address is required");
    }

    // Additional validations
    if (formData.description.trim().length < 10) {
      errors.push("Incident description must be at least 10 characters long");
    }
    if (formData.address.trim().length < 5) {
      errors.push("Please provide a more detailed address");
    }

    if (errors.length > 0) {
      toast.error(errors.join(", "));
      return;
    }

    try {
      setSubmitting(true);
      
      const bodyData = {
        incidentTypeId: formData.incidentType?.value,
        isDraft: false, // Set to false for actual submission (no longer a draft)
        address: formData.address.trim(),
        description: formData.description.trim(),
        isIdentityHidden: formData.hideIdentity,
        isLocationHidden: false,
        isAnonymous: false,
        channel: "web",
        stationId: formData.nearestPoliceStation?.value || null,
        userId: userData?.id,
        ...(userLocation && {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }),
      };

      console.log("🚀 Submitting form with data:", formData);
      console.log("🚀 Body data:", bodyData);

      const formPayload = new FormData();
      formPayload.append("data", JSON.stringify(bodyData));
      
      // Add images if any (using correct field name from original)
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image) => {
          formPayload.append("image", image);
        });
      }
      
      if (formData.video) {
        formPayload.append("video", formData.video);
      }

      // Use POST to submit the updated draft as a new incident
      const res = await userRequest(token).post("/incident/new", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Incident reported:", res.data);
      toast.success("Report submitted successfully!");
      
      // Navigate back to reports page
      navigate("/reports");

    } catch (err) {
      console.error("❌ Failed to submit incident:", err);
      toast.error(err.response?.data?.message || "Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/reports");
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar isAuthenticated={true} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar isAuthenticated={true} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Draft Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The draft you're looking for doesn't exist.
            </p>
            <button
              onClick={handleBackToReports}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Reports
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={handleBackToReports}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Edit Draft Report
              </h1>
              <p className="text-gray-600">
                Make changes to your draft and submit when ready
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
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
                  onChange={(e) => handleLocationCheckboxChange(e.target.checked)}
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

            {/* Nearest Police Station */}
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

              {/* Display existing images from the incident */}
              {incident.incidentImages && incident.incidentImages.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Existing Images:
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {incident.incidentImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Existing evidence ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {formData.images.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    New Images:
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

            {/* Submit Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                disabled={submitting}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDraftIncident;
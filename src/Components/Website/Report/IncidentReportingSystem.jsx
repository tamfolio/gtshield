import React, { useState, useCallback, useEffect } from "react";
import { Upload, Copy, Check, Search, Loader2, AlertCircle } from "lucide-react";
import Select from "react-select";
import { fetchIncidentTypes, fetchStations } from "../../../Api/incidentApi";
import ReportAnIncident from "./ReportAnIncident";
import { useNavigate } from "react-router-dom";

const IncidentReportingSystem = ({ isAuthenticated }) => {
  const [currentPage, setCurrentPage] = useState("report");
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const [StationsAvailable, setStationsAvailable] = useState([]);
  const [formData, setFormData] = useState({
    incidentType: "",
    description: "",
    image: null,
  });
  const [trackingId, setTrackingId] = useState("");
  const [searchTrackingId, setSearchTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [trackingError, setTrackingError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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
        console.log("API response:", rawData.data); // fetch from API
        const formattedData = rawData?.data.map((item) => ({
          label: item.formation,
          value: item.id,
        }));
        setStationsAvailable(formattedData);
      } catch (error) {
        console.error("Error fetching incident types:", error);
      }
    };

    getTypes();
    getStations();
  }, []);

  console.log(incidentTypes);

  const copyTrackingId = async () => {
    try {
      await navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 10000); // Hide after 10 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleResetForm = useCallback(() => {
    setFormData({ incidentType: "", description: "", image: null });
    setTrackingId("");
    setCurrentPage("report");
  }, []);

  const handleSearchTrackingIdChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTrackingId(value);
    
    // Clear previous results when user starts typing
    if (trackingResult || trackingError) {
      setTrackingResult(null);
      setTrackingError("");
    }
  }, [trackingResult, trackingError]);

  // Mock API function for tracking - replace with your actual API call
  const trackIncident = async (trackingId) => {
    const response = await fetch(`/api/track-incident/${trackingId}`);
    
    if (!response.ok) {
      throw new Error('Tracking ID not found');
    }
    
    return await response.json();
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchTrackingId.trim()) {
      setTrackingError("Please enter a tracking ID");
      return;
    }

    setIsSearching(true);
    setTrackingError("");
    setTrackingResult(null);

    try {
      // Mock delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response based on the tracking ID for demonstration
      if (searchTrackingId.toUpperCase() === "DHDHEYUUIAIAI") {
        setTrackingResult({
          status: "Pending",
          dateSubmitted: "06 May, 2025",
          report: "Police are on their way.",
          trackingId: searchTrackingId.toUpperCase()
        });
      } else if (searchTrackingId.toUpperCase() === "DDSFFSAAD") {
        throw new Error("TRACKING ID not found.");
      } else {
        // For any other ID, simulate a found result
        setTrackingResult({
          status: "Under Investigation",
          dateSubmitted: "05 May, 2025",
          report: "Case has been assigned to an officer.",
          trackingId: searchTrackingId.toUpperCase()
        });
      }
    } catch (error) {
      setTrackingError(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  if (currentPage === "confirmation") {
    // Modal for authenticated users
    if (isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#101828B2] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Report submitted successfully
              </h2>

              <p className="text-gray-600 mb-6 text-sm">
                Your Ticket ID is <span className="font-mono font-semibold">{trackingId}</span>
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setCurrentPage("track")}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  View Report
                </button>
                <button
                  onClick={handleResetForm}
                  className="w-full px-4 py-2 text-blue-600 hover:text-blue-700  bg-transparent border border-blue-300 rounded-md"
                >
                  Stay on Page
                </button>
                <button
                    onClick={() => {
                      handleResetForm();
                      navigate('/dashboard');
                    }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Redirect to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Modal for anonymous users (not authenticated)
    return (
      <div className="min-h-screen bg-[#101828B2] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Incident Reported
            </h2>

            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Your report have been received and will be attend to shortly. In
              the mean time, you might want to track the progress with your
              tracking ID.
            </p>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Your tracking ID is
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={trackingId}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-center font-mono"
                />
                <button
                  onClick={copyTrackingId}
                  className="p-2 text-gray-400 hover:text-gray-600 relative"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <button
                onClick={() => setCurrentPage("track")}
                className="text-blue-600 hover:text-blue-700 text-sm underline"
              >
                Check status
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleResetForm}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleResetForm}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "track") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-2 mb-8 justify-start">
            <button
              onClick={() => setCurrentPage("report")}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50"
            >
              Report An Incident
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-50">
              Track an Anonymous Report
            </button>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Track an Anonymous Report
              </h1>
              <p className="text-gray-600">
                Kindly provide us with your tracking ID so we can give you the
                status of your report.
              </p>
            </div>

            <form onSubmit={handleTrackSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking ID
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      trackingError ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Your tracking ID"
                    value={searchTrackingId}
                    onChange={handleSearchTrackingIdChange}
                    disabled={isSearching}
                  />
                  {trackingError && (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 w-4 h-4" />
                  )}
                </div>
                
                {trackingError && (
                  <p className="mt-2 text-sm text-red-600">
                    {trackingError}
                  </p>
                )}
              </div>

              {/* Submit button - only show if no result is displayed */}
              {!trackingResult && (
                <button
                  type="submit"
                  disabled={isSearching || !searchTrackingId.trim()}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              )}
            </form>

            {/* Display tracking results */}
            {trackingResult && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Status: </span>
                    <span className="text-sm text-gray-900">{trackingResult.status}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Date Submitted: </span>
                    <span className="text-sm text-gray-900">{trackingResult.dateSubmitted}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Report: </span>
                    <span className="text-sm text-gray-900">{trackingResult.report}</span>
                  </div>
                </div>
                
                {/* Option to search again */}
                <button
                  onClick={() => {
                    setSearchTrackingId("");
                    setTrackingResult(null);
                    setTrackingError("");
                  }}
                  className="mt-4 w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Search Another ID
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Report page (default)
  return (
    <ReportAnIncident
      incidentTypes={incidentTypes}
      StationsAvailable={StationsAvailable}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      trackingId={trackingId}
      setTrackingId={setTrackingId}
    />
  );
};

export default IncidentReportingSystem;
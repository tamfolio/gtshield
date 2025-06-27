import React, { useState, useCallback, useEffect } from "react";
import { Upload, Copy, Check, Search } from "lucide-react";
import Select from "react-select";
import { fetchIncidentTypes, fetchStations } from "../../../Api/incidentApi";
import ReportAnIncident from "./ReportAnIncident";

const IncidentReportingSystem = ({ isAuthenticated }) => {
  const [currentPage, setCurrentPage] = useState("report");
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [StationsAvailable, setStationsAvailable] = useState([]);
  const [formData, setFormData] = useState({
    incidentType: "",
    description: "",
    image: null,
  });
  const [trackingId, setTrackingId] = useState("");
  const [searchTrackingId, setSearchTrackingId] = useState("");

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


  const copyTrackingId = useCallback(() => {
    navigator.clipboard.writeText(trackingId);
  }, [trackingId]);

  const handleResetForm = useCallback(() => {
    setFormData({ incidentType: "", description: "", image: null });
    setTrackingId("");
    setCurrentPage("report");
  }, []);

  const handleSearchTrackingIdChange = useCallback((e) => {
    setSearchTrackingId(e.target.value);
  }, []);

  if (currentPage === "confirmation") {
    return (
      <div className="min-h-screen bg-gray-600 flex items-center justify-center p-4">
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
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Copy className="w-4 h-4" />
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
            <button className="px-4 py-2  border border-gray-300 rounded-md text-gray-700 bg-gray-50">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking ID
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your tracking ID"
                  value={searchTrackingId}
                  onChange={handleSearchTrackingIdChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Report page (default)
  return <ReportAnIncident incidentTypes={incidentTypes} StationsAvailable={StationsAvailable} setCurrentPage={setCurrentPage} currentPage={currentPage} />;
};

export default IncidentReportingSystem;

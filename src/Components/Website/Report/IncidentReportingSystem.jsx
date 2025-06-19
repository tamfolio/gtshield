import React, { useState, useCallback } from "react";
import { Upload, Copy, Check, Search } from "lucide-react";
import Select from 'react-select';

const incidentTypes = [
  { value: "Abduction", label: "Abduction" },
  { value: "Armed Robbery", label: "Armed Robbery" },
  { value: "Arson", label: "Arson" },
  { value: "Assault", label: "Assault" },
  { value: "Attempted Murder", label: "Attempted Murder" },
  { value: "Attempted Suicide", label: "Attempted Suicide" },
  { value: "Bribery And Corruption", label: "Bribery And Corruption" },
  { value: "Breach Of Public Peace", label: "Breach Of Public Peace" },
  { value: "Burglary", label: "Burglary" },
  { value: "Cattle Rustling", label: "Cattle Rustling" },
  { value: "Child Stealing", label: "Child Stealing" },
  { value: "Coining Offences", label: "Coining Offences" },
  { value: "Cultism", label: "Cultism" },
  { value: "Defilement", label: "Defilement" },
  { value: "Demanding With Menace", label: "Demanding With Menace" },
  {
    value: "Escaping From Lawful Custody",
    label: "Escaping From Lawful Custody",
  },
  { value: "False Pretence / Cheating", label: "False Pretence / Cheating" },
  { value: "Forgery", label: "Forgery" },
  { value: "Forgery Of Currency Notes", label: "Forgery Of Currency Notes" },
  { value: "Gambling", label: "Gambling" },
  { value: "Grievous Harm And Wounding", label: "Grievous Harm And Wounding" },
  { value: "House Breaking", label: "House Breaking" },
  { value: "Human Trafficking", label: "Human Trafficking" },
  {
    value: "Indecent Assault/Sexual Abuse",
    label: "Indecent Assault/Sexual Abuse",
  },
  { value: "Kidnapping", label: "Kidnapping" },
  { value: "Manslaughter", label: "Manslaughter" },
  { value: "Murder", label: "Murder" },
  { value: "Other Offences", label: "Other Offences" },
  { value: "Perjury", label: "Perjury" },
  { value: "Rape", label: "Rape" },
  { value: "Rape And Indecent Assault", label: "Rape And Indecent Assault" },
  { value: "Receiving Stolen Property", label: "Receiving Stolen Property" },
  { value: "Ritual Killing", label: "Ritual Killing" },
  { value: "SOS", label: "SOS" },
  { value: "Shooting Incident", label: "Shooting Incident" },
  { value: "Slave Dealing", label: "Slave Dealing" },
  { value: "Store Breaking", label: "Store Breaking" },
  { value: "Suicide", label: "Suicide" },
  { value: "Theft And Other Stealing", label: "Theft And Other Stealing" },
  { value: "Unlawful Possession", label: "Unlawful Possession" },
  { value: "Unnatural Offences", label: "Unnatural Offences" },
];

const IncidentReportingSystem = () => {
  const [currentPage, setCurrentPage] = useState("report");
  const [formData, setFormData] = useState({
    incidentType: "",
    description: "",
    image: null,
  });
  const [trackingId, setTrackingId] = useState("");
  const [searchTrackingId, setSearchTrackingId] = useState("");

  const generateTrackingId = useCallback(() => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.incidentType || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }
    const newTrackingId = generateTrackingId();
    setTrackingId(newTrackingId);
    setCurrentPage("confirmation");
  }, [formData.incidentType, formData.description, generateTrackingId]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  }, []);

  const handleDescriptionChange = useCallback((e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, description: value }));
  }, []);

  const handleIncidentTypeChange = useCallback((e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, incidentType: value }));
  }, []);

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
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
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

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Report An Incident
            </h1>
            <p className="text-gray-600">
              Explain what happens and elaborate on the incident you would like
              to report.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type
              </label>
              <Select
                options={incidentTypes}
                value={incidentTypes.find(
                  (option) => option.value === formData.incidentType
                )}
                onChange={(selectedOption) =>
                  handleIncidentTypeChange(selectedOption?.value || "")
                }
                placeholder="Select incident type"
                isSearchable={true}
                isClearable={true}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="How did it happen? What happen..."
                value={formData.description}
                onChange={handleDescriptionChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Image
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
                  SVG, PNG, JPG or GIF (max. 800×400px)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".svg,.png,.jpg,.jpeg,.gif"
                  onChange={handleImageUpload}
                />
              </div>

              {formData.image && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-gray-600">{formData.image.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: null }))
                    }
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportingSystem;

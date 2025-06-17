import React, { useState } from "react";
import {
  Shield,
  Upload,
  X,
  Check,
  Menu,
  Bell,
  Settings,
  User,
  ChevronDown,
  MapPin,
  Trash2,
  Edit,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../../../Components/Website/Navbar";
import DraftSavedModal from "./Modals/DraftSavedModal";
import { useNavigate } from "react-router-dom";
import ReportSubmittedModal from "./Modals/ReportSubmittedModal";

const GatewayShieldReports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Report Incident");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    incidentType: "",
    address: "",
    useGeolocation: false,
    description: "",
    hideIdentity: false,
  });
  const [currentView, setCurrentView] = useState('list');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [drafts, setDrafts] = useState([
    { id: 1, type: "Rape Case", date: "Jan 4, 2025" },
    { id: 2, type: "Kidnapping", date: "Jan 4, 2025" },
    { id: 3, type: "Killing", date: "Jan 2, 2025" },
    { id: 4, type: "Killing", date: "Jan 2, 2025" },
    { id: 5, type: "Killing", date: "Jan 2, 2025" },
    { id: 6, type: "Killing", date: "Jan 2, 2025" },
    { id: 7, type: "Killing", date: "Jan 2, 2025" },
    { id: 8, type: "Killing", date: "Jan 2, 2025" },
  ]);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  // const [isReportSubmittedModalOpen, setIsReportSubmittedModalOpen] =
  //   useState(false);

  const handleViewReport = () => {
    console.log("View report clicked");
    setIsDraftModalOpen(false);
  };

  // const handleDraft = () => {
  //   console.log("View report clicked");
  //   setIsDraftModalOpen(false);
  // };

  const handleStayOnPage = () => {
    console.log("Stay on page clicked");
    setIsDraftModalOpen(false);
  };

  const handleRedirectToDashboard = () => {
    console.log("Redirect to dashboard clicked");
    setIsDraftModalOpen(false);
  };

  const handleDraftClose = () => {
    setIsDraftModalOpen(false);
  };

  // const handleReportClose = () => {
  //   setIsReportSubmittedModalOpen(false);
  // };

  const handleDeleteClick = (draft) => {
    setSelectedDraft(draft);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedDraft) {
      setDrafts(drafts.filter((draft) => draft.id !== selectedDraft.id));
    }
    setShowDeleteModal(false);
    setSelectedDraft(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedDraft(null);
  };

  const reports = [
    {
      id: 1,
      type: "Rape Case",
      dateReported: "Jan 4, 2025",
      dateCreated: "16th May, 2025",
      status: "In Progress",
      submissionTime: "8:00am",
      location: "Street name, Ogun State",
      description:
        "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla. Elit nisl in eleifend sed nisl. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus.",
      details: [
        "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id.Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.",
        "Non pellentesque congue eget consectetur turpis.",
        "Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.",
      ],
      images: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      ],
    },
    {
      id: 2,
      type: "Kidnapping",
      dateReported: "Jan 4, 2025",
      dateCreated: "15th May, 2025",
      status: "Closed",
      submissionTime: "10:30am",
      location: "Market Street, Lagos State",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      details: [
        "Detailed investigation conducted with local authorities.",
        "Suspect apprehended and case resolved successfully.",
        "Victim safely recovered and provided with necessary support.",
      ],
      images: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      ],
    },
    {
      id: 3,
      type: "Killing",
      dateReported: "Jan 2, 2025",
      dateCreated: "14th May, 2025",
      status: "In Progress",
      submissionTime: "3:15pm",
      location: "Industrial Area, Kano State",
      description:
        "Serious incident requiring immediate investigation. Multiple witnesses present at the scene. Forensic evidence being collected and analyzed.",
      details: [
        "Crime scene secured and evidence collection ongoing.",
        "Witness statements being recorded by investigating officers.",
        "Forensic analysis pending from laboratory.",
        "Suspect identification in progress.",
      ],
      images: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
      ],
    },
  ];

  // Get duplicates for multiple killing entries
  const allReports = [
    ...reports,
    ...Array(5)
      .fill(reports[2])
      .map((report, index) => ({
        ...report,
        id: report.id + index + 10,
      })),
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "Closed":
        return "bg-green-100 text-green-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Closed":
      case "Resolved":
        return <Check className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const incidentTypes = [
    "Robbery/Theft",
    "Assault",
    "Vandalism",
    "Suspicious Activity",
    "Drug Activity",
    "Domestic Violence",
    "Traffic Accident",
    "Noise Complaint",
    "Other",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setUploadError(true);
        return;
      }
      setUploadedImage(file.name);
      setUploadError(false);
    }
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedReport(null);
  };

  const handleEdit = () => {
    setCurrentView('edit');
  };

  const handleLeaveReview = () => {
    // Handle leave review logic
    console.log('Leave review clicked');
  };

  const handleSubmit = () => {
    // Generate random ticket ID
    const randomId = Math.random().toString(36).substr(2, 5).toUpperCase();
    setTicketId(randomId);
    setShowSuccess(true);
  };

  const SuccessModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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
            Redirect to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-8 mb-8 border-b border-gray-200">
          {["Report Incident", "All Reports", "Drafts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Report Form */}
        {activeTab === "Report Incident" && (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-6">
              {/* Incident Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Type
                </label>
                <div className="relative">
                  <select
                    value={formData.incidentType}
                    onChange={(e) =>
                      handleInputChange("incidentType", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select incident type</option>
                    {incidentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Your Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex items-center mt-3">
                  <input
                    type="checkbox"
                    id="geolocation"
                    checked={formData.useGeolocation}
                    onChange={(e) =>
                      handleInputChange("useGeolocation", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="geolocation"
                    className="ml-2 text-sm text-gray-700 flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Use my Geolocation
                  </label>
                </div>
              </div>

              {/* Incident Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Tell us about what happened"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="mb-4">
                    <button
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Click to upload
                    </button>
                    <span className="text-gray-500"> or drag and drop</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    SVG, PNG, JPG or GIF (max size per file: 10MB)
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Uploaded Files */}
                {uploadedImage && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-700">
                        {uploadedImage}
                      </span>
                      <button
                        onClick={() => setUploadedImage(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {uploadError && (
                  <div className="mt-2 flex items-center text-red-600 text-sm">
                    <span>Img20230425.img failed to upload</span>
                    <button
                      onClick={() => setUploadError(false)}
                      className="ml-2 text-red-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Hide Identity Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hideIdentity"
                  checked={formData.hideIdentity}
                  onChange={(e) =>
                    handleInputChange("hideIdentity", e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="hideIdentity"
                  className="ml-2 text-sm text-gray-700"
                >
                  Hide my identity from police officers
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 pt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
                <button
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  onClick={() => setIsDraftModalOpen(true)}
                >
                  Save as draft
                </button>
              </div>
            </div>
          </div>
        )}

        <DraftSavedModal
          isOpen={isDraftModalOpen}
          onClose={handleDraftClose}
          onViewReport={handleViewReport}
          onStayOnPage={handleStayOnPage}
          onRedirectToDashboard={handleRedirectToDashboard}
        />

        {/* {isReportSubmittedModalOpen && !isDraftModalOpen && (
          <ReportSubmittedModal
            isOpen={true}
            onClose={handleReportClose}
            onViewReport={handleViewReport}
            onStayOnPage={handleStayOnPage}
            onRedirectToDashboard={handleRedirectToDashboard}
          />
        )} */}

        {/* All Reports Tab */}
        {activeTab === "All Reports" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  All Reports
                </h2>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Reported
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.dateReported}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            report.status
                          )}`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          className="text-blue-600 hover:text-blue-900 font-medium"
                          onClick={() => navigate(`/reports/${report.id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Drafts Tab */}
        {activeTab === "Drafts" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Drafts</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Type
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {drafts.map((draft) => (
                    <tr key={draft.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {draft.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {draft.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleDeleteClick(draft)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 mx-4">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 rounded-full p-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-900 text-center mb-6">
                Are you sure you want to delete this draft?
              </h3>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmDelete}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
                >
                  Yes I do
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="w-full bg-white text-gray-700 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
                >
                  No I don't
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating SOS Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center font-bold text-sm">
          SOS
        </button>
      </div>

      {/* Success Modal */}
      {showSuccess && <SuccessModal />}
    </div>
  );
};

export default GatewayShieldReports;

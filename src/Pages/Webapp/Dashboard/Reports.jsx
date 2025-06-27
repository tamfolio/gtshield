import React, { useEffect, useState } from "react";
import { X, Check, Trash2, Edit, AlertTriangle } from "lucide-react";
import Navbar from "../../../Components/Website/Navbar";
import DraftSavedModal from "./Modals/DraftSavedModal";
import { useNavigate } from "react-router-dom";
import ReportSubmittedModal from "./Modals/ReportSubmittedModal";
import ReportAnIncident from "../../../Components/Website/Report/ReportAnIncident";
import { userRequest } from "../../../requestMethod";
import { useSelector } from "react-redux";

const GatewayShieldReports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Report Incident");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState(null);

  const [formData, setFormData] = useState({
    incidentType: "",
    address: "",
    useGeolocation: false,
    description: "",
    hideIdentity: false,
  });
  const [currentView, setCurrentView] = useState("list");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [drafts, setDrafts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  // const [isReportSubmittedModalOpen, setIsReportSubmittedModalOpen] =
  //   useState(false);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const token = useSelector(
    (state) => state?.user?.currentUser?.data?.tokens?.access?.token
  );

  const fetchDrafts = async () => {
    setLoading(true);
    try {
      const res = await userRequest(token).get(
        "/incident/all?page=1&size=10&isDraft=true"
      );
      console.log("✅ Incidents fetched:", res.data);
      setDrafts(res.data?.data?.incidents?.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch incidents:", err);
      setError("Failed to fetch incidents");
    } finally {
      setLoading(false);
    }
  };

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const res = await userRequest(token).get(
        "/incident/all?page=1&size=10"
      );
      console.log("✅ Incidents fetched:", res.data);
      setIncidents(res.data?.data?.incidents?.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch incidents:", err);
      setError("Failed to fetch incidents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDrafts();
      fetchIncidents();
    }
  }, [token]);


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


  console.log(token)
  const handleConfirmDelete = async () => {
    try {
      await userRequest(token).delete(`/incident/${selectedDraft.id}`);
      setShowDeleteModal(false);
      setSelectedDraft(null);
      fetchDrafts();
      fetchIncidents();
    } catch (error) {
      console.error("❌ Error deleting draft:", error);
      if (error.response) {
        console.error("💥 Response:", error.response.data);
      }
      alert("Failed to delete the draft. Please try again.");
    }
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
        {activeTab === "Report Incident" && <ReportAnIncident />}

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
                  {incidents.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.incidentType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(report.datePublished)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            report.incidentStatus
                          )}`}
                        >
                          {report.incidentStatus}
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
                  {drafts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No drafts available.
                      </td>
                    </tr>
                  ) : (
                    drafts.map((draft) => (
                      <tr key={draft.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {draft.incidentType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {formatDate(draft.datePublished)}
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-[rgba(16,24,40,0.7)] bg-opacity-50 flex items-center justify-center z-50">
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

    </div>
  );
};

export default GatewayShieldReports;

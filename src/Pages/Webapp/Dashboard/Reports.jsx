import React, { useEffect, useState } from "react";
import { X, Check, Trash2, Edit, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../../Components/Website/Navbar";
import DraftSavedModal from "./Modals/DraftSavedModal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReportSubmittedModal from "./Modals/ReportSubmittedModal";
import ReportAnIncident from "../../../Components/Website/Report/ReportAnIncident";
import { userRequest } from "../../../requestMethod";
import { useSelector } from "react-redux";

// Reusable Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  itemName = "items",
  showFirstLast = true,
  showPageNumbers = true,
  className = ""
}) => {
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page or no pages
  }

  return (
    <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Page info */}
        <div className="text-sm text-gray-700">
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <span className="ml-2 text-gray-500">
            ({totalItems} total {itemName})
          </span>
        </div>
        
        {/* Desktop pagination controls */}
        <div className="hidden sm:flex items-center gap-2">
          {showFirstLast && (
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              First
            </button>
          )}
          
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {/* Page numbers */}
          {showPageNumbers && (
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-gray-500">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
          
          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          
          {showFirstLast && (
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              Last
            </button>
          )}
        </div>
        
        {/* Mobile pagination - simplified */}
        <div className="sm:hidden flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          
          <span className="text-sm text-gray-700 font-medium">
            {currentPage} / {totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const GatewayShieldReports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "Report Incident"
  );

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      
      // Fetch data based on the active tab
      if (location.state.activeTab === 'Drafts') {
        fetchDrafts();
      } else if (location.state.activeTab === 'All Reports') {
        fetchIncidents();
      }
    }
  }, [location.state]);

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
  
  // State for All Reports Pagination
  const [incidents, setIncidents] = useState([]);
  const [incidentsCurrentPage, setIncidentsCurrentPage] = useState(1);
  const [incidentsTotalPages, setIncidentsTotalPages] = useState(0);
  const [incidentsTotalItems, setIncidentsTotalItems] = useState(0);
  const [incidentsPageSize] = useState(10);
  const [incidentsLoading, setIncidentsLoading] = useState(false);
  
  // State for Drafts Pagination
  const [drafts, setDrafts] = useState([]);
  const [draftsCurrentPage, setDraftsCurrentPage] = useState(1);
  const [draftsTotalPages, setDraftsTotalPages] = useState(0);
  const [draftsTotalItems, setDraftsTotalItems] = useState(0);
  const [draftsPageSize] = useState(10);
  const [draftsLoading, setDraftsLoading] = useState(false);
  
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

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
    (state) => state?.user?.currentUser?.tokens?.access?.token
  );

  console.log(token);

  const fetchDrafts = async (page = 1) => {
    setDraftsLoading(true);
    try {
      const res = await userRequest(token).get(
        `/incident/all?page=${page}&size=${draftsPageSize}&isDraft=true`
      );
      console.log("✅ Drafts fetched:", res.data);
      
      const draftsData = res.data?.data?.incidents;
      const paginationData = draftsData?.pagination;
      
      setDrafts(draftsData?.data || []);
      setDraftsTotalPages(paginationData?.totalPages || 0);
      setDraftsTotalItems(paginationData?.total || 0);
      setDraftsCurrentPage(paginationData?.currentPage || page);
    } catch (err) {
      console.error("❌ Failed to fetch drafts:", err);
      setError("Failed to fetch drafts");
    } finally {
      setDraftsLoading(false);
    }
  };

  const fetchIncidents = async (page = 1) => {
    setIncidentsLoading(true);
    try {
      const res = await userRequest(token).get(
        `/incident/all?page=${page}&size=${incidentsPageSize}`
      );
      console.log("✅ Incidents fetched:", res.data);
      
      const incidentsData = res.data?.data?.incidents;
      const paginationData = incidentsData?.pagination;
      
      setIncidents(incidentsData?.data || []);
      setIncidentsTotalPages(paginationData?.totalPages || 0);
      setIncidentsTotalItems(paginationData?.total || 0);
      setIncidentsCurrentPage(paginationData?.currentPage || page);
    } catch (err) {
      console.error("❌ Failed to fetch incidents:", err);
      setError("Failed to fetch incidents");
    } finally {
      setIncidentsLoading(false);
    }
  };

  // Pagination handlers
  const handleIncidentsPageChange = (page) => {
    setIncidentsCurrentPage(page);
    fetchIncidents(page);
  };

  const handleDraftsPageChange = (page) => {
    setDraftsCurrentPage(page);
    fetchDrafts(page);
  };

  useEffect(() => {
    console.log("token in useEffect", token);
    if (token) {
      if (activeTab === 'Drafts') {
        fetchDrafts(draftsCurrentPage);
      } else if (activeTab === 'All Reports') {
        fetchIncidents(incidentsCurrentPage);
      }
    }
  }, [token, activeTab]);

  const handleViewReport = () => {
    console.log("View report clicked");
    setIsDraftModalOpen(false);
  };

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

  const handleDeleteClick = (draft) => {
    setSelectedDraft(draft);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await userRequest(token).delete(`/incident/${selectedDraft.id}`);
      setShowDeleteModal(false);
      setSelectedDraft(null);
      // Refresh current page of drafts
      fetchDrafts(draftsCurrentPage);
      fetchIncidents(incidentsCurrentPage);
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
              onClick={() => {
                setActiveTab(tab);
                if (tab === "Drafts") {
                  fetchDrafts(1); // Reset to first page when switching tabs
                  setDraftsCurrentPage(1);
                } else if (tab === "All Reports") {
                  fetchIncidents(1); // Reset to first page when switching tabs
                  setIncidentsCurrentPage(1);
                }
              }}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {/* Show count badges */}
              {tab === "All Reports" && incidentsTotalItems > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {incidentsTotalItems}
                </span>
              )}
              {tab === "Drafts" && draftsTotalItems > 0 && (
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {draftsTotalItems}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Report Form */}
        {activeTab === "Report Incident" && <ReportAnIncident />}

        {isDraftModalOpen && (
          <DraftSavedModal
            isOpen={isDraftModalOpen}
            onClose={handleDraftClose}
            onViewReport={handleViewReport}
            onStayOnPage={handleStayOnPage}
            onRedirectToDashboard={handleRedirectToDashboard}
          />
        )}

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

            {incidentsLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : incidents.length > 0 ? (
              <>
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

                {/* Pagination for All Reports */}
                <Pagination
                  currentPage={incidentsCurrentPage}
                  totalPages={incidentsTotalPages}
                  totalItems={incidentsTotalItems}
                  onPageChange={handleIncidentsPageChange}
                  itemName="reports"
                />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-500">
                  No reports found.
                </div>
              </div>
            )}
          </div>
        )}

        {/* Drafts Tab */}
        {activeTab === "Drafts" && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Drafts</h2>
            </div>

            {draftsLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : drafts.length > 0 ? (
              <>
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
                                <Link to={`/edit_draft/${draft.id}`}>
                                  <Edit className="w-4 h-4" />
                                </Link>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination for Drafts */}
                <Pagination
                  currentPage={draftsCurrentPage}
                  totalPages={draftsTotalPages}
                  totalItems={draftsTotalItems}
                  onPageChange={handleDraftsPageChange}
                  itemName="drafts"
                />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-500">
                  No drafts available.
                </div>
              </div>
            )}
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
        <Link to="/sos">
          <button className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-sm font-bold">SOS</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GatewayShieldReports;
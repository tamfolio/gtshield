import React, { useEffect, useState } from "react";
import {
  Bell,
  Settings,
  Shield,
  AlertTriangle,
  MessageSquare,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../../Components/Website/Navbar";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRequest } from "../../../requestMethod";

const AdminStatCard = ({ title, value, change, isNegative, valueColor = "text-gray-900" }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </h3>
      <div className="flex items-center text-xs">
        <span className={`mr-1 ${isNegative ? "text-red-500" : "text-green-500"}`}>
          {isNegative ? "↓" : "↑"}
        </span>
        <span className="text-gray-600">{change}</span>
      </div>
    </div>
    <div className={`text-2xl font-bold ${valueColor}`}>
      {value}
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  // Update your selectors to match the normalized structure
  const userData = useSelector((state) => state.user?.currentUser?.user);
  const token = useSelector(
    (state) => state.user?.currentUser?.tokens?.access?.token
  );
  const [hasReports, setHasReports] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalIncidents, setTotalIncidents] = useState(0);
  
  localStorage.setItem("isAuthenticated", "true");

  console.log(incidents);

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      try {
        const res = await userRequest(token).get(
          `/incident/all?page=${currentPage}&size=${pageSize}`
        );
        console.log("✅ Incidents fetched:", res.data);
        
        const incidentsData = res.data?.data?.incidents;
        const paginationData = incidentsData?.pagination;
        
        setIncidents(incidentsData?.data || []);
        setTotalPages(paginationData?.totalPages || 0);
        setTotalIncidents(paginationData?.total || 0);
        setHasReports((incidentsData?.data || []).length > 0);
        
        // Update current page from API response to stay in sync
        if (paginationData?.currentPage) {
          setCurrentPage(paginationData.currentPage);
        }
      } catch (err) {
        console.error("❌ Failed to fetch incidents:", err);
        setError("Failed to fetch incidents");
        setHasReports(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchIncidents();
    }
  }, [token, currentPage, pageSize]);

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

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'onhold':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
      case 'inprogress':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
      case 'solved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  const reports = [
    {
      id: 1,
      type: "Rape Case",
      dateReported: "Jan 4, 2025",
      status: "In Progress",
      statusColor: "bg-orange-100 text-orange-800",
    },
    {
      id: 2,
      type: "Kidnapping",
      dateReported: "Jan 4, 2025",
      status: "Solved",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      type: "Killing",
      dateReported: "Jan 2, 2025",
      status: "In Progress",
      statusColor: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <Navbar isAuthenticated={true} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome {userData?.userName},
            </h1>
            <p className="text-gray-600">
              Ready to make your community safer? Let's get started.
            </p>
          </div>

          {/* Buttons - Mobile: Stacked, Desktop: Side by side */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link to="/emergency-contact" className="w-full sm:w-auto">
              <button className="bg-white text-[14px] hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 w-full">
                Emergency Contact
              </button>
            </Link>
            <Link to="/report-incident" className="w-full sm:w-auto">
              <button className="text-[14px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium w-full">
                Report an Incident
              </button>
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reports Section */}
        {!loading && hasReports ? (
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-sm border border-[#E9EAEB]">
              {/* Header */}
              <div className="px-4 sm:px-6 py-4 border-b border-b-[#E9EAEB]">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Reports
                </h2>
              </div>

              {/* Mobile Card View - Only show on mobile */}
              <div className="block md:hidden">
                <div className="divide-y divide-gray-200">
                  {incidents?.map((report) => (
                    <div key={report.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          {report.incidentType}
                        </h3>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.incidentStatus)}`}
                        >
                          {report.incidentStatus}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">
                        {formatDate(report.datePublished)}
                      </p>
                      <button
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        onClick={() => navigate(`/reports/${report.id}`)}
                      >
                        View Details →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Table View - Only show on desktop */}
              <div className="hidden md:block overflow-x-auto">
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
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {incidents?.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.incidentType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(report.datePublished)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.incidentStatus)}`}
                          >
                            {report.incidentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-medium"
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

              {/* Pagination */}
              {incidents.length > 0 && (
                <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
                  {/* Desktop pagination */}
                  <div className="hidden sm:flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">
                        Page {currentPage} of {totalPages || 1}
                      </span>
                      <span className="ml-2 text-gray-500">
                        ({totalIncidents} total incidents)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        First
                      </button>
                      
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      
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
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      >
                        Last
                      </button>
                    </div>
                  </div>
                  
                  {/* Mobile pagination - simplified */}
                  <div className="flex sm:hidden justify-center items-center gap-4">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>
                    
                    <span className="text-sm text-gray-700 font-medium">
                      {currentPage} / {totalPages || 1}
                    </span>
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Mobile page info */}
                  <div className="flex sm:hidden justify-center mt-3">
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">{totalIncidents} total incidents</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : !loading && !hasReports ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
              <MessageSquare className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              You haven't submitted any reports yet
            </h3>
            <p className="text-gray-600 text-center">
              Click "Report an Incident" to get started
            </p>
          </div>
        ) : null}
      </div>

      {/* Floating SOS Button */}
      <Link to="/sos">
        <button className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center">
          <span className="text-sm font-bold">SOS</span>
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
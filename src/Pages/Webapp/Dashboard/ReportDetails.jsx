import React, { useState, useEffect } from "react";
import { ArrowLeft, Edit, Check, Clock, AlertCircle, Home, Star } from "lucide-react";
import Navbar from "../../../Components/Website/Navbar";
import FeedbackModal from "./Modals/FeedbackModal";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { userRequest } from "../../../requestMethod";
import { useSelector } from "react-redux";
import LeaveAReview from "./LeaveAReview";

// Common Header Component with Breadcrumb
const ReportHeader = ({ incident, onBackToReports, pageToShow, onBackToDetails, showReviewButton, onLeaveReview, currentView, onSaveChanges, getStatusColor, getStatusIcon }) => (
  <div className="p-6 border-b border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={pageToShow === 'review' ? onBackToDetails : onBackToReports}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {incident?.incidentType}
            </h1>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                incident?.incidentStatus
              )}`}
            >
              {getStatusIcon(incident?.incidentStatus)}
              <span className="ml-1">{incident?.incidentStatus}</span>
            </span>
          </div>
          <nav className="flex mt-2 text-sm text-gray-500">
            <button
              onClick={onBackToReports}
              className="hover:text-gray-700 flex items-center"
            >
              <Home className="w-4 h-4 mr-1" />
              Reports
            </button>
            <span className="mx-2">/</span>
            <span>All Reports</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">
              {incident?.incidentType}
            </span>
            {pageToShow === 'review' && (
              <>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">Review</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {showReviewButton && pageToShow === 'reportDetails' && currentView === "details" && (
          <button
            onClick={onLeaveReview}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Leave a Review
          </button>
        )}

        {currentView === "edit" && pageToShow === 'reportDetails' && (
          <button
            onClick={onSaveChanges}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Check className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        )}
      </div>
    </div>
  </div>
);

// Review Component
const ReviewComponent = ({ incident, onBackToDetails }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleSubmitReview = () => {
    const reviewData = {
      rating,
      review,
      isAnonymous,
      incidentId: incident?.id,
      timestamp: new Date().toISOString()
    };
    
    console.log("Review submitted:", reviewData);
    // Here you would typically send the review to your API
    
    // Go back to details view after submission
    onBackToDetails();
  };

  return (
   <LeaveAReview/>
  );
};

const ReportDetails = () => {
  const [reportId] = useState("1");
  const [report, setReport] = useState(null);
  const [currentView, setCurrentView] = useState("details");
  const [loading, setLoading] = useState(true);
  const [pageToShow, setPageToShow] = useState('review'); // Can be 'reportDetails' or 'review'
  const { id } = useParams();
  const token = useSelector(
    (state) => state?.user?.currentUser?.tokens?.access?.token
  );

  const [incident, setIncident] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const navigate = useNavigate();

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const res = await userRequest(token).get(`/incident/${id}`);
        setIncident(res.data.data.incident);
      } catch (error) {
        console.error("❌ Failed to fetch incident:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchIncident();
    }
  }, [id, token]);

  const reportsData = {
    1: {
      id: 1,
      type: "Rape Case",
      dateReported: "Jan 4, 2025",
      dateCreated: "16th May, 2025",
      status: "Resolved",
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
    // ... other report data
  };

  // Simulate API call to fetch report data
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const reportData = reportsData[reportId];
      if (reportData) {
        setReport(reportData);
      }
      setLoading(false);
    };

    fetchReport();
  }, [reportId]);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "Closed":
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

  const handleBackToReports = () => {
    navigate("/reports");
    console.log("Navigate back to /reports");
  };

  const handleEdit = () => {
    setCurrentView("edit");
  };

  const handleFeedbackSubmit = (feedbackData) => {
    const newReview = {
      id: Date.now(), // Simple ID generation
      name: feedbackData.hideIdentity ? null : "Current User",
      rating: feedbackData.rating,
      comment: feedbackData.description,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      likes: 0,
      anonymous: feedbackData.hideIdentity,
    };

    setShowFeedbackModal(false);
    console.log("Feedback submitted:", feedbackData);
  };

  const handleLeaveReview = () => {
    setPageToShow('review');
  };

  const handleBackToReportDetails = () => {
    setPageToShow('reportDetails');
  };

  const handleSaveChanges = () => {
    setCurrentView("details");
    console.log("Save changes for report:", reportId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Report Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The report you're looking for doesn't exist.
          </p>
          <button
            onClick={handleBackToReports}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  const isResolved = incident?.incidentStatus === "Closed" || incident?.incidentStatus === "Resolved";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar isAuthenticated={true} />
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        reportType={incident?.incidentType}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Common Header with Breadcrumb */}
          <ReportHeader
            incident={incident}
            onBackToReports={handleBackToReports}
            pageToShow={pageToShow}
            onBackToDetails={handleBackToReportDetails}
            showReviewButton={isResolved}
            onLeaveReview={handleLeaveReview}
            currentView={currentView}
            onSaveChanges={handleSaveChanges}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />

          {/* Conditional Content */}
          {pageToShow === 'review' ? (
            <ReviewComponent 
              incident={incident} 
              onBackToDetails={handleBackToReportDetails}
            />
          ) : (
            /* Report Details Content */
            <div className="p-6">
              {/* Report Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm font-medium text-gray-500 block mb-1">
                    Date Created
                  </span>
                  <p className="text-base font-semibold text-gray-900">
                    {formatDate(incident?.datePublished)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm font-medium text-gray-500 block mb-1">
                    Status
                  </span>
                  <p className="text-base font-semibold text-gray-900">
                    Report received and under review
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm font-medium text-gray-500 block mb-1">
                    Submission Time
                  </span>
                  <p className="text-base font-semibold text-gray-900">
                    {formatTime(incident?.datePublished)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <span className="text-sm font-medium text-gray-500 block mb-1">
                    Location
                  </span>
                  <p className="text-base font-semibold text-gray-900">
                    {incident?.address}
                  </p>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {currentView === "edit"
                    ? "About the Incident"
                    : "Report Description"}
                </h2>

                {currentView === "edit" ? (
                  <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="4"
                    defaultValue={incident?.description}
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {incident?.description}
                  </p>
                )}
              </div>

              {/* Images Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Evidence & Documentation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {incident?.incidentImages?.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Evidence ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-opacity"></div>
                    </div>
                  ))}
                </div>

                {currentView === "edit" && (
                  <div className="flex justify-center pt-4">
                    <button className="flex items-center space-x-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      <Edit className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 font-medium">
                        Edit Images
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
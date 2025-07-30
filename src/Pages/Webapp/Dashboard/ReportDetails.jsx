import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Edit,
  Check,
  Clock,
  AlertCircle,
  Home,
  Star,
  ImageIcon,
  Eye,
  ExternalLink,
} from "lucide-react";
import Navbar from "../../../Components/Website/Navbar";
import FeedbackModal from "./Modals/FeedbackModal";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { userRequest } from "../../../requestMethod";
import { useSelector } from "react-redux";
import LeaveAReview from "./LeaveAReview";

// Image Component with Error Handling and Loading State
const ImageWithFallback = ({ src, alt, index, onClick }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
    console.log(`❌ Failed to load image: ${src}`);
  };

  if (imageError) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
        <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-sm text-gray-500 text-center px-4">
          Failed to load image
        </p>
        <button
          onClick={() => window.open(src, "_blank")}
          className="mt-2 text-blue-600 hover:text-blue-700 text-sm flex items-center"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Open in new tab
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-64 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all cursor-pointer ${
          imageLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        onClick={onClick}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <Eye className="w-8 h-8 text-white" />
      </div>
    </div>
  );
};

// Image Modal for Full View
const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2 z-10"
        >
          <ArrowLeft className="w-6 h-6 transform rotate-45" />
        </button>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

// Common Header Component with Breadcrumb
const ReportHeader = ({
  incident,
  onBackToReports,
  pageToShow,
  onBackToDetails,
  showReviewButton,
  onLeaveReview,
  currentView,
  onSaveChanges,
  getStatusColor,
  getStatusIcon,
}) => (
  <div className="p-6 border-b border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={pageToShow === "review" ? onBackToDetails : onBackToReports}
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
            {pageToShow === "review" && (
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
        {showReviewButton &&
          pageToShow === "reportDetails" &&
          currentView === "details" && (
            <button
              onClick={onLeaveReview}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Leave a Review
            </button>
          )}

        {currentView === "edit" && pageToShow === "reportDetails" && (
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
  return <LeaveAReview />;
};

const ReportDetails = () => {
  const [reportId] = useState("1");
  const [report, setReport] = useState(null);
  const [currentView, setCurrentView] = useState("details");
  const [loading, setLoading] = useState(true);
  const [pageToShow, setPageToShow] = useState("reportDetails"); // Can be 'reportDetails' or 'review'
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
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
        const incidentData = res.data.data.incident;
        setIncident(incidentData);

        // Debug: Log the incident data and images
        console.log("✅ Incident fetched:", incidentData);
        console.log("📸 Images array:", incidentData.incidentImages);

        if (incidentData.incidentImages) {
          incidentData.incidentImages.forEach((image, index) => {
            console.log(`📸 Image ${index + 1}:`, image);
          });
        }
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

  console.log('checkingdata', incident)

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-orange-100 text-orange-800";
      case "Closed":
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "new":
        return "bg-blue-100 text-blue-800";
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
  };

  const handleEdit = () => {
    setCurrentView("edit");
  };

  const handleFeedbackSubmit = (feedbackData) => {
    setShowFeedbackModal(false);
    console.log("Feedback submitted:", feedbackData);
  };

  const handleLeaveReview = () => {
    setPageToShow("review");
  };

  const handleBackToReportDetails = () => {
    setPageToShow("reportDetails");
  };

  const handleSaveChanges = () => {
    setCurrentView("details");
    console.log("Save changes for report:", reportId);
  };

  const handleImageClick = (imageSrc, index) => {
    console.log(`🖼️ Image clicked: ${imageSrc}`);
    setSelectedImage({ src: imageSrc, alt: `Evidence ${index + 1}` });
    setShowImageModal(true);
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

  const isResolved =
    incident?.incidentStatus === "Closed" ||
    incident?.incidentStatus === "Resolved";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar isAuthenticated={true} />
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        reportType={incident?.incidentType}
      />

      {/* Image Modal */}
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageSrc={selectedImage?.src}
        imageAlt={selectedImage?.alt}
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
          {pageToShow === "review" ? (
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
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Evidence & Documentation
                  </h2>
                  {incident?.incidentImages?.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {incident.incidentImages.length} image(s) uploaded
                    </span>
                  )}
                </div>

                {incident?.incidentImages &&
                incident.incidentImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {incident.incidentImages.map((image, index) => (
                      <ImageWithFallback
                        key={index}
                        src={image} // ✅ Use the actual image URL from the data
                        alt={`Evidence ${index + 1}`}
                        index={index}
                        onClick={() => handleImageClick(image, index)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Evidence Uploaded
                    </h3>
                    <p className="text-gray-500">
                      No images or documents were provided with this report.
                    </p>
                  </div>
                )}

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

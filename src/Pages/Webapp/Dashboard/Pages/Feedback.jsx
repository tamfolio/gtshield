import React, { useCallback, useEffect, useState } from "react";
import {
  Search,
  Check,
  Menu,
  Home,
  BarChart3,
  Users,
  MapPin,
  MessageSquare,
  Bell,
  Settings,
  Trash2,
  Edit3,
  Star,
  X,
  Eye,
} from "lucide-react";
import Navbar from "../../../../Components/Website/Navbar";
import { userRequest } from "../../../../requestMethod";
import { useSelector } from "react-redux";
import { fetchStations } from "../../../../Api/incidentApi";
import Select from "react-select";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SuccessModal = ({ isOpen, onClose, onOkClick, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#101828B2] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Feedback submitted successfully
          </h3>

          <div className="w-full space-y-3">
            <button
              onClick={onOkClick}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Ok
            </button>
            <Link to="/dashboard">
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Go to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// New Feedback Details Modal Component
const FeedbackDetailsModal = ({ isOpen, onClose, feedback }) => {
  if (!isOpen || !feedback) return null;

  const renderStarRating = (feedback) => {
    // Only show stars if there's actual rating data and it's for complaints or compliments
    const hasRating = feedback.rating && feedback.rating > 0;
    const isRatingType =
      feedback.feedbackType?.toLowerCase() === "complaint" ||
      feedback.feedbackType?.toLowerCase() === "compliment";

    if (!hasRating || !isRatingType) {
      return null;
    }

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 ${
              star <= feedback.rating
                ? "text-blue-600 fill-blue-600"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#101828B2] flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4">
        {/* Content */}
        <div className="space-y-6">
          {/* Feedback Type */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Feedback Type</span>
            <span className="text-gray-900 capitalize">
              {feedback.feedbackType}
            </span>
          </div>

          {/* Feedback Recipient */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">
              Feedback Recipient
            </span>
            <span className="text-gray-900">
              {feedback.station ? "Station" : "Officer"}
            </span>
          </div>

          {/* Station Name or Officer Name */}
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">
              {feedback.station ? "Station Name" : "Officer Name"}
            </span>
            <span className="text-gray-900">
              {feedback.station || feedback.officerName}
            </span>
          </div>

          {/* Star Rating (only show if there's actual rating data) */}
          {renderStarRating(feedback) && (
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">Star Rating</span>
              {renderStarRating(feedback)}
            </div>
          )}

          {/* Comment */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-700 font-medium">Comment</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feedback.comment}
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex space-x-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const StarRating = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (starValue) => {
    onRatingChange(starValue);
  };

  const handleStarHover = (starValue) => {
    setHoveredRating(starValue);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <button
          key={starValue}
          type="button"
          onClick={() => handleStarClick(starValue)}
          onMouseEnter={() => handleStarHover(starValue)}
          onMouseLeave={handleStarLeave}
          className="p-1 transition-colors focus:outline-none"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              starValue <= (hoveredRating || rating)
                ? "text-blue-600 fill-blue-600"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-600">
          {rating} star{rating !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
};

const FeedbackPage = () => {
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackRecipient, setFeedbackRecipient] = useState("Station");
  const [officerName, setOfficerName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [feedbackTypes, setFeedbackTypes] = useState([]);
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [stations, setStations] = useState([]);
  const [activeTab, setActiveTab] = useState("Give Feedback");

  // New state for feedback details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const token = useSelector(
    (state) => state?.user?.currentUser?.tokens?.access?.token
  );

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      month: "short", // Jun
      day: "numeric", // 25
      year: "numeric", // 2025
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const [formData, setFormData] = useState({
    nearestPoliceStation: null,
  });

  const handleStationChange = useCallback((selected) => {
    setFormData((prev) => ({ ...prev, nearestPoliceStation: selected }));
  }, []);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleOkClick = () => {
    // Reset all form fields when OK is clicked
    setFeedbackType("");
    setFeedbackRecipient("Station");
    setFormData({ nearestPoliceStation: null });
    setOfficerName("");
    setComment("");
    setRating(0);
    setShowModal(false);
  };

  // Function to handle feedback item click
  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDetailsModal(true);
  };

  // Function to close details modal
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedFeedback(null);
  };

  // Function to get the selected feedback type name
  const getSelectedFeedbackTypeName = () => {
    const selectedType = feedbackTypes.find((type) => type.id === feedbackType);
    return selectedType ? selectedType.name.toLowerCase() : "";
  };

  // Function to check if rating should be shown
  const shouldShowRating = () => {
    const typeName = getSelectedFeedbackTypeName();
    return typeName === "complaint" || typeName === "compliment";
  };

  // Function to handle feedback type change
  const handleFeedbackTypeChange = (e) => {
    setFeedbackType(e.target.value);
    // Reset rating when changing feedback type
    setRating(0);
  };

  // Function to handle feedback recipient change
  const handleFeedbackRecipientChange = (e) => {
    setFeedbackRecipient(e.target.value);
  };

  const getFeedbackTypes = async () => {
    try {
      const res = await userRequest(token).get("/feedback/types");
      setFeedbackTypes(res.data.data);
      console.log(res.data.data);
      return res.data;
    } catch (err) {
      console.error(
        "Failed to fetch feedback types:",
        err?.response?.data || err
      );
      throw err;
    }
  };

  const getFeedbackHistory = async (page = 1, size = 10) => {
    try {
      const res = await userRequest(token).get(
        `/feedback/history?page=${page}&size=${size}`
      );
      setFeedbackHistory(res.data.data.data);
      console.log(res.data.data.data);
    } catch (err) {
      console.error(
        "Error fetching feedback history:",
        err?.response?.data || err
      );
      throw err;
    }
  };

  useEffect(() => {
    getFeedbackTypes();
    getFeedbackHistory();
  }, []);

  useEffect(() => {
    const getStations = async () => {
      try {
        const rawData = await fetchStations();
        console.log("Stations API response:", rawData);
        const formattedData = rawData?.data.map((item) => ({
          label: item.formation,
          value: item.id,
        }));
        setStations(formattedData);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    getStations();
  }, []);

  const createFeedback = async (token, payload) => {
    try {
      const res = await userRequest(token).post("/feedback/create", payload);
      return res.data;
    } catch (err) {
      console.error("Failed to submit feedback:", err?.response?.data || err);
      throw err;
    }
  };

  const handleSubmit = async () => {
    const showRating = shouldShowRating();

    // Validation - require station for station feedback, officer name for officer feedback
    const isStationFeedback = feedbackRecipient === "Station";
    const isOfficerFeedback = feedbackRecipient === "Officer";

    if (
      !feedbackType ||
      !comment ||
      (isStationFeedback && !formData.nearestPoliceStation?.value) ||
      (isOfficerFeedback && !officerName.trim()) ||
      (showRating && rating === 0)
    ) {
      const missingRating = showRating && rating === 0;
      let errorMessage = "Please complete all required fields";

      if (missingRating) {
        errorMessage += " including the rating";
      } else if (isStationFeedback && !formData.nearestPoliceStation?.value) {
        errorMessage = "Please select a station";
      } else if (isOfficerFeedback && !officerName.trim()) {
        errorMessage = "Please enter the officer name";
      }

      toast.error(errorMessage);
      return;
    }

    const payload = {
      feedbackTypeId: feedbackType,
      feedbackRecipient: feedbackRecipient,
      stationId: isStationFeedback
        ? formData.nearestPoliceStation?.value
        : null,
      comment,
      officerName: isOfficerFeedback
        ? officerName.trim()
        : officerName.trim() || "Anonymous",
      // Send actual rating for complaint/compliment, 0 for suggestion
      rating: showRating ? rating : 0,
    };

    try {
      await createFeedback(token, payload);

      // ✅ Show success modal (form will be cleared when OK is clicked)
      setShowModal(true);
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
      console.error("Feedback submit error:", error?.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />

      {/* Mobile Back Button */}
      <div className="md:hidden px-4 py-3 bg-white">
        <button className="flex items-center text-gray-600">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="px-4 md:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Give Feedback
          </h1>

          {/* Tabs */}
          <div className="flex space-x-8 mb-8 border-b">
            <button
              onClick={() => setActiveTab("Give Feedback")}
              className={`pb-3 font-medium ${
                activeTab === "Give Feedback"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Give Feedback
            </button>
            <button
              onClick={async () => {
                await getFeedbackHistory();
                setActiveTab("Feedback History");
              }}
              className={`pb-3 font-medium ${
                activeTab === "Feedback History"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Feedback History
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-2xl mx-auto">
            {activeTab === "Give Feedback" ? (
              <div className="space-y-6">
                {/* Feedback Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Feedback Type
                  </label>
                  <select
                    value={feedbackType}
                    onChange={handleFeedbackTypeChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select feedback type</option>
                    {feedbackTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Feedback Recipient */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Feedback Recipient
                  </label>
                  <select
                    value={feedbackRecipient}
                    onChange={handleFeedbackRecipientChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="Station">Station</option>
                    <option value="Officer">Officer</option>
                  </select>
                </div>

                {/* Conditional Fields based on Feedback Recipient */}
                {feedbackRecipient === "Station" ? (
                  /* Station Name */
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Station Name
                    </label>
                    <div className="relative">
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
                  </div>
                ) : (
                  /* Officer Name */
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Officer Name
                    </label>
                    <input
                      type="text"
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      placeholder="Search"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                )}

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Brief summary of your feedback"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>

                {/* Star Rating - Only show for Complaint and Compliment */}
                {shouldShowRating() && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Star Rating
                    </label>
                    <StarRating
                      rating={rating}
                      onRatingChange={handleRatingChange}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
              </div>
            ) : (
              /* Feedback History Tab */
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Feedback History
                </h3>

                {/* Table Header */}
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-600">
                  <span>Feedback Type</span>
                  <span>Date Created</span>
                </div>

                {/* Feedback History List */}
                <div className="space-y-2">
                  {feedbackHistory.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleFeedbackClick(item)}
                      className="flex justify-between items-center py-4 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="text-gray-900 font-medium capitalize">
                        {item.feedbackType}
                      </span>
                      <span className="text-gray-600">
                        {formatDateTime(item.createdAt)}
                      </span>
                    </div>
                  ))}

                  {feedbackHistory.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No feedback history found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onOkClick={handleOkClick}
        type="feedback"
      />

      <FeedbackDetailsModal
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
        feedback={selectedFeedback}
      />
    </div>
  );
};

export default FeedbackPage;

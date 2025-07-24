import React, { useState } from "react";
import { userRequest } from "../../../requestMethod";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function LeaveAReview() {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comments, setComments] = useState("");
  const [hideIdentity, setHideIdentity] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const token = useSelector(
    (state) => state?.user?.currentUser?.tokens?.access?.token
  );
  const userData = useSelector(
    (state) => state?.user?.currentUser?.user
  );

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex) => {
    setHoveredRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleReviewSubmit = async () => {
    // Validation
    if (!rating) {
      toast.error("Please provide a rating.");
      return;
    }

    if (!comments.trim()) {
      toast.error("Please add your comments.");
      return;
    }

    if (!userData?.fullName) {
      toast.error("User information not available.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: userData.fullName,
        rating,
        comments: comments.trim(),
        isIdentityHidden: hideIdentity,
        incidentId: id
      };

      const res = await userRequest(token).post(
        `/incident/${id}/review`,
        payload
      );

      console.log("✅ Review submitted:", res.data);
      toast.success("Review submitted successfully!");
      
      // Reset form after successful submission
      setRating(0);
      setComments("");
      setHideIdentity(false);
      
    } catch (err) {
      console.error("❌ Failed to submit review:", err);
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          "Failed to submit review";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start bg-white p-8">
      <h1 className="text-2xl text-left font-semibold text-gray-900 mb-8">
        Rate Your Case
      </h1>
      <div className="flex flex-col items-center justify-center w-full">
        {/* Rating Section */}
        <div className="mb-8 w-[360px] flex flex-col items-start justify-center">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                disabled={isSubmitting}
              >
                <svg
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "text-blue-600 fill-current"
                      : "text-gray-300 fill-current"
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {rating} star{rating !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        {/* Comments Section */}
        <div className="mb-6 w-[360px]">
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-700 mb-3"
          >
            Comments <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comments"
            rows={6}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Share your experience..."
            disabled={isSubmitting}
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1">
            {comments.length}/1000 characters
          </p>
        </div>

        <div className="flex items-start justify-start w-[360px]">
          {/* Hide Identity Checkbox */}
          <div className="mb-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hideIdentity}
                onChange={(e) => setHideIdentity(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                disabled={isSubmitting}
              />
              <span className="ml-2 text-sm text-gray-700">
                Hide my identity from police officers
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-[360px]">
          <button
            onClick={handleReviewSubmit}
            disabled={isSubmitting || !rating || !comments.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaveAReview;
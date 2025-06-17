import { useState } from "react";
import { Star, CheckCircle, XCircle } from 'lucide-react';

const StarRating = ({ rating, onRatingChange, interactive = false, size = "w-6 h-6" }) => {
    const [hoveredRating, setHoveredRating] = useState(0);
  
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= (hoveredRating || rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
};

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, onRedirectToDashboard }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
        <div className="p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Review submitted successfully
          </h2>
          
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ok
            </button>
            
            <button
              onClick={onRedirectToDashboard}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Redirect to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Failure Modal Component
const FailureModal = ({ isOpen, onClose, onRetry, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
        <div className="p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Submission Failed
          </h2>
          
          <p className="text-gray-600 mb-6 text-sm">
            {errorMessage || "Something went wrong. Please try again."}
          </p>
          
          <div className="space-y-3">
            <button
              onClick={onRetry}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedbackModal = ({ isOpen, onClose, onSubmit, reportType }) => {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState('');
    const [hideIdentity, setHideIdentity] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailureModal, setShowFailureModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
      if (rating === 0 || !description.trim()) {
        alert('Please provide both rating and description');
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        const feedbackData = {
          rating,
          description,
          hideIdentity,
          timestamp: new Date().toISOString()
        };

        // Simulate API call - replace this with your actual submission logic
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            // Simulate random success/failure for demo
            const isSuccess = Math.random() > 0.3; // 70% success rate
            if (isSuccess) {
              resolve();
            } else {
              reject(new Error('Network error occurred'));
            }
          }, 1500);
        });

        // If submission is successful
        if (onSubmit) {
          onSubmit(feedbackData);
        }
        
        // Reset form
        setRating(0);
        setDescription('');
        setHideIdentity(false);
        
        // Show success modal
        setShowSuccessModal(true);
        
      } catch (error) {
        // Handle submission failure
        setErrorMessage(error.message || 'An unexpected error occurred');
        setShowFailureModal(true);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleSuccessClose = () => {
      setShowSuccessModal(false);
      onClose();
    };

    const handleSuccessRedirect = () => {
      setShowSuccessModal(false);
      onClose();
      // Add your dashboard redirect logic here
      console.log('Redirecting to dashboard...');
    };

    const handleFailureClose = () => {
      setShowFailureModal(false);
      setErrorMessage('');
    };

    const handleRetry = () => {
      setShowFailureModal(false);
      setErrorMessage('');
      // The form remains open for retry
    };

    if (!isOpen) return null;

    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Give Feedback</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  ✕
                </button>
              </div>

              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Give Star Rating
                  </label>
                  <StarRating 
                    rating={rating} 
                    onRatingChange={setRating} 
                    interactive={!isSubmitting}
                    size="w-8 h-8"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="How did it happen? What happened..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500"
                    rows="4"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={hideIdentity}
                      onChange={(e) => setHideIdentity(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-gray-700">Hide my identity from police officers</span>
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <SuccessModal 
          isOpen={showSuccessModal}
          onClose={handleSuccessClose}
          onRedirectToDashboard={handleSuccessRedirect}
        />

        {/* Failure Modal */}
        <FailureModal 
          isOpen={showFailureModal}
          onClose={handleFailureClose}
          onRetry={handleRetry}
          errorMessage={errorMessage}
        />
      </>
    );
};

export default FeedbackModal


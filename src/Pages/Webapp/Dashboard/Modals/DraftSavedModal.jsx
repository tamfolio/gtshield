import React from 'react';
import { CheckCircle, X } from 'lucide-react';

const DraftSavedModal = ({ isOpen, onClose, onViewReport, onStayOnPage, onRedirectToDashboard }) => {

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#101828B2] bg-opacity-70 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all w-full max-w-sm sm:max-w-md mx-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal content */}
          <div className="px-6 pt-8 pb-6 sm:px-8">
            {/* Icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D1FADF] mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            {/* Title */}
            <h3 className="text-center text-xl font-semibold text-gray-900 mb-3">
              Draft Saved Successfully
            </h3>

            {/* Description */}
            <p className="text-center text-gray-600 text-sm mb-8 leading-relaxed">
              Your incident report has been saved as a draft. You can continue editing it later or submit it when ready.
            </p>

            {/* Action buttons */}
            <div className="space-y-3">
              {/* Primary button */}
              <button
                onClick={onViewReport}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                View Draft
              </button>

              {/* Secondary button */}
              <button
                onClick={onStayOnPage}
                className="w-full bg-blue-50 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Continue Editing
              </button>

              {/* Tertiary button */}
              <button
                onClick={onRedirectToDashboard}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftSavedModal
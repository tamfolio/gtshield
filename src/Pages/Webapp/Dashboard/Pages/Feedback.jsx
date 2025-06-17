import React, { useState } from 'react';
import { Search, Check, Menu, Home, BarChart3, Users, MapPin, MessageSquare, Bell, Settings, Trash2, Edit3 } from 'lucide-react';
import Navbar from '../../../../Components/Website/Navbar';



const SuccessModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {type === 'review' ? 'Review submitted successfully' : 'Feedback submitted successfully'}
          </h3>
          
          <div className="w-full space-y-3">
            <button 
              onClick={onClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Ok
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedbackPage = () => {
  const [feedbackType, setFeedbackType] = useState('Compliment');
  const [stationName, setStationName] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Give Feedback');

  // Sample feedback history data
  const feedbackHistory = [
    { id: 1, type: 'Compliment', date: 'Jan 4, 2025' },
    { id: 2, type: 'Complaint', date: 'Jan 4, 2025' },
    { id: 3, type: 'Suggestion', date: 'Jan 2, 2025' },
    { id: 4, type: 'Suggestion', date: 'Jan 2, 2025' },
    { id: 5, type: 'Suggestion', date: 'Jan 2, 2025' },
    { id: 6, type: 'Compliment', date: 'Jan 2, 2025' },
    { id: 7, type: 'Compliment', date: 'Jan 2, 2025' },
    { id: 8, type: 'Complaint', date: 'Jan 2, 2025' },
  ];

  const handleSubmit = () => {
    setShowModal(true);
  };

  const feedbackTypes = [
    { id: 'Compliment', label: 'Compliment' },
    { id: 'Complaint', label: 'Complaint' },
    { id: 'Suggestion', label: 'Suggestion' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      {/* Mobile Back Button */}
      <div className="md:hidden px-4 py-3 bg-white">
        <button className="flex items-center text-gray-600">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Breadcrumb - Desktop */}
      <div className="hidden md:block px-6 py-4 bg-white border-b">
        <div className="flex items-center text-sm text-gray-500">
          <Home className="w-4 h-4 mr-2" />
          <span className="mr-2">Home</span>
          <span className="mr-2">/</span>
          <span className="text-gray-900">Feedback</span>
        </div>
      </div>

      <div className="px-4 md:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Give Feedback</h1>

          {/* Tabs */}
          <div className="flex space-x-8 mb-8 border-b">
            <button 
              onClick={() => setActiveTab('Give Feedback')}
              className={`pb-3 font-medium ${
                activeTab === 'Give Feedback' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500'
              }`}
            >
              Give Feedback
            </button>
            <button 
              onClick={() => setActiveTab('Feedback History')}
              className={`pb-3 font-medium ${
                activeTab === 'Feedback History' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500'
              }`}
            >
              Feedback History
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 max-w-2xl mx-auto">
            {activeTab === 'Give Feedback' ? (
              <div className="space-y-6">
                {/* Feedback Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Feedback Type
                  </label>
                  <div className="space-y-3">
                    {feedbackTypes.map((type) => (
                      <label key={type.id} className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="radio"
                            name="feedbackType"
                            value={type.id}
                            checked={feedbackType === type.id}
                            onChange={(e) => setFeedbackType(e.target.value)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            feedbackType === type.id 
                              ? 'border-blue-600 bg-blue-600' 
                              : 'border-gray-300'
                          }`}>
                            {feedbackType === type.id && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <span className="ml-3 text-gray-700">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Station Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Station Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={stationName}
                      onChange={(e) => setStationName(e.target.value)}
                      placeholder="Search"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Officer Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Officer Name / Badge Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

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
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Feedback History</h3>
                
                {/* Table Header */}
                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg text-sm font-medium text-gray-600">
                  <span>Feedback Type</span>
                  <span>Date Created</span>
                </div>

                {/* Feedback History List */}
                <div className="space-y-2">
                  {feedbackHistory.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-gray-900 font-medium">{item.type}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-600">{item.date}</span>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        type="feedback"
      />
    </div>
  );
};

export default FeedbackPage;
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Check, Clock, AlertCircle, Home } from 'lucide-react';
import Navbar from '../../../Components/Website/Navbar';
import FeedbackModal from './Modals/FeedbackModal';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { userRequest } from "../../../requestMethod";
import { useSelector } from "react-redux";

const ReportDetails = () => {
  const [reportId] = useState('1');
  const [report, setReport] = useState(null);
  const [currentView, setCurrentView] = useState('details');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = useSelector(
    (state) => state?.user?.currentUser?.data?.tokens?.access?.token
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
    '1': {
      id: 1,
      type: "Rape Case",
      dateReported: "Jan 4, 2025",
      dateCreated: "16th May, 2025",
      status: "Resolved",
      submissionTime: "8:00am",
      location: "Street name, Ogun State",
      description: "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla. Elit nisl in eleifend sed nisl. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus.",
      details: [
        "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id.Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.",
        "Non pellentesque congue eget consectetur turpis.",
        "Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci."
      ],
      images: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop"
      ]
    },
    '2': {
      id: 2,
      type: "Kidnapping",
      dateReported: "Jan 4, 2025",
      dateCreated: "15th May, 2025",
      status: "Resolved",
      submissionTime: "10:30am",
      location: "Market Street, Lagos State",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      details: [
        "Detailed investigation conducted with local authorities.",
        "Suspect apprehended and case resolved successfully.",
        "Victim safely recovered and provided with necessary support."
      ],
      images: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
      ]
    },
    '3': {
      id: 3,
      type: "Killing",
      dateReported: "Jan 2, 2025",
      dateCreated: "14th May, 2025", 
      status: "Closed",
      submissionTime: "3:15pm",
      location: "Industrial Area, Kano State",
      description: "Serious incident requiring immediate investigation. Multiple witnesses present at the scene. Forensic evidence being collected and analyzed.",
      details: [
        "Crime scene secured and evidence collection completed.",
        "Witness statements recorded by investigating officers.",
        "Forensic analysis completed and results documented.",
        "Case closed with successful resolution."
      ],
      images: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop"
      ]
    }
  };

  // Simulate API call to fetch report data
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
      case 'In Progress':
        return 'bg-orange-100 text-orange-800';
      case 'Closed':
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Closed':
      case 'Resolved':
        return <Check className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleBackToReports = () => {
    // In a real app, you'd use: navigate('/reports');
    navigate('/reports')
    console.log('Navigate back to /reports');
  };

  const handleEdit = () => {
    setCurrentView('edit');
  };


  const handleFeedbackSubmit = (feedbackData) => {
    const newReview = {
      id: reviews.length + 1,
      name: feedbackData.hideIdentity ? null : 'Current User',
      rating: feedbackData.rating,
      comment: feedbackData.description,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      likes: 0,
      anonymous: feedbackData.hideIdentity
    };
    
    setShowFeedbackModal(false);
    console.log('Feedback submitted:', feedbackData);
  };

  const handleLeaveReview = () => {
    setShowFeedbackModal(true);
  };

  const handleSaveChanges = () => {
    setCurrentView('details');
    console.log('Save changes for report:', reportId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-600 mb-4">The report you're looking for doesn't exist.</p>
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

  const isResolved = report.status === 'Closed' || report.status === 'Resolved';
  const isInProgress = report.status === 'In Progress';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar isAuthenticated={true} />
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        reportType={report?.type}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleBackToReports}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {incident?.incidentType}
                    </h1>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(incident?.incidentStatus)}`}>
                      {getStatusIcon(incident?.incidentStatus)}
                      <span className="ml-1">{incident?.incidentStatus}</span>
                    </span>
                  </div>
                  <nav className="flex mt-2 text-sm text-gray-500">
                    <button onClick={handleBackToReports} className="hover:text-gray-700 flex items-center">
                      <Home className="w-4 h-4 mr-1" />
                      Reports
                    </button>
                    <span className="mx-2">/</span>
                    <span>All Reports</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">{incident?.incidentType}</span>
                  </nav>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                {isResolved && currentView === 'details' && (
                  <button 
                    onClick={handleLeaveReview}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Leave a Review
                  </button>
                )}
                
                {currentView === 'details' && (
                  <button 
                    onClick={handleEdit}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
                
                {currentView === 'edit' && (
                  <button 
                    onClick={handleSaveChanges}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Report Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm font-medium text-gray-500 block mb-1">Date Created</span>
                <p className="text-base font-semibold text-gray-900">{formatDate(incident?.datePublished)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm font-medium text-gray-500 block mb-1">Status</span>
                <p className="text-base font-semibold text-gray-900">Report received and under review</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm font-medium text-gray-500 block mb-1">Submission Time</span>
                <p className="text-base font-semibold text-gray-900">{formatTime(incident?.datePublished)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm font-medium text-gray-500 block mb-1">Location</span>
                <p className="text-base font-semibold text-gray-900">{incident?.address}</p>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {currentView === 'edit' ? 'About the Incident' : 'Report Description'}
              </h2>
              
              {currentView === 'edit' ? (
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                  defaultValue={incident?.description}
                />
              ) : (
                <p className="text-gray-700 leading-relaxed mb-6">{incident?.description}</p>
              )}

              {/* Details List */}
              
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Evidence & Documentation</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {incident?.incidentImages.map((image, index) => (
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
              
              {currentView === 'edit' && (
                <div className="flex justify-center pt-4">
                  <button className="flex items-center space-x-2 px-6 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <Edit className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 font-medium">Edit Images</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
import React, { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import Navbar from '../../../../Components/Website/Navbar';

const Survey = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    incidentType: '',
    address: '',
    description: '',
    hideIdentity: false
  });

  const steps = [
    { number: 1, title: 'Step 1', completed: true },
    { number: 2, title: 'Step 2', completed: false },
    { number: 3, title: 'Step 3', completed: false },
    { number: 4, title: 'Step 4', completed: false }
  ];

  const incidentTypes = [
    'Theft',
    'Assault',
    'Vandalism',
    'Burglary',
    'Fraud',
    'Domestic Violence',
    'Traffic Incident',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Survey submitted:', formData);
    setShowSuccessModal(true);
  };

  const handleViewSurvey = () => {
    setShowSuccessModal(false);
    // Handle view survey logic
  };

  const handleStayOnPage = () => {
    setShowSuccessModal(false);
    // Stay on current page
  };

  const handleRedirectToDashboard = () => {
    setShowSuccessModal(false);
    // Redirect to dashboard
  };

  const isStepCompleted = (stepNumber) => {
    return stepNumber < currentStep;
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
              isStepCompleted(step.number) 
                ? 'bg-green-500 border-green-500 text-white' 
                : step.number === currentStep
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-gray-100 border-gray-300 text-gray-500'
            }`}>
              {isStepCompleted(step.number) ? (
                <Check className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            <span className={`mt-2 text-sm ${
              step.number === currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-20 h-0.5 mx-4 ${
              isStepCompleted(step.number + 1) ? 'bg-green-500' : 'bg-gray-300'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type
              </label>
              <select
                value={formData.incidentType}
                onChange={(e) => handleInputChange('incidentType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select incident type</option>
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                placeholder="Your Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Description
              </label>
              <textarea
                placeholder="Tell us about what happened"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q1. Incident Type
              </label>
              <select
                value={formData.incidentType}
                onChange={(e) => handleInputChange('incidentType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select option</option>
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q1. Incident Type
              </label>
              <input
                type="text"
                placeholder="Your Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q1. Incident Type
              </label>
              <textarea
                placeholder="Tell us about what happened"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q1. Incident Type
              </label>
              <select
                value={formData.incidentType}
                onChange={(e) => handleInputChange('incidentType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select option</option>
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q1. Incident Type
              </label>
              <input
                type="text"
                placeholder="Your Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Q1. Incident Type
              </label>
              <textarea
                placeholder="Tell us about what happened"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="hideIdentity"
                checked={formData.hideIdentity}
                onChange={(e) => handleInputChange('hideIdentity', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="hideIdentity" className="ml-2 text-sm text-gray-700">
                Hide my identity from police officers
              </label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Survey Complete!</h2>
              <p className="text-gray-600">Thank you for submitting your incident report.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Desktop Header */}
        <Navbar isAuthenticated={true}/>

        

     

        {/* Desktop Breadcrumb */}
        <div className="hidden md:block max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  <a href="#" className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700">Community</a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  <span className="ml-2 text-sm font-medium text-gray-900">Survey</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mt-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Survey</h1>

          {/* Desktop Step Indicator */}
          <div className="hidden md:block">
            {renderStepIndicator()}
          </div>

          {/* Mobile Step Indicator */}
          <div className="md:hidden mb-6">
            <div className="space-y-3">
              {steps.map((step) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    isStepCompleted(step.number) 
                      ? 'bg-green-500 text-white' 
                      : step.number === currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {isStepCompleted(step.number) ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={`ml-3 text-sm ${
                    step.number === currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            {renderStepContent()}

            {/* Form Actions */}
            {currentStep < 4 && (
              <div className="mt-6 md:mt-8 space-y-3">
                {currentStep === 3 ? (
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                  >
                    Next
                  </button>
                )}
                
                {currentStep > 1 && (
                  <button
                    onClick={handleGoBack}
                    className="w-full bg-white text-gray-700 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                  >
                    Go Back
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Survey submitted successfully</h2>
              
              <div className="space-y-3">
                <button
                  onClick={handleViewSurvey}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                >
                  View Survey
                </button>
                
                <button
                  onClick={handleStayOnPage}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
                >
                  Stay on Page
                </button>
                
                <button
                  onClick={handleRedirectToDashboard}
                  className="w-full bg-white text-gray-700 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
                >
                  Redirect to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Survey;
import React, { useState } from 'react';
import { Upload, Copy, Check, Search } from 'lucide-react';

const IncidentReportingSystem = () => {
  const [currentPage, setCurrentPage] = useState('report');
  const [formData, setFormData] = useState({
    incidentType: '',
    description: '',
    image: null
  });
  const [trackingId, setTrackingId] = useState('');
  const [searchTrackingId, setSearchTrackingId] = useState('');

  const generateTrackingId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = () => {
    if (!formData.incidentType || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }
    const newTrackingId = generateTrackingId();
    setTrackingId(newTrackingId);
    setCurrentPage('confirmation');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
  };

  const ReportPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-2 mb-8 justify-start">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 bg-gray-50">
            Report An Incident
          </button>
          <button 
            onClick={() => setCurrentPage('track')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50"
          >
            Track an Anonymous Report
          </button>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Report An Incident</h1>
            <p className="text-gray-600">
              Explain what happens and elaborate on the incident you would like to report.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Type
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.incidentType}
                onChange={(e) => setFormData(prev => ({ ...prev, incidentType: e.target.value }))}
                required
              >
                <option value="">Select incident type</option>
                <option value="harassment">Harassment</option>
                <option value="discrimination">Discrimination</option>
                <option value="safety">Safety Concern</option>
                <option value="misconduct">Misconduct</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Description
              </label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="How did it happen? What happen..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incident Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="text-sm text-gray-600 mb-2">
                  <button 
                    type="button"
                    className="text-blue-600 hover:text-blue-700"
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    Click to upload
                  </button>
                  <span> or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".svg,.png,.jpg,.jpeg,.gif"
                  onChange={handleImageUpload}
                />
              </div>
              
              {formData.image && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <span className="text-gray-600">{formData.image.name}</span>
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            <button 
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ConfirmationPage = () => (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Incident Reported</h2>
          
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Your report have been received and will be attend to shortly. In the mean time, you might want to track the progress with your tracking ID.
          </p>
          
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Your tracking ID is</p>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={trackingId}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-center font-mono"
              />
              <button 
                onClick={copyTrackingId}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <button 
              onClick={() => setCurrentPage('track')}
              className="text-blue-600 hover:text-blue-700 text-sm underline"
            >
              Check status
            </button>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => {
                setCurrentPage('report');
                setFormData({ incidentType: '', description: '', image: null });
                setTrackingId('');
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                setCurrentPage('report');
                setFormData({ incidentType: '', description: '', image: null });
                setTrackingId('');
              }}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TrackPage = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-2 mb-8 justify-start">
          <button 
            onClick={() => setCurrentPage('report')}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50"
          >
            Report An Incident
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 bg-gray-50">
            Track an Anonymous Report
          </button>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Track an Anonymous Report</h1>
            <p className="text-gray-600">
              Kindly provide us with your tracking ID so we can give you the status of your report.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tracking ID
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your tracking ID"
                value={searchTrackingId}
                onChange={(e) => setSearchTrackingId(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'report':
        return <ReportPage />;
      case 'confirmation':
        return <ConfirmationPage />;
      case 'track':
        return <TrackPage />;
      default:
        return <ReportPage />;
    }
  };

  return renderCurrentPage();
};

export default IncidentReportingSystem;
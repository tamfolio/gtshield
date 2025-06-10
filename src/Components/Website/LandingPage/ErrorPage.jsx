import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

function ErrorPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    // You can replace this with your actual home route navigation
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-blue-600 font-medium text-sm uppercase tracking-wide">
              404 ERROR
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Page not found
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sorry, the page you are looking for doesn't exist.
              <br />
              Here are some helpful links:
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go back
            </button>
            <button
              onClick={handleGoHome}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              Take me home
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative lg:h-96 h-64 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/assets/not_found.jpg"
            alt="Page not found illustration"
            className="hidden md:block w-full h-full object-cover"
          />
          <img
            src="/assets/not_found_mobile.png"
            alt="Page not found illustration"
            className="block md:hidden w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
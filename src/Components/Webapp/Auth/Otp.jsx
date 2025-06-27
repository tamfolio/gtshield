import React, { useState } from "react";
import { Mail, Eye, EyeOff } from 'lucide-react';

// OTP Verification Component
const OTPVerification = ({ email, onVerify, onResend, isLoading }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setError('');
    onVerify(otp);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify your email
          </h1>
          <p className="text-gray-600">
            We've sent a verification code to {email}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit code"
              className={`
                block w-full px-3 py-3 border rounded-xl text-gray-900 text-center text-lg
                placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent transition-all duration-200 bg-gray-50 
                focus:bg-white hover:bg-white
                ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'}
              `}
              maxLength={6}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="
              w-full bg-[#444CE7] text-white py-3 px-4 
              rounded-xl font-medium hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 
              disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
              shadow-lg hover:shadow-xl
            "
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </div>
            ) : (
              'Verify Email'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onResend}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
            >
              Resend code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
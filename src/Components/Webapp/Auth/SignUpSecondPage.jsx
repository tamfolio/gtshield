import React, { useState } from "react";
import { MapPin, Check, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { publicRequest } from "../../../requestMethod";
import { toast } from "react-toastify";

const SignUpSecondPage = ({ onNext, formData, setFormData, onComplete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasSpecialChar,
      minLength,
      hasUpperCase,
      hasSpecialChar
    };
  };

  // Form validation function - conditional password validation
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Updated phone number validation
    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else {
      const cleanPhone = formData.phoneNumber.replace(/[^\d]/g, '');
      if (cleanPhone.length !== 10) {
        newErrors.phoneNumber = "Phone number must be exactly 10 digits after +234";
      }
      // Additional validation for Nigerian phone format
      else if (!cleanPhone.match(/^[789]/)) {
        newErrors.phoneNumber = "Phone number must start with 7, 8, or 9 after +234";
      }
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.address?.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Only validate password for email signup users
    if (!formData.isGoogleSignup) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else {
        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
          newErrors.password = "Password must meet all requirements";
        }
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the Terms and Privacy Policy";
    }

    return newErrors;
  };

  // Function to get the complete phone number for submission - ALWAYS adds +234
  const getFormattedPhoneNumber = () => {
    if (!formData.phoneNumber) return '';
    
    // Remove any existing country code and non-digit characters
    let cleanPhone = formData.phoneNumber.replace(/[^\d]/g, '');
    
    // Remove +234 if user somehow entered it
    if (cleanPhone.startsWith('234')) {
      cleanPhone = cleanPhone.substring(3);
    }
    
    // Always return with +234 prefix
    return `+234${cleanPhone}`;
  };

  // Updated handleContinue function for direct submission
  const handleContinue = async () => {
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      console.log("Please fix all errors before continuing.");
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // Format phone number for submission
      const formattedPhoneNumber = getFormattedPhoneNumber();
      
      // Prepare payload based on signup type
      let payload;
      
      if (formData.isGoogleSignup) {
        console.log("Processing Google signup with OTP:", formData.otp);
        // Google signup - include OTP and no password
        payload = {
          fullName: formData.fullName,
          address: formData.address,
          phoneNumber: formattedPhoneNumber,
          gender: formData.gender,
          state: formData.state,
          email: formData.email,
          provider: "Google",
          otp: formData.otp, // OTP received from Google signup response
        };

        // Submit directly for Google users
        await publicRequest.post("/auth/signup/complete", payload);
        toast.success("Signup successful!");
        
        // Call onComplete to go to login or success page
        if (onComplete) {
          onComplete();
        }
        
      } else {
        // Email signup - will need OTP from user input (existing flow)
        const updatedFormData = {
          ...formData,
          phoneNumber: formattedPhoneNumber
        };
        setFormData(updatedFormData);
        onNext(updatedFormData); // Go to OTP screen
      }
      
    } catch (error) {
      const msg = error.response?.data?.error || "Something went wrong. Please try again.";
      toast.error(msg);
      setErrors({ general: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    // Handle phone number formatting - only store digits
    if (name === 'phoneNumber') {
      // Remove any non-digit characters and country codes
      let cleanValue = value.replace(/[^\d]/g, '');
      
      // Remove +234 if user enters it (we'll add it in the payload)
      if (cleanValue.startsWith('234')) {
        cleanValue = cleanValue.substring(3);
      }
      
      // Limit to 10 digits (after +234)
      if (cleanValue.length <= 10) {
        processedValue = cleanValue;
      } else {
        // Don't update if more than 10 digits
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : processedValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Enhanced geolocation function (keeping existing functionality)
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by this browser.");
      return;
    }

    setIsGettingLocation(true);
    setShowLocationOptions(false);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        const rawLocationData = {
          latitude: latitude,
          longitude: longitude,
          accuracy: accuracy,
          timestamp: new Date().toISOString(),
          coordinates: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          formattedCoords: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
        };

        setLocationData(rawLocationData);
        setShowLocationOptions(true);
        setIsGettingLocation(false);
        console.log("Location retrieved successfully!");
      },
      (error) => {
        setIsGettingLocation(false);
        let errorMessage = "Unable to retrieve location.";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        console.log(errorMessage);
        setFormData(prev => ({
          ...prev,
          useGeolocation: false
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  };

  // Handle location selection (keeping existing functionality)
  const handleLocationSelect = (locationType) => {
    if (!locationData) return;

    let selectedAddress = '';
    let locationMetadata = {};

    switch (locationType) {
      case 'coordinates':
        selectedAddress = locationData.formattedCoords;
        locationMetadata = {
          type: 'coordinates',
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          accuracy: locationData.accuracy
        };
        break;
      case 'manual':
        selectedAddress = formData.address || '';
        locationMetadata = {
          type: 'manual',
          referenceLocation: {
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            accuracy: locationData.accuracy
          }
        };
        break;
    }

    setFormData(prev => ({
      ...prev,
      address: selectedAddress,
      locationMetadata: locationMetadata,
      useGeolocation: true
    }));

    setShowLocationOptions(false);
  };

  // Handle geolocation checkbox change
  const handleGeolocationToggle = (e) => {
    const { checked } = e.target;
    
    if (!checked) {
      setFormData(prev => ({
        ...prev,
        useGeolocation: false,
        locationMetadata: null
      }));
      setLocationData(null);
      setShowLocationOptions(false);
    } else {
      setFormData(prev => ({
        ...prev,
        useGeolocation: checked
      }));
      handleGetLocation();
    }
  };

  const states = ["Ogun"];
  const genders = ["Male", "Female", "Others"];

  // Only calculate password validation for email signup users
  const passwordValidation = !formData.isGoogleSignup && formData.password ? validatePassword(formData.password) : null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Complete your profile
          </h2>
          {formData.isGoogleSignup && (
            <p className="mt-2 text-sm text-green-600">
              Google account connected successfully!
            </p>
          )}
        </div>

        <div className="mt-8 space-y-6">
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName || ''}
                onChange={handleInputChange}
                placeholder="Your full name"
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number *
              </label>
              <div className="flex">
                <div className="px-3 py-2 border border-gray-300 border-r-0 rounded-l-md bg-gray-50 text-gray-700 text-sm flex items-center font-medium">
                  +234
                </div>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber || ''}
                  onChange={handleInputChange}
                  placeholder="8012345678"
                  maxLength="10"
                  className={`flex-1 px-3 py-2 border rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {formData.phoneNumber && (
                <div className="mt-1 text-xs text-gray-500">
                  Complete number: +234{formData.phoneNumber}
                </div>
              )}
              {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>}
            </div>

            {/* State */}
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State *
              </label>
              <select
                id="state"
                name="state"
                value={formData.state || ''}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                } ${formData.state ? 'text-gray-900' : 'text-gray-500'}`}
              >
                <option value="">Select your State</option>
                {states.map((state, index) => (
                  <option key={index} value={state} className="text-gray-900">
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
            </div>

            {/* Address with Location */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address || ''}
                onChange={handleInputChange}
                placeholder="Your Address"
                className={`w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              
              {/* Location functionality (keeping existing code) */}
              {formData.locationMetadata && (
                <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800">
                      Location saved ({formData.locationMetadata.type})
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-2">
                <div className="flex items-center">
                  <input
                    id="useGeolocation"
                    name="useGeolocation"
                    type="checkbox"
                    checked={formData.useGeolocation || false}
                    onChange={handleGeolocationToggle}
                    disabled={isGettingLocation}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                  />
                  <label
                    htmlFor="useGeolocation"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {isGettingLocation ? 'Getting location...' : 'Use my current location'}
                  </label>
                </div>
              </div>

              {/* Location Options Modal (keeping existing code) */}
              {showLocationOptions && locationData && (
                <div className="mt-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Choose how to use your location:
                  </h4>
                  
                  <div className="space-y-3">
                    <div 
                      className="flex items-start space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleLocationSelect('coordinates')}
                    >
                      <input type="radio" name="locationOption" className="mt-1 h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Use exact coordinates</div>
                        <div className="text-xs text-gray-500 mt-1">{locationData.formattedCoords}</div>
                      </div>
                    </div>

                    <div 
                      className="flex items-start space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleLocationSelect('manual')}
                    >
                      <input type="radio" name="locationOption" className="mt-1 h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Keep manual entry</div>
                        <div className="text-xs text-gray-500 mt-1">{formData.address || 'Type your address manually'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowLocationOptions(false)}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || ''}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.gender ? 'border-red-500' : 'border-gray-300'
                } ${formData.gender ? 'text-gray-900' : 'text-gray-500'}`}
              >
                <option value="">Select your Gender</option>
                {genders.map((gender, index) => (
                  <option key={index} value={gender} className="text-gray-900">
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
            </div>

            {/* Password - Only show for email signup */}
            {!formData.isGoogleSignup && (
              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password || ''}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        passwordValidation?.minLength ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className={`text-xs ${
                        passwordValidation?.minLength ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        passwordValidation?.hasUpperCase ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className={`text-xs ${
                        passwordValidation?.hasUpperCase ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        passwordValidation?.hasSpecialChar ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className={`text-xs ${
                        passwordValidation?.hasSpecialChar ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        One special character
                      </span>
                    </div>
                  </div>
                  
                  {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>

                {/* Confirm Password - Only show for email signup */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword || ''}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
                </div>
              </>
            )}
            
            {/* Terms and Privacy Policy */}
            <div>
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms || false}
                  onChange={handleInputChange}
                  className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5 ${
                    errors.acceptTerms ? 'border-red-500' : ''
                  }`}
                />
                <label
                  htmlFor="acceptTerms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I accept the{" "}
                  <Link
                    to="/terms-of-use"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 underline"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.acceptTerms && <p className="mt-1 text-xs text-red-500">{errors.acceptTerms}</p>}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleContinue}
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {formData.isGoogleSignup ? 'Completing Signup...' : 'Continue'}
                </div>
              ) : (
                formData.isGoogleSignup ? 'Complete Signup' : 'Continue'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSecondPage;
import React, { useState } from "react";
import { Eye, EyeOff, Monitor, Smartphone, MoreHorizontal } from "lucide-react";
import { userRequest } from "../../../../../requestMethod";
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from "../../../../../redux/loginSlice"; // Import logout action
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // For navigation

function Password() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.currentUser?.tokens?.access?.token);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isUpdating, setIsUpdating] = useState(false);

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

  // Mock login sessions data
  const loginSessions = [
    {
      id: 1,
      device: "2024 MacBook Pro 14-inch",
      location: "Melbourne, Australia",
      date: "22 Jan at 10:40am",
      isActive: true,
      icon: Monitor,
    },
    {
      id: 2,
      device: "2024 MacBook Pro 14-inch",
      location: "Melbourne, Australia",
      date: "22 Jan at 4:20pm",
      isActive: false,
      icon: Monitor,
    },
    {
      id: 3,
      device: "2024 MacBook Pro 14-inch",
      location: "Melbourne, Australia",
      date: "22 Jan at 12:15pm",
      isActive: false,
      icon: Monitor,
    },
    {
      id: 4,
      device: "2024 iPhone 16 Pro",
      location: "Melbourne, Australia",
      date: "22 Jan at 7:30am",
      isActive: false,
      icon: Smartphone,
    },
    {
      id: 5,
      device: "2024 MacBook Pro 14-inch",
      location: "Melbourne, Australia",
      date: "21 Jan at 4:00pm",
      isActive: false,
      icon: Monitor,
    },
    {
      id: 6,
      device: "2024 MacBook Pro 14-inch",
      location: "Melbourne, Australia",
      date: "21 Jan at 3:20pm",
      isActive: false,
      icon: Monitor,
    },
    {
      id: 7,
      device: "2024 MacBook Pro 14-inch",
      location: "Melbourne, Australia",
      date: "21 Jan at 11:15am",
      isActive: false,
      icon: Monitor,
    },
    {
      id: 8,
      device: "2024 iPhone 16 Pro",
      location: "Melbourne, Australia",
      date: "21 Jan at 8:30am",
      isActive: false,
      icon: Smartphone,
    },
    {
      id: 9,
      device: "2024 MacBook Pro 14-inch",
      location: "Melbourne, Australia",
      date: "20 Jan at 3:20pm",
      isActive: false,
      icon: Monitor,
    },
    {
      id: 10,
      device: "2024 MacBook Pro 14-inch",
      location: "Melbourne, Australia",
      date: "20 Jan at 1:10pm",
      isActive: false,
      icon: Monitor,
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdatePassword = async () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required.");
      return;
    }
  
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    // Enhanced password validation
    const passwordValidation = validatePassword(formData.newPassword);
    if (!passwordValidation.isValid) {
      let errorMessage = "Password must meet the following requirements:\n";
      if (!passwordValidation.minLength) errorMessage += "• At least 8 characters\n";
      if (!passwordValidation.hasUpperCase) errorMessage += "• At least 1 uppercase letter\n";
      if (!passwordValidation.hasSpecialChar) errorMessage += "• At least 1 special character\n";
      
      toast.error(errorMessage, {
        style: { whiteSpace: 'pre-line' }
      });
      return;
    }

    setIsUpdating(true);
  
    try {  
      const payload = {
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };
  
      const res = await userRequest(token).patch("user/update/password", payload);
  
      console.log("✅ Password updated successfully", res.data);
      
      // Show success message with logout warning
      toast.success("Password updated successfully! You will be logged out for security reasons.", {
        autoClose: 3000
      });

      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Wait a moment for user to see the success message, then logout
      setTimeout(() => {
        // Clear Redux state
        dispatch(LogOut());
        
        // Navigate to login page
        navigate('/login', { 
          replace: true,
          state: { 
            message: "Password updated successfully. Please log in with your new password.",
            type: "success"
          }
        });
        
        // Optional: Clear any localStorage/sessionStorage
        localStorage.removeItem('persist:root'); // If you're using redux-persist
        
      }, 3000);

    } catch (err) {
      console.error("❌ Error updating password", err.response?.data || err.message);
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        toast.error("Current password is incorrect.");
      } else if (err.response?.status === 400) {
        toast.error(err.response?.data?.message || "Invalid password format.");
      } else {
        toast.error(
          err.response?.data?.error ||
            "Failed to update password. Please try again."
        );
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Check if all validation conditions are satisfied
  const isFormValid = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      return false;
    }
    
    const passwordValidation = validatePassword(formData.newPassword);
    const passwordsMatch = formData.newPassword === formData.confirmPassword;
    
    return passwordValidation.isValid && passwordsMatch;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Main Content */}
        <div className="w-full p-4 lg:p-8">
          <div className="mx-auto">
            {/* Mobile Header */}
            <div className="lg:hidden mb-6 w-1/2">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-semibold text-gray-900">
                  Password
                </h1>
                <button className="p-2">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                Please enter your current password to change your password.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Password Update Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                  {/* Desktop Header */}
                  <div className="hidden lg:block mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      Password
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Please enter your current password to change your password.
                    </p>
                  </div>

                  {/* Security Notice */}
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Security Notice
                        </h3>
                        <p className="mt-1 text-sm text-yellow-700">
                          For security reasons, you will be automatically logged out after updating your password and will need to log in again with your new credentials.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.current ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) =>
                            handleInputChange("currentPassword", e.target.value)
                          }
                          disabled={isUpdating}
                          className="w-full rounded-lg border border-gray-300 px-3 py-3 lg:py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base lg:text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          disabled={isUpdating}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:cursor-not-allowed"
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New password <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.new ? "text" : "password"}
                          value={formData.newPassword}
                          onChange={(e) =>
                            handleInputChange("newPassword", e.target.value)
                          }
                          disabled={isUpdating}
                          className="w-full rounded-lg border border-gray-300 px-3 py-3 lg:py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base lg:text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          disabled={isUpdating}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:cursor-not-allowed"
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Your new password must be more than 8 characters.
                      </p>
                      
                      {/* Password Requirements Indicator */}
                      {formData.newPassword && (
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              validatePassword(formData.newPassword).minLength ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className={`text-xs ${
                              validatePassword(formData.newPassword).minLength ? 'text-green-600' : 'text-red-600'
                            }`}>
                              At least 8 characters
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              validatePassword(formData.newPassword).hasUpperCase ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className={`text-xs ${
                              validatePassword(formData.newPassword).hasUpperCase ? 'text-green-600' : 'text-red-600'
                            }`}>
                              At least 1 uppercase letter
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              validatePassword(formData.newPassword).hasSpecialChar ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className={`text-xs ${
                              validatePassword(formData.newPassword).hasSpecialChar ? 'text-green-600' : 'text-red-600'
                            }`}>
                              At least 1 special character (!@#$%^&*(),.?":{}|&lt;&gt;)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm new password{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPasswords.confirm ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          disabled={isUpdating}
                          className="w-full rounded-lg border border-gray-300 px-3 py-3 lg:py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base lg:text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          disabled={isUpdating}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:cursor-not-allowed"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      
                      {/* Password Match Indicator */}
                      {formData.confirmPassword && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              formData.newPassword === formData.confirmPassword ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <span className={`text-xs ${
                              formData.newPassword === formData.confirmPassword ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formData.newPassword === formData.confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse lg:flex-row lg:justify-end space-y-3 space-y-reverse lg:space-y-0 lg:space-x-3 pt-4">
                      <button
                        onClick={handleCancel}
                        disabled={isUpdating}
                        className="w-full lg:w-auto px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium text-base lg:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdatePassword}
                        disabled={isUpdating || !isFormValid()}
                        className={`w-full lg:w-auto px-6 py-3 lg:py-2.5 rounded-lg font-medium text-base lg:text-sm flex items-center justify-center transition-colors ${
                          isUpdating || !isFormValid()
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isUpdating ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          'Update password'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Login Sessions Section */}
              {/* <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Where you're logged in
                    </h3>
                    <button className="p-1">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">
                    We'll alert you via olivia@untitledui.com if there is any
                    unusual activity on your account.
                  </p>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {loginSessions.map((session) => {
                      const IconComponent = session.icon;
                      return (
                        <div
                          key={session.id}
                          className="flex items-start space-x-3"
                        >
                          <div className="mt-1">
                            <IconComponent className="w-4 h-4 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900">
                                {session.device}
                              </p>
                              {session.isActive && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Active now
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {session.location}
                            </p>
                            <p className="text-xs text-gray-500">
                              {session.date}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
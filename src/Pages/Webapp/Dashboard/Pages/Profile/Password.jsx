import React, { useState } from "react";
import { Eye, EyeOff, Monitor, Smartphone, MoreHorizontal } from "lucide-react";
import { userRequest } from "../../../../../requestMethod";
import {useSelector} from 'react-redux'

function Password() {
  const token = useSelector((state) => state?.user?.currentUser?.data?.tokens?.access?.token);
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
      alert("All fields are required.");
      return;
    }
  
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
  
    try {  
      const payload = {
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };
  
      const res = await userRequest(token).patch("user/update/password", payload);
  
      console.log("✅ Password updated successfully", res.data);
      alert("Password updated successfully!");
  
      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("❌ Error updating password", err.response?.data || err.message);
      alert(
        err.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
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
                      Please enter your current password to change your
                      password.
                    </p>
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
                          className="w-full rounded-lg border border-gray-300 px-3 py-3 lg:py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base lg:text-sm"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                          className="w-full rounded-lg border border-gray-300 px-3 py-3 lg:py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base lg:text-sm"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
                          className="w-full rounded-lg border border-gray-300 px-3 py-3 lg:py-2.5 pr-10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base lg:text-sm"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col-reverse lg:flex-row lg:justify-end space-y-3 space-y-reverse lg:space-y-0 lg:space-x-3 pt-4">
                      <button
                        onClick={handleCancel}
                        className="w-full lg:w-auto px-6 py-3 lg:py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium text-base lg:text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdatePassword}
                        className="w-full lg:w-auto px-6 py-3 lg:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-base lg:text-sm"
                      >
                        Update password
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Login Sessions Section */}
              <div className="lg:col-span-1">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;

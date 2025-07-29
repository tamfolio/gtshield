import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // or your preferred toast library
import { userRequest } from "../../../../../requestMethod";

const EditProfile = ({ onCancel }) => {
  const userData = useSelector((state) => state.user?.currentUser?.user);
  const [formData, setFormData] = useState({
    phoneNumber: userData?.phoneNumber || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(
    (state) => state?.user?.currentUser?.tokens?.access?.token
  );

  const onChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhoneUpdate = async () => {
    // Validate phone number
    if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
      alert("Please enter a valid phone number");
      return;
    }

    // Optional: Add phone number format validation
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert("Please enter a valid phone number format");
      return;
    }

    setIsLoading(true);

    try {
      const bodyData = {
        phoneNumber: formData.phoneNumber.trim(),
      };

      console.log("🚀 Updating phone number with data:", bodyData);

      const res = await userRequest(token).put("/user/update/basic", bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Phone number updated:", res.data);
      
      // Show success message
      toast.success("Phone number updated successfully!");
      
      // Optional: Update local state or Redux store
      // dispatch(updateUserPhone(formData.phoneNumber));
      
      // Navigate back or close edit mode
      if (onCancel) {
        onCancel();
      }
      
    } catch (err) {
      console.error("❌ Failed to update phone number:", err);
      
      // Handle different error scenarios
      if (err.response?.status === 400) {
        toast.error("Invalid phone number format");
      } else if (err.response?.status === 409) {
        toast.error("Phone number already exists");
      } else {
        toast.error(err.response?.data?.message || "Failed to update phone number");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1">
          Personal Info
        </h1>
        <p className="text-gray-600 text-sm">
          Update your phone number here. Other details are read-only.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600">
            {userData?.fullName}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600">
            {userData?.email}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Username</label>
          <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600">
            {userData?.userName}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Address</label>
          <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600">
            {userData?.address}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone Number *</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            placeholder="Enter your phone number"
            className="w-full border rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <div className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-600">
            {userData?.gender}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePhoneUpdate}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
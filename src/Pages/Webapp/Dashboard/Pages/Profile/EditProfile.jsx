import React from "react";
import { Mail, Upload } from "lucide-react";

const EditProfile = ({ formData, onChange, onSave, onCancel }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-1">
          Personal Info
        </h1>
        <p className="text-gray-600 text-sm">
          Update your photo and personal details here.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="w-full border rounded-lg px-3 py-2.5"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full border rounded-lg px-3 py-2.5"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => onChange("username", e.target.value)}
            className="w-full border rounded-lg px-3 py-2.5"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            className="w-full border rounded-lg px-3 py-2.5"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            className="w-full border rounded-lg px-3 py-2.5"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className="w-full border rounded-lg px-3 py-2.5"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

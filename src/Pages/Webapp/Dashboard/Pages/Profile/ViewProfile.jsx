import React from "react";
import { Mail, MoreHorizontal } from "lucide-react";
import {useSelector} from 'react-redux'

const ViewProfile = ({ formData, onEdit }) => {
 // Update your selectors to match the normalized structure
const userData = useSelector((state) => state.user?.currentUser?.user);

  console.log(userData)
  return (
    <>
      {/* Header Section */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl p-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="ml-6">
              <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
              <p className="text-gray-600 mt-1">
                Update your personal details.
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          <button className="p-2">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <p className="text-gray-600 text-sm">
          Update your photo and personal details here.
        </p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-8 space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={`gatewayshield.ng/${userData?.userName}`}
              readOnly
              className="w-full rounded-lg border bg-gray-50 text-gray-600 px-3 py-2.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={userData?.email}
              readOnly
              className="w-full rounded-lg border bg-gray-50 text-gray-600 px-3 py-2.5 pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={userData?.fullName}
              readOnly
              className="w-full rounded-lg border bg-gray-50 text-gray-600 px-3 py-2.5"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={userData?.address}
              readOnly
              className="w-full rounded-lg border bg-gray-50 text-gray-600 px-3 py-2.5"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <input
            type="text"
            value={userData?.gender}
            readOnly
            className="w-full rounded-lg border bg-gray-50 text-gray-600 px-3 py-2.5"
          />
        </div>

        <div className="lg:hidden">
          <button
            onClick={onEdit}
            className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;

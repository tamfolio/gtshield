import React, { useState } from "react";
import Navbar from "../../../../../Components/Website/Navbar";
import { MoreHorizontal } from "lucide-react";
import ViewProfile from "./ViewProfile";
import EditProfile from "./EditProfile";
import Password from "./Password";
import EmergencyContact from "./EmergencyContact";
import Notifications from "../Notifications";
import ProfileNotifications from "./Notifications";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../../../../requestMethod";
import {useDispatch, useSelector} from 'react-redux'
import { toast } from "react-toastify";
import { LogOut } from "../../../../../Redux/LoginSlice";

function Profile() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("Profile");
  const [formData, setFormData] = useState({
    fullName: "Anita Kikitos",
    email: "olivia@untitledui.com",
    username: "olivia",
    address: "Lorem Ipsum Dolor Amet",
    phoneNumber: "+1 (555) 000-0000",
    gender: "Male",
  });

// Update your selectors to match the normalized structure
const userData = useSelector((state) => state.user?.currentUser?.user);
const token = useSelector((state) => state.user?.currentUser?.tokens?.access?.token);
  console.log(userData)

  const handleLogout = async () => {
    try {
      await userRequest(token).get("/auth/logout"); // ✅ correctly uses token
  
      dispatch(LogOut());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", err?.response?.data || err);
    }
  };
  

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const navigate = useNavigate();



  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">Settings</h2>
        <nav className="space-y-1">
          <button
            onClick={() => setSelectedScreen("Profile")}
            className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
              selectedScreen === "Profile"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Profile
          </button>

          <button
            onClick={() => setSelectedScreen("Password")}
            className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
              selectedScreen === "Password"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Password
          </button>
          <button
            onClick={() => setSelectedScreen("Emergency Contact")}
            className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
              selectedScreen === "Emergency Contact"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            Emergency Contact
          </button>
          <button
            onClick={() => setSelectedScreen("Notifications")}
            className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
              selectedScreen === "Notifications"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <div className="w-6 h-6 ml-2 flex items-center justify-center rounded-full bg-[#FAFAFA] border border-[#E9EAEB] text-sm">
                2
              </div>
            </div>
          </button>

          <button className="block w-full text-left px-3 py-2 rounded-md font-medium" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />

      <div className="flex">
        <DesktopSidebar />

        <div className="flex-1 p-4 lg:p-8">
          {selectedScreen === "Profile" &&
            (isEditing ? (
              <EditProfile
                formData={formData}
                onChange={handleInputChange}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <ViewProfile
                formData={formData}
                onEdit={() => setIsEditing(true)}
                onCancel={handleCancel}
              />
            ))}
          {selectedScreen === "Password" && <Password />}
          {selectedScreen === "Emergency Contact" && <EmergencyContact />}
          {selectedScreen === "Notifications" && <ProfileNotifications />}
        </div>
      </div>
    </div>
  );
}

export default Profile;

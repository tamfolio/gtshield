import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../../../../../requestMethod";
import { LogOut } from "../../../../../Redux/LoginSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Delete Account Confirmation Modal
const DeleteAccountModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative w-full max-w-md p-6 bg-white shadow-xl rounded-lg z-10">
          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <p className="text-gray-900 text-base leading-relaxed">
              Deleting your account will permanently remove your data. This
              action cannot be undone.
            </p>
            <p className="text-gray-700 mt-4">Do you wish to proceed?</p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50"
            >
              Go back
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                "Delete account"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(
    (state) => state.user?.currentUser?.tokens?.access?.token
  );

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      // Make the actual API call to delete the account
      const res = await userRequest(token).delete("/user/delete");

      dispatch(LogOut());
      toast.success("Your account has been deleted successfully")
      navigate("/");
    } catch (error) {
      console.error("Account deletion failed:", error);

      // Handle different error scenarios
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      } else if (error.response?.status === 403) {
        alert("You do not have permission to delete this account.");
      } else {
        alert("Failed to delete account. Please try again.");
      }
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] p-6">
      {/* Account deletion section */}
      <div className="bg-white rounded-lg p-6 pb-8">
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Account deletion
          </h2>
          <p className="text-gray-600">
            This is permanent and cannot be undone
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            What will happen
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
              Your profile and personal details will be permanently deleted.
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
              Your report history and uploads will be removed from your account.
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3"></span>
              System logs may keep non-personal, aggregated records as required
              by law or for security/audit purposes
            </li>
          </ul>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Delete my account
          </button>
        </div>
      </div>

      {/* Modal */}
      <DeleteAccountModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
      />
    </div>
  );
}

export default DeleteAccount;

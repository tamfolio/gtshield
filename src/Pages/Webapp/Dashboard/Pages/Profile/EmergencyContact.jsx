import React, { useState, useEffect } from "react";
import { Plus, ChevronDown, Phone, X, AlertTriangle } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userRequest } from "../../../../../requestMethod";

// Delete Confirmation Modal Component
const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  contactName,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#101828B2] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>

          {/* Modal Content */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Delete Emergency Contact
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete{" "}
            {contactName ? `"${contactName}"` : "this emergency contact"}? This
            action cannot be undone.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50"
            >
              No, I don't
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Yes I do"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function EmergencyContact() {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      fullName: "",
      phoneNumber: "",
      relationship: "",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const token = useSelector(
    (state) => state.user?.currentUser?.tokens?.access?.token
  );

  // Phone number validation function
  const validatePhoneNumber = (phoneNumber) => {
    // Check if it's exactly 10 digits (no more, no less)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Format phone number for payload (add +234 prefix)
  const formatPhoneForPayload = (phoneNumber) => {
    return `+234${phoneNumber}`;
  };

  // Form validation function
  const isFormValid = () => {
    if (editingContact) {
      // For editing, validate the single contact
      const contact = contacts[0];
      return (
        contact.fullName.trim() !== "" &&
        validatePhoneNumber(contact.phoneNumber) &&
        contact.relationship.trim() !== ""
      );
    } else {
      // For adding new contacts, at least one contact should be complete
      const validContacts = contacts.filter(
        (contact) =>
          contact.fullName.trim() !== "" &&
          validatePhoneNumber(contact.phoneNumber) &&
          contact.relationship.trim() !== ""
      );
      return validContacts.length > 0;
    }
  };

  // Check if individual contact is valid
  const isContactValid = (contact) => {
    return (
      contact.fullName.trim() !== "" &&
      validatePhoneNumber(contact.phoneNumber) &&
      contact.relationship.trim() !== ""
    );
  };

  // Fetch emergency contacts function (extracted for reuse)
  const fetchEmergencyContacts = async () => {
    setLoading(true);
    try {
      const res = await userRequest(token).get("/user/emergencyContact/all");
      console.log("✅ Emergency contacts fetched:", res.data);
      setEmergencyContacts(res.data?.data?.emergencyContacts || []);
    } catch (err) {
      console.error("❌ Failed to fetch emergency contacts:", err);
      setError("Failed to fetch emergency contacts");
    } finally {
      setLoading(false);
    }
  };

  // Fetch emergency contacts on component mount
  useEffect(() => {
    if (token) {
      fetchEmergencyContacts();
    }
  }, [token]);

  const handleInputChange = (contactId, field, value) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, [field]: value } : contact
      )
    );
  };

  const addNewContact = () => {
    const newContact = {
      id: Date.now(),
      fullName: "",
      phoneNumber: "",
      relationship: "",
    };
    setContacts((prev) => [...prev, newContact]);
  };

  const removeContact = (contactId) => {
    if (contacts.length > 1) {
      setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
    }
  };

  const clearAllFields = () => {
    setContacts([
      {
        id: Date.now(),
        fullName: "",
        phoneNumber: "",
        relationship: "",
      },
    ]);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    // Remove +234 prefix when editing to show only the 10 digits
    const phoneWithoutPrefix = contact.phoneNumber?.startsWith('+234') 
      ? contact.phoneNumber.slice(4) 
      : contact.phoneNumber || "";
    
    setContacts([
      {
        id: 1,
        fullName: contact.fullName || "",
        phoneNumber: phoneWithoutPrefix,
        relationship: contact.relationship || "",
      },
    ]);
    setShowAddForm(true);
  };

  // Open delete modal
  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;

    setIsDeleting(true);
    try {
      await userRequest(token).delete(
        `/user/emergencyContact/${contactToDelete.id}`
      );
      toast.success("Emergency contact deleted successfully!");

      // Refresh the list after deletion
      await fetchEmergencyContacts();

      // Close modal
      setShowDeleteModal(false);
      setContactToDelete(null);
    } catch (err) {
      console.error("❌ Failed to delete emergency contact:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to delete emergency contact";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!isFormValid()) {
      toast.error("Please fill in all required fields with valid information.");
      return;
    }

    const validContacts = contacts.filter(
      (contact) =>
        contact.fullName.trim() &&
        validatePhoneNumber(contact.phoneNumber) &&
        contact.relationship.trim()
    );

    setIsSubmitting(true);

    try {
      if (editingContact) {
        // Update existing contact
        const contactData = {
          fullName: validContacts[0].fullName.trim(),
          phoneNumber: formatPhoneForPayload(validContacts[0].phoneNumber.trim()),
          relationship: validContacts[0].relationship.trim(),
        };

        const response = await userRequest(token).put(
          `/user/emergencyContact/${editingContact.id}`,
          contactData
        );

        console.log("✅ Emergency contact updated:", response.data);
        toast.success("Emergency contact updated successfully!");
        setEditingContact(null);

        // Refresh the list after update
        await fetchEmergencyContacts();
      } else {
        // Add new contacts
        const promises = validContacts.map(async (contact) => {
          const contactData = {
            fullName: contact.fullName.trim(),
            phoneNumber: formatPhoneForPayload(contact.phoneNumber.trim()),
            relationship: contact.relationship.trim(),
          };

          return await userRequest(token).post(
            "/user/emergencyContact/",
            contactData
          );
        });

        const responses = await Promise.all(promises);
        console.log(
          "✅ Emergency contacts saved:",
          responses.map((res) => res.data)
        );

        const successMessage =
          responses[0]?.data?.message ||
          "Emergency contacts saved successfully!";
        toast.success(successMessage);

        // Refresh the list after adding
        await fetchEmergencyContacts();
      }

      // Reset form
      clearAllFields();
      setShowAddForm(false);
    } catch (err) {
      console.error("❌ Failed to save emergency contacts:", err);

      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to save emergency contacts";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    clearAllFields();
    setShowAddForm(false);
    setEditingContact(null);
  };

  const handleAddMoreContacts = () => {
    setShowAddForm(true);
    setEditingContact(null);
    clearAllFields();
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-600">Loading emergency contacts...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Emergency Contacts
          </h1>
          <p className="text-gray-600 text-sm">
            Update your emergency contacts here.
          </p>
        </div>

        {/* Display existing emergency contacts */}
        {!showAddForm && (
          <div className="space-y-4">
            {emergencyContacts.length > 0 ? (
              emergencyContacts.map((contact, index) => (
                <div
                  key={contact.id || index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {contact.fullName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {contact.phoneNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {contact.relationship}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleDeleteClick(contact)}
                      className="text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(contact)}
                      className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No emergency contacts added yet.
              </div>
            )}

            {/* Add More Contacts Button */}
            <button
              onClick={handleAddMoreContacts}
              className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors mt-4"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add more contacts
            </button>
          </div>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="space-y-8">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                {editingContact
                  ? "Edit Emergency Contact"
                  : "Add Emergency Contact"}
              </h2>
            </div>

            {contacts.map((contact, index) => (
              <div key={contact.id} className="space-y-4">
                {index > 0 && <hr className="border-gray-200" />}

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contact.fullName}
                    onChange={(e) =>
                      handleInputChange(contact.id, "fullName", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      contact.fullName.trim() === "" && showAddForm
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Full Name"
                  />
                  {contact.fullName.trim() === "" && showAddForm && (
                    <p className="text-red-500 text-xs mt-1">Full name is required</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 rounded-l-lg">
                      <span className="text-sm text-gray-600 mr-2">+234</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={contact.phoneNumber}
                      onChange={(e) => {
                        // Only allow digits and limit to 10 characters
                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                        handleInputChange(contact.id, "phoneNumber", value);
                      }}
                      maxLength={10}
                      className={`flex-1 px-3 py-2 border rounded-r-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        !validatePhoneNumber(contact.phoneNumber) && contact.phoneNumber !== ""
                          ? "border-red-300 bg-red-50"
                          : contact.phoneNumber === "" && showAddForm
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="8012345678"
                    />
                  </div>
                  {contact.phoneNumber !== "" && !validatePhoneNumber(contact.phoneNumber) && (
                    <p className="text-red-500 text-xs mt-1">
                      Please enter exactly 10 digits
                    </p>
                  )}
                  {contact.phoneNumber === "" && showAddForm && (
                    <p className="text-red-500 text-xs mt-1">Phone number is required</p>
                  )}
                </div>

                {/* Relationship */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={contact.relationship}
                      onChange={(e) =>
                        handleInputChange(
                          contact.id,
                          "relationship",
                          e.target.value
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 ${
                        contact.relationship === "" && showAddForm
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select relationship</option>
                      <option value="Grand Father">Grand Father</option>
                      <option value="Grand Mother">Grand Mother</option>
                      <option value="Husband">Husband</option>
                      <option value="Wife">Wife</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Child">Child</option>
                      <option value="Aunt">Aunt</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Niece">Niece</option>
                      <option value="Nephew">Nephew</option>
                      <option value="Father-in-law">Father-in-law</option>
                      <option value="Mother-in-law">Mother-in-law</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {contact.relationship === "" && showAddForm && (
                    <p className="text-red-500 text-xs mt-1">Please select a relationship</p>
                  )}
                </div>

                {/* Contact validation indicator */}
                {contacts.length > 1 && !editingContact && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isContactValid(contact) ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          isContactValid(contact) ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isContactValid(contact) ? "Complete" : "Incomplete"}
                      </span>
                    </div>
                    <button
                      onClick={() => removeContact(contact.id)}
                      className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors"
                    >
                      Remove Contact
                    </button>
                  </div>
                )}

                {/* Remove Contact Button (only show if more than 1 contact and not editing) */}
                {contacts.length > 1 && !editingContact && contacts.length === 1 && (
                  <button
                    onClick={() => removeContact(contact.id)}
                    className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors"
                  >
                    Remove Contact
                  </button>
                )}
              </div>
            ))}

            {/* Add More Contacts Button (only show when adding new contacts) */}
            {!editingContact && (
              <button
                onClick={addNewContact}
                className="flex items-center text-gray-600 font-medium hover:text-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add more contacts
              </button>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSubmitting || !isFormValid()}
                className={`px-6 py-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isSubmitting || !isFormValid()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isSubmitting
                  ? "Saving..."
                  : editingContact
                  ? "Update contact"
                  : "Save changes"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        contactName={contactToDelete?.fullName}
        isDeleting={isDeleting}
      />
    </>
  );
}

export default EmergencyContact;
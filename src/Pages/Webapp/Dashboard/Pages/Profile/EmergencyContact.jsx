import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userRequest } from "../../../../../requestMethod";

function EmergencyContact() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      fullName: "",
      phoneNumber: "",
      relationship: "",
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock token and userRequest for demo - replace with your actual implementations
  const token = useSelector((state) => state.user?.currentUser?.tokens?.access?.token);


 
 

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
      }
    ]);
  };

  const handleSave = async () => {
    // Validation
    const validContacts = contacts.filter(contact => 
      contact.fullName.trim() && contact.phoneNumber.trim() && contact.relationship.trim()
    );

    if (validContacts.length === 0) {
      toast.error("Please fill in at least one complete emergency contact.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send each contact to the API
      const promises = validContacts.map(async (contact) => {
        const contactData = {
          fullName: contact.fullName.trim(),
          phoneNumber: contact.phoneNumber.trim(),
          relationship: contact.relationship.trim()
        };

        return await userRequest(token).post('/user/emergencyContact/', contactData);
      });

      // Wait for all contacts to be saved
      const responses = await Promise.all(promises);

      console.log("✅ Emergency contacts saved:", responses.map(res => res.data));
      
      // Show success message from API response
      const successMessage = responses[0]?.data?.message || "Emergency contacts saved successfully!";
      toast.success(successMessage);
      
      // Clear all input fields on success
      clearAllFields();

    } catch (err) {
      console.error("❌ Failed to save emergency contacts:", err);
      
      // Show user-friendly error message using .error from response
      const errorMessage = err.response?.data?.error || 
                          err.response?.data?.message || 
                          "Failed to save emergency contacts";
      toast.error(`Error: ${errorMessage}`);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    clearAllFields();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-900 mb-2">
                Emergency Contacts
              </h1>
              <p className="text-gray-600 text-sm">
                Update your emergency contacts here.
              </p>
            </div>

            {/* Contact Forms */}
            <div className="space-y-8">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Full Name"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 rounded-l-lg">
                        <span className="text-sm text-gray-600 mr-2">NG</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        value={contact.phoneNumber}
                        onChange={(e) =>
                          handleInputChange(contact.id, "phoneNumber", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+234**********"
                      />
                    </div>
                  </div>

                  {/* Relationship */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship
                    </label>
                    <div className="relative">
                      <select
                        value={contact.relationship}
                        onChange={(e) =>
                          handleInputChange(contact.id, "relationship", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900"
                      >
                        <option value="">Select relationship</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Parent">Parent</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Remove Contact Button (only show if more than 1 contact) */}
                  {contacts.length > 1 && (
                    <button
                      onClick={() => removeContact(contact.id)}
                      className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors"
                    >
                      Remove Contact
                    </button>
                  )}
                </div>
              ))}

              {/* Add More Contacts Button */}
              <button
                onClick={addNewContact}
                className="flex items-center text-gray-600 font-medium hover:text-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add more contacts
              </button>
            </div>

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
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save changes"}
              </button>
            </div>
    </div>
  );
}

export default EmergencyContact;
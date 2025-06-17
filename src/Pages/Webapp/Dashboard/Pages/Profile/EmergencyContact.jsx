import React, { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";

function EmergencyContact() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      fullName: "Anita Kikitos",
      phoneNumber: "+1 (555) 000-0000",
      relationship: "Male", // This seems to be a placeholder in your design
    },
    {
      id: 2,
      fullName: "Anita Kikitos",
      phoneNumber: "+1 (555) 000-0000",
      relationship: "Male", // This seems to be a placeholder in your design
    },
  ]);

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
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
  };

  const handleSave = () => {
    console.log("Saving emergency contacts:", contacts);
    // Add save logic here
  };

  const handleCancel = () => {
    console.log("Cancelling changes");
    // Add cancel logic here
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Emergency Contacts
        </h1>
        <p className="text-gray-600">
          Update your emergency contacts here.
        </p>
      </div>

      {/* Contact Forms */}
      <div className="space-y-8">
        {contacts.map((contact, index) => (
          <div key={contact.id} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contact.fullName}
                onChange={(e) =>
                  handleInputChange(contact.id, "fullName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md">
                  <span className="text-sm text-gray-600 mr-1">US</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={contact.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(contact.id, "phoneNumber", e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship
              </label>
              <div className="relative">
                <select
                  value={contact.relationship}
                  onChange={(e) =>
                    handleInputChange(contact.id, "relationship", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">Select relationship</option>
                  <option value="Parent">Parent</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Sibling">Sibling</option>
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
                className="text-red-600 text-sm font-medium hover:text-red-700"
              >
                Remove Contact
              </button>
            )}
          </div>
        ))}

        {/* Add More Contacts Button */}
        <button
          onClick={addNewContact}
          className="flex items-center text-blue-600 font-medium hover:text-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add more contacts
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button
          onClick={handleCancel}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

export default EmergencyContact;
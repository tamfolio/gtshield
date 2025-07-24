import React, { useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import Navbar from "../../../../../Components/Website/Navbar";
import { userRequest } from '../../../../../requestMethod';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const EmergencyContact = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      fullName: '',
      phoneNumber: '',
      relationship: ''
    }
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = useSelector(
    (state) => state?.user?.currentUser?.tokens?.access?.token
  );

  const relationshipOptions = [
    'Father',
    'Mother',
    'Child',
    'Sibling',
    'Friend',
    'Colleague',
    'Other'
  ];

  const addNewContact = () => {
    const newContact = {
      id: Date.now(),
      fullName: '',
      phoneNumber: '',
      relationship: ''
    };
    setContacts([...contacts, newContact]);
  };

  const removeContact = (id) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const updateContact = (id, field, value) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const clearAllFields = () => {
    setContacts([
      {
        id: 1,
        fullName: '',
        phoneNumber: '',
        relationship: ''
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
    // Clear all fields on cancel
    clearAllFields();
    toast.info("Changes cancelled");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto md:mx-0 md:ml-8 lg:ml-12 xl:ml-16 bg-white md:bg-transparent min-h-screen md:mt-8 md:mb-8 md:rounded-none md:shadow-none">


        {/* Content */}
        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">Emergency Contacts</h1>
            <p className="text-gray-600 text-sm md:text-base">Update your emergency contacts here.</p>
          </div>

          {/* Contact Forms */}
          <div className="space-y-6 md:space-y-8">
            {contacts.map((contact, index) => (
              <div key={contact.id} className="space-y-4 md:space-y-6 p-4 md:p-6 bg-gray-50 rounded-lg relative">
                {contacts.length > 1 && (
                  <button
                    onClick={() => removeContact(contact.id)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {/* Full Name */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={contact.fullName}
                      onChange={(e) => updateContact(contact.id, 'fullName', e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="flex">
                        <div className="flex items-center px-3 py-2 md:px-4 md:py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                          <span className="text-sm text-gray-700 mr-1">NG</span>
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          value={contact.phoneNumber}
                          onChange={(e) => updateContact(contact.id, 'phoneNumber', e.target.value)}
                          className="flex-1 px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          placeholder="+234**********"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Relationship */}
                  <div className="md:col-span-1 lg:col-span-1 ml-10 lg:ml-">
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Relationship
                    </label>
                    <div className="relative">
                      <select
                        value={contact.relationship}
                        onChange={(e) => updateContact(contact.id, 'relationship', e.target.value)}
                        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white"
                      >
                        <option value="" disabled>Select relationship</option>
                        {relationshipOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add More Contacts Button */}
          <button
            onClick={addNewContact}
            className="w-full md:w-auto mt-6 md:mt-8 flex items-center justify-center py-3 md:py-4 px-6 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border-2 border-dashed border-gray-300 hover:border-blue-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add more contacts
          </button>

          {/* Action Buttons */}
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-3 md:gap-4">
            <button
              onClick={handleCancel}
              className="w-full md:w-auto py-3 md:py-4 px-6 md:px-8 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium order-2 md:order-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="w-full md:w-auto py-3 md:py-4 px-6 md:px-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium order-1 md:order-2"
            >
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
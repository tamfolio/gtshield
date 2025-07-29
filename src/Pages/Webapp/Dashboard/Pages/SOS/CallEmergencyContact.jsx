import React, { useState, useEffect } from 'react';
import { Phone, Loader2, AlertCircle } from 'lucide-react';
import Navbar from '../../../../../Components/Website/Navbar';
import { useSelector } from 'react-redux';
import { userRequest } from '../../../../../requestMethod';

const CallEmergencyContact = () => {
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector(
    (state) => state.user?.currentUser?.tokens?.access?.token
  );
  useEffect(() => {
    const fetchEmergencyContacts = async () => {
      setLoading(true);
      try {
        const res = await userRequest(token).get(
          "/user/emergencyContact/all"
        );
        console.log("✅ Emergency contacts fetched:", res.data);
        setEmergencyContacts(res.data?.data?.emergencyContacts || []);
      } catch (err) {
        console.error("❌ Failed to fetch emergency contacts:", err);
        setError("Failed to fetch emergency contacts");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEmergencyContacts();
    }
  }, [token]);

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

 

  const handleRetry = () => {
    if (token) {
      setError(null);
      const fetchEmergencyContacts = async () => {
        setLoading(true);
        try {
          const res = await userRequest(token).get(
            "/user/emergencyContact/all"
          );
          console.log("✅ Emergency contacts fetched:", res.data);
          setEmergencyContacts(res.data?.data?.emergencyContacts || []);
        } catch (err) {
          console.error("❌ Failed to fetch emergency contacts:", err);
          setError("Failed to fetch emergency contacts");
        } finally {
          setLoading(false);
        }
      };
      fetchEmergencyContacts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Call Emergency Contact</h1>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="ml-2 text-gray-600">Loading emergency contacts...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load contacts</h3>
                <p className="text-gray-600 mb-4 text-center">{error}</p>
                <button
                  onClick={handleRetry}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : emergencyContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Phone className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No emergency contacts</h3>
                <p className="text-gray-600 text-center">You haven't added any emergency contacts yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-medium text-gray-900">{contact.fullName}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {contact.relationship}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{contact.phoneNumber}</p>
                    </div>
                    
                    <button
                      onClick={() => handleCall(contact.phoneNumber)}
                      className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      aria-label={`Call ${contact.fullName}`}
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallEmergencyContact;
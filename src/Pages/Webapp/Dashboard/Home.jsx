import React, { useEffect, useState } from "react";
import {
  Bell,
  Settings,
  Shield,
  AlertTriangle,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import Navbar from "../../../Components/Website/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userRequest } from "../../../requestMethod";

const Dashboard = () => {
  const navigate = useNavigate();
 // Update your selectors to match the normalized structure
const userData = useSelector((state) => state.user?.currentUser?.user);
const token = useSelector((state) => state.user?.currentUser?.tokens?.access?.token);
  const [hasReports, setHasReports] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  localStorage.setItem("isAuthenticated", "true");

  console.log(incidents);

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      try {
        const res = await userRequest(token).get(
          "/incident/all?page=1&size=10"
        );
        console.log("✅ Incidents fetched:", res.data);
        setIncidents(res.data?.data?.incidents?.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch incidents:", err);
        setError("Failed to fetch incidents");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchIncidents();
    }
  }, [token]);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


  console.log(setHasReports);

  const reports = [
    {
      id: 1,
      type: "Rape Case",
      dateReported: "Jan 4, 2025",
      status: "In Progress",
      statusColor: "bg-orange-100 text-orange-800",
    },
    {
      id: 2,
      type: "Kidnapping",
      dateReported: "Jan 4, 2025",
      status: "Solved",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      type: "Killing",
      dateReported: "Jan 2, 2025",
      status: "In Progress",
      statusColor: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <Navbar isAuthenticated={true} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-1 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome {userData?.userName},
            </h1>
            <p className="text-gray-600">
              Ready to make your community safer? Let's get started.
            </p>
          </div>

          {/* Buttons - Mobile: Stacked, Desktop: Side by side */}
          <div className="flex gap-3 justify-center">
            <button className="bg-white text-[14px] hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 w-full sm:w-auto">
              Emergency Contact
            </button>
            <button className="text-[14px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium w-full sm:w-auto">
              <Link to="/report-incident">Report an Incident</Link>
            </button>
          </div>
        </div>

        {/* Reports Section */}
        {hasReports ? (
          /* Desktop Table View */
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-[#E9EAEB]">
              <div className="px-6 py-4 border-b border-b-[#E9EAEB]">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Report
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Reported
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="hidden md:block px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {incidents?.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {report.incidentType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(report.datePublished)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${report.statusColor}`}
                          >
                            {report.incidentStatus}
                          </span>
                        </td>
                        <td className="hidden md:block px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            className="text-blue-600 hover:text-blue-800 font-medium"
                            onClick={() => navigate(`/reports/${report.id}`)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile Card View and Desktop */
          <div className="space-y-4">
            {/* Mobile Table Headers - Only show on mobile when there are reports */}
            {hasReports && (
              <div className="sm:hidden bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="grid grid-cols-3 gap-4 px-4 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div>Report Type</div>
                  <div>Date Reported</div>
                  <div>Status</div>
                </div>
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="grid grid-cols-3 gap-4 px-4 py-4 border-t border-gray-100"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {report.type}
                    </div>
                    <div className="text-sm text-gray-500">
                      {report.dateReported}
                    </div>
                    <div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${report.statusColor}`}
                      >
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State - Both Mobile and Desktop */}
            {!hasReports && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="bg-gray-100 p-6 rounded-full mb-6">
                  <MessageSquare className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                  You haven't submitted any reports yet
                </h3>
                <p className="text-gray-600 text-center">
                  Click "Report an Incident" to get started
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating SOS Button */}
      <button className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center">
        <span className="text-sm font-bold">SOS</span>
      </button>

      {/* Toggle button for testing - Remove in production */}
    </div>
  );
};

export default Dashboard;

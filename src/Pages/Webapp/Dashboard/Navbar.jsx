import React, { useState } from "react";
import { Menu, X, Settings, ExternalLink, Bell } from "lucide-react";

const DashboardNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/home" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Reports", href: "reports" },
    { name: "SOS", href: "#" },
    { name: "News", href: "/news" },
    { name: "Crime Map", href: "/crime-map" },
    { name: "Community", href: "#" },
    { name: "Feedback", href: "#" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation Items */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center">
                <img src="/assets/Logomark.svg" alt="" />
              </div>

              {/* Desktop Navigation Items */}
              <div className="flex">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              {/* User Avatar */}
              <div className="flex items-center">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 md:hidden">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
            
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Gateway Shield
              </span>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                  </div>
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Gateway Shield
                </span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 py-6">
              <div className="space-y-1">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Settings */}
              <button className="flex items-center w-full px-2 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </button>

              {/* Open in browser */}
              <button className="flex items-center w-full px-2 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                <ExternalLink className="w-5 h-5 mr-3" />
                Open in browser
              </button>

              {/* User Profile */}
              <div className="flex items-center px-2 py-3 border-t border-gray-200">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Olivia Rhye"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    Olivia Rhye
                  </p>
                  <p className="text-sm text-gray-500">olivia@untitledui.com</p>
                  <div className="flex items-center mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMobileMenu}
          ></div>
        )}
      </nav>
    </>
  );
};

export default DashboardNavbar;

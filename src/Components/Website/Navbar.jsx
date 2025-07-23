import React, { useState } from "react";
import { Menu, X, Settings, ExternalLink, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, user = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCrimeMapClick = (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      // Navigate to authenticated crime map with user context
      navigate("/crime-map", {
        state: {
          isAuthenticated: true,
          user: user,
          source: "authenticated-nav",
        },
      });
    } else {
      // Navigate to public crime map
      navigate("/crime-map", {
        state: {
          isAuthenticated: false,
          source: "public-nav",
        },
      });
    }
  };

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { name: "Home", href: "/home" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Reports", href: "/reports" },
    { name: "SOS", href: "/sos" },
    { name: "News", href: "/news" },
    {
      name: "Crime Map",
      href: "/crime-map",
      onClick: handleCrimeMapClick, // Custom click handler
      type: "custom",
    },
    { name: "Community", href: "/communities" },
    { name: "Feedback", href: "/feedback" },
  ];

  const publicNavItems = [
    { name: "Home", href: "/", type: "link" },
    { name: "About", href: "#", type: "scroll", target: "about-section" },
    { name: "FAQs", href: "#", type: "scroll", target: "faq-section" },
    { name: "News", href: "/news", type: "link" },
    {
      name: "Crime Map",
      href: "/crime-map",
      onClick: handleCrimeMapClick,
      type: "custom",
    },
  ];

  const navigationItems = isAuthenticated
    ? authenticatedNavItems
    : publicNavItems;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    closeMobileMenu();
  };

  const handleNavClick = (item) => {
    if (item.type === "scroll") {
      scrollToSection(item.target);
    } else {
      closeMobileMenu();
    }
  };

  return (
    <>
      {/* Desktop Navigation - Now shows from lg screens and up */}
      <nav className="bg-white shadow-sm border-b border-gray-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation Items */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center">
                <img src="/assets/Logomark.svg" alt="Gateway Shield Logo" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Gateway Shield
                </span>
              </div>

              {/* Desktop Navigation Items */}
              <div className="flex space-x-1">
                {navigationItems.map((item, index) =>
                  item.type === "scroll" ? (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.target)}
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      key={index}
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                // Authenticated user items
                <>
                  {/* Settings */}
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>

                  {/* Notifications */}
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Link to="/notifications">
                      <Bell className="w-5 h-5" />
                    </Link>
                  </button>

                  {/* User Avatar */}
                  <div className="flex items-center">
                    <Link to="/profile">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          user?.avatar ||
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        }
                        alt="User avatar"
                      />
                    </Link>
                  </div>
                </>
              ) : (
                // Non-authenticated user items
                <>
                  <a
                    href="/report-incident"
                    className="text-gray-700 font-semibold text-sm hover:text-blue-600 transition-colors"
                  >
                    Report Anonymously
                  </a>
                  <div className="flex gap-3">
                    <a
                      href="/sign-up"
                      className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Sign Up
                    </a>
                    <a
                      href="/login"
                      className="text-white border border-blue-600 bg-blue-600 rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Login
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Tablet Navigation - Shows on md screens only */}
      <nav className="bg-white shadow-sm border-b border-gray-200 hidden md:block lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/assets/Logomark.svg" alt="Gateway Shield Logo" />
              <span className="ml-2 text-lg font-bold text-gray-900">
                Gateway Shield
              </span>
            </div>

            {/* Condensed Navigation - fewer items for md screens */}
            <div className="flex items-center space-x-4">
              {/* Key navigation items only */}
              <div className="flex space-x-1">
                {isAuthenticated ? (
                  <>
                    <a
                      href="/home"
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                    >
                      Home
                    </a>
                    <a
                      href="/dashboard"
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                    >
                      Dashboard
                    </a>
                    <a
                      href="/reports"
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                    >
                      Reports
                    </a>
                    <button
                      onClick={handleCrimeMapClick}
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                    >
                      Crime Map
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/"
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                    >
                      Home
                    </a>
                    <button
                      onClick={() => scrollToSection("about-section")}
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                    >
                      About
                    </button>
                    <a
                      href="/news"
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                    >
                      News
                    </a>
                    <button
                      onClick={handleCrimeMapClick}
                      className="text-gray-700 hover:text-blue-600 px-2 py-2 text-sm font-medium transition-colors"
                    >
                      Crime Map
                    </button>
                  </>
                )}
              </div>

              {/* Right side items for tablet */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Link to="/notifications">
                      <Bell className="w-5 h-5" />
                    </Link>
                  </button>
                  <Link to="/profile">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={
                        user?.avatar ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      }
                      alt="User avatar"
                    />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <a
                    href="/report-incident"
                    className="text-gray-700 font-semibold text-sm hover:text-blue-600 transition-colors"
                  >
                    Report Anonymously
                  </a>
                  <a
                    href="/sign-up"
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Sign Up
                  </a>
                  <a
                    href="/login"
                    className="text-white border border-blue-600 bg-blue-600 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Shows on sm screens and below */}
      <nav className="bg-white shadow-sm border-b border-gray-200 md:hidden">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/assets/Logomark.svg" alt="Gateway Shield Logo" />
              <span className="ml-2 text-xl font-bold text-gray-900">
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
            isMobileMenuOpen
              ? "translate-x-0"
              : isAuthenticated
              ? "-translate-x-full"
              : "translate-x-full"
          } fixed inset-y-0 ${
            isAuthenticated ? "left-0" : "right-0"
          } z-50 w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full w-[100%]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src="/assets/Logomark.svg"
                  alt="Gateway Shield Logo"
                  className="w-8 h-8"
                />
                <span className="ml-2 text-xl font-bold text-gray-900">
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
                {navigationItems.map((item, index) =>
                  item.type === "scroll" ? (
                    <button
                      key={index}
                      onClick={() => handleNavClick(item)}
                      className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 space-y-4">
              {isAuthenticated ? (
                // Authenticated user footer
                <>
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
                      src={
                        user?.avatar ||
                        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      }
                      alt={user?.name || "User"}
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || "User Name"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user?.email || "user@example.com"}
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-xs text-gray-500">Online</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Non-authenticated user footer
                <>
                  {/* Footer Links */}
                  <div className="flex justify-between mb-6">
                    <div className="space-y-2">
                      <a
                        href="/"
                        className="block text-gray-600 font-medium text-sm"
                        onClick={closeMobileMenu}
                      >
                        Home
                      </a>
                      <a
                        href="/privacy"
                        className="block text-gray-600 font-medium text-sm"
                        onClick={closeMobileMenu}
                      >
                        Privacy
                      </a>
                    </div>
                    <div className="space-y-2">
                      <a
                        href="/about-us"
                        className="block text-gray-600 font-medium text-sm"
                        onClick={closeMobileMenu}
                      >
                        About
                      </a>
                      <a
                        href="/terms"
                        className="block text-gray-600 font-medium text-sm"
                        onClick={closeMobileMenu}
                      >
                        Terms of Use
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <a
                      href="/sign-up"
                      className="block w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md text-center hover:bg-blue-700 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </a>
                    <a
                      href="/login"
                      className="block w-full border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-md text-center hover:bg-gray-50 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Log In
                    </a>
                    <a
                      href="/report-anonymously"
                      className="block w-full text-center bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-md hover:bg-gray-200 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Report Anonymously
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-[rgba(16, 24, 40, 0.7)] bg-opacity-20 z-40 w-full"
            onClick={toggleMobileMenu}
          ></div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

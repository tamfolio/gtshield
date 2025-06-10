import React, { useState } from "react";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="px-4 md:!px-[112px] flex items-center justify-between py-5 relative z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center justify-center gap-2">
            <img src="/assets/logo2.png" alt="Gateway Shield Logo" />
            <h3 className="font-bold text-xl">Gateway Shield</h3>
          </div>

          <div className="md:flex gap-5 hidden">
            <Link to="/" className="text-[#535862] font-semibold">
              Home
            </Link>
            <Link to="/about-us" className="text-[#535862] font-semibold">
              About
            </Link>
            <Link to="/faqs" className="text-[#535862] font-semibold">
              FAQs
            </Link>
            <Link to="/news" className="text-[#535862] font-semibold">
              News
            </Link>
            <Link to="/crime-map" className="text-[#535862] font-semibold">
              Crime Map
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/report-anonymously"
            className="text-[#535862] font-semibold text-md"
          >
            Report Anonymously
          </Link>
          <div className="flex gap-3">
            <div className="border border-[#D5D7DA] rounded-md px-4 py-2">
            <Link to='/sign-up'>Sign Up</Link> 
            </div>
            <div className="text-white border border-[#444CE7] bg-[#444CE7] rounded-md px-4 py-2">
             <Link to='/login'>Login</Link> 
            </div>
          </div>
        </div>

        <div className="block md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMobileMenuOpen ? (
              <IoClose size={40} color="#414651" />
            ) : (
              <IoMenuSharp size={40} color="#414651" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-100 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <img
                src="/assets/logo2.png"
                alt="Gateway Shield Logo"
                className="w-6 h-6"
              />
              <h3 className="font-bold text-lg">Gateway Shield</h3>
            </div>
            <button onClick={closeMobileMenu} className="focus:outline-none">
              <IoClose size={24} color="#414651" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6">
            <Link
              to="/"
              className="block text-[#414651] font-medium text-lg py-2"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="block text-[#414651] font-medium text-lg py-2"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              to="/faqs"
              className="block text-[#414651] font-medium text-lg py-2"
              onClick={closeMobileMenu}
            >
              FAQs
            </Link>
            <Link
              to="/news"
              className="block text-[#414651] font-medium text-lg py-2"
              onClick={closeMobileMenu}
            >
              News
            </Link>
            <Link
              to="/crime-map"
              className="block text-[#414651] font-medium text-lg py-2"
              onClick={closeMobileMenu}
            >
              Crime Map
            </Link>
          </nav>

          {/* Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
            {/* Footer Links */}
            <div className="flex justify-between mb-6">
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block text-[#535862] font-medium text-sm"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link
                  to="/privacy"
                  className="block text-[#535862] font-medium text-sm"
                  onClick={closeMobileMenu}
                >
                  Privacy
                </Link>
              </div>
              <div className="space-y-2">
                <Link
                  to="/about-us"
                  className="block text-[#535862] font-medium text-sm"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
                <Link
                  to="/terms"
                  className="block text-[#535862] font-medium text-sm"
                  onClick={closeMobileMenu}
                >
                  Terms of Use
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                className="w-full bg-[#444CE7] text-white font-semibold py-3 px-4 rounded-md"
                onClick={closeMobileMenu}
              >
               <Link to='/sign-up'>Sign Up</Link>
              </button>
              <button
                className="w-full border border-[#D5D7DA] text-[#414651] font-semibold py-3 px-4 rounded-md"
                onClick={closeMobileMenu}
              >
                <Link to='/login'>Log In</Link>
              </button>
              <Link
                to="/report-anonymously"
                className="block w-full text-center bg-gray-100 text-[#414651] font-semibold py-3 px-4 rounded-md"
                onClick={closeMobileMenu}
              >
                Report Anonymously
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { publicRequest } from "../../../requestMethod";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SignUpFirstPage = ({ onNext, error, formData, setFormData }) => {
  const [email, setEmail] = useState("");
  const [loadingProvider, setLoadingProvider] = useState("");
  const [emailError, setEmailError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
  
    setLocalLoading(true);
    try {
      await publicRequest.post("/auth/signup/email", { email });
      
      // ✅ Store the email in the shared formData
      setFormData((prev) => ({ ...prev, email }));
  
      // Move to next step
      onNext();
    } catch (err) {
      console.error("Email sign-up failed:", err);
      const msg =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setEmailError(msg);
    } finally {
      setLocalLoading(false);
    }
  };

  // JWT-based Google signup using the built-in GoogleLogin component
  const handleGoogleJWTSignup = async (credentialResponse) => {
    setLoadingProvider("google");
    setLocalLoading(true);
    try {
      const idToken = credentialResponse.credential;
      console.log("ID Token:", idToken);
      
      // Decode token to get user info locally
      const decoded = jwtDecode(idToken);
      console.log("Decoded token:", decoded);

      const userEmail = decoded.email;
      if (!userEmail) {
        throw new Error("No email returned from Google");
      }

      // Send JWT token to your backend and get OTP response
      const response = await publicRequest.post("/auth/signup/google", { 
        token: idToken  // Send the JWT token directly
      });

      console.log("Google signup response:", response.data);

      // Extract OTP from backend response
      const { data } = response.data;
      const otp = data.otp || data.token; // Use otp or token field from response

      // Store info in formData including the OTP for auto-submission
      setFormData((prev) => ({
        ...prev,
        email: userEmail,
        fullName: decoded.name || `${decoded.given_name || ""} ${decoded.family_name || ""}`.trim(),
        avatar: decoded.picture || "",
        otp: otp, // Store OTP to skip OTP screen
        isGoogleSignup: true, // Flag to indicate Google signup
      }));

      console.log("Stored formData with OTP:", {
        email: userEmail,
        fullName: decoded.name,
        otp: otp,
        isGoogleSignup: true
      });
      
      // Skip OTP screen and go directly to profile completion
      onNext("profile"); // Pass specific step to skip OTP
      
    } catch (err) {
      console.error("Google signup error:", err);
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Something went wrong with Google sign-up.";
      setEmailError(msg);
    } finally {
      setLoadingProvider("");
      setLocalLoading(false);
    }
  };

  // Custom Google login trigger for our styled button
  const triggerGoogleSignup = () => {
    // We'll use the hidden GoogleLogin component to trigger JWT-based signup
    setLoadingProvider("google");
  };

  const handleSocialLogin = (provider) => {
    if (provider === "google") {
      // Programmatically click the hidden Google login
      const googleButton = document.querySelector('[role="button"][aria-labelledby]');
      if (googleButton) {
        googleButton.click();
      } else {
        triggerGoogleSignup();
      }
    } else {
      setLoadingProvider(provider);
      setTimeout(() => {
        alert(
          `${provider.charAt(0).toUpperCase() + provider.slice(1)} sign-up initiated!`
        );
        setLoadingProvider("");
      }, 1500);
    }
  };

  const SocialButton = ({ provider, icon, children, variant = "default" }) => (
    <button
      onClick={() => handleSocialLogin(provider)}
      disabled={loadingProvider === provider}
      className={`
        w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 
        rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02] 
        hover:shadow-md hover:border-gray-300 active:scale-[0.98] disabled:opacity-70 
        disabled:cursor-not-allowed bg-white hover:bg-gray-50
        ${variant === "twitter" ? "text-blue-500" : "text-gray-700"}
      `}
    >
      {loadingProvider === provider ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      ) : (
        <img src={icon} alt={`${provider} icon`} className="w-5 h-5" />
      )}
      {loadingProvider === provider ? "Connecting..." : children}
    </button>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white transform hover:scale-[1.01] transition-transform duration-300">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/assets/Logomark.svg" alt="" />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create an account
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Hidden GoogleLogin component for JWT functionality */}
          <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
            <GoogleLogin
              onSuccess={handleGoogleJWTSignup}
              onError={() => {
                setEmailError("Google sign-up failed. Please try again.");
                setLoadingProvider("");
                setLocalLoading(false);
              }}
            />
          </div>

          {/* Email Section */}
          <div className="space-y-6 mb-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="olivia@untitledui.com"
                  className={`
                    block w-full pl-10 pr-3 py-3 border rounded-xl text-gray-900 
                    placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-200 bg-gray-50 
                    focus:bg-white hover:bg-white
                    ${
                      emailError
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200"
                    }
                  `}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEmailSubmit(e);
                    }
                  }}
                />
              </div>
              {emailError && (
                <p className="mt-1 text-sm text-red-600 animate-pulse">
                  {emailError}
                </p>
              )}
            </div>

            <button
              onClick={handleEmailSubmit}
              disabled={localLoading || emailError}
              className="
                w-full bg-[#444CE7] text-white py-3 px-4 
                rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 
                disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                shadow-lg hover:shadow-xl
              "
            >
              {localLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                "Continue with email"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                OR
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <SocialButton provider="google" icon="/assets/google.png">
              Sign up with Google
            </SocialButton>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200">
                <Link to="/login"> Log in</Link>
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpFirstPage;
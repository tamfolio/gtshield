import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Redux/apiCalls";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../../requestMethod";
import {
  LoginFailure,
  loginStart,
  loginSuccess,
} from "../../../Redux/LoginSlice";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credentials = {
      email,
      password,
    };

    try {
      await loginUser(dispatch, credentials);
      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      toast.error(err?.response?.data?.error);
      console.error("Login Error:", err?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  // JWT-based Google login using the built-in GoogleLogin component
  const handleGoogleJWTLogin = async (credentialResponse) => {
    setLoadingProvider("google");
    try {
      dispatch(loginStart());

      const idToken = credentialResponse.credential;
      console.log("ID Token:", idToken);
      
      // Optional: Decode token to see user info locally
      const decoded = jwtDecode(idToken);
      console.log("Decoded token:", decoded);

      // Send JWT token to your backend
      const loginRes = await publicRequest.post("/auth/login/google", {
        token: idToken  // Send the JWT token directly
      });

      const user = loginRes.data.data.user;
      const token = loginRes.data.data.tokens.access.token;

      dispatch(loginSuccess({ user, token }));

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      toast.success("Logged in with Google!");
      navigate("/home");
    } catch (err) {
      dispatch(LoginFailure());
      toast.error("Google login failed");
      console.error("Google login error", err);
    } finally {
      setLoadingProvider("");
    }
  };

  // Custom Google login trigger that mimics GoogleLogin behavior for JWT
  const triggerGoogleLogin = () => {
    // We'll use a ref to trigger the hidden GoogleLogin component
    setLoadingProvider("google");
    // The actual login will be handled by the hidden GoogleLogin component
  };

  const handleSocialLogin = (provider) => {
    if (provider === "facebook") {
      console.log(`Sign in with ${provider}`);
    } else if (provider === "apple") {
      console.log(`Sign in with ${provider}`);
    }
  };

  const SocialButton = ({ provider, icon, children, onClick }) => (
    <button
      onClick={onClick}
      disabled={loadingProvider === provider}
      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loadingProvider === provider ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-3" />
      ) : (
        icon
      )}
      {loadingProvider === provider ? "Signing in..." : children}
    </button>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl  p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center">
              <img src="/assets/Logomark.svg" alt="" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Log in to your account
            </h1>
            <p className="text-gray-600">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Remember for 30 days
                </span>
              </label>
              <button
                type="button"
                onClick={() => console.log("Forgot password clicked")}
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Link to="/forgot-password">Forgot password</Link>
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium transform transition-all duration-200 shadow-lg ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] hover:shadow-xl"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          {/* Social Login Options */}
          <div className="mt-8 space-y-3">
            {/* Hidden GoogleLogin component for JWT functionality */}
            <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
              <GoogleLogin
                onSuccess={handleGoogleJWTLogin}
                onError={() => {
                  toast.error("Google Sign In Failed");
                  setLoadingProvider("");
                }}
              />
            </div>
            
            {/* Custom styled Google button */}
            <SocialButton
              provider="google"
              onClick={() => {
                // Programmatically click the hidden Google login
                const googleButton = document.querySelector('[role="button"][aria-labelledby]');
                if (googleButton) {
                  googleButton.click();
                } else {
                  triggerGoogleLogin();
                }
              }}
              icon={
                <img src="/assets/google.png" alt="Google" className="w-5 h-5 mr-3" />
              }
            >
              Sign in with Google
            </SocialButton>

            <SocialButton
              provider="facebook"
              onClick={() => handleSocialLogin("facebook")}
              icon={
                <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              }
            >
              Sign in with Facebook
            </SocialButton>

            <SocialButton
              provider="apple"
              onClick={() => handleSocialLogin("apple")}
              icon={
                <svg className="w-5 h-5 mr-3" fill="#000000" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              }
            >
              Sign in with Apple
            </SocialButton>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => console.log("Sign up clicked")}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <Link to="/signup">Sign up</Link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
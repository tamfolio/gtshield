import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUpFirstPage = ({onNext}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    onNext()
  };

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    // Simulate OAuth flow
    setTimeout(() => {
      alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} sign-up initiated!\n\nIn a real app, this would redirect to ${provider}'s OAuth flow.`);
      setLoadingProvider('');
    }, 1500);
  };

  const SocialButton = ({ provider, icon, children, variant = 'default' }) => (
    <button
      onClick={() => handleSocialLogin(provider)}
      disabled={loadingProvider === provider}
      className={`
        w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 
        rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02] 
        hover:shadow-md hover:border-gray-300 active:scale-[0.98] disabled:opacity-70 
        disabled:cursor-not-allowed bg-white hover:bg-gray-50
        ${variant === 'twitter' ? 'text-blue-500' : 'text-gray-700'}
      `}
    >
      {loadingProvider === provider ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      ) : (
        <img src={icon} alt={`${provider} icon`} className="w-5 h-5" />
      )}
      {loadingProvider === provider ? 'Connecting...' : children}
    </button>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white transform hover:scale-[1.01] transition-transform duration-300">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/assets/logo2.png" alt="" />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create an account
            </h1>
            <p className="text-gray-600">
              Start your 30-day free trial.
            </p>
          </div>

          {/* Email Section */}
          <div className="space-y-6 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    ${emailError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200'}
                  `}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleEmailSubmit(e);
                    }
                  }}
                />
              </div>
              {emailError && (
                <p className="mt-1 text-sm text-red-600 animate-pulse">{emailError}</p>
              )}
            </div>

            <button
              onClick={handleEmailSubmit}
              disabled={isLoading || emailError}
              className="
                w-full bg-[#444CE7] text-white py-3 px-4 
                rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 
                disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                shadow-lg hover:shadow-xl
              "
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                'Continue with email'
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <SocialButton provider="google" icon="/assets/google.png">
              Sign up with Google
            </SocialButton>
            
            <SocialButton provider="facebook" icon="/assets/facebook.png">
              Sign up with Facebook
            </SocialButton>
            
            <SocialButton provider="apple" icon="/assets/apple.png">
              Sign up with Apple
            </SocialButton>
            
            <SocialButton provider="twitter" icon="/assets/x.png" variant="twitter">
              Sign in with Twitter
            </SocialButton>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
              >
                <Link to='/login'> Log in</Link>
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpFirstPage;
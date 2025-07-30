import React, { useState } from "react";
import { publicRequest } from "../../../requestMethod";
import { toast } from "react-toastify";

export const SignUpOtp = ({ formData,  onPrevious, onSubmit }) => {
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [localLoading, setLocalLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(600);

  React.useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
    if (/^\d$/.test(e.key) && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) setTimeout(() => nextInput.focus(), 10);
    }
  };

  const handleOtpResend = async (e) => {
    e.preventDefault();
    const { email } = formData;

    setLocalLoading(true);
    try {
      await publicRequest.post("/auth/signup/email", { email });
      toast.success("OTP resent successfully.");
      setResendTimer(600); // Restart the 10-minute timer
    } catch (err) {
      console.error("Email sign-up failed:", err);
      const msg =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLocalLoading(false);
    }
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    // If it already starts with +234, return as is
    if (phone.startsWith('+234')) {
      return phone;
    }
    
    // If it starts with 234, add the +
    if (phone.startsWith('234')) {
      return `+${phone}`;
    }
    
    // Otherwise, assume it's just the 10-digit number and add +234
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return `+234${cleanPhone}`;
  };



  const handleFinalSubmit = async () => {
    const otp = otpDigits.join("");
    const {
      fullName,
      phoneNumber,
      state,
      address,
      gender,
      username,
      password,
    } = formData;

    // Format the phone number here, inside the function where formData is accessible
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    const payload = {
      userName: username,
      fullName,
      address,
      phoneNumber: formattedPhoneNumber,
      gender,
      state,
      provider: "Email",
      password,
      otp,
    };

    try {
      await publicRequest.post("/auth/signup/complete", payload);
      toast.success("Signup successful!");
      onSubmit(); // This will trigger the permission modal flow
    } catch (error) {
      const msg = error.response?.data?.error || "OTP verification failed.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-left mb-4">
            <button
              onClick={onPrevious}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
            >
              ← Back
            </button>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-200 mb-8">
              <img src="/assets/Logomark.svg" alt="Logo" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Check your email
            </h2>
            <p className="text-gray-600">
              We sent an OTP to {formData?.email || "your email"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center space-x-3">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                    digit ? "border-blue-500 text-blue-600" : "border-gray-300"
                  }`}
                  maxLength={1}
                />
              ))}
            </div>

            <button
              onClick={handleFinalSubmit}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Verify email
            </button>

            <div className="text-center">
              {resendTimer > 0 ? (
                <span className="text-gray-500">
                  You can resend OTP in{" "}
                  <span className="font-semibold text-gray-700">
                    {Math.floor(resendTimer / 60)}:
                    {String(resendTimer % 60).padStart(2, "0")}
                  </span>
                </span>
              ) : (
                <button
                  onClick={handleOtpResend}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2"
                  disabled={localLoading}
                >
                  {localLoading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-blue-600"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Click to Resend"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

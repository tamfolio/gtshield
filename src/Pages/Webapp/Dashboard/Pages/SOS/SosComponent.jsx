import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../../../../Components/Website/Navbar";
import { userRequest } from "../../../../../requestMethod";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function SosComponent() {
  const [currentView, setCurrentView] = useState("main");
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioLevels, setAudioLevels] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [textDescription, setTextDescription] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioRef = useRef(null);
  const animationFrameRef = useRef(null);

  const token = useSelector(
    (state) => state?.user?.currentUser?.tokens?.access?.token
  );

  // Effects for timer and playback
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;
          // Auto-stop recording at 15 seconds
          if (newTime >= 15) {
            handleStopRecording();
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    let interval;
    if (isPlaying && audioRef.current) {
      interval = setInterval(() => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration || recordingTime;
        setPlaybackTime(Math.floor(currentTime));
        if (currentTime >= duration) {
          setIsPlaying(false);
          setPlaybackTime(0);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, recordingTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getAudioLevels = () => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    const bars = [];
    const barCount = 40;
    const step = Math.floor(dataArray.length / barCount);
    for (let i = 0; i < barCount; i++) {
      const start = i * step;
      const end = start + step;
      const slice = dataArray.slice(start, end);
      const average = slice.reduce((sum, val) => sum + val, 0) / slice.length;
      bars.push(Math.max(10, (average / 255) * 50));
    }
    setAudioLevels(bars);
    if (isRecording)
      animationFrameRef.current = requestAnimationFrame(getAudioLevels);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      getAudioLevels();
    } catch (error) {
      console.error("Mic error:", error);
      alert("Could not access microphone.");
    }
  };

  // Modified: Just navigate to recording view without starting recording
  const handleEmergencyAlert = () => {
    setCurrentView("recording");
  };

  // New function to handle start recording button
  const handleStartRecording = async () => {
    await startRecording();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current?.state !== "inactive")
      mediaRecorderRef.current.stop();
    if (animationFrameRef.current)
      cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    setCurrentView("recorded");
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const resetState = () => {
    setCurrentView("main");
    setRecordingTime(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setAudioBlob(null);
    setTextDescription("");
    setAudioLevels([]);

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const resetRecording = () => {
    setCurrentView("recording");
    setRecordingTime(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setAudioBlob(null);
    setAudioLevels([]);

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const handleSend = async () => {
    // Validation
    if (!audioBlob) {
      alert("No audio recording found. Please record your message first.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for multipart/form-data request
      const formData = new FormData();

      // Prepare the data object
      const sosData = {
        address: "Current Location", // You might want to get actual location
        comment: textDescription || "Emergency alert sent via mobile app",
        isIdentityHidden: false,
        isLocationHidden: false, // Set based on user preference
        channel: "web",
        coordinates: "3.54534E, 7.43435N", // Get actual coordinates from geolocation
      };

      // Append the JSON data
      formData.append("data", JSON.stringify(sosData));

      // Convert audioBlob to File and append
      const audioFile = new File([audioBlob], "emergency-audio.wav", {
        type: "audio/wav",
      });
      formData.append("audio", audioFile);

      // Make the API call using userRequest (same pattern as your review submission)
      const res = await userRequest(token).post("/sos/new", formData);

      console.log("✅ Emergency alert sent:", res.data);

      // Show success modal instead of alert
      setShowSuccessModal(true);
    } catch (err) {
      console.error("❌ Failed to send emergency alert:", err);

      // Show user-friendly error message (same pattern as your review code)
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to send emergency alert";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallEmergencyContact = () =>
    alert("Calling emergency contact...");

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    resetState();
  };

  const resetToRecordingView = () => {
    setCurrentView("recording"); // Stay on recording page
    setRecordingTime(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setIsRecording(false); // Make sure recording state is reset
    setAudioBlob(null);
    setTextDescription(""); // Clear the text description
    setAudioLevels([]); // Clear audio levels
  
    // Clean up any existing audio URLs
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  
    // Clean up any ongoing recording sessions
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const handleStayOnPage = () => {
    setShowSuccessModal(false);
    resetToRecordingView();
    //reset all the inputs , the recording and the text , i still want to be on the recording page , but fresh 
  };

  const handleRedirectToDashboard = () => {
    setShowSuccessModal(false);
    resetState();
    navigate('/dashboard')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal
          onStayOnPage={handleStayOnPage}
          onRedirectToDashboard={handleRedirectToDashboard}
          onClose={handleCloseModal}
        />
      )}

      {currentView === "main" && (
        <MainView
          onStart={handleEmergencyAlert}
          onCall={handleCallEmergencyContact}
        />
      )}
      {currentView === "recording" && (
        <RecordingView
          time={recordingTime}
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStop={handleStopRecording}
          onSend={handleSend}
          formatTime={formatTime}
          audioLevels={audioLevels}
          textDescription={textDescription}
          setTextDescription={setTextDescription}
          isSubmitting={isSubmitting}
        />
      )}
      {currentView === "recorded" && (
        <RecordedView
          time={recordingTime}
          playbackTime={playbackTime}
          isPlaying={isPlaying}
          audioRef={audioRef}
          audioUrl={audioUrl}
          onPlayPause={handlePlayPause}
          onSend={handleSend}
          onDeleteRecording={resetRecording}
          formatTime={formatTime}
          textDescription={textDescription}
          setTextDescription={setTextDescription}
          isSubmitting={isSubmitting}
        />
      )}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => {
            setIsPlaying(false);
            setPlaybackTime(0);
          }}
          style={{ display: "none" }}
        />
      )}
    </div>
  );
}

// Success Modal Component
const SuccessModal = ({ onStayOnPage, onRedirectToDashboard, onClose }) => (
  <div className="fixed inset-0 bg-[#101828B2] bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      <div className="p-6 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Help is on it's way
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          We are connecting your case to the nearest police station
        </p>

        <div className="space-y-3">
          <button
            onClick={onStayOnPage}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            Stay on Page
          </button>

          <button
            onClick={onRedirectToDashboard}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
          >
            Redirect to Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
);

const MainView = ({ onStart, onCall }) => (
  <div
    className="flex flex-col items-center justify-center w-full px-4 sm:px-8 md:px-16 lg:px-[230px]"
    style={{ minHeight: "calc(100vh - 64px)" }}
  >
    <div className="w-full flex items-start justify-start mb-8 md:mb-16">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 text-left">
        Emergency
      </h1>
    </div>
    <div className="mb-8 md:mb-16">
      <button className="w-24 h-24 md:w-32 md:h-32 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg">
        SOS
      </button>
    </div>
    <h2 className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 font-semibold text-center">
      Choose Emergency Action
    </h2>
    <div className="space-y-4 flex flex-col w-full max-w-sm">
      <button
        onClick={onStart}
        className="w-full py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
      >
        Send Emergency Alert
      </button>
      <button className="w-full py-3 md:py-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium">
        <Link to="/call-emergency-contact">Call Emergency Contact</Link>
      </button>
      <button
        onClick={() => window.open("tel:08000009111", "_self")}
        className="w-full py-3 md:py-4 bg-white border-[1px] border-solid border-[#D5D7DA] text-[#414651] rounded-lg font-medium"
      >
        Call Contact Center
      </button>
    </div>
  </div>
);

const RecordingView = ({
  time,
  isRecording,
  onStartRecording,
  onStop,
  onSend,
  formatTime,
  audioLevels,
  textDescription,
  setTextDescription,
  isSubmitting,
}) => {
  const timeLeft = 15 - time;
  const progressPercent = (time / 15) * 100;

  return (
    <div
      className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8 md:mb-16">
        Emergency
      </h1>
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
          {!isRecording ? (
            // Show ready to record state
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 text-sm md:text-base">
                  Ready to Record
                </span>
                <span className="text-gray-600 text-sm md:text-base">
                  00:00
                </span>
              </div>

              <AudioWaveform isActive={false} />

              <div className="mt-4 flex justify-center">
                <button
                  onClick={onStartRecording}
                  className="w-16 h-16 md:w-20 md:h-20 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg"
                >
                  🎙️
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm md:text-base text-gray-600 mb-2">
                  Tap the microphone to start recording
                </p>
                <p className="text-xs text-gray-500">
                  Maximum recording time: 15 seconds
                </p>
              </div>
            </div>
          ) : (
            // Show recording in progress state
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 text-sm md:text-base">
                  Recording...
                </span>
                <div className="text-right">
                  <div className="text-gray-600 text-sm md:text-base">
                    {formatTime(time)}
                  </div>
                  <div
                    className={`text-xs ${
                      timeLeft <= 5
                        ? "text-red-500 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {timeLeft}s left
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                <div
                  className={`h-1.5 rounded-full transition-all duration-1000 ${
                    timeLeft <= 5 ? "bg-red-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <AudioWaveform isActive={isRecording} audioLevels={audioLevels} />

              <div className="mt-4 flex justify-center">
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 md:px-4 py-2 text-red-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-xs md:text-sm font-medium">
                      Recording in progress
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recording limit caveat - only show when recording */}
        {isRecording && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <svg
                className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-xs md:text-sm text-yellow-800 font-medium">
                  Recording Limited
                </p>
                <p className="text-xs text-yellow-700">
                  Maximum recording time is 15 seconds for emergency alerts
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stop button - only show when recording */}
        {isRecording && (
          <button
            onClick={onStop}
            className="w-full py-3 md:py-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium mb-4 text-sm md:text-base"
          >
            Stop Recording
          </button>
        )}

        <textarea
          className="w-full h-24 md:h-32 px-3 py-2 border border-gray-300 rounded-lg mb-4 text-sm md:text-base resize-none"
          placeholder="Tell us about what happened"
          value={textDescription}
          onChange={(e) => setTextDescription(e.target.value)}
        />

        {/* Send button - only show if not recording (allows sending without audio) */}
        {!isRecording && (
          <button
            onClick={onSend}
            disabled={isSubmitting}
            className={`w-full py-3 md:py-4 rounded-lg font-medium text-sm md:text-base ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        )}
      </div>
    </div>
  );
};

const RecordedView = ({
  time,
  playbackTime,
  isPlaying,
  audioRef,
  audioUrl,
  onPlayPause,
  onSend,
  onDeleteRecording,
  formatTime,
  textDescription,
  setTextDescription,
  isSubmitting,
}) => {
  const progress = time > 0 ? playbackTime / time : 0;
  return (
    <div
      className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8 md:mb-16">
        Emergency
      </h1>
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 text-sm md:text-base">
              Recorded Message
            </span>
            <span className="text-gray-600 text-sm md:text-base">
              {formatTime(isPlaying ? playbackTime : time)}
            </span>
          </div>
          <AudioWaveform isActive={false} playbackProgress={progress} />
          <div className="mt-4 flex items-center justify-center space-x-4">
            <button
              onClick={onPlayPause}
              className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center text-sm md:text-base"
            >
              {isPlaying ? "⏸" : "▶️"}
            </button>
            <div className="bg-green-50 border border-green-200 rounded-lg px-3 md:px-4 py-2 text-green-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-600 rounded-full"></div>
                <span className="text-xs md:text-sm font-medium">
                  Recording completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recording Actions */}
        <div className="flex space-x-3 mb-4">
          <button
            onClick={onDeleteRecording}
            className="flex-1 py-3 md:py-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg font-medium text-sm md:text-base flex items-center justify-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
            <span>Delete & Re-record</span>
          </button>
        </div>

        <textarea
          className="w-full h-24 md:h-32 px-3 py-2 border border-gray-300 rounded-lg mb-4 text-sm md:text-base resize-none"
          placeholder="Tell us about what happened"
          value={textDescription}
          onChange={(e) => setTextDescription(e.target.value)}
        />
        <button
          onClick={onSend}
          disabled={isSubmitting}
          className={`w-full py-3 md:py-4 rounded-lg font-medium text-sm md:text-base ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

const AudioWaveform = ({
  isActive,
  playbackProgress = 0,
  audioLevels = [],
}) => {
  const staticBars = [...Array(40)].map(() => Math.random() * 40 + 10);
  const bars = audioLevels.length > 0 ? audioLevels : staticBars;
  return (
    <div className="flex items-center justify-center space-x-0.5 md:space-x-1 h-12 md:h-16">
      {bars.map((height, i) => {
        const isInPlayback = playbackProgress > 0 && i < playbackProgress * 40;
        return (
          <div
            key={i}
            className={`transition-all duration-100 ${
              isActive
                ? "bg-red-500"
                : isInPlayback
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
            style={{
              width: "1.5px",
              height: `${Math.max(8, height * 0.8)}px`,
              opacity: isActive || isInPlayback ? 0.8 : 0.6,
            }}
          />
        );
      })}
    </div>
  );
};

export default SosComponent;

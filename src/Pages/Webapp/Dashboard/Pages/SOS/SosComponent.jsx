import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../../../../Components/Website/Navbar';

function SosComponent() {
  const [currentView, setCurrentView] = useState('main');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioLevels, setAudioLevels] = useState([]);

  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const audioRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Effects for timer and playback
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
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
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
    if (isRecording) animationFrameRef.current = requestAnimationFrame(getAudioLevels);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
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
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      getAudioLevels();
    } catch (error) {
      console.error('Mic error:', error);
      alert('Could not access microphone.');
    }
  };

  const handleEmergencyAlert = async () => {
    setCurrentView('recording');
    setIsRecording(true);
    setRecordingTime(0);
    await startRecording();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current?.state !== 'inactive') mediaRecorderRef.current.stop();
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    setCurrentView('recorded');
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleSend = () => {
    alert('Emergency alert sent!');
    setCurrentView('main');
    setRecordingTime(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const handleCallEmergencyContact = () => alert('Calling emergency contact...');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={false} />
      {currentView === 'main' && (
        <MainView
          onStart={handleEmergencyAlert}
          onCall={handleCallEmergencyContact}
        />
      )}
      {currentView === 'recording' && (
        <RecordingView
          time={recordingTime}
          isRecording={isRecording}
          onStop={handleStopRecording}
          onSend={handleSend}
          formatTime={formatTime}
          audioLevels={audioLevels}
        />
      )}
      {currentView === 'recorded' && (
        <RecordedView
          time={recordingTime}
          playbackTime={playbackTime}
          isPlaying={isPlaying}
          audioRef={audioRef}
          audioUrl={audioUrl}
          onPlayPause={handlePlayPause}
          onSend={handleSend}
          formatTime={formatTime}
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
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
}

const MainView = ({ onStart, onCall }) => (
    <div className="flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <h1 className="text-2xl font-semibold text-gray-900 mb-16">Emergency</h1>
      <div className="mb-16">
        <button onClick={onStart} className="w-32 h-32 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
          SOS
        </button>
      </div>
      <h2 className="text-lg text-gray-700 mb-8">Choose Emergency Action</h2>
      <div className="space-y-4">
        <button onClick={onStart} className="w-80 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
          Send Emergency Alert
        </button>
        <button onClick={onCall} className="w-80 py-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium">
          Call Emergency Contact
        </button>
      </div>
    </div>
  );
  
  const RecordingView = ({ time, isRecording, onStop, onSend, formatTime, audioLevels }) => (
    <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <h1 className="text-2xl font-semibold text-gray-900 mb-16">Emergency</h1>
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Recording...</span>
            <span className="text-gray-600">{formatTime(time)}</span>
          </div>
          <AudioWaveform isActive={isRecording} audioLevels={audioLevels} />
          <div className="mt-4 flex justify-center">
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-red-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording in progress</span>
              </div>
            </div>
          </div>
        </div>
        <textarea className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg mb-4" placeholder="Tell us about what happened" />
        <button onClick={onStop} className="w-full py-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium mb-4">
          Stop Recording
        </button>
        <button onClick={onSend} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
          Send
        </button>
      </div>
    </div>
  );
  
  const RecordedView = ({ time, playbackTime, isPlaying, audioRef, audioUrl, onPlayPause, onSend, formatTime }) => {
    const progress = time > 0 ? playbackTime / time : 0;
    return (
      <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <h1 className="text-2xl font-semibold text-gray-900 mb-16">Emergency</h1>
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Recorded Message</span>
              <span className="text-gray-600">{formatTime(isPlaying ? playbackTime : time)}</span>
            </div>
            <AudioWaveform isActive={false} playbackProgress={progress} />
            <div className="mt-4 flex items-center justify-center space-x-4">
              <button onClick={onPlayPause} className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                {isPlaying ? '⏸' : '▶️'}
              </button>
              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium">Recording completed</span>
                </div>
              </div>
            </div>
          </div>
          <textarea className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg mb-4" placeholder="Tell us about what happened" />
          <button onClick={onSend} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
            Send
          </button>
        </div>
      </div>
    );
  };
  
  const AudioWaveform = ({ isActive, playbackProgress = 0, audioLevels = [] }) => {
    const staticBars = [...Array(40)].map(() => Math.random() * 40 + 10);
    const bars = audioLevels.length > 0 ? audioLevels : staticBars;
    return (
      <div className="flex items-center justify-center space-x-1 h-16">
        {bars.map((height, i) => {
          const isInPlayback = playbackProgress > 0 && i < (playbackProgress * 40);
          return (
            <div
              key={i}
              className={`transition-all duration-100 ${
                isActive ? 'bg-red-500' : isInPlayback ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              style={{ width: '2px', height: `${height}px`, opacity: isActive || isInPlayback ? 0.8 : 0.6 }}
            />
          );
        })}
      </div>
    );
  };
  
  export default SosComponent;
  
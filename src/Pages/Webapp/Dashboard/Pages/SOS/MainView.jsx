import React, { useState, useRef, useEffect } from 'react';

const SosComponent = ({ token, userRequest, userData, userLocation }) => {
  const [currentView, setCurrentView] = useState('main');
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioLevels, setAudioLevels] = useState([]);
  const [comment, setComment] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const playbackIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Function to get the best supported audio format
  const getSupportedMimeType = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/ogg',
      'audio/mp4',
      'audio/wav'
    ];
    
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        console.log('Using supported MIME type:', type);
        return type;
      }
    }
    
    console.log('Using default MIME type');
    return 'audio/webm'; // Fallback
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      source.connect(analyserRef.current);
      
      // Get the best supported MIME type
      const mimeType = getSupportedMimeType();
      
      // Configure MediaRecorder with WebM format
      const options = {
        mimeType: mimeType,
        audioBitsPerSecond: 128000 // 128 kbps for good quality
      };
      
      const mediaRecorder = new MediaRecorder(stream, options);
      const chunks = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        // Create blob with the same MIME type used for recording
        const blob = new Blob(chunks, { type: mimeType });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        setCurrentView('recorded');
        
        console.log('Recording completed:', {
          size: blob.size,
          type: blob.type,
          duration: time
        });
      };
      
      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        alert('Recording error occurred. Please try again.');
      };
      
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setCurrentView('recording');
      
      // Start timer and audio level monitoring
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
        updateAudioLevels();
      }, 1000);
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const updateAudioLevels = () => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      const levels = [];
      for (let i = 0; i < 40; i++) {
        const index = Math.floor((i / 40) * dataArray.length);
        const value = dataArray[index];
        levels.push((value / 255) * 40 + 10);
      }
      setAudioLevels(levels);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    }
  };

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          alert('Unable to play audio. The recording format may not be supported.');
        });
        playbackIntervalRef.current = setInterval(() => {
          setPlaybackTime(audioRef.current.currentTime);
        }, 100);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCall = () => {
    // Handle emergency contact call
    window.open('tel:911', '_self');
  };

  const handleSendSOS = async () => {
    // Validate required fields
    if (!address.trim()) {
      alert('Please provide an address for the emergency');
      return;
    }

    setIsSubmitting(true);

    try {
      const bodyData = {
        address: address.trim(),
        comment: comment.trim() || 'Emergency SOS alert',
        isIdentityHidden: false,
        isLocationHidden: false,
        channel: 'web',
        ...(userLocation && {
          coordinates: `${userLocation.latitude}, ${userLocation.longitude}`
        }),
      };

      console.log('🚀 Submitting SOS with data:', bodyData);

      const formPayload = new FormData();
      formPayload.append('data', JSON.stringify(bodyData));
      
      // Add audio if available with proper filename extension
      if (audioBlob) {
        const fileExtension = audioBlob.type.includes('webm') ? 'webm' : 
                            audioBlob.type.includes('ogg') ? 'ogg' : 
                            audioBlob.type.includes('mp4') ? 'mp4' : 'webm';
        
        formPayload.append('audio', audioBlob, `emergency_audio.${fileExtension}`);
        console.log('Audio attached:', {
          type: audioBlob.type,
          size: audioBlob.size,
          filename: `emergency_audio.${fileExtension}`
        });
      }

      const res = await userRequest(token).post('/sos/new', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ SOS sent successfully:', res.data);
      
      // Show success and reset
      alert('Emergency alert sent successfully!');
      resetComponent();
      
    } catch (err) {
      console.error('❌ Failed to send SOS:', err);
      alert(err.response?.data?.message || 'Failed to send emergency alert. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetComponent = () => {
    setCurrentView('main');
    setTime(0);
    setPlaybackTime(0);
    setIsPlaying(false);
    setAudioUrl(null);
    setAudioBlob(null);
    setAudioLevels([]);
    setComment('');
    setAddress('');
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
  };

  const MainView = () => (
    <div className="flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <h1 className="text-2xl font-semibold text-gray-900 mb-16">Emergency</h1>
      <div className="mb-16">
        <button 
          onClick={startRecording} 
          className="w-32 h-32 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg transition-all duration-200 active:scale-95"
        >
          SOS
        </button>
      </div>
      <h2 className="text-lg text-gray-700 mb-8">Choose Emergency Action</h2>
      <div className="space-y-4">
        <button 
          onClick={startRecording} 
          className="w-80 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Send Emergency Alert
        </button>
        <button 
          onClick={handleCall} 
          className="w-80 py-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors duration-200"
        >
          Call Emergency Contact
        </button>
      </div>
    </div>
  );

  const RecordingView = () => (
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
        
        <div className="space-y-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Emergency location/address *"
            required
          />
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg" 
            placeholder="Tell us about what happened" 
          />
          <button 
            onClick={stopRecording} 
            className="w-full py-4 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-medium transition-colors duration-200"
          >
            Stop Recording
          </button>
          <button 
            onClick={handleSendSOS}
            disabled={isSubmitting || !address.trim()}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
          >
            {isSubmitting ? 'Sending...' : 'Send Emergency Alert'}
          </button>
        </div>
      </div>
    </div>
  );

  const RecordedView = () => {
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
              <button 
                onClick={togglePlayback} 
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
              >
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
          
          <div className="space-y-4">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Emergency location/address *"
              required
            />
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg" 
              placeholder="Tell us about what happened" 
            />
            <button 
              onClick={handleSendSOS}
              disabled={isSubmitting || !address.trim()}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
            >
              {isSubmitting ? 'Sending Emergency Alert...' : 'Send Emergency Alert'}
            </button>
          </div>
        </div>
        
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => {
              setIsPlaying(false);
              setPlaybackTime(0);
              if (playbackIntervalRef.current) clearInterval(playbackIntervalRef.current);
            }}
            onError={(e) => {
              console.error('Audio playback error:', e);
              alert('Unable to play audio. The recording format may not be supported.');
            }}
          />
        )}
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
              style={{ 
                width: '2px', 
                height: `${height}px`, 
                opacity: isActive || isInPlayback ? 0.8 : 0.6 
              }}
            />
          );
        })}
      </div>
    );
  };

  // Render current view
  switch (currentView) {
    case 'recording':
      return <RecordingView />;
    case 'recorded':
      return <RecordedView />;
    default:
      return <MainView />;
  }
};

export default SosComponent;
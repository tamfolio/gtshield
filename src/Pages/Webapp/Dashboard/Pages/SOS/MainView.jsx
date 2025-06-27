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
  
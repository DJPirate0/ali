import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Activity } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, thumbnailUrl, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default muted for autoplay-friendliness
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Play/Pause handler
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Video play failed:", err));
    }
  };

  // Mute handler
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Time update handler
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 0;
    setCurrentTime(current);
    setProgress(dur ? (current / dur) * 100 : 0);
  };

  // Loaded metadata handler
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
  };

  // Seek progress handler
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    videoRef.current.currentTime = percentage * duration;
    setProgress(percentage * 100);
  };

  // Reset video when it ends
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Fullscreen handler
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    try {
      if (videoRef.current.requestFullscreen) {
        const promise = videoRef.current.requestFullscreen();
        if (promise && typeof promise.catch === 'function') {
          promise.catch((err) => {
            console.warn("Fullscreen request rejected or blocked by browser policies:", err);
          });
        }
      } else {
        const anyVideo = videoRef.current as any;
        if (anyVideo.webkitRequestFullscreen) {
          anyVideo.webkitRequestFullscreen();
        } else if (anyVideo.mozRequestFullScreen) {
          anyVideo.mozRequestFullScreen();
        } else if (anyVideo.msRequestFullscreen) {
          anyVideo.msRequestFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle is unsupported or failed:", err);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      id={`video-player-container-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl group"
      onMouseEnter={() => {
        setShowControls(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setShowControls(false);
        setIsHovered(false);
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        className="w-full h-full object-cover transition-all duration-700"
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onClick={togglePlay}
      />

      {/* Static Poster Overlay - Shows play icon when not playing */}
      {!isPlaying && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-black/50"
        >
          {/* Animated Glow Play Button */}
          <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]">
            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-10" />
            <Play className="w-7 h-7 text-emerald-400 fill-emerald-400 translate-x-0.5" />
          </div>
          <span className="mt-3 font-display text-sm font-medium tracking-wide text-zinc-300 group-hover:text-white uppercase transition-colors">
            Click to Play Sample
          </span>
        </div>
      )}

      {/* Video Player Header Overlay (e.g. Title & Status) */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-black/70 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-full flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-500'}`} />
          <span className="text-xs font-mono font-medium text-zinc-300">{isPlaying ? 'PLAYING' : 'READY'}</span>
        </div>
        <div className="bg-black/70 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-medium text-zinc-300">HQ 1080P</span>
        </div>
      </div>

      {/* Custom Control Bar Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col gap-3 transition-transform duration-300 ${
          showControls || !isPlaying ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar Container */}
        <div 
          className="h-1.5 w-full bg-zinc-800/80 rounded-full cursor-pointer relative group/progress transition-all hover:h-2.5"
          onClick={handleSeek}
        >
          {/* Progress fill */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          {/* Handle */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity duration-150"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Playback Controls & Timers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="p-1.5 rounded-lg text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/40 transition-colors"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            {/* Restart */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch((err) => console.log("Video restart failed:", err));
                }
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/40 transition-colors"
              title="Restart"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Time Stamp */}
            <span className="text-xs font-mono text-zinc-400">
              {formatTime(currentTime)} <span className="text-zinc-600">/</span> {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mute/Unmute */}
            <button 
              onClick={toggleMute}
              className="p-1.5 rounded-lg text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/40 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Fullscreen */}
            <button 
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800/40 transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

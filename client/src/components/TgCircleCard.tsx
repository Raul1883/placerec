import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import type { CardProps } from "../types/types";
import { pb } from "../api/PocketBase";

export default ({
  item,
  isActive,
  isMuted,
  onTogglePlay,
  onToggleMute,
}: CardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setProgress(0);
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const radius = 118;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center group w-60">
      {/* Кружок видео */}
      <div className="relative w-60 h-60 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-20">
          <circle
            cx="120"
            cy="120"
            r={radius}
            className="stroke-neutral-800"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx="120"
            cy="120"
            r={radius}
            className="stroke-cyan-400 transition-all duration-100 ease-linear"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <div
          onClick={onTogglePlay}
          className="relative w-56 h-56 rounded-full overflow-hidden cursor-pointer bg-neutral-900 border-2 border-neutral-800 group-hover:border-cyan-500/50 transition-all shadow-xl shadow-cyan-950/20"
        >
          <video
            ref={videoRef}
            src={pb.files.getURL(item, item.videoUrl)}
            loop
            muted={isMuted}
            preload="metadata"
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover select-none pointer-events-none scale-105 group-hover:scale-110 transition-transform duration-500"
          />

          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${
              isActive ? "opacity-0 hover:opacity-100" : "opacity-100"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              {isActive ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-1 fill-white" />
              )}
            </div>
          </div>

          {!isActive && (
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-mono bg-black/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-neutral-300 border border-white/10">
              {item.duration}
            </span>
          )}
        </div>

        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            className="absolute bottom-1 right-3 z-30 p-2 rounded-full bg-neutral-900/90 border border-neutral-700 text-cyan-400 hover:scale-110 transition-transform shadow-lg cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Метаданные */}
      <div className="mt-4 text-center w-full px-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400/80 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
          {item.service}
        </span>
        <h3 className="font-bold text-base text-white mt-1.5 leading-tight truncate">
          {item.trackTitle}
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5 truncate">
          {item.artist}
        </p>
      </div>
    </div>
  );
};

export const PortfolioSkeletonCard = () => {
  return (
    <div className="flex flex-col items-center w-60 animate-pulse">
      {/* Кружок скелетона */}
      <div className="relative w-60 h-60 flex items-center justify-center">
        <div className="w-56 h-56 rounded-full bg-neutral-900 border-2 border-neutral-800" />
      </div>

      {/* Метаданные скелетона */}
      <div className="mt-4 text-center w-full px-2 flex flex-col items-center">
        <div className="h-4 w-24 bg-neutral-900 rounded mb-2" />
        <div className="h-5 w-32 bg-neutral-900 rounded mb-1" />
        <div className="h-3 w-20 bg-neutral-900 rounded" />
      </div>
    </div>
  );
};

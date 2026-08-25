import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PortfolioItem {
  id: string;
  artist: string;
  trackTitle: string;
  service: string;
  videoUrl: string;
  duration: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    artist: "Shadowraze",
    trackTitle: "Showdown",
    service: "Сведение & Мастеринг",
    videoUrl: "/portfolio/video.mp4",
    duration: "0:45",
  },
  {
    id: "2",
    artist: "Jane Doe",
    trackTitle: "Acoustic Sessions",
    service: "Запись вокала",
    videoUrl: "/portfolio/video2.mp4",
    duration: "1:00",
  },
  {
    id: "3",
    artist: "Neon Wave",
    trackTitle: "Cyber City",
    service: "Продакшн под ключ",
    videoUrl: "/portfolio/video3.mp4",
    duration: "0:30",
  },
  {
    id: "4",
    artist: "Shadowraze",
    trackTitle: "Showdown",
    service: "Сведение & Мастеринг",
    videoUrl: "/portfolio/video.mp4",
    duration: "0:45",
  },
  {
    id: "5",
    artist: "Jane Doe",
    trackTitle: "Acoustic Sessions",
    service: "Запись вокала",
    videoUrl: "/portfolio/video2.mp4",
    duration: "1:00",
  },
  {
    id: "6",
    artist: "Neon Wave",
    trackTitle: "Cyber City",
    service: "Продакшн под ключ",
    videoUrl: "/portfolio/video3.mp4",
    duration: "0:30",
  },
];

export default () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    setCanScrollLeft(scrollLeft > 0);
    // Добавляем погрешность в 2px для фикса багов округления в браузерах
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    // Ширина кружка (240px) + gap (32px) = 272px шаг прокрутки
    const scrollAmount = 272;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2">
              Кружки из студии
            </h2>
          </div>
        </div>

        <div className="relative flex items-center justify-center group">
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 md:-left-6 lg:-left-12 z-10 p-3 rounded-full bg-neutral-900 border border-neutral-800 shadow-xl transition-all
              ${
                canScrollLeft
                  ? "text-white hover:border-cyan-500/50 hover:bg-neutral-800 cursor-pointer"
                  : "text-neutral-700 opacity-50 cursor-not-allowed"
              }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 
            Контейнер строго ограничен по ширине:
            w-[240px] - 1 кружок на мобилках
            md:w-[512px] - 2 кружка на планшетах (240*2 + 32 gap)
            lg:w-[784px] - ровно 3 кружка на десктопе (240*3 + 32*2 gap)
          */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory w-60 md:w-lg lg:w-196"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {portfolioData.map((item) => (
              <div key={item.id} className="shrink-0 snap-center">
                <TgCircleCard
                  item={item}
                  isActive={activeId === item.id}
                  isMuted={isMuted}
                  onTogglePlay={() =>
                    setActiveId(activeId === item.id ? null : item.id)
                  }
                  onToggleMute={() => setIsMuted((prev) => !prev)}
                />
              </div>
            ))}
          </div>

          {/* Правая кнопка */}
          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 md:-right-6 lg:-right-12 z-10 p-3 rounded-full bg-neutral-900 border border-neutral-800 shadow-xl transition-all
              ${
                canScrollRight
                  ? "text-white hover:border-cyan-500/50 hover:bg-neutral-800 cursor-pointer"
                  : "text-neutral-700 opacity-50 cursor-not-allowed"
              }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ... Компонент TgCircleCard остается точно таким же, как в предыдущем ответе

interface CardProps {
  item: PortfolioItem;
  isActive: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

const TgCircleCard: React.FC<CardProps> = ({
  item,
  isActive,
  isMuted,
  onTogglePlay,
  onToggleMute,
}) => {
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
            src={item.videoUrl}
            loop
            muted={isMuted}
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

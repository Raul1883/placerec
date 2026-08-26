import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioItem } from "../types/types";
import TgCircleCard, {
  PortfolioSkeletonCard,
} from "../components/TgCircleCard";
import useSWR from "swr";
import { pb } from "../api/PocketBase";

const fetchPortfolio = async () => {
  return await pb.collection<PortfolioItem>("Portfolio").getFullList({});
};

export default () => {
  const { data, isLoading, error } = useSWR<PortfolioItem[]>(
    "portfolio",
    fetchPortfolio,
  );

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
    <section
      id="portfolio"
      className="py-20 bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black overflow-hidden"
    >
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
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory w-60 md:w-lg lg:w-196"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {isLoading || !data ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="shrink-0 snap-center">
                  <PortfolioSkeletonCard />
                </div>
              ))
            ) : error ? (
              <div className="text-neutral-500 py-8 text-center w-full">
                Не удалось загрузить данные портфолио
              </div>
            ) : (
              data.map((item) => (
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
              ))
            )}
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

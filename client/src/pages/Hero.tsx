import { useState, useEffect } from "react";
import base1 from "../assets/studio/base/place-base-фото_1.webp";
import base2 from "../assets/studio/base/place-base-фото_2.webp";
import base3 from "../assets/studio/base/place-base-фото_3.webp";
import base4 from "../assets/studio/base/place-base-фото_4.webp";
import base5 from "../assets/studio/base/place-base-фото_5.webp";

import pro1 from "../assets/studio/pro/place-pro-фото_1.webp";
import pro2 from "../assets/studio/pro/place-pro-фото_2.webp";
import pro3 from "../assets/studio/pro/place-pro-фото_3.webp";
import pro4 from "../assets/studio/pro/place-pro-фото_4.webp";

const images = [base1, pro1, base2, pro2, base3, pro3, base4, base5, pro4];

export default () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section className="relative isolate min-h-[85vh] px-6 py-20 md:py-32 flex flex-col justify-end overflow-hidden text-white group">
      <div className="absolute inset-0 -z-20 w-full h-full">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Интерьер студии ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent -z-10 pointer-events-none" />

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Предыдущий слайд"
      >
        ❮
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label="Следующий слайд"
      >
        ❯
      </button>

      {/* Индикаторы слайдов (точки) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>

      {/* 3. Контент */}
      <div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 pb-8">
        <div className="max-w-4xl mx-0 md:mx-5">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-md">
            Пространство для тех, кто слышит <br />
            будущее звука.
          </h1>
        </div>

        <div className="max-w-sm text-sm md:text-xl text-neutral-200 leading-relaxed font-medium drop-shadow-sm">
          Когда вы заходите в студию, время останавливается. Мы создали
          экосистему, где техническое совершенство встречается с абсолютной
          творческой свободой.
        </div>
      </div>
    </section>
  );
};

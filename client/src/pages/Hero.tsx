export default () => {
  return (
    <section className="relative isolate min-h-[85vh] md:min-h-screen px-6 py-20 md:py-32 flex flex-col justify-end overflow-hidden text-white">
      {/* 1. Слой самого изображения */}
      <img
        src="/src/assets/hero.webp"
        alt="Интерьер студии"
        className="absolute inset-0 w-full h-full object-cover object-center -z-20"
      />

      {/* 2. Легкий градиент-подложка только под текстом (снизу) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent -z-10 pointer-events-none" />

      {/* 3. Контент */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-md">
            Пространство для тех, кто слышит будущее звука.
          </h1>
        </div>

        <div className="max-w-sm text-sm md:text-base text-neutral-200 leading-relaxed font-medium drop-shadow-sm">
          Когда вы заходите в студию, время останавливается. Мы создали
          экосистему, где техническое совершенство встречается с абсолютной
          творческой свободой.
        </div>
      </div>
    </section>
  );
};
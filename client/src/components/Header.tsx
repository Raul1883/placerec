import NavButton from "./NavButton";

export default () => {
  return (
    <header className="hidden md:block sticky top-0 z-50 w-full bg-transparent backdrop-blur-none">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Логотип */}
        <div className="text-2xl font-bold tracking-tighter text-white">
          PLACE RECORDS
        </div>

        <div className="hidden md:flex items-center gap-3 text-sm font-medium">
          <NavButton href="#services">Услуги</NavButton>
          <NavButton href="#portfolio">Портфолио</NavButton>
          <NavButton href="#about">О нас</NavButton>
          <NavButton href="#contact">Контакты</NavButton>
        </div>
      </nav>
    </header>
  );
};

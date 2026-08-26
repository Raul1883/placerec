import DynamicList from "./DynamicList";

export default () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-100">
            Панель администратора
          </h1>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 max-w-5xl mx-auto backdrop-blur-sm shadow-xl">
          <DynamicList />
        </div>
      </div>
    </div>
  );
};

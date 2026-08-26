import { useState } from "react";
import { collectionsConfig } from "../../assets/const";
import DynamicList from "./DynamicList";

export default () => {
  const [activeCollectionKey, setActiveCollectionKey] = useState<string>(
    Object.keys(collectionsConfig)[0],
  );
  const [refreshKey] = useState(0);

  const currentConfig = collectionsConfig[activeCollectionKey];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-100">
            Панель администратора
          </h1>
          <p className="mt-3 text-lg text-zinc-400">
            Управление контентом коллекций через динамические формы
          </p>
        </div>

        {/* Переключатель коллекций */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {Object.entries(collectionsConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => {
                setActiveCollectionKey(key);
              }}
              className={`py-2 px-6 rounded-xl font-medium transition-all cursor-pointer border ${
                activeCollectionKey === key
                  ? "bg-cyan-500 text-zinc-950 border-cyan-500 shadow-lg shadow-cyan-500/20"
                  : "bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:border-zinc-700"
              }`}
            >
              {config.title}
            </button>
          ))}
        </div>

        {/* Основная рабочая область списка */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 max-w-5xl mx-auto backdrop-blur-sm shadow-xl">
          <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
            <h2 className="text-xl font-semibold text-zinc-100">
              Коллекция:{" "}
              <span className="text-cyan-400">{currentConfig.title}</span>
            </h2>
          </div>

          <DynamicList key={`${activeCollectionKey}-${refreshKey}`} />
        </div>
      </div>
    </div>
  );
};

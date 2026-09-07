import { useParams, Link } from "react-router-dom";
import DynamicList from "./DynamicList";
import { FolderKanban, ArrowLeft, Users } from "lucide-react";
import Claims from "./Claims";

export default function AdminMainPage() {
  const { id } = useParams<string>();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок и кнопка назад (если внутри раздела) */}
        <div className="flex items-center justify-between mb-10">
          {id ? (
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад в панель
            </Link>
          ) : (
            <div />
          )}

          <div className="text-center flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-100">
              Панель администратора
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Управление контентом и модерация системы
            </p>
          </div>

          {id ? <div className="w-24" /> : null}
        </div>

        {/* Основной контейнер */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8 max-w-5xl mx-auto backdrop-blur-sm shadow-xl">
          {!id ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="collections"
                className="group flex flex-col items-start p-6 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all hover:bg-zinc-800/40"
              >
                <div className="p-3 bg-zinc-800/80 rounded-lg text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <span className="text-lg font-semibold text-zinc-100 mb-1">
                  Управление контентом
                </span>
                <span className="text-sm text-zinc-400 text-left">
                  Услуги и портфолио
                </span>
              </Link>

              <Link
                to="Claims"
                className="group flex flex-col items-start p-6 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all hover:bg-zinc-800/40"
              >
                <div className="p-3 bg-zinc-800/80 rounded-lg text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-lg font-semibold text-zinc-100 mb-1">
                  Управление заявками
                </span>
                <span className="text-sm text-zinc-400 text-left">
                  Заявки на бронирование
                </span>
              </Link>
            </div>
          ) : id == "collections" ? (
            <DynamicList />
          ) : (
            <Claims />
          )}
        </div>
      </div>
    </div>
  );
}

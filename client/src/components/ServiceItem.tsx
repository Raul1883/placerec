import { pb } from "../api/PocketBase";
import type { ItemsProps } from "../types/types";
import HtmlRender from "./HtmlRender";

export default ({ service, toggleService, expandedId }: ItemsProps) => {
  const isOpen = expandedId === service.id;

  return (
    <div
      key={service.id}
      onClick={() => toggleService(service.id)}
      className="border-b border-white/10 pb-6 group cursor-pointer transition-all duration-300 select-none"
    >
      {/* Заголовок карточки */}
      <div className="flex justify-between items-center text-2xl md:text-3xl font-bold group-hover:text-zinc-400 transition-colors">
        <span>{service.name}</span>
        <span
          className={`inline-block transition-transform duration-300 ${
            isOpen ? "rotate-90 text-white" : "group-hover:translate-x-2"
          }`}
        >
          &rarr;
        </span>
      </div>

      {/* Выпадающий блок с деталями */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden flex flex-col gap-4">
          {service.image && (
            <img
              src={pb.files.getURL(service, service.image, {
                thumb: "400x300",
              })}
              alt={service.name}
              className="w-full h-48 object-cover rounded-xl mt-2 border border-white/10"
            />
          )}

          <p className="text-base md:text-lg font-normal text-zinc-300 leading-relaxed">
            <HtmlRender htmlContent={service.description} />
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-sm uppercase tracking-wider text-zinc-400 font-medium">
              Стоимость
            </span>
            <span className="text-xl md:text-2xl font-bold text-white">
              {service.price.toLocaleString("ru-RU")} ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

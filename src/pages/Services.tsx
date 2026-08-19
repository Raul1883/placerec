import { useState } from "react";
import { Services } from "../assets/const";
import Tag from "../components/Tag";
import ServiceItem from "../components/ServiceItem";

export default () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const col1 = Services.filter((_, i) => i % 2 === 0);
  const col2 = Services.filter((_, i) => i % 2 !== 0);

  return (
    <section id="services" className="px-6 py-24 gap-16 items-center">
      <div className="order-2 lg:order-1">
        <Tag>Услуги</Tag>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Первая колонка */}
          <div className="flex flex-col gap-6">
            {col1.map((service) => (
              <ServiceItem
                service={service}
                expandedId={expandedId}
                key={service.id}
                toggleService={toggleService}
              />
            ))}
          </div>

          {/* Вторая колонка */}
          <div className="flex flex-col gap-6">
            {col2.map((service) => (
              <ServiceItem
                service={service}
                expandedId={expandedId}
                toggleService={toggleService}
                key={service.id}
              />
            ))}
          </div>
        </div>

        <p className="text-xs font-medium text-white/40 mt-10 uppercase tracking-wider">
          * Прайс-лист обновлен 19 августа 2026
        </p>
      </div>
    </section>
  );
};

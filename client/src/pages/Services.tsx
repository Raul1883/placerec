import { useState } from "react";
import ServiceItem from "../components/ServiceItem";
import { pb } from "../api/PocketBase";
import useSWR from "swr";
import type { Service } from "../types/types";
import Section from "../components/Section";

const fetchServices = async () => {
  return await pb.collection<Service>("Service").getFullList();
};

export default () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading, error } = useSWR<Service[]>(
    "fetchServices",
    fetchServices,
  );

  const toggleService = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  if (isLoading || error || !data) {
    return (
      <Section id="services" title="Услуги">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={`service_${i}`}
              className="border-b border-white/10 pb-6 select-none animate-pulse"
            >
              {/* Заголовок карточки (название + стрелка) */}
              <div className="flex justify-between items-center text-2xl md:text-3xl font-bold">
                <div className="h-8 bg-white/10 rounded-md w-3/5"></div>
                <div className="h-6 w-6 bg-white/10 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  const col1 = data.filter((_, i) => i % 2 === 0);
  const col2 = data.filter((_, i) => i % 2 !== 0);

  return (
    <Section
      id="services"
      title="Услуги"
    >
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
    </Section>
  );
};

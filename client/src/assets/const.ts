// Общие стилевые константы и токены для проекта placerec

import type { CollectionConfig } from "../types/types";

export const UI_COLLORS = {
  colorPrimary: "cyan",
};

export const UI_CLASSES = {
  section: "py-16 px-4 md:px-8 w-full min-h-screen text-zinc-100 font-sans",
  sectionContainer: "max-w-6xl mx-auto",
  headingCenter: "text-center mb-12",
  title: "text-3xl md:text-5xl font-bold tracking-tight mb-4",
  subtitle: "text-zinc-400 max-w-2xl mx-auto text-lg",

  // Карточки
  cardBase:
    "relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300",
  cardDefault: "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700",
  cardPro: `border-${UI_COLLORS.colorPrimary}-500/30 bg-zinc-900/80 hover:border-${UI_COLLORS.colorPrimary}-500/50 shadow-lg shadow-${UI_COLLORS.colorPrimary}-500/5`,

  // Кнопки
  buttonBase:
    "w-full group flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-colors cursor-pointer",
  buttonPrimary: `bg-${UI_COLLORS.colorPrimary}-500 hover:bg-cyan-400 text-zinc-950`,
  buttonSecondary: "bg-zinc-100 hover:bg-white text-zinc-950",
  studioIcon: `w-5 h-5 text-${UI_COLLORS.colorPrimary}-400 shrink-0 mt-0.5`,
};

export const collectionsConfig: Record<string, CollectionConfig> = {
  portfolio: {
    collectionName: "Portfolio",
    title: "Портфолио",
    fields: [
      {
        name: "artist",
        label: "Артист / Клиент",
        type: "text",
        required: true,
      },
      {
        name: "trackTitle",
        label: "Название трека",
        type: "text",
        required: true,
      },
      { name: "service", label: "Услуга", type: "text", required: true },
      { name: "videoUrl", label: "Ссылка на видео / демо", type: "video" },
      {
        name: "duration",
        label: "Длительность",
        type: "text",
        placeholder: "03:45",
      },
    ],
  },
  services: {
    collectionName: "Service",
    title: "Услуги",
    fields: [
      { name: "name", label: "Название услуги", type: "text", required: true },
      { name: "price", label: "Цена (₽)", type: "number", required: true },
      { name: "image", label: "Изображение", type: "image" },
      { name: "description", label: "Описание", type: "textarea" },
    ],
  },
};

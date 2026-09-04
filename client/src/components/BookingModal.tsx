import { useRef, useState } from "react";
import type { Service } from "../types/types";
import { pb } from "../api/PocketBase";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services?: Service[];
  initialService?: Service;
  onSubmit?: (data: typeof initialForm) => void;
}

const initialForm = {
  name: "",
  contactMethod: "telegram",
  contact: "",
  service: "",
  dateTime: "",
  comment: "",
};

export default function BookingModal({
  isOpen,
  onClose,
  services = [],
  initialService,
  onSubmit,
}: BookingModalProps) {
  const [form, setForm] = useState({
    ...initialForm,
    service: initialService?.id ?? "",
  });
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const update = (field: keyof typeof initialForm, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    onSubmit?.(form);

    try {
      // Находим выбранную услугу по id, чтобы получить её название
      const selectedService = services.find((s) => s.id === form.service);
      const serviceName = selectedService ? selectedService.name : form.service;

      const body = {
        name: form.name,
        contactMethod: form.contactMethod,
        contact: form.contact,
        service: serviceName,
        dateTime: form.dateTime,
        comment: form.comment,
      };

      await pb.collection("Claim").create(body);
      setSubmitted(true);
    } catch (error) {}
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="presentation"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        aria-label="Закрыть окно"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="relative w-full max-w-xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-white/15 bg-zinc-900 p-6 text-white shadow-2xl md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 text-2xl leading-none text-white/50 transition hover:text-white"
        >
          ×
        </button>
        {submitted ? (
          <div className="py-12 text-center">
            <div className="mb-4 text-4xl">✓</div>
            <h2 id="booking-title" className="text-2xl font-bold">
              Заявка отправлена
            </h2>
            <p className="mt-2 text-zinc-400">
              Мы свяжемся с вами в ближайшее время.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-lg bg-white px-5 py-2.5 font-medium text-zinc-900 transition hover:bg-zinc-200"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <h2
              id="booking-title"
              className="pr-8 text-2xl font-bold md:text-3xl"
            >
              Забронировать запись
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Оставьте контакты — согласуем удобное время.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm">
                <span className="mb-1.5 block text-zinc-300">Имя</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 outline-none transition placeholder:text-zinc-600 focus:border-white/50"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block text-zinc-300">
                    Как с вами связаться?
                  </span>
                  <select
                    value={form.contactMethod}
                    onChange={(e) => update("contactMethod", e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-zinc-800 px-3 py-2.5 outline-none focus:border-white/50"
                  >
                    <option value="telegram">Telegram</option>
                    <option value="phone">Телефон</option>
                    <option value="vk">ВКонтакте</option>
                    <option value="email">E-mail</option>
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block text-zinc-300">Контакт</span>
                  <input
                    required
                    value={form.contact}
                    onChange={(e) => update("contact", e.target.value)}
                    placeholder="Телефон, @ник или e-mail"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 outline-none transition placeholder:text-zinc-600 focus:border-white/50"
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1.5 block text-zinc-300">Услуга</span>
                <select
                  required
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-zinc-800 px-3 py-2.5 outline-none focus:border-white/50"
                >
                  <option value="">Выберите услугу</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-zinc-300">
                  Желаемая дата и время{" "}
                  <span className="text-zinc-500">(необязательно)</span>
                </span>
                <input
                  value={form.dateTime}
                  onChange={(e) => update("dateTime", e.target.value)}
                  placeholder="Например, 15 сентября после 18:00"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 outline-none transition placeholder:text-zinc-600 focus:border-white/50"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-zinc-300">
                  Комментарий{" "}
                  <span className="text-zinc-500">(необязательно)</span>
                </span>
                <textarea
                  rows={3}
                  value={form.comment}
                  onChange={(e) => update("comment", e.target.value)}
                  placeholder="Расскажите о задаче"
                  className="w-full resize-y rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 outline-none transition placeholder:text-zinc-600 focus:border-white/50"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-lg bg-white px-5 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-200"
              >
                Отправить заявку
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import type { Service } from "../types/types";
import BookingModal from "./BookingModal";
import { useServices } from "../api/Services";

interface BookingButtonProps {
  service?: Service;
  children?: React.ReactNode;
  className?: string;
}

export default function BookingButton({
  service,
  children = "Забронировать",
  className = "",
}: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: services } = useServices();
  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(true);
        }}
        className={className}
      >
        {children}
      </button>
      <BookingModal
        key={isOpen ? "open" : "closed"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        services={services}
        initialService={service}
      />
    </>
  );
}

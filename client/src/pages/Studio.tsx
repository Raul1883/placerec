import { Mic, Headphones, Speaker, Cpu, ArrowRight } from "lucide-react";
import { UI_CLASSES } from "../assets/const";

interface Equipment {
  mic: string;
  card: string;
  headphones: string;
  monitors: string;
}

interface StudioRoom {
  id: string;
  name: string;
  description: string;
  imagePlaceholder: string;
  equipment: Equipment;
  isPro?: boolean;
}

const roomsData: StudioRoom[] = [
  {
    id: "base",
    name: "PLACE RECORDS BASE",
    description:
      "Идеальное пространство для записи вокала, создания демо-треков и подкастов. Комфортная акустика и проверенное оборудование.",
    imagePlaceholder: "/studiobase.webp",
    equipment: {
      mic: "Warm Audio WA-14",
      card: "Audient iD14 MKII",
      headphones: "Beyerdynamic DT 880 Pro (250ohm), DT 770 Pro (250ohm)",
      monitors: "ADAM Audio T5V",
    },
  },
  {
    id: "pro",
    name: "PLACE RECORDS PRO",
    description:
      "Флагманская студия с бескомпромиссным звучанием. Подходит для профессионального сведения, мастеринга и сложных сессий звукозаписи.",
    imagePlaceholder: "/studiopro.webp",
    isPro: true,
    equipment: {
      mic: "Warm Audio WA-14",
      card: "RME Babyface Pro FS",
      headphones: "Audio-Technica ATH-AVC500, Beyerdynamic DT 770 Pro (250ohm)",
      monitors: "Neumann KH 120 A G",
    },
  },
];

export default function Studio() {
  return (
    <section id="about" className={`bg-zinc-950 ${UI_CLASSES.section}`}>
      <div className={UI_CLASSES.sectionContainer}>
        <div className={UI_CLASSES.headingCenter}>
          <h2 className={UI_CLASSES.title}>Наши пространства</h2>
          <p className={UI_CLASSES.subtitle}>
            Выберите зал, который идеально подходит для ваших творческих задач.
            Мы обеспечили оба помещения топовым оборудованием.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className={`${UI_CLASSES.cardBase} ${room.isPro ? UI_CLASSES.cardPro : UI_CLASSES.cardDefault}`}
            >
              {/* Image Section */}
              <div className="h-64 w-full flex items-center justify-center overflow-hidden relative bg-zinc-900">
                <span className="text-zinc-600 font-medium tracking-widest w-full h-full flex items-center justify-center">
                  <img
                    src={room.imagePlaceholder}
                    alt={room.name}
                    className="object-cover w-full h-full"
                  />
                </span>
              </div>

              {/* Content Section */}
              <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-bold mb-3">{room.name}</h3>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  {room.description}
                </p>

                {/* Equipment List */}
                <div className="space-y-4 mb-8 grow">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">
                    Оборудование:
                  </h4>

                  <div className="flex items-start gap-4">
                    <Mic className={UI_CLASSES.studioIcon} />
                    <div>
                      <p className="text-sm text-zinc-400">Микрофон</p>
                      <p className="font-medium text-zinc-200">
                        {room.equipment.mic}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Cpu className={UI_CLASSES.studioIcon} />
                    <div>
                      <p className="text-sm text-zinc-400">Звуковая карта</p>
                      <p className="font-medium text-zinc-200">
                        {room.equipment.card}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Speaker className={UI_CLASSES.studioIcon} />
                    <div>
                      <p className="text-sm text-zinc-400">Мониторы</p>
                      <p className="font-medium text-zinc-200">
                        {room.equipment.monitors}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Headphones className={UI_CLASSES.studioIcon} />
                    <div>
                      <p className="text-sm text-zinc-400">Наушники</p>
                      <p className="font-medium text-zinc-200">
                        {room.equipment.headphones}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`${UI_CLASSES.buttonBase} ${room.isPro ? UI_CLASSES.buttonPrimary : UI_CLASSES.buttonSecondary}`}
                >
                  Забронировать
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

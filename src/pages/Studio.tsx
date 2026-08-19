import { Mic, Headphones, Speaker, Cpu, ArrowRight } from "lucide-react";

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
    imagePlaceholder: "/studiobase.jpg", // Здесь будет url вашей картинки
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
    imagePlaceholder: "/studiopro.jpg", // Здесь будет url вашей картинки
    isPro: true,
    equipment: {
      mic: "Warm Audio WA-14",
      card: "RME Babyface Pro FS",
      headphones: "Audio-Technica ATH-AVC500, Beyerdynamic DT 770 Pro (250ohm)",
      monitors: "Neumann KH 120 A G",
    },
  },
];

export default () => {
  return (
    <section className="bg-zinc-950 py-16 px-4 md:px-8 w-full min-h-screen text-zinc-100 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Наши пространства
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Выберите зал, который идеально подходит для ваших творческих задач.
            Мы обеспечили оба помещения топовым оборудованием.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roomsData.map((room) => (
            <div
              key={room.id}
              className={`relative flex flex-col rounded-2xl overflow-hidden border ${room.isPro ? "border-amber-500/30 bg-zinc-900/80" : "border-zinc-800 bg-zinc-900/50"} transition-all hover:border-zinc-600`}
            >
              {/* Image Section */}
              <div
                className={`h-64 w-full flex items-center justify-center overflow-hidden  relative`}
              >
                <span className="text-zinc-600 font-medium tracking-widest">
                  <img src={room.imagePlaceholder} />
                </span>
                {room.isPro && (
                  <span className="absolute top-4 right-4 bg-amber-500 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Premium
                  </span>
                )}
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
                    <Mic className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-400">Микрофон</p>
                      <p className="font-medium text-zinc-200">
                        {room.equipment.mic}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Cpu className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-400">Звуковая карта</p>
                      <p className="font-medium text-zinc-200">
                        {room.equipment.card}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Speaker className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-zinc-400">Мониторы</p>
                      <p className="font-medium text-zinc-200">
                        {room.equipment.monitors}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Headphones className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
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
                  className={`w-full group flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-colors ${room.isPro ? "bg-amber-500 hover:bg-amber-400 text-zinc-950" : "bg-zinc-100 hover:bg-white text-zinc-950"}`}
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
};

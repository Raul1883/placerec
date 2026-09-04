import { Mic, Headphones, Speaker, Cpu, ArrowRight } from "lucide-react";
import { UI_CLASSES } from "../assets/const";
import Section from "../components/Section";
import Carousel from "../components/Сarousel";

// Картинки для Base
import base1 from "../assets/studio/base/place-base-фото_1.webp";
import base2 from "../assets/studio/base/place-base-фото_2.webp";
import base3 from "../assets/studio/base/place-base-фото_3.webp";
import base4 from "../assets/studio/base/place-base-фото_4.webp";
import base5 from "../assets/studio/base/place-base-фото_5.webp";

// Картинки для Pro
import pro1 from "../assets/studio/pro/place-pro-фото_1.webp";
import pro2 from "../assets/studio/pro/place-pro-фото_2.webp";
import pro3 from "../assets/studio/pro/place-pro-фото_3.webp";
import pro4 from "../assets/studio/pro/place-pro-фото_4.webp";

const baseImages = [base1, base2, base3, base4, base5];
const proImages = [pro1, pro2, pro3, pro4];

export default function Studio() {
  return (
    <Section
      id="about"
      title="Наши пространства"
      subtitle="Выберите зал, который идеально подходит для ваших творческих задач. Мы обеспечили оба помещения топовым оборудованием."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PLACE RECORDS BASE */}
        <div className={`${UI_CLASSES.cardBase} ${UI_CLASSES.cardDefault}`}>
          {/* Image Section / Carousel */}
          <div className="h-72 w-full overflow-hidden relative bg-zinc-900">
            <Carousel images={baseImages} />
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col grow">
            <h3 className="text-2xl font-bold mb-3">PLACE RECORDS BASE</h3>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Идеальное пространство для записи вокала, создания демо-треков и подкастов. Комфортная акустика и проверенное оборудование.
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
                  <p className="font-medium text-zinc-200">Warm Audio WA-14</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Cpu className={UI_CLASSES.studioIcon} />
                <div>
                  <p className="text-sm text-zinc-400">Звуковая карта</p>
                  <p className="font-medium text-zinc-200">Audient iD14 MKII</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Speaker className={UI_CLASSES.studioIcon} />
                <div>
                  <p className="text-sm text-zinc-400">Мониторы</p>
                  <p className="font-medium text-zinc-200">ADAM Audio T5V</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Headphones className={UI_CLASSES.studioIcon} />
                <div>
                  <p className="text-sm text-zinc-400">Наушники</p>
                  <p className="font-medium text-zinc-200">
                    Beyerdynamic DT 880 Pro (250ohm), DT 770 Pro (250ohm)
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className={`${UI_CLASSES.buttonBase} ${UI_CLASSES.buttonSecondary}`}>
              Забронировать
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* PLACE RECORDS PRO */}
        <div className={`${UI_CLASSES.cardBase} ${UI_CLASSES.cardDefault}`}>
          {/* Image Section / Carousel */}
          <div className="h-72 w-full overflow-hidden relative bg-zinc-900">
            <Carousel images={proImages} />
          </div>

          {/* Content Section */}
          <div className="p-8 flex flex-col grow">
            <h3 className="text-2xl font-bold mb-3">PLACE RECORDS PRO</h3>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Флагманская студия с бескомпромиссным звучанием. Подходит для профессионального сведения, мастеринга и сложных сессий звукозаписи.
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
                  <p className="font-medium text-zinc-200">Warm Audio WA-14</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Cpu className={UI_CLASSES.studioIcon} />
                <div>
                  <p className="text-sm text-zinc-400">Звуковая карта</p>
                  <p className="font-medium text-zinc-200">RME Babyface Pro FS</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Speaker className={UI_CLASSES.studioIcon} />
                <div>
                  <p className="text-sm text-zinc-400">Мониторы</p>
                  <p className="font-medium text-zinc-200">Neumann KH 120 A G</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Headphones className={UI_CLASSES.studioIcon} />
                <div>
                  <p className="text-sm text-zinc-400">Наушники</p>
                  <p className="font-medium text-zinc-200">
                    Audio-Technica ATH-AVC500, Beyerdynamic DT 770 Pro (250ohm)
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className={`${UI_CLASSES.buttonBase} ${UI_CLASSES.buttonSecondary}`}>
              Забронировать
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
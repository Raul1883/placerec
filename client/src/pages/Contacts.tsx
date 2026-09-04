import { UI_COLLORS } from "../assets/const";

const contacts = [
  { text: "Telegram", url: "https://t.me/placerecords" },
  {
    text: "ВКонтакте",
    url: "https://vk.ru/place.records",
  },
];

export default () => {
  return (
    <footer id="contact" className="py-12 px-6 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <div className="text-xl font-bold tracking-wider text-white uppercase">
            PLACE RECORDS
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-${UI_COLLORS.colorPrimary}-500`}
              ></span>
            </span>
            <span>Сессии 24/7 — запись по предварительной брони</span>
          </div>
          <p className="text-xs text-zinc-500">
            Екатеринбург, улица 8 Марта, 2
          </p>
        </div>

        {/* Контакты и кнопки */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:+79826710190"
            className="text-white hover:text-zinc-300 font-mono text-sm tracking-wide transition-colors"
          >
            +7 (982) 671-01-90
          </a>
          {contacts.map((x) => (
            <a
              href={x.url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg border border-zinc-700 text-sm font-medium transition-all"
            >
              {x.text} →
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-zinc-900 text-xs text-zinc-600 flex justify-between">
        <span>
          © {new Date().getFullYear()} PLACE RECORDS. Все права защищены.
        </span>
        <span>Made for sound</span>
      </div>
    </footer>
  );
};

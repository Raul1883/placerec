import useSWR from "swr";
import { useState } from "react";
import { UI_CLASSES } from "../../assets/const";
import { pb } from "../../api/PocketBase";
import {
  Loader,
  TriangleAlert,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Claim {
  id: string;
  name: string;
  contactMethod: string;
  contact: string;
  service: string;
  dateTime: string;
  comment: string;
  status: "new" | "in progress" | "closed";
}

const fetchClaim = async () => {
  return await pb.collection<Claim>("Claim").getFullList({
    sort: "-created",
  });
};

export default function Claims() {
  const { data, isLoading, error, mutate } = useSWR<Claim[]>("Claim", fetchClaim);
  const [filter, setFilter] = useState<"all" | Claim["status"]>("all");

  const updateStatus = async (id: string, newStatus: Claim["status"]) => {
    try {
      await pb.collection("Claim").update(id, { status: newStatus });
      mutate();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Не удалось обновить статус заявки");
    }
  };

  const deleteClaim = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту заявку?")) return;
    try {
      await pb.collection("Claim").delete(id);
      mutate();
    } catch (err) {
      console.error("Failed to delete claim:", err);
      alert("Не удалось удалить заявку");
    }
  };

  const getStatusBadge = (status: Claim["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <AlertCircle className="w-3 h-3" /> Новая
          </span>
        );
      case "in progress":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" /> В работе
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" /> Закрыта
          </span>
        );
    }
  };

  const filteredData = data?.filter((claim) => {
    if (filter === "all") return true;
    return claim.status === filter;
  });

  return (
    <div className={UI_CLASSES.section}>
      <div className={UI_CLASSES.sectionContainer}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className={UI_CLASSES.title}>Заявки</h1>
            <span className="text-sm text-zinc-400">
              Всего: {data ? data.length : 0}{" "}
              {filteredData && filter !== "all"
                ? `(отфильтровано: ${filteredData.length})`
                : ""}
            </span>
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setFilter("new")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === "new"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Новые
            </button>
            <button
              onClick={() => setFilter("in progress")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === "in progress"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              В работе
            </button>
            <button
              onClick={() => setFilter("closed")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === "closed"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Закрытые
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading || !data ? (
          <div className="flex w-full items-center justify-center py-12">
            <Loader className="animate-spin w-10 h-10 mr-3 text-cyan-400" />
            <h2 className="text-2xl font-medium text-zinc-300">Загрузка...</h2>
          </div>
        ) : error ? (
          <div className="flex w-full items-center justify-center py-12 text-red-400">
            <TriangleAlert className="w-10 h-10 mr-3" />
            <h2 className="text-2xl font-medium">
              Что-то пошло не так, попробуйте позднее.
            </h2>
          </div>
        ) : filteredData?.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <p className="text-lg">Список заявок пуст</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredData?.map((claim) => (
              <div
                key={claim.id}
                className={`${UI_CLASSES.cardBase} ${UI_CLASSES.cardDefault} p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-zinc-100">
                      {claim.name}
                    </h3>
                    {getStatusBadge(claim.status)}
                    {claim.service && (
                      <span className="px-2.5 py-0.5 rounded-md text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium">
                        Услуга: {claim.service}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-zinc-400 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    <div>
                      <span className="font-medium text-zinc-300">
                        Связь ({claim.contactMethod}):
                      </span>{" "}
                      <a
                        href={`tel:${claim.contact}`}
                        className="text-cyan-400 hover:underline"
                      >
                        {claim.contact}
                      </a>
                    </div>
                    {claim.dateTime && (
                      <div>
                        <span className="font-medium text-zinc-300">
                          Дата/Время:
                        </span>{" "}
                        {claim.dateTime}
                      </div>
                    )}
                  </div>

                  {claim.comment && (
                    <p className="text-sm text-zinc-300 bg-zinc-950/50 p-2.5 rounded border border-zinc-800/80">
                      <span className="font-medium text-zinc-400">
                        Комментарий:
                      </span>{" "}
                      {claim.comment}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center flex-wrap">
                  <select
                    value={claim.status}
                    onChange={(e) =>
                      updateStatus(claim.id, e.target.value as Claim["status"])
                    }
                    className="text-sm border border-zinc-700 rounded-lg px-3 py-1.5 bg-zinc-900 text-zinc-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="new">Новая</option>
                    <option value="in progress">В работе</option>
                    <option value="closed">Закрыта</option>
                  </select>

                  <button
                    onClick={() => deleteClaim(claim.id)}
                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Удалить заявку"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

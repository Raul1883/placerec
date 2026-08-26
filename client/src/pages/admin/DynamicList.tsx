// client/src/pages/admin/DynamicList.tsx
import { useState } from "react";
import useSWR from "swr";
import { pb } from "../../api/PocketBase";
import { collectionsConfig, UI_CLASSES, UI_COLLORS } from "../../assets/const";
import { DynamicEditor } from "./DynamicEditor";
import type { CollectionConfig } from "../../types/types";
import HtmlRender from "../../components/HtmlRender";

export default () => {
  const [selectedCollectionKey, setSelectedCollectionKey] = useState<string>(
    Object.keys(collectionsConfig)[0],
  );

  const currentConfig: CollectionConfig =
    collectionsConfig[selectedCollectionKey];

  const {
    data: items,
    isLoading,
    error,
    mutate,
  } = useSWR<Record<string, any>[]>(
    [
      `collection-${currentConfig.collectionName}`,
      currentConfig.collectionName,
    ],
    async ([, collectionName]) => {
      return await pb.collection(collectionName as string).getFullList({
        sort: "-created",
      });
    },
  );

  // Состояние для модального окна / редактора (создание или редактирование)
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingRecordId, setEditingRecordId] = useState<string | undefined>(
    undefined,
  );
  const [editingInitialData, setEditingInitialData] = useState<
    Record<string, any>
  >({});

  const handleDelete = async (recordId: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту запись?")) return;
    try {
      await pb.collection(currentConfig.collectionName).delete(recordId);
      // Обновляем кэш SWR без перезагрузки страницы
      mutate();
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  const handleCreateNew = () => {
    setEditingRecordId(undefined);
    setEditingInitialData({});
    setIsEditorOpen(true);
  };

  const handleEdit = (record: Record<string, any>) => {
    setEditingRecordId(record.id);
    setEditingInitialData(record);
    setIsEditorOpen(true);
  };

  const handleSuccessSave = () => {
    setIsEditorOpen(false);
    // Перезапрашиваем данные через SWR
    mutate();
  };

  return (
    <div className={UI_CLASSES.section}>
      <div className={UI_CLASSES.sectionContainer}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className={UI_CLASSES.title}>Управление коллекциями</h1>

          {/* Переключатель коллекций */}
          <div className="flex gap-2 flex-wrap">
            {Object.entries(collectionsConfig).map(([key, conf]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedCollectionKey(key);
                  setIsEditorOpen(false);
                }}
                className={`py-2 px-4 rounded-xl bg-cyan-500 font-medium transition-colors cursor-pointer ${
                  selectedCollectionKey === key
                    ? `bg-${UI_COLLORS.colorPrimary}-500 text-zinc-950`
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {conf.title}
              </button>
            ))}
          </div>
        </div>

        {/* Панель действий */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-zinc-200">
            Коллекция:{" "}
            <span className={`text-${UI_COLLORS.colorPrimary}-400`}>
              {currentConfig.title}
            </span>
          </h2>
          <button
            onClick={handleCreateNew}
            className={`${UI_CLASSES.buttonBase} ${UI_CLASSES.buttonPrimary} w-auto px-6`}
          >
            + Создать запись
          </button>
        </div>

        {/* Модальное окно / Блок редактора */}
        {isEditorOpen && (
          <div className="mb-8 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-zinc-100">
                {editingRecordId ? "Редактирование записи" : "Новая запись"}
              </h3>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 cursor-pointer"
              >
                ✕ Закрыть
              </button>
            </div>
            <DynamicEditor
              config={currentConfig}
              recordId={editingRecordId}
              initialData={editingInitialData}
              onSuccess={handleSuccessSave}
            />
          </div>
        )}

        {/* Список элементов */}
        {isLoading ? (
          <div className="text-zinc-400 py-12 text-center">Загрузка...</div>
        ) : error ? (
          <div className="text-red-400 py-12 text-center border border-dashed border-red-900/50 rounded-2xl">
            Не удалось загрузить данные коллекции
          </div>
        ) : !items || items.length === 0 ? (
          <div className="text-zinc-500 py-12 text-center border border-dashed border-zinc-800 rounded-2xl">
            Записи отсутствуют
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 gap-4"
              >
                {/* Динамический рендеринг полей на основе схемы из const.ts */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 flex-1">
                  {currentConfig.fields.map((field) => {
                    const val = item[field.name];
                    return (
                      <div key={field.name} className="flex flex-col">
                        <span className="text-xs text-zinc-500">
                          {field.label}
                        </span>
                        <span className="text-sm text-zinc-200">
                          {field.type === "image" && val ? (
                            <img
                              src={pb.files.getURL(item, val)}
                              alt={field.label}
                              className="mt-4 max-h-24 max-w-32 rounded-lg object-cover"
                            />
                          ) : field.type === "video" ? (
                            <video
                              src={pb.files.getURL(item, val)}
                              className="mt-4 max-h-48 max-w-48  object-cover"
                              controls
                              preload="metadata"
                            />
                          ) : field.type === "textarea" ? (
                            <HtmlRender htmlContent={val} />
                          ) : (
                            String(val ?? "—")
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium cursor-pointer"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

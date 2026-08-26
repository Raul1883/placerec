// components/DynamicEditor.tsx
import React, { useState } from "react";
import { DynamicField } from "./FormField";
import type { CollectionConfig } from "../../types/types";
import { pb } from "../../api/PocketBase";

interface Props {
  config: CollectionConfig;
  initialData?: Record<string, any>;
  recordId?: string;
  onSuccess?: () => void;
}

export const DynamicEditor: React.FC<Props> = ({
  config,
  initialData = {},
  recordId,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (name: string, val: any) => {
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          dataToSend.append(key, val);
        }
      });

      if (recordId) {
        await pb.collection(config.collectionName).update(recordId, dataToSend);
      } else {
        await pb.collection(config.collectionName).create(dataToSend);
      }

      onSuccess?.();
    } catch (err) {
      console.error("Ошибка сохранения:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
      <h3>
        {recordId ? "Редактировать" : "Создать"}: {config.title}
      </h3>

      {config.fields.map((field) => (
        <DynamicField
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleFieldChange}
        />
      ))}

      <button type="submit" disabled={loading}>
        {loading ? "Сохранение..." : "Сохранить"}
      </button>
    </form>
  );
};

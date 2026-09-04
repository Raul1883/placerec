// components/DynamicEditor.tsx
import React, { useState } from "react";
import { DynamicField } from "./FormField";
import type { CollectionConfig } from "../../types/types";
import { pb } from "../../api/PocketBase";
import { UI_CLASSES } from "../../assets/const";

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        {config.fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-300">
              {field.label}
            </label>
            <DynamicField
              field={field}
              value={formData[field.name]}
              onChange={handleFieldChange}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className={`${UI_CLASSES.buttonBase} ${UI_CLASSES.buttonPrimary} w-auto px-6`}
        >
          {loading ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </form>
  );
};
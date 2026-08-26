// components/FormField.tsx
import React from "react";
import type { FieldConfig } from "../../types/types";
import { RichTextEditor } from "./RichTextEditor";

interface Props {
  field: FieldConfig;
  value: any;
  onChange: (name: string, val: any) => void;
}
const inputStyle = "bg-zinc-400 text-black px-2 py-1 rounded-lg";

export const DynamicField: React.FC<Props> = ({ field, value, onChange }) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const val =
      field.type === "number" ? Number(e.target.value) : e.target.value;
    onChange(field.name, val);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onChange(field.name, e.target.files[0]); // Для PocketBase FormData
    }
  };

  return (
    <div
      style={{
        marginBottom: 16,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <label style={{ fontWeight: 600 }}>{field.label}</label>

      {field.type === "textarea" && (
        <RichTextEditor
          value={value || ""}
          onChange={handleChange}
          className={inputStyle}
        />
      )}

      {field.type === "image" && (
        <input
          className={inputStyle}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      )}

      {field.type === "video" && (
        <input
          className={inputStyle}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
      )}

      {["text", "number"].includes(field.type) && (
        <input
          className={inputStyle}
          type={field.type}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

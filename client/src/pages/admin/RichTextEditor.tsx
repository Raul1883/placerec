import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface RichTextEditorProps {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange: any;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  className,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[100px]",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const sanitizedHtml = html === "<p></p>" ? "" : html;

      onChange({
        target: {
          value: sanitizedHtml,
        },
      });
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return <EditorContent editor={editor} className={className} />;
};

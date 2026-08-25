import { useMemo } from "react";
import DOMPurify from "dompurify";

interface HtmlContent {
  htmlContent: string;
}

export default ({ htmlContent }: HtmlContent) => {
  const sanitizedHtml = useMemo(() => {
    return DOMPurify.sanitize(htmlContent, {
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "target"],
    });
  }, [htmlContent]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

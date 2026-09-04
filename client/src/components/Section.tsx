import React from "react";

interface SectionProps {
  id: string;
  className?: string;
  containerClassName?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default ({
  id,
  className = "py-20 md:py-24 bg-neutral-950 text-white selection:bg-cyan-500 selection:text-black overflow-hidden",
  containerClassName = "max-w-6xl mx-auto px-4",
  title,
  subtitle,
  children,
}: SectionProps) => {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className={containerClassName}>
        {(title || subtitle) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              {title && (
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2">
                  {title}
                </h2>
              )}
            </div>
            {subtitle && (
              <p className="max-w-xl text-neutral-400 text-sm md:text-base leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

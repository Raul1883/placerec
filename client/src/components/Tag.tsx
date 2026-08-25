export default ({ children }: { children?: React.ReactNode }) => {
  return (
    <span className="inline-block px-4 py-1.5 mb-10 text-xs font-semibold uppercase tracking-[0.2em] border border-white/20 rounded-full">
      {children}
    </span>
  );
};

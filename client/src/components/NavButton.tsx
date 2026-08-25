interface NavButtonProps {
  children: React.ReactNode;
  href: string;
}

export default ({ children, href }: NavButtonProps) => {
  return (
    <div>
      <a
        href={href}
        className="px-4 py-2 rounded-full text-white/90 border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 transition-all duration-200"
      >
        {children}
      </a>
    </div>
  );
};

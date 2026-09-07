import { Link } from "react-router-dom";

interface NavButtonProps {
  children: React.ReactNode;
  href?: string;
  to?: string;
}

export default function NavButton({ children, href, to }: NavButtonProps) {
  return (
    <div>
      {href ? (
        <a
          href={href}
          className="px-4 py-2 rounded-full text-white/90 border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 transition-all duration-200"
        >
          {children}
        </a>
      ) : null}

      {to ? (
        <Link
          to={to}
          className="px-4 py-2 rounded-full text-white/90 border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 transition-all duration-200"
        >
          {children}
        </Link>
      ) : null}
    </div>
  );
}

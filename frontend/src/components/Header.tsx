import { ShieldCheck } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Detection", id: "detection" },
  { label: "API Test", id: "api-test" },
  { label: "About", id: "about" },
];

export default function Header() {
  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg">
            Phish<span className="text-primary">Shield</span>
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ML Model Ready
        </div>
      </div>
    </header>
  );
}

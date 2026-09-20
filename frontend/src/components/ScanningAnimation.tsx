import { ShieldQuestion } from "lucide-react";

export default function ScanningAnimation() {
  return (
    <div className="mt-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-white overflow-hidden relative">
      <div className="flex flex-col items-center justify-center gap-4 py-10 px-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <ShieldQuestion className="h-8 w-8 text-primary animate-pulse" />
          </div>
        </div>

        <div className="text-center">
          <p className="font-medium text-slate-900">Menganalisis URL...</p>
          <p className="text-sm text-muted-foreground mt-1">
            Mengecek pola phishing dengan model ML
          </p>
        </div>

        <div className="w-full max-w-xs h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-scan-bar" />
        </div>
      </div>

      {/* garis scanning yang bergerak turun */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
    </div>
  );
}

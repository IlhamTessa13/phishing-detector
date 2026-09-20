import { ShieldCheck, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeSectionProps {
  onScanNow: () => void;
}

export default function HomeSection({ onScanNow }: HomeSectionProps) {
  return (
    <section
      id="home"
      className="min-h-[85vh] flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <ShieldCheck className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
          Deteksi Phishing dengan{" "}
          <span className="text-primary">Machine Learning</span>
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          PhishShield menganalisis URL secara real-time menggunakan model
          XGBoost & LightGBM untuk mendeteksi potensi phishing sebelum kamu jadi
          korban.
        </p>

        <Button
          size="lg"
          className="mt-8 h-12 px-8 text-base"
          onClick={onScanNow}
        >
          Mulai Scan Sekarang
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 text-left">
          <div className="flex items-start gap-3 p-4 rounded-xl border bg-white">
            <Zap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm text-slate-900">Real-time</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Hasil analisis dalam hitungan detik
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl border bg-white">
            <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm text-slate-900">Akurat</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Ditenagai model XGBoost & LightGBM
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl border bg-white">
            <Lock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm text-slate-900">
                Gratis & Privat
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                URL tidak disimpan setelah discan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

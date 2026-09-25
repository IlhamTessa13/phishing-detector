import { Code2, GraduationCap, Target } from "lucide-react";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-[60vh] flex items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">About Us</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Tentang project PhishShield ini
          </p>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm text-slate-900">
                Tujuan Project
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                PhishShield dibuat sebagai tugas mata kuliah data mining, dengan
                tujuan mendeteksi tautan phishing secara otomatis menggunakan
                model machine learning XGBoost dan LightGBM.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <GraduationCap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm text-slate-900">Tech Stack</p>
              <p className="text-sm text-muted-foreground mt-1">
                Frontend: React + TypeScript + Tailwind CSS · Backend: FastAPI
                (Python) · Model: XGBoost & LightGBM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Code2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm text-slate-900">Source Code</p>
              <p className="text-sm text-muted-foreground mt-1">
                https://github.com/IlhamTessa13/phishing-detector
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

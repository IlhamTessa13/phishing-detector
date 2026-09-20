import { forwardRef } from "react";
import UrlInputForm from "../UrlInputForm";
import ResultCard from "../ResultCard";
import ScanningAnimation from "../ScanningAnimation";
import type { ScanStatus } from "../../hooks/useCheckUrl";
import type { ScanResult } from "../../types/prediction";

interface DetectionSectionProps {
  status: ScanStatus;
  result: ScanResult | null;
  error: string | null;
  onSubmit: (url: string) => void;
}

const DetectionSection = forwardRef<HTMLDivElement, DetectionSectionProps>(
  ({ status, result, error, onSubmit }, ref) => {
    const loading = status === "scanning";

    return (
      <section
        id="detection"
        ref={ref}
        className="min-h-[70vh] flex items-center justify-center px-4 py-20"
      >
        <div className="w-full max-w-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Detection</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Masukkan URL untuk dianalisis oleh model
            </p>
          </div>

          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-slate-900">
                Phishing Detection Scanner
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter a URL below to analyze
              </p>
            </div>

            <UrlInputForm onSubmit={onSubmit} loading={loading} />

            {status === "scanning" && <ScanningAnimation />}
            {(status === "done" || status === "error") && (
              <ResultCard result={result} error={error} />
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Didukung oleh model XGBoost & LightGBM
          </p>
        </div>
      </section>
    );
  },
);

DetectionSection.displayName = "DetectionSection";
export default DetectionSection;

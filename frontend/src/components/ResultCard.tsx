import type { ScanResult } from "../types/prediction";
import {
  ShieldAlert,
  ShieldCheck,
  Percent,
  Clock,
  AlertCircle,
  WifiOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultCardProps {
  result: ScanResult | null;
  error: string | null;
}

export default function ResultCard({ result, error }: ResultCardProps) {
  if (error) {
    return (
      <Card className="mt-6 border-destructive/50 bg-destructive/5 animate-in fade-in slide-in-from-top-2 duration-300">
        <CardContent className="flex items-center gap-3 pt-6">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;

  // 🆕 Kasus: website tidak ditemukan / tidak reachable
  if (!result.reachable) {
    return (
      <Card className="mt-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white animate-in fade-in zoom-in-95 duration-300">
        <CardContent className="flex flex-col items-center text-center gap-2 py-8">
          <WifiOff className="h-8 w-8 text-amber-500" />
          <p className="font-medium text-amber-700">Website Tidak Ditemukan</p>
          <p className="text-sm text-muted-foreground max-w-sm">
            {result.message || "URL ini tidak bisa diakses atau tidak aktif."}
          </p>
          <p className="text-xs text-muted-foreground break-all font-mono bg-muted/50 rounded-md px-3 py-2 mt-2">
            {result.url}
          </p>
        </CardContent>
      </Card>
    );
  }

  const isPhishing = result.prediction === "phishing";
  const confidencePercent = Math.round((result.confidence ?? 0) * 100);

  return (
    <Card className="mt-6 border-2 animate-in fade-in zoom-in-95 duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base text-slate-700">
          <span className="w-1.5 h-4 bg-primary rounded-full" />
          Scan Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground break-all font-mono bg-muted/50 rounded-md px-3 py-2 mb-4">
          {result.url}
        </p>

        <div className="grid grid-cols-3 gap-3">
          <div
            className={`rounded-lg p-3 flex flex-col items-center text-center gap-1 ${isPhishing ? "bg-red-50" : "bg-emerald-50"}`}
          >
            {isPhishing ? (
              <ShieldAlert className="h-5 w-5 text-red-500" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
            )}
            <span className="text-[11px] text-muted-foreground">
              Safety Status
            </span>
            <span
              className={`text-sm font-bold ${isPhishing ? "text-red-600" : "text-emerald-600"}`}
            >
              {isPhishing ? "PHISHING" : "SAFE"}
            </span>
          </div>

          <div className="rounded-lg p-3 flex flex-col items-center text-center gap-1 bg-blue-50">
            <Percent className="h-5 w-5 text-blue-500" />
            <span className="text-[11px] text-muted-foreground">
              Confidence
            </span>
            <span className="text-sm font-bold text-blue-600">
              {confidencePercent}%
            </span>
          </div>

          <div className="rounded-lg p-3 flex flex-col items-center text-center gap-1 bg-purple-50">
            <Clock className="h-5 w-5 text-purple-500" />
            <span className="text-[11px] text-muted-foreground">Scan Time</span>
            <span className="text-sm font-bold text-purple-600">
              {result.scanTime.toFixed(2)}s
            </span>
          </div>
        </div>

        {isPhishing && (
          <div className="mt-4 flex items-center gap-2 text-xs text-red-600 bg-red-50 rounded-md px-3 py-2">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            PHISHING DETECTED — hindari memasukkan informasi pribadi di situs
            ini.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

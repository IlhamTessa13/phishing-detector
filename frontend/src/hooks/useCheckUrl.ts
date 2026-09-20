import { useState } from "react";
import { checkUrl } from "../services/api";
import type { ScanResult } from "../types/prediction";

export type ScanStatus = "idle" | "scanning" | "done" | "error";

// durasi minimum animasi scanning (ms), biar nggak "kedip" kalau API-nya cepat
const MIN_SCAN_DURATION = 1800;

export function useCheckUrl() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const check = async (url: string) => {
    setStatus("scanning");
    setError(null);
    setResult(null);

    const startTime = performance.now();

    try {
      const [data] = await Promise.all([
        checkUrl(url),
        new Promise((resolve) => setTimeout(resolve, MIN_SCAN_DURATION)),
      ]);

      const elapsed = (performance.now() - startTime) / 1000;
      setResult({ ...data, scanTime: elapsed });
      setStatus("done");
    } catch (err) {
      setError("Gagal menghubungi server. Pastikan backend sudah jalan.");
      setStatus("error");
    }
  };

  return { result, status, error, check };
}

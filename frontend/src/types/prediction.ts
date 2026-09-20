export interface PredictionResponse {
  url: string;
  reachable: boolean;
  prediction: "phishing" | "legitimate" | null;
  confidence: number | null;
  model_used: string | null;
  message: string | null;
}

export interface ScanResult extends PredictionResponse {
  scanTime: number;
}

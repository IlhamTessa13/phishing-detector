import axios from "axios";
import type { PredictionResponse } from "../types/prediction";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const checkUrl = async (url: string): Promise<PredictionResponse> => {
  const response = await axios.post<PredictionResponse>(
    `${API_BASE_URL}/predict`,
    { url },
  );
  return response.data;
};

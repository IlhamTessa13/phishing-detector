import axios from "axios";
import type { PredictionResponse } from "../types/prediction";

const API_BASE_URL = "https://web-phishing-datmin-production.up.railway.app";

export const checkUrl = async (url: string): Promise<PredictionResponse> => {
  const response = await axios.post<PredictionResponse>(
    `${API_BASE_URL}/predict`,
    { url },
  );
  return response.data;
};

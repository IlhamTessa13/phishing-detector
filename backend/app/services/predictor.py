import xgboost as xgb
import lightgbm as lgb
import numpy as np
from pathlib import Path
from app.services.feature_extractor import extract_features, FEATURE_ORDER

MODEL_DIR = Path(__file__).parent.parent / "models"

_xgb_model = xgb.Booster()
_xgb_model.load_model(str(MODEL_DIR / "phishing_xgb.model"))

_lgb_model = lgb.Booster(model_file=str(MODEL_DIR / "phishing_lgbm.txt"))

# label 1 = phishing, label 0 = legitimate


def predict(url: str) -> dict:
    feats = extract_features(url)
    x = np.array([[feats[f] for f in FEATURE_ORDER]], dtype=np.float32)

    prob_xgb = float(_xgb_model.predict(xgb.DMatrix(x, feature_names=FEATURE_ORDER))[0])
    prob_lgb = float(_lgb_model.predict(x)[0])

    prob_phishing = (prob_xgb + prob_lgb) / 2  # probabilitas kelas 1 (phishing)

    if prob_phishing >= 0.5:
        label = "phishing"
        confidence = prob_phishing
    else:
        label = "legitimate"
        confidence = 1 - prob_phishing

    return {
        "prediction": label,
        "confidence": round(confidence, 4),
        "model_used": "xgboost+lightgbm",
    }
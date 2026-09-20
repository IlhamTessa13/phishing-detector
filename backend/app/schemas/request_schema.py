from pydantic import BaseModel
from typing import Optional

class URLRequest(BaseModel):
    url: str

class PredictionResponse(BaseModel):
    url: str
    reachable: bool
    prediction: Optional[str] = None       # None kalau website tidak reachable
    confidence: Optional[float] = None
    model_used: Optional[str] = None
    message: Optional[str] = None          # pesan error kalau tidak reachable
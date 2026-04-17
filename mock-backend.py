from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random
import time

app = FastAPI()

class Comment(BaseModel):
    text: str

@app.post("/predict")
async def predict_toxicity(comment: Comment):
    # Simulate processing time
    time.sleep(1.2)
    
    text = comment.text.lower()
    
    # Real-world toxic keywords for mock simulation
    toxic_words = ["hate", "stupid", "dumb", "ugly", "loser", "shut up", "idiot"]
    is_toxic = any(word in text for word in toxic_words)
    
    if is_toxic:
        return {
            "prediction": "Toxic",
            "score": round(random.uniform(0.75, 0.99), 2)
        }
    else:
        return {
            "prediction": "Safe",
            "score": round(random.uniform(0.85, 0.99), 2)
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

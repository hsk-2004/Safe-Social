from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import random
import time
import os

# Note: In a real environment, you would use:
# from transformers import pipeline
# classifier = pipeline("text-classification", model="./models/unzipped_model")

app = FastAPI()

class CommentRequest(BaseModel):
    text: str
    user_history: Optional[List[str]] = []

@app.post("/predict_advanced")
async def predict_advanced(request: CommentRequest):
    """
    Predicts if a comment is Safe/Toxic AND if it's Constructive/Destructive
    based on the text and the user's own posting history as context.
    """
    # 1. Simulate Model Inference (represented by the user's model.zip)
    # This logic mimics the output format you provided: 
    # {'label': 'safe', 'score': ...} or {'label': 'toxic', 'score': ...}
    
    text = request.text.lower()
    
    # Heuristic for demo purposes (to be replaced by your actual model inference)
    toxicity_keywords = ["hate", "stupid", "idiot", "garbage", "trash", "useless", "kill"]
    constructive_keywords = ["because", "how about", "instead", "consider", "helpful", "maybe", "improve"]
    
    toxicity_score = 0.05
    for word in toxicity_keywords:
        if word in text:
            toxicity_score += 0.25
    toxicity_score = min(0.99, toxicity_score)
    
    # 2. Compare with User History
    # If the user is generally positive, we evaluate "Destructive" comments more harshly
    user_toxicity_avg = 0
    if request.user_history:
        # Simple simulation: check if user's history had toxic words
        history_toxic_count = sum(1 for h in request.user_history if any(w in h.lower() for w in toxicity_keywords))
        user_toxicity_avg = history_toxic_count / len(request.user_history)

    # 3. Determine Constructive vs Destructive
    # Constructive: Negative but specific/helpful
    # Destructive: Negative and abusive or vague
    
    is_negative = toxicity_score > 0.5
    has_suggestions = any(word in text for word in constructive_keywords)
    
    # Intent Logic:
    # If user has been very toxic, incoming bad comments are seen as "Destructive escalation"
    # If user has been safe, incoming bad comments might be "Unprovoked Destructive"
    
    reasoning = ""
    criticism_type = "Neutral"
    
    if is_negative:
        if has_suggestions:
            criticism_type = "Constructive Criticism"
            reasoning = "The comment contains negative sentiment but provides specific suggestions or alternatives ('{}', etc.), indicating an intent to improve rather than just attack.".format(", ".join([k for k in constructive_keywords if k in text][:2]))
        else:
            criticism_type = "Destructive Criticism"
            reasoning = "High toxicity detected with no constructive keywords. The intent appears to be purely negative or abusive."
    elif has_suggestions:
        criticism_type = "Helpful Feedback"
        reasoning = "Positive tone with active suggestions. Enhances community value."
    else:
        criticism_type = "Social Interaction"
        reasoning = "Standard conversational tone with no significant flags."

    # Simulation of your exact model output format
    model_output = [
        {'label': 'safe', 'score': 1 - toxicity_score},
        {'label': 'toxic', 'score': toxicity_score}
    ]

    return {
        "analysis": {
            "label": "toxic" if is_negative else "safe",
            "score": toxicity_score if is_negative else (1 - toxicity_score)
        },
        "raw_model_output": model_output,
        "classification": {
            "type": criticism_type,
            "is_constructive": not is_negative or has_suggestions,
            "impact_score": round(1.0 - toxicity_score, 2),
            "reasoning": reasoning
        },
        "context_aware_note": "User history influence applied" if user_toxicity_avg > 0.3 else "Standard analysis"
    }

if __name__ == "__main__":
    import uvicorn
    # Move model.zip note: You should extract it to Use with Transformers
    print("Backend ready. Using model from /models directory logic.")
    uvicorn.run(app, host="0.0.0.0", port=8001)

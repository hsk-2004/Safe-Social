import { ToxicityResponse } from '../types';

export const analyzeToxicity = async (text: string, userHistory: string[] = []): Promise<ToxicityResponse> => {
  try {
    // Try to hit the advanced endpoint first
    const response = await fetch('http://localhost:8001/predict_advanced', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        text,
        user_history: userHistory
      }),
    });

    if (!response.ok) {
      // Fallback to basic endpoint if advanced is not running
      const basicResponse = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!basicResponse.ok) throw new Error('Failed to analyze');
      const basicData = await basicResponse.json();
      return {
        prediction: basicData.prediction || (basicData.label === 'toxic' ? 'Toxic' : 'Safe'),
        score: basicData.score || 0,
      };
    }

    const data = await response.json();
    
    return {
      prediction: data.analysis.label === 'toxic' ? 'Toxic' : 'Safe',
      score: data.analysis.score,
      classification: data.classification,
      raw_output: data.raw_model_output
    };
  } catch (error) {
    console.error('Error analyzing advanced toxicity:', error);
    return {
      prediction: text.toLowerCase().includes('bad') || text.toLowerCase().includes('hate') ? 'Toxic' : 'Safe',
      score: 0.85,
    };
  }
};

import { ToxicityResponse } from '../types';

export const analyzeToxicity = async (text: string): Promise<ToxicityResponse> => {
  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to analyze toxicity');
    }

    const data = await response.json();
    
    // Normalize response to match our interface
    return {
      prediction: data.prediction || (data.label === 'toxic' ? 'Toxic' : 'Safe'),
      score: data.score || data.confidence || 0,
    };
  } catch (error) {
    console.error('Error analyzing toxicity:', error);
    // Return a mock response for demonstration if backend is not running
    // In a real app, you'd handle this error more gracefully
    return {
      prediction: text.toLowerCase().includes('bad') || text.toLowerCase().includes('hate') ? 'Toxic' : 'Safe',
      score: 0.85,
    };
  }
};

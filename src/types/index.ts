export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  isToxic?: boolean;
  score?: number;
}

export interface Post {
  id: string;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface ToxicityResponse {
  prediction: 'Toxic' | 'Safe';
  score: number;
  classification?: {
    type: string;
    is_constructive: boolean;
    impact_score: number;
    reasoning?: string;
  };
  raw_output?: any;
}

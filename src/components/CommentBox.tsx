'use client';

import React, { useState } from 'react';
import { Send, Loader2, RefreshCw } from 'lucide-react';
import { analyzeToxicity } from '../services/toxicity';
import { ResultBadge } from './ResultBadge';

interface CommentBoxProps {
  onAddComment: (text: string, isToxic: boolean, score: number) => void;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ onAddComment }) => {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: 'Toxic' | 'Safe'; score: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await analyzeToxicity(comment);
      setResult(response);

      // We only add the comment if it's safe, or maybe we add it with a warning?
      // For this app, let's keep it in the "analyzed" state before final submission
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmPost = () => {
    if (result) {
      onAddComment(comment, result.prediction === 'Toxic', result.score);
      setComment('');
      setResult(null);
    }
  };

  return (
    <div className="space-y-3 p-4 bg-slate-50 border-t border-slate-100">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (result) setResult(null);
          }}
          disabled={isLoading}
          placeholder="Add a comment..."
          className="w-full pl-4 pr-12 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!comment.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-sky-600 hover:text-sky-700 disabled:text-slate-400 transition-colors"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>

      {result && (
        <div className={`p-3 rounded-xl border animate-in slide-in-from-top-2 duration-300 ${
          result.prediction === 'Toxic' 
            ? 'bg-rose-50 border-rose-100' 
            : 'bg-emerald-50 border-emerald-100'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <ResultBadge prediction={result.prediction} score={result.score} />
            <button 
              onClick={() => setResult(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          <p className={`text-xs mb-3 ${
            result.prediction === 'Toxic' ? 'text-rose-600 font-medium' : 'text-emerald-600 font-medium'
          }`}>
            {result.prediction === 'Toxic' 
              ? '⚠️ This comment may be harmful. Consider rewriting in a respectful way.' 
              : '✅ This comment looks safe to post.'}
          </p>

          <button
            onClick={confirmPost}
            className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
              result.prediction === 'Toxic'
                ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                : 'bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-200'
            }`}
          >
            {result.prediction === 'Toxic' ? 'Post Anyway' : 'Post Comment'}
          </button>
        </div>
      )}
    </div>
  );
};

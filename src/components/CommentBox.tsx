'use client';

import React, { useState } from 'react';
import { Send, Loader2, RefreshCw } from 'lucide-react';
import { analyzeToxicity } from '../services/toxicity';
import { ResultBadge } from './ResultBadge';
import { MOCK_POSTS } from '../data/posts';
import { ToxicityResponse } from '../types';

interface CommentBoxProps {
  onAddComment: (text: string, isToxic: boolean, score: number) => void;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ onAddComment }) => {
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ToxicityResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);

    try {
      // Gather user's history from mock data
      const userHistory = MOCK_POSTS
        .flatMap(p => p.comments)
        .filter(c => c.username === 'xhskx')
        .map(c => c.text);

      const response = await analyzeToxicity(comment, userHistory);
      setResult(response);
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
          
          {result.classification && (
            <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
              result.classification.is_constructive ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {result.classification.type}
            </div>
          )}

          <p className={`text-xs mb-3 ${
            result.prediction === 'Toxic' ? 'text-rose-600 font-medium' : 'text-emerald-600 font-medium'
          }`}>
            {result.prediction === 'Toxic' 
              ? (result.classification?.is_constructive 
                  ? '⚠️ Critical but constructive. Try to soften the delivery.' 
                  : '❌ Destructive comment detected. This will be flagged.')
              : '✅ This comment looks safe and helpful.'}
          </p>

          {/* AI Explanation & Raw Scores */}
          <div className="bg-white/50 rounded-lg p-3 border border-slate-100 mb-3 space-y-2">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex justify-between items-center">
              <span>Model Confidence Breakdown</span>
              <span className="bg-slate-100 text-slate-600 px-1 rounded">Raw Inference</span>
            </div>
            <div className="flex gap-4">
              {result.raw_output?.map((out: any, i: number) => (
                <div key={i} className="flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-slate-600 capitalize">{out.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${out.label === 'toxic' ? 'bg-rose-400' : 'bg-emerald-400'}`} 
                        style={{ width: `${out.score * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{(out.score * 100).toFixed(2)}%</span>
                      <span className="text-[7px] font-mono text-slate-300">Raw: {out.score.toFixed(6)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {result.classification?.reasoning && (
              <div className="mt-2 text-[10px] text-slate-500 leading-relaxed border-t border-slate-50 pt-2">
                <span className="font-bold text-slate-700">AI Reasoning:</span> {result.classification.reasoning}
              </div>
            )}
          </div>

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

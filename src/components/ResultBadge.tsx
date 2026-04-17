import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResultBadgeProps {
  prediction: 'Toxic' | 'Safe' | null;
  score: number;
}

export const ResultBadge: React.FC<ResultBadgeProps> = ({ prediction, score }) => {
  if (!prediction) return null;

  const isToxic = prediction === 'Toxic';
  const percentage = Math.round(score * 100);

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 animate-in fade-in zoom-in',
        isToxic
          ? 'bg-rose-100 text-rose-700 border border-rose-200'
          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
      )}
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-2">
          {isToxic ? (
            <AlertTriangle className="w-3.5 h-3.5" />
          ) : (
            <ShieldCheck className="w-3.5 h-3.5" />
          )}
          <span>
            {prediction}: {percentage}% Confidence
          </span>
        </div>
        <div className="w-full h-1 bg-white/50 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full transition-all duration-1000 ease-out",
              isToxic ? "bg-rose-500" : "bg-emerald-500"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { MOCK_POSTS } from '@/data/posts';
import { Comment, Post } from '@/types';
import { 
  BarChart3, 
  MessageSquare, 
  ThumbsUp, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  User,
  ArrowRight
} from 'lucide-react';
import { ResultBadge } from '@/components/ResultBadge';
import Link from 'next/link';

export default function DashboardPage() {
  const currentUser = 'xhskx';

  // Comments sent by the user on other posts
  const sentComments: { comment: Comment; post: Post }[] = [];
  // Comments received by the user on their own posts
  const receivedComments: { comment: Comment; post: Post }[] = [];

  MOCK_POSTS.forEach(post => {
    post.comments.forEach(comment => {
      if (comment.username === currentUser && post.username !== currentUser) {
        sentComments.push({ comment, post });
      }
      if (post.username === currentUser && comment.username !== currentUser) {
        receivedComments.push({ comment, post });
      }
    });
  });

  const stats = {
    totalSent: sentComments.length,
    sentToxic: sentComments.filter(c => c.comment.isToxic).length,
    totalReceived: receivedComments.length,
    receivedToxic: receivedComments.filter(c => c.comment.isToxic).length,
    sentSentiment: (sentComments.reduce((acc, c) => acc + (1 - (c.comment.score || 0)), 0) / (sentComments.length || 1) * 100).toFixed(1),
    receivedSentiment: (receivedComments.reduce((acc, c) => acc + (1 - (c.comment.score || 0)), 0) / (receivedComments.length || 1) * 100).toFixed(1),
  };

  const sentPositive = stats.totalSent - stats.sentToxic;
  const receivedPositive = stats.totalReceived - stats.receivedToxic;

  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-12">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
            Social Moderation Dashboard
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Analyze your social interactions and AI moderation impact.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Sent" 
            value={stats.totalSent} 
            icon={<MessageSquare className="w-6 h-6 text-indigo-600" />}
            subtitle="Comments you posted"
            color="bg-indigo-50"
          />
          <StatCard 
            title="Communication Index" 
            value={`${stats.sentSentiment}%`} 
            icon={<ThumbsUp className="w-6 h-6 text-emerald-600" />}
            subtitle="Overall kindness score"
            color="bg-emerald-50"
            trend={<TrendingUp className="w-4 h-4 text-emerald-600" />}
          />
          <StatCard 
            title="Toxic Density" 
            value={`${((stats.receivedToxic / (stats.totalReceived || 1)) * 100).toFixed(1)}%`} 
            icon={<AlertTriangle className="w-6 h-6 text-rose-600" />}
            subtitle="Of feedback is flagged"
            color="bg-rose-50"
            trend={<TrendingDown className="w-4 h-4 text-rose-600" />}
          />
          <StatCard 
            title="Profile Health" 
            value={`${stats.receivedSentiment}%`} 
            icon={<User className="w-6 h-6 text-sky-600" />}
            subtitle="Audience vibe score"
            color="bg-sky-50"
          />
        </div>

        {/* Detailed Stats Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Sent Breakdown */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Your Interaction Behavior</h3>
            <div className="flex gap-12 w-full justify-center mb-6">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-emerald-500">{sentPositive}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Positive Sent</span>
              </div>
              <div className="w-[1px] h-12 bg-slate-100"></div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-rose-500">{stats.sentToxic}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Toxic Sent</span>
              </div>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${(sentPositive / (stats.totalSent || 1)) * 100}%` }}></div>
              <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: `${(stats.sentToxic / (stats.totalSent || 1)) * 100}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium italic">
              {stats.sentToxic > 0 ? "⚠️ Some of your recent comments were flagged as aggressive." : "✨ You're maintaining a very positive community presence!"}
            </p>
          </div>

          {/* Received Breakdown */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Your Profile Health</h3>
            <div className="flex gap-12 w-full justify-center mb-6">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-blue-500">{receivedPositive}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Positive Received</span>
              </div>
              <div className="w-[1px] h-12 bg-slate-100"></div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-orange-500">{stats.receivedToxic}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">Toxic Received</span>
              </div>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="bg-blue-500 h-full transition-all duration-1000" style={{ width: `${(receivedPositive / (stats.totalReceived || 1)) * 100}%` }}></div>
              <div className="bg-orange-500 h-full transition-all duration-1000" style={{ width: `${(stats.receivedToxic / (stats.totalReceived || 1)) * 100}%` }}></div>
            </div>
             <p className="text-xs text-slate-500 mt-4 font-medium italic">
              {stats.receivedToxic > 5 ? "🛡️ High moderation activity on your profile today." : "✅ Your profile atmosphere is currently stable."}
            </p>

            {/* Criticism Distribution */}
            <div className="mt-8 w-full">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-widest">
                <span>Criticism Type</span>
                <span>Distribution</span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Constructive</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[72%]"></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Destructive</span>
                    <span>28%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full w-[28%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sent Comments Analysis */}
          <section className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">Your Activity</h2>
              <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full font-bold uppercase tracking-wider">Sent</span>
            </div>
            
            <div className="space-y-6">
              {sentComments.length > 0 ? (
                sentComments.map(({ comment, post }) => (
                  <CommentRow key={comment.id} comment={comment} post={post} type="sent" />
                ))
              ) : (
                <EmptyState text="You haven't posted any comments yet." />
              )}
            </div>
          </section>

          {/* Received Comments Analysis */}
          <section className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">People's Reactions</h2>
              <span className="text-xs px-2.5 py-1 bg-indigo-100 text-indigo-600 rounded-full font-bold uppercase tracking-wider">Received</span>
            </div>

            <div className="space-y-6">
              {receivedComments.length > 0 ? (
                receivedComments.map(({ comment, post }) => (
                  <CommentRow key={comment.id} comment={comment} post={post} type="received" />
                ))
              ) : (
                <EmptyState text="No one has commented on your posts yet." />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, subtitle, color, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow group">
      <div className={`p-3 rounded-2xl ${color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-slate-500 text-sm font-semibold">{title}</h3>
      <div className="flex items-end gap-2 mt-1">
        <span className="text-3xl font-black text-slate-900">{value}</span>
        {trend && <span>{trend}</span>}
      </div>
      <p className="text-[11px] text-slate-400 mt-2 font-bold uppercase tracking-wider">{subtitle}</p>
    </div>
  );
}

function CommentRow({ comment, post, type }: { comment: Comment; post: Post; type: 'sent' | 'received' }) {
  return (
    <div className="group border-b border-slate-50 pb-6 last:border-0 hover:bg-slate-50/50 p-2 rounded-xl transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
               <Image 
                src={type === 'sent' ? post.userAvatar : `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`} 
                alt="Avatar" 
                fill 
                className="object-cover" 
              />
            </div>
            <span className="text-xs font-bold text-slate-900 cursor-pointer hover:text-indigo-600">
              {type === 'sent' ? `On @${post.username}'s post` : `@${comment.username} commented`}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">• {comment.timestamp}</span>
          </div>
          
          <p className={`text-sm leading-relaxed mb-3 ${comment.isToxic ? 'text-rose-600 font-medium italic' : 'text-slate-700'}`}>
            "{comment.text}"
          </p>

          {/* Model Breakdown In Dashboard */}
          <div className="bg-slate-50 rounded-lg p-2.5 space-y-2 border border-slate-100">
            <div className="flex gap-4">
              {(comment as any).raw_output?.map((out: any, i: number) => (
                <div key={i} className="flex-1">
                  <div className="flex justify-between text-[7px] font-bold text-slate-500 uppercase mb-1">
                    <span>{out.label}</span>
                    <span>{out.score.toFixed(5)}</span>
                  </div>
                  <div className="w-full h-1 bg-white rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${out.label === 'toxic' ? 'bg-rose-400' : 'bg-emerald-400'}`} 
                      style={{ width: `${out.score * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {(comment as any).reasoning && (
              <p className="text-[10px] text-slate-500 italic leading-tight border-t border-white pt-2">
                <span className="font-bold text-slate-600">AI Logic:</span> {(comment as any).reasoning}
              </p>
            )}
          </div>
        </div>
        {comment.isToxic && (
          <div className="scale-75 origin-right">
             <ResultBadge prediction="Toxic" score={comment.score || 0} />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between px-1">
         <Link href={`/post/${post.id}`} className="text-[10px] items-center gap-1 flex text-indigo-600 font-bold hover:underline">
          View Post <ArrowRight className="w-3 h-3" />
        </Link>
        {!comment.isToxic && (
          <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md font-bold border border-emerald-100">SAFE</span>
        )}
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
      <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
      <p className="font-medium">{text}</p>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { MOCK_POSTS } from '@/data/posts';
import { Post, Comment } from '@/types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, ChevronLeft, Share2 } from 'lucide-react';
import { CommentBox } from '@/components/CommentBox';
import { ResultBadge } from '@/components/ResultBadge';

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const foundPost = MOCK_POSTS.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      setComments(foundPost.comments);
      setLikes(foundPost.likes);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-indigo-600 font-medium">Loading post...</div>
      </div>
    );
  }

  const handleAddComment = (text: string, isToxic: boolean, score: number) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      username: 'xhskx',
      text,
      timestamp: 'Just now',
      isToxic,
      score,
    };
    setComments([...comments, newComment]);
  };

  const toggleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-12">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors mb-6 group"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Back</span>
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row min-h-[600px]">
          {/* Post Image Section */}
          <div className="md:w-3/5 bg-black relative flex items-center justify-center">
            <Image
              src={post.image}
              alt={post.caption}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Post Interaction Section */}
          <div className="md:w-2/5 flex flex-col border-l border-slate-100">
            {/* User Header */}
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-50">
                  <Image 
                    src={post.userAvatar} 
                    alt={post.username} 
                    fill 
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{post.username}</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Follow</p>
                </div>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Comments Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {/* Post Caption */}
              <div className="flex gap-3 mb-6">
                <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                  <Image src={post.userAvatar} alt={post.username} fill unoptimized className="object-cover" />
                </div>
                <div>
                  <p className="text-sm text-slate-800">
                    <span className="font-bold mr-2">{post.username}</span>
                    {post.caption}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">{post.timestamp}</p>
                </div>
              </div>

              {/* Dummy Comments */}
              <div className="space-y-5">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-slate-100">
                      <Image 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`} 
                        alt={comment.username} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm">
                          <span className="font-bold text-slate-900 mr-2">{comment.username}</span>
                          <span className={`text-slate-700 ${comment.isToxic ? 'bg-rose-50 text-rose-900 px-1.5 py-0.5 rounded-md border border-rose-100' : ''}`}>
                            {comment.text}
                          </span>
                        </div>
                        {comment.isToxic && (
                          <div className="flex flex-col items-end gap-1 mb-2">
                            <ResultBadge prediction="Toxic" score={comment.score || 0} />
                            <span className={`text-[8px] font-bold uppercase px-1 rounded ${
                              comment.text.length > 30 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {comment.text.length > 30 ? 'Constructive' : 'Destructive'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Score Breakdown & Reasoning */}
                      <div className="bg-slate-50/50 rounded-lg p-2 border border-slate-100 mt-1 space-y-1">
                        <div className="flex gap-3">
                          {(comment as any).raw_output?.map((out: any, i: number) => (
                            <div key={i} className="flex-1 flex items-center gap-1.5 font-mono text-[7px] font-bold text-slate-400">
                              <span className="capitalize">{out.label}:</span>
                              <div className="flex-1 h-0.5 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${out.label === 'toxic' ? 'bg-rose-400' : 'bg-emerald-400'}`} 
                                  style={{ width: `${out.score * 100}%` }}
                                ></div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-[7px] text-slate-400">{(out.score * 100).toFixed(1)}%</span>
                                <span className="text-[5px] text-slate-300 font-mono">({out.score.toFixed(4)})</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {(comment as any).reasoning && (
                          <p className="text-[9px] text-slate-400 leading-tight">
                            <span className="text-slate-500 font-bold">Logic:</span> {(comment as any).reasoning}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{comment.timestamp}</p>
                        <button className="text-[10px] text-slate-500 font-bold hover:text-slate-800">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-50 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={toggleLike}
                    className={`transition-all duration-300 transform active:scale-125 ${isLiked ? 'text-rose-500' : 'text-slate-700 hover:text-slate-400'}`}
                  >
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="text-slate-700 hover:text-slate-400">
                    <MessageCircle className="w-6 h-6" />
                  </button>
                  <button className="text-slate-700 hover:text-slate-400">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
                <button className="text-slate-700 hover:text-slate-400">
                  <Bookmark className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold text-slate-900">{likes.toLocaleString()} likes</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">{post.timestamp}</p>
              </div>

              {/* Input Area */}
              <div className="-mx-4 -mb-4 border-t border-slate-100">
                <CommentBox onAddComment={handleAddComment} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

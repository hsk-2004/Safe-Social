'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post, Comment } from '../types';
import { CommentBox } from './CommentBox';
import { ResultBadge } from './ResultBadge';

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, priority = false }) => {
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddComment = (text: string, isToxic: boolean, score: number) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      username: 'current_user',
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
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100">
            <Image 
              src={post.userAvatar} 
              alt={post.username} 
              fill 
              unoptimized
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{post.username}</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Image */}
      <Link href={`/post/${post.id}`} className="relative aspect-square w-full bg-slate-100 overflow-hidden block">
        <Image
          src={post.image}
          alt="Post content"
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 448px"
          className="object-cover hover:scale-105 transition-transform duration-700"
        />
      </Link>

      {/* Interactions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLike}
              className={`transition-all duration-300 ${isLiked ? 'text-rose-500 scale-110' : 'text-slate-700 hover:text-slate-400'}`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <Link href={`/post/${post.id}`} className="text-slate-700 hover:text-slate-400">
              <MessageCircle className="w-6 h-6" />
            </Link>
            <button className="text-slate-700 hover:text-slate-400">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button className="text-slate-700 hover:text-slate-400">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        {/* Likes & Caption */}
        <div className="space-y-1 mb-4">
          <p className="text-sm font-bold text-slate-900">{likes.toLocaleString()} likes</p>
          <p className="text-sm text-slate-800">
            <span className="font-bold mr-2">{post.username}</span>
            {post.caption}
          </p>
        </div>

        {/* Comments Section */}
        <div className="space-y-3 pb-2 max-h-48 overflow-y-auto no-scrollbar">
          {comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-1 animae-in fade-in duration-500">
              <div className="flex items-start justify-between gap-2 group">
                <div className="text-sm">
                  <span className="font-bold text-slate-900 mr-2">{comment.username}</span>
                  <span className={`text-slate-700 ${comment.isToxic ? 'bg-rose-50 text-rose-900 px-1 rounded' : ''}`}>
                    {comment.text}
                  </span>
                </div>
                {comment.isToxic && (
                  <span title="Toxic comment detected" className="flex-shrink-0">
                    <ResultBadge prediction="Toxic" score={comment.score || 0} />
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400">{comment.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <CommentBox onAddComment={handleAddComment} />
    </div>
  );
};

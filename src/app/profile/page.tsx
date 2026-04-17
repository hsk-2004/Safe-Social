import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { MOCK_POSTS } from '@/data/posts';
import { Grid, Bookmark, User, Settings, MapPin, Link as LinkIcon } from 'lucide-react';

export default function ProfilePage() {
  // Simulate user statistics
  const stats = {
    posts: MOCK_POSTS.length,
    followers: '12.4K',
    following: '842'
  };

  // Profile data
  const profile = {
    name: 'Harman Singh',
    username: 'xhskx',
    bio: 'AI researcher & Social Tech enthusiast 🤖✨ Building safe digital spaces with local moderation models.',
    location: 'India',
    website: 'github.com/harsh-khan',
    photo: '/WhatsApp Image 2026-04-17 at 9.47.45 AM.jpeg'
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-10">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <header className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 mb-12 py-8">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-indigo-100 shadow-xl ring-4 ring-white">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 128px, 160px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <h1 className="text-2xl font-light text-slate-900">{profile.username}</h1>
              <div className="flex gap-2">
                <button className="px-5 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm">
                  Edit Profile
                </button>
                <button className="p-1.5 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors shadow-sm">
                  <Settings className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-10 mb-6 border-y md:border-none py-4 md:py-0 border-slate-200">
              <div className="flex flex-col md:flex-row items-center gap-1">
                <span className="font-bold text-slate-900">{stats.posts}</span>
                <span className="text-slate-500 text-sm">posts</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-1">
                <span className="font-bold text-slate-900">{stats.followers}</span>
                <span className="text-slate-500 text-sm">followers</span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-1">
                <span className="font-bold text-slate-900">{stats.following}</span>
                <span className="text-slate-500 text-sm">following</span>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="font-bold text-slate-900">{profile.name}</h2>
              <p className="text-slate-700 leading-relaxed max-w-md">{profile.bio}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </div>
                <div className="flex items-center gap-1 text-indigo-600 font-medium">
                  <LinkIcon className="w-3.5 h-3.5" />
                  {profile.website}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Profile Tabs */}
        <div className="border-t border-slate-200">
          <div className="flex justify-center gap-16">
            <button className="flex items-center gap-2 py-4 border-t border-slate-900 -mt-[1px] text-xs font-bold uppercase tracking-widest text-slate-900 transition-all">
              <Grid className="w-4 h-4" />
              Posts
            </button>
            <button className="flex items-center gap-2 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">
              <Bookmark className="w-4 h-4" />
              Saved
            </button>
            <button className="flex items-center gap-2 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">
              <User className="w-4 h-4" />
              Tagged
            </button>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-3 gap-0.5 md:gap-8 py-8">
            {MOCK_POSTS.map((post) => (
              <div key={post.id} className="relative aspect-square group cursor-pointer overflow-hidden rounded-md md:rounded-xl">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 768px) 33vw, 290px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                  <div className="flex items-center gap-2">
                    <span>❤️</span> {post.likes}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💬</span> {post.comments.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

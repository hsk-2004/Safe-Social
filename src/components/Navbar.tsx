import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, PlusSquare, Heart, Camera, BarChart3 } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-2xl mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Camera className="w-7 h-7 text-slate-900" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent hidden sm:block">
            Social AI
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/">
            <Home className="w-6 h-6 text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors" />
          </Link>
          <Search className="w-6 h-6 text-slate-900 cursor-pointer hidden sm:block" />
          <PlusSquare className="w-6 h-6 text-slate-900 cursor-pointer" />
          <Heart className="w-6 h-6 text-slate-900 cursor-pointer" />
          <Link href="/dashboard">
            <BarChart3 className="w-6 h-6 text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors" />
          </Link>
          <Link href="/profile">
            <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 cursor-pointer hover:ring-2 ring-indigo-500 ring-offset-2 transition-all overflow-hidden relative">
              <Image 
                src="/WhatsApp Image 2026-04-17 at 9.47.45 AM.jpeg" 
                alt="My Profile" 
                fill 
                sizes="28px"
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

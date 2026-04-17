import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, PlusSquare, Heart } from 'lucide-react';

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 md:hidden flex items-center justify-around px-4">
      <Link href="/" className="hover:scale-110 transition-transform">
        <Home className="w-6 h-6 text-slate-900" />
      </Link>
      <Link href="#" className="hover:scale-110 transition-transform">
        <Search className="w-6 h-6 text-slate-900" />
      </Link>
      <Link href="#" className="hover:scale-110 transition-transform">
        <PlusSquare className="w-7 h-7 text-slate-900" />
      </Link>
      <Link href="#" className="hover:scale-110 transition-transform text-slate-600">
        <Heart className="w-6 h-6 text-slate-900" />
      </Link>
      <Link href="/profile" className="hover:scale-110 transition-transform">
        <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 overflow-hidden relative">
          <Image 
            src="/WhatsApp Image 2026-04-17 at 9.47.45 AM.jpeg" 
            alt="My Profile" 
            fill 
            sizes="28px"
            className="object-cover"
          />
        </div>
      </Link>
    </nav>
  );
};

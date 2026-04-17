import { Navbar } from '@/components/Navbar';
import { PostCard } from '@/components/PostCard';
import { MOCK_POSTS, MOCK_STORIES } from '@/data/posts';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-20 md:pb-10">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Left Side: Feed */}
        <div className="flex-1 max-w-xl mx-auto md:mx-0 w-full">
          {/* Story Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 overflow-hidden">
            <div className="flex gap-4 overflow-x-auto no-scrollbar items-start">
              {MOCK_STORIES.map((story) => (
                <div key={story.id} className="flex-shrink-0 flex flex-col items-center gap-1.5 group cursor-pointer w-16">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 transition-transform group-hover:scale-105 active:scale-95">
                    <div className="w-full h-full rounded-full bg-white p-[2px]">
                      <div className="relative w-full h-full rounded-full bg-slate-100 border border-slate-100 overflow-hidden">
                        <Image 
                          src={story.avatar} 
                          alt={story.username} 
                          fill 
                          unoptimized
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium truncate w-full text-center">
                    {story.username}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {MOCK_POSTS.map((post, index) => (
              <PostCard key={post.id} post={post} priority={index === 0} />
            ))}
          </div>
        </div>

        {/* Right Side: Sidebar (Desktop Only) */}
        <aside className="hidden lg:block w-80 space-y-6 sticky top-24 h-fit">
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 relative">
                <Image src="/WhatsApp Image 2026-04-17 at 9.47.45 AM.jpeg" alt="Me" fill sizes="48px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">xhskx</p>
                <p className="text-xs text-slate-500">Harman Singh</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-sky-600 hover:text-sky-700">Switch</button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-500">Suggestions for you</span>
              <button className="text-xs font-semibold text-slate-900">See All</button>
            </div>
            {MOCK_STORIES.slice(1, 6).map((story) => (
              <div key={story.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 relative">
                    <Image src={story.avatar} alt={story.username} fill sizes="32px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{story.username}</p>
                    <p className="text-[10px] text-slate-500">Popular</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-sky-600">Follow</button>
              </div>
            ))}
          </div>

          <div className="pt-4 text-[11px] text-slate-300 space-y-4">
            <nav className="flex flex-wrap gap-x-2 gap-y-1">
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Help</a>
              <a href="#" className="hover:underline">Press</a>
              <a href="#" className="hover:underline">API</a>
              <a href="#" className="hover:underline">Jobs</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
            </nav>
            <p className="uppercase">© 2026 SOCIAL AI FROM HARMAN</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

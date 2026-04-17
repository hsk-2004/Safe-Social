import { Post, Comment } from '../types';

const generateMockPosts = (count: number): Post[] => {
  const posts: Post[] = [
    {
      id: '1',
      username: 'wanderlust_jane',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      image: '/travel.png',
      caption: 'Chasing sunsets in Amalfi Coast 🌅✨ No filter needed for this beauty.',
      likes: 1240,
      timestamp: '2 hours ago',
      comments: [
        {
          id: 'c1',
          username: 'traveler_sam',
          text: 'This looks absolutely stunning! Adding to my bucket list.',
          timestamp: '1 hour ago',
          isToxic: false,
          score: 0.99
        }
      ]
    },
    {
      id: '2',
      username: 'minimal_arch',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arch',
      image: '/arch.png',
      caption: 'Lines and shadows. The beauty of brutalist architecture. 🏢📐 #minimalism',
      likes: 856,
      timestamp: '5 hours ago',
      comments: [
        {
          id: 'c-manual-1',
          username: 'hater_01',
          text: 'This architecture is boring and ugly. Stop posting this garbage.',
          timestamp: '3 hours ago',
          isToxic: true,
          score: 0.92
        }
      ]
    },
    {
      id: '3',
      username: 'cafe_vibes',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cafe',
      image: '/cafe.png',
      caption: 'The perfect spot for a Sunday afternoon. ☕️🌿 What is your favorite coffee order?',
      likes: 2105,
      timestamp: 'Yesterday',
      comments: [
        {
          id: 'c2',
          username: 'coffee_lover',
          text: 'Latte art is on point! 😍',
          timestamp: '20 hours ago',
          isToxic: false,
          score: 0.98
        }
      ]
    }
  ];

  const genericCaptions = [
    "Exploring the hidden gems of the city. 🏙️",
    "Living my best life one day at a time. ✨",
    "Good vibes only! ✌️🌈",
    "Nature is the best medicine. 🍃🏔️",
    "Can't get enough of this view. 😍",
    "Always hungry for more adventure. 🍕🌍",
    "Dreaming of the next getaway. ✈️💭",
    "Small steps in the right direction. 🚶‍♂️💫",
    "Golden hour is my favorite hour. ☀️",
    "Stay curious and keep exploring. 🧐🗺️"
  ];

  const usernames = [
    "alex_explorer", "sarah_pixels", "mike_travels", "emma_designs", 
    "soul_nature", "urban_click", "foodie_gram", "daily_vibe", 
    "pixel_perfect", "dreamer_99", "night_owl", "sunny_days"
  ];

  const positiveComments = [
    "Love this! 🔥",
    "Great shot! Where was this taken?",
    "Amazing work as always.",
    "This is so inspiring ✨",
    "Beautiful colors!",
    "I need to visit this place sometime.",
    "So clean and professional.",
    "Keep it up! 🚀",
    "Absolutely stunning view.",
    "This is exactly what I needed to see today.",
    "The lighting here is just perfect! 📸",
    "Such a vibe! Love the aesthetic. ✨",
    "You always post the best content.",
    "This made my day, thank you for sharing!",
    "Incredible! Is this in Italy?",
    "Wow, just wow. No words. 😍",
    "Definitely saving this for inspo!",
    "Pure magic! ✨🌈",
    "The details in this are insane.",
    "Best post I've seen all week."
  ];

  const toxicComments = [
    "This is literally the worst thing I've ever seen.",
    "Your photography skills are non-existent. Give up. 🤮",
    "Nobody cares about your life. Stop posting.",
    "You look terrible in this shot. Honestly.",
    "Why would you even share this? It's trash.",
    "Total waste of space. Reporting this.",
    "Ugly and pointless. Just like your content.",
    "Delete this account right now. You're embarrassing yourself.",
    "I've seen better content from a literal toddler. 🤡",
    "Stop trying so hard. It's pathetic.",
    "Your content is a cancer to the internet.",
    "Pathetic. Get a real job instead of this crap.",
    "How do you have followers? This is bottom-tier trash.",
    "Kill your account. Please. 💀",
    "Literally nobody asked for this garbage.",
    "You're so desperate for attention it's disgusting."
  ];

  for (let i = 4; i <= count; i++) {
    const username = usernames[i % usernames.length];
    const postComments: Comment[] = [];
    const commentCount = Math.floor(Math.random() * 8) + 4; // 4 to 12 comments per post

    for (let j = 0; j < commentCount; j++) {
      let commentUser = usernames[(i + j + 1) % usernames.length];
      
      // 30% chance the user 'xhskx' commented on this post (if it's not their own)
      const isUserCommenting = Math.random() < 0.3 && (i % 2 !== 0);
      if (isUserCommenting) commentUser = 'xhskx';

      const isNegative = Math.random() < 0.35; // 35% chance of a toxic comment
      
      if (isNegative) {
        const textContent = toxicComments[(i + j) % toxicComments.length];
        const tScore = 0.85 + Math.random() * 0.14;
        const isConstructive = textContent.length > 30;
        postComments.push({
          id: `c-${i}-${j}`,
          username: commentUser,
          text: textContent,
          timestamp: `${j + 1}h ago`,
          isToxic: true,
          score: tScore,
          raw_output: [
            { label: 'safe', score: 1 - tScore },
            { label: 'toxic', score: tScore }
          ],
          reasoning: isConstructive 
            ? "Comment contains toxic sentiment but provides enough detail to be considered constructive criticism."
            : "High toxicity detected with purely negative intent and no helpful suggestions."
        } as any);
      } else {
        const textContent = positiveComments[(i + j) % positiveComments.length];
        const sScore = 0.85 + Math.random() * 0.14;
        postComments.push({
          id: `c-${i}-${j}`,
          username: commentUser,
          text: textContent,
          timestamp: `${j + 1}h ago`,
          isToxic: false,
          score: sScore,
          raw_output: [
            { label: 'safe', score: sScore },
            { label: 'toxic', score: 1 - sScore }
          ],
          reasoning: "Normal conversational tone with positive sentiment."
        } as any);
      }
    }

    posts.push({
      id: i.toString(),
      username: i % 2 === 0 ? 'xhskx' : `${username}_${i}`,
      userAvatar: i % 2 === 0 ? '/WhatsApp Image 2026-04-17 at 9.47.45 AM.jpeg' : `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}${i}`,
      image: `https://picsum.photos/seed/${i + 100}/800/800`,
      caption: genericCaptions[i % genericCaptions.length],
      likes: Math.floor(Math.random() * 5000),
      timestamp: `${i} hours ago`,
      comments: postComments
    });
  }

  return posts;
};

export const MOCK_POSTS = generateMockPosts(30);

export const MOCK_STORIES = [
  { id: 1, username: 'your_story', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You' },
  { id: 2, username: 'jane_travels', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: 3, username: 'arc_builder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arch' },
  { id: 4, username: 'coffee_bean', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cafe' },
  { id: 5, username: 'pixels_art', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pixel' },
  { id: 6, username: 'hiking_pro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hike' },
  { id: 7, username: 'dusk_skies', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sky' },
  { id: 8, username: 'chef_master', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chef' },
];

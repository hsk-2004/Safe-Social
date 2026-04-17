import { Post } from '../types';

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
      comments: []
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

  for (let i = 4; i <= count; i++) {
    const username = usernames[i % usernames.length];
    posts.push({
      id: i.toString(),
      username: `${username}_${i}`,
      userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}${i}`,
      image: `https://picsum.photos/seed/${i + 100}/800/800`,
      caption: genericCaptions[i % genericCaptions.length],
      likes: Math.floor(Math.random() * 5000),
      timestamp: `${i} hours ago`,
      comments: []
    });
  }

  return posts;
};

export const MOCK_POSTS = generateMockPosts(20);

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

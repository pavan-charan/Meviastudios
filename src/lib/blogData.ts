export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Creator Intelligence in 2026",
    excerpt: "Discover how AI and data analytics are revolutionizing the way brands and agencies manage their creator ecosystems.",
    date: "May 10, 2026",
    readTime: "5 min read",
    category: "Industry Trends",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    slug: "future-of-creator-intelligence-2026",
  },
  {
    id: "2",
    title: "Scaling Your Creator Marketing from 10 to 1000",
    excerpt: "Learn the exact strategies and systems needed to scale your influencer marketing efforts without operational chaos.",
    date: "May 05, 2026",
    readTime: "8 min read",
    category: "Strategy",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    slug: "scaling-creator-marketing",
  },
  {
    id: "3",
    title: "Why ROI Tracking is Broken (And How to Fix It)",
    excerpt: "Stop relying on vanity metrics. Here is how modern brands accurately measure the true ROI of their creator campaigns.",
    date: "April 28, 2026",
    readTime: "6 min read",
    category: "Analytics",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000",
    slug: "fixing-roi-tracking",
  },
  {
    id: "4",
    title: "Building Authentic Relationships with Creators",
    excerpt: "Move beyond transactional deals and build long-term, authentic partnerships that drive real engagement.",
    date: "April 15, 2026",
    readTime: "4 min read",
    category: "Partnerships",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000",
    slug: "building-authentic-relationships",
  },
  {
    id: "5",
    title: "The Ultimate Guide to Creator Payouts & Compliance",
    excerpt: "Navigate the complex world of international payments, tax compliance, and automated workflows for creators.",
    date: "April 02, 2026",
    readTime: "10 min read",
    category: "Operations",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
    slug: "guide-to-creator-payouts",
  },
  {
    id: "6",
    title: "Leveraging Micro-Influencers for Maximum Impact",
    excerpt: "Why smaller audiences often lead to higher conversion rates, and how to identify the right micro-creators.",
    date: "March 20, 2026",
    readTime: "7 min read",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1000",
    slug: "leveraging-micro-influencers",
  }
];

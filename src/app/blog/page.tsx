import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Insights & Strategies | Mevia Blog",
  description: "Discover the latest trends, strategies, and insights on creator intelligence, influencer marketing, and ROI tracking.",
  openGraph: {
    title: "Mevia Blog - Creator Intelligence & Marketing Strategies",
    description: "Read the latest articles on how to scale your creator marketing and track true ROI with Mevia.",
    type: "website",
    url: "https://mevia.com/blog", // Placeholder URL
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-bg-primary pt-32 pb-24 px-4 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight text-white">
            The Intelligence <br />
            <span className="text-gradient">Journal</span>
          </h1>
          <p className="text-xl text-text-secondary">
            Master the creator economy with our latest research, strategies, and operational guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
              <article className="glass border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-1">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md border border-white/10 text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-text-secondary text-base line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-accent-primary text-sm font-medium mt-auto group-hover:text-accent-secondary transition-colors">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

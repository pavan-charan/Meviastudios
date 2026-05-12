import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Mevia Blog",
    };
  }

  return {
    title: `${post.title} | Mevia Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://mevia.com/blog/${post.slug}`,
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-primary pt-32 pb-24 px-4 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10 max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all articles</span>
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-text-secondary mb-6">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-primary font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-white leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-text-secondary leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between py-6 border-y border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary p-[2px]">
                  <div className="w-full h-full bg-bg-primary rounded-full flex items-center justify-center">
                    <span className="font-bold text-lg">M</span>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-white">Mevia Editorial Team</div>
                  <div className="text-sm text-text-secondary">Creator Intelligence</div>
                </div>
              </div>
              <button className="p-3 rounded-full glass hover:bg-white/10 transition-colors border border-white/10 text-white" aria-label="Share article">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </header>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-text-secondary space-y-8">
            <p>
              In the fast-evolving landscape of the creator economy, traditional metrics are no longer sufficient. 
              Brands and agencies are moving past vanity metrics to focus on true Creator Intelligence. This shift 
              requires a robust technological foundation that can handle everything from discovery to payouts.
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Shift to Data-Driven Decisions</h2>
            <p>
              When scaling creator marketing from 10 to 1,000 creators, operational chaos is inevitable without the right 
              systems. Spreadsheets break, communication gets lost in emails, and payments become a nightmare. 
              Modern teams are solving this by adopting specialized operating systems tailored for creator-led growth.
            </p>
            
            <blockquote className="border-l-4 border-accent-primary pl-6 italic text-white/80 my-10 text-2xl font-heading">
              "The future belongs to brands that treat creators not as ad placements, but as true strategic partners."
            </blockquote>

            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Automating the Mundane</h2>
            <p>
              By automating contract generation, tax compliance, and multi-currency payouts, teams can refocus their 
              energy on what truly matters: building authentic relationships and crafting compelling campaigns.
            </p>

            <div className="p-8 rounded-2xl glass border border-white/10 mt-12">
              <h3 className="text-xl font-bold text-white mb-4">Key Takeaways</h3>
              <ul className="list-disc pl-5 space-y-3">
                <li>Move beyond vanity metrics to track true ROI.</li>
                <li>Invest in infrastructure before scaling creator count.</li>
                <li>Automate compliance and payouts to avoid legal risks.</li>
                <li>Treat creators as long-term partners, not transactional assets.</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}

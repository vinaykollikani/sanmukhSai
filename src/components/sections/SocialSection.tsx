"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { SocialPost } from "@/types/social";
import { useCursor } from "@/hooks/useCursor";
import { Play } from "lucide-react";

interface SocialSectionProps {
  posts: SocialPost[];
}

export function SocialSection({ posts }: SocialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ws-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".social-fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [posts]);

  // Bento grid layout classes for social gallery (up to 5 items)
  const bentoClasses = [
    "col-span-1 row-span-2 md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-square", // Large featured
    "col-span-1 row-span-1 aspect-square", // Medium
    "col-span-1 row-span-1 aspect-[4/5]", // Portrait
    "col-span-1 md:col-span-2 row-span-1 aspect-video md:aspect-[21/9]", // Landscape
    "col-span-1 row-span-1 aspect-square hidden md:block", // Small filler
  ];

  const displayPosts = posts.slice(0, 5);

  return (
    <section
      id="social"
      ref={sectionRef}
      className="section section--social relative w-full py-32 text-white overflow-hidden select-none"
    >


      <div className="container-wide relative z-20 space-y-16">
        
        {/* Header */}
        <header className="section-header max-w-4xl">
          <div className="social-fade-up eyebrow mb-6">
            <span className="eyebrow-dot" />
            <span className="eyebrow-label text-white/50 tracking-[0.2em]">SOCIAL / INSTAGRAM & REELS</span>
          </div>

          <h2 className="social-fade-up section-heading text-4xl md:text-6xl font-black font-display tracking-tight text-white leading-[1.1]">
            CONTENT THAT <br className="hidden md:block"/> STOPS THE SCROLL.
          </h2>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
          {displayPosts.map((post, index) => {
            const layoutClass = bentoClasses[index % bentoClasses.length];
            const isReel = post.type === 'reel';
            
            return (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`card social-fade-up group relative transition-all duration-500 hover:[--card-border-color:rgba(243,108,33,0.3)] ${layoutClass}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={post.cover}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    {isReel && (
                      <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:bg-orange group-hover:text-black transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                        <Play fill="currentColor" size={14} className="ml-0.5" />
                      </div>
                    )}
                  </div>
                  
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <h3 className="font-bold text-white tracking-tight drop-shadow-md text-sm md:text-base mb-1">
                      {post.title}
                    </h3>
                    <p className="text-[10px] md:text-xs font-sans text-white/70 uppercase tracking-widest drop-shadow-md">
                      {post.platform}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* View All Footer */}
        <div className="social-fade-up flex justify-center pt-8">
          <Link 
            href="/social"
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/70 hover:text-orange transition-colors"
          >
            <span>VIEW SOCIAL</span>
            <span className="w-8 h-[1px] bg-white/30 group-hover:bg-orange transition-colors" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}

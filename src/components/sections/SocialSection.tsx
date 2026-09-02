"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { SocialPost } from "@/types/social";
import { useCursor } from "@/hooks/useCursor";

interface SocialSectionProps {
  posts: SocialPost[];
}

export function SocialSection({ posts }: SocialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useCursor(sectionRef);

  // IntersectionObserver for header reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ws-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".ws-fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section
      id="social"
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] text-white pb-32 overflow-hidden select-none"
    >
      {/* Horizontal Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-orange/30 to-transparent absolute top-0 left-0" />

      {/* Decorative Glows */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange/5 rounded-full blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Section Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(243,108,33,0.18) 0%, rgba(243,108,33,0.06) 45%, transparent 70%)"
        }}
        aria-hidden="true"
      />

      {/* Header Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full pt-24 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          {/* Left Side (Heading & Badge) */}
          <div className="ws-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-black/80 backdrop-blur-xl border border-orange/40 text-[11px] font-sans uppercase tracking-widest text-white shadow-xl mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              <span className="text-orange font-bold">SOCIAL MEDIA</span>
              <span className="text-white/30">|</span>
              <span className="font-bold">INSTAGRAM & REELS</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-white leading-[0.92]">
              CONTENT THAT
              <br className="hidden md:block" /> STOPS THE SCROLL.
            </h2>
          </div>

          {/* Right Side (Scroll Controls) */}
          <div className="ws-fade-up flex items-center gap-3">
            <button
              onClick={handleScrollLeft}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:border-orange/60 hover:bg-orange/10 hover:shadow-[0_0_15px_rgba(243,108,33,0.3)] text-white hover:text-orange"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleScrollRight}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all hover:border-orange/60 hover:bg-orange/10 hover:shadow-[0_0_15px_rgba(243,108,33,0.3)] text-white hover:text-orange"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Strip */}
      <div
        ref={scrollRef}
        className="ss-strip relative z-20 overflow-x-auto py-4 max-w-7xl mx-auto w-full snap-x snap-mandatory"
        style={{ scrollPaddingInline: "1.5rem", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex w-max gap-4 px-6 md:px-8">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0C0C0C]/80 group transition-all duration-500 hover:scale-[1.02] hover:border-orange/60 hover:shadow-[0_8px_40px_rgba(243,108,33,0.25)] snap-start block"
              style={{
                aspectRatio: "9/16",
                width: "clamp(180px, 22vw, 260px)"
              }}
            >
              {/* Image with fallback */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: "linear-gradient(180deg, #140803 0%, #0C0C0C 60%, #0a0502 100%)"
                }}
              />
              {post.cover && (
                <img
                  src={post.cover}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, #0C0C0C 0%, rgba(12,12,12,0.55) 40%, transparent 65%)"
                }}
              />

              {/* Platform Badge */}
              <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange text-[#0C0C0C] text-[9px] font-sans font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(243,108,33,0.3)]">
                <span className="w-1 h-1 bg-[#0C0C0C] rounded-full" />
                {post.platform}
              </div>

              {/* Play Button Indicator */}
              {post.type === "reel" && (
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:bg-orange/40 group-hover:border-orange/60 group-hover:shadow-[0_0_20px_rgba(243,108,33,0.4)]">
                    <Play className="text-white w-5 h-5 ml-1" fill="currentColor" />
                  </div>
                </div>
              )}

              {/* Card Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 flex flex-col">
                <h3 className="text-sm font-black tracking-tight text-white leading-snug transition-colors duration-300 group-hover:text-orange">
                  {post.title}
                </h3>
                <p className="text-[10px] font-sans text-white/50 mt-1 leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              </div>
            </a>
          ))}
          
          {/* Right Breathing Room */}
          <div className="shrink-0 w-6 md:w-8" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

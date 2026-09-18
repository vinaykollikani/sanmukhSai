"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { SocialPost } from "@/types/social";
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
      className="section section--social"
    >


      <div className="container-wide social-container">
        
        {/* Header */}
        <header className="section-header social-header">
          <div className="social-fade-up eyebrow mb-6">
            <span className="eyebrow-dot" />
            <span className="eyebrow-label">SOCIAL / INSTAGRAM & REELS</span>
          </div>

          <h2 className="social-fade-up section-heading social-heading">
            CONTENT THAT <br className="hidden md:block"/> STOPS THE SCROLL.
          </h2>
        </header>

        {/* Bento Grid */}
        <div className="social-grid">
          {displayPosts.map((post, index) => {
            const layoutClass = bentoClasses[index % bentoClasses.length];
            const isReel = post.type === 'reel';
            
            return (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-fade-up social-card ${layoutClass}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={post.cover}
                  alt={post.title}
                  className="social-card-img"
                />
                
                {/* Overlay Gradient */}
                <div className="social-card-overlay" />
                
                {/* Content Overlay */}
                <div className="social-card-content">
                  <div className="flex justify-end">
                    {isReel && (
                      <div className="social-card-play">
                        <Play fill="currentColor" size={14} className="ml-0.5" />
                      </div>
                    )}
                  </div>
                  
                  <div className="social-card-info">
                    <h3 className="social-card-title">
                      {post.title}
                    </h3>
                    <p className="social-card-subtitle">
                      {post.platform}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* View All Footer */}
        <div className="social-fade-up social-view-all">
          <Link 
            href="/social"
            className="work-link"
          >
            <span>VIEW SOCIAL</span>
            <span className="work-link-line" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="work-link-icon">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}

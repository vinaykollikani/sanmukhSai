"use client";

import { useRef, MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCursor } from "@/hooks/useCursor";
import { Testimonial } from "@/types/testimonial";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const QuoteIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mb-6 text-orange/40 group-hover:text-orange transition-colors duration-500"
  >
    <path
      d="M10.84 21.32C8.6 21.32 6.68 20.64 5.08 19.28C3.56 17.92 2.8 16.12 2.8 13.88C2.8 12.12 3.2 10.4 4 8.72C4.88 7.04 6 5.6 7.36 4.4L8.72 6C7.68 6.96 6.84 8.04 6.2 9.24C5.64 10.44 5.36 11.64 5.36 12.84C6 12.28 6.72 11.84 7.52 11.52C8.4 11.12 9.32 10.92 10.28 10.92C11.96 10.92 13.36 11.52 14.48 12.72C15.6 13.92 16.16 15.36 16.16 17.04C16.16 18.24 15.84 19.32 15.2 20.28C14.64 21.16 13.84 21.84 12.8 22.32C11.76 22.8 10.6 23.04 9.32 23.04L10.84 21.32ZM26.2 21.32C23.96 21.32 22.04 20.64 20.44 19.28C18.92 17.92 18.16 16.12 18.16 13.88C18.16 12.12 18.56 10.4 19.36 8.72C20.24 7.04 21.36 5.6 22.72 4.4L24.08 6C23.04 6.96 22.2 8.04 21.56 9.24C21 10.44 20.72 11.64 20.72 12.84C21.36 12.28 22.08 11.84 22.88 11.52C23.76 11.12 24.68 10.92 25.64 10.92C27.32 10.92 28.72 11.52 29.84 12.72C30.96 13.92 31.52 15.36 31.52 17.04C31.52 18.24 31.2 19.32 30.56 20.28C30 21.16 29.2 21.84 28.16 22.32C27.12 22.8 25.96 23.04 24.68 23.04L26.2 21.32Z"
      fill="currentColor"
    />
  </svg>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative p-8 md:p-10 rounded-3xl bg-[#141414] border border-white/5 hover:border-orange/50 transition-all duration-300 group overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Top Accent Hover Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange via-orange/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
      
      {/* Local Cursor Spotlight */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(243,108,33,0.13), transparent 70%)"
        }}
      />

      <div className="relative z-20">
        <QuoteIcon />
        <p className="text-white/80 font-light leading-relaxed mb-8 text-[15px] font-sans">
          &quot;{testimonial.text}&quot;
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5 relative z-20">
        <div>
          <div className="text-white font-bold text-sm font-sans">
            {testimonial.author}
          </div>
          <div className="text-white/50 font-sans text-[10px] uppercase tracking-widest mt-1">
            {testimonial.role}
          </div>
        </div>
        
        <div className="px-2 py-1 bg-orange text-[#0C0C0C] font-sans text-[9px] font-bold tracking-widest uppercase rounded shadow-[0_2px_10px_rgba(243,108,33,0.2)]">
          {testimonial.project}
        </div>
      </div>
    </div>
  );
};

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRef = useCursor(sectionRef);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="w-full bg-[#0C0C0C] py-32 relative overflow-hidden select-none"
    >
      {/* Global Cursor Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(243,108,33,0.18) 0%, rgba(243,108,33,0.06) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Secondary Left-Side Glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/4 rounded-full blur-[150px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-black/40 backdrop-blur border border-orange/30 shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
            <span className="text-orange font-bold font-sans text-xs uppercase tracking-widest">
              EPISODE 04 <span className="text-white/40 font-normal">|</span> <span className="text-white font-normal">REVIEWS</span>
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            CLIENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange via-orange/80 to-[#FF8A00]">
              RECEPTION.
            </span>
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((review, i) => (
            <div key={i} ref={(el) => { cardsRef.current[i] = el; }}>
              <TestimonialCard testimonial={review} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

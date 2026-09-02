"use client";

import { useRef } from "react";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MorphingImageReveal } from "@/components/ui/MorphingImageReveal";
import { useCursor } from "@/hooks/useCursor";

const MARQUEE_TEXT = "1. BRAND IDENTITY // MARK · TYPE · COLOUR · SYSTEM 2. PACKAGING DESIGN // DIELINE · SUBSTRATE · SHELF 3. 3D VISUALISATION // RENDER · SCENE · LISTING 4. MOTION & CAMPAIGN // ANIMATION · SOCIAL · LAUNCH ";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useCursor(sectionRef);

  // Animation Refs
  const headingRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // fadeInUp entrance for heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, delay: 0.1, ease: "power3.out" }
    );

    // Staggered reveals for the rest
    gsap.fromTo(
      metaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.22, ease: "power3.out" }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.34, ease: "power3.out" }
    );

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.46, ease: "power3.out" }
    );

    gsap.fromTo(
      portraitRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.9, delay: 0.58, ease: "power3.out" }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-[100vh] min-h-[600px] bg-[#0C0C0C] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Marquee */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0">
        <div className="flex animate-marquee whitespace-nowrap opacity-10 text-orange">
          <span className="text-[14vw] font-black uppercase tracking-tighter leading-none mr-8">
            {MARQUEE_TEXT}
          </span>
          <span className="text-[14vw] font-black uppercase tracking-tighter leading-none mr-8">
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-transparent" />

      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(243,108,33,0.18) 0%, rgba(243,108,33,0.06) 45%, transparent 70%)"
        }}
        aria-hidden="true"
      />

      {/* Main Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-8 h-full flex flex-col justify-center pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            <h1 
              ref={headingRef}
              className="text-5xl md:text-7xl font-display font-black tracking-tighter text-white drop-shadow-2xl"
              style={{ lineHeight: 0.95 }}
            >
              SANMUKH SAI<br />
              <span className="text-orange">DESIGN SYSTEM.</span>
            </h1>

            <div ref={metaRef} className="flex items-center gap-3 flex-wrap">
              <span className="bg-orange text-[#0C0C0C] text-sm font-bold px-2 py-1 rounded-sm">
                3+ Years
              </span>
              <span className="text-white/50">•</span>
              <span className="text-orange text-sm font-bold font-display tracking-wide">
                Brand Identity · Packaging · 3D Visualisation
              </span>
            </div>

            <p ref={descRef} className="text-white/80 font-light text-base md:text-lg max-w-[32rem] leading-relaxed drop-shadow-md">
              Building complete visual systems for product brands — the mark, the pack, and the render that sells it.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4">
              <Link 
                href="#work"
                className="flex items-center gap-2 bg-[#F2F2F2] text-[#0C0C0C] px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-orange hover:text-[#0C0C0C] hover:scale-105 active:scale-95 transition-all duration-300 drop-shadow-lg"
              >
                <Play size={14} className="fill-current" />
                View Selected Work
              </Link>
              
              <Link 
                href="#contact"
                className="flex items-center gap-2 bg-[#0C0C0C]/40 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all duration-300"
              >
                <Info size={14} />
                Start a Project
              </Link>
            </div>
          </div>

          {/* Right Portrait */}
          <div className="lg:col-span-5 flex items-center justify-center w-full h-full" ref={portraitRef}>
            <MorphingImageReveal
              baseSrc="/images/portrait/character.png"
              revealSrc="/images/portrait/photo.png"
              alt="Sanmukh Sai"
              size={260}
              feather={0.4}
              revealOffset={[0, 0]}
              revealScale={1}
              className="hero-morph-portrait"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

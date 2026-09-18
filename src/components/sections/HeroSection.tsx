"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
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
  const portraitRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

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
      portraitRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.9, delay: 0.58, ease: "power3.out" }
    );

    // Parallax Effects

  }, { scope: sectionRef });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="section section--hero h-[100svh] min-h-[600px] overflow-hidden  flex flex-col justify-center py-32"
    >
      {/* Background Marquee */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0">
        <div ref={marqueeRef} className="flex animate-marquee whitespace-nowrap opacity-10 text-orange">
          <span className="text-[14vw]  uppercase tracking-tighter leading-none mr-8 ">
            {MARQUEE_TEXT}
          </span>
          <span className="text-[14vw]  uppercase tracking-tighter leading-none mr-8">
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/50 to-transparent" />

      {/* Spotlight */}
      <div
        ref={spotlightRef}
        className="spotlight spotlight-orange z-10"
        aria-hidden="true"
      />

      <div className="container-wide relative z-20 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left hero-content">
            <h1 
              ref={headingRef}
              className="text-5xl md:text-7xl font-display font-black tracking-tighter text-white drop-shadow-2xl leading-[0.95]"
            >
              SANMUKH SAI<br />
              <span className="text-orange">DESIGN SYSTEM.</span>
            </h1>

            <div ref={metaRef} className="flex items-center gap-3 flex-wrap hero-meta">
              <span className="bg-orange text-background text-sm font-bold px-2 py-1 rounded-sm">
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
          </div>

          {/* Right Portrait */}
          <div className="lg:col-span-5 flex items-center justify-center w-full h-full hero-media" ref={portraitRef}>
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

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


const MARQUEE_TEXT = "1. BRAND IDENTITY // MARK · TYPE · COLOUR · SYSTEM 2. PACKAGING DESIGN // DIELINE · SUBSTRATE · SHELF 3. 3D VISUALISATION // RENDER · SCENE · LISTING 4. MOTION & CAMPAIGN // ANIMATION · SOCIAL · LAUNCH ";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);


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
      className="section section--hero"
    >
      {/* Background Marquee */}
      <div className="hero-marquee-wrapper">
        <div ref={marqueeRef} className="hero-marquee animate-marquee">
          <span className="hero-marquee-text">
            {MARQUEE_TEXT}
          </span>
          <span className="hero-marquee-text">
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div ref={glowRef} className="hero-bg-glow" />

      <div className="container-wide relative z-20 h-full flex flex-col justify-center">
        <div className="hero-grid">
          
          {/* Left Content */}
          <div className="hero-content">
            <h1 
              ref={headingRef}
              className="hero-heading"
            >
              SANMUKH SAI<br />
              <span className="hero-heading-highlight">DESIGN SYSTEM.</span>
            </h1>

            <div ref={metaRef} className="hero-meta">
              <span className="hero-tag">
                3+ Years
              </span>
              <span className="hero-dot">•</span>
              <span className="hero-subheading">
                Brand Identity · Packaging · 3D Visualisation
              </span>
            </div>

            <p ref={descRef} className="hero-desc">
              Building complete visual systems for product brands — the mark, the pack, and the render that sells it.
            </p>
          </div>

          {/* Right Portrait */}
          <div className="hero-media" ref={portraitRef}>
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

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCursor } from "@/hooks/useCursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const glow1Ref = useRef<HTMLDivElement | null>(null);
  const glow2Ref = useRef<HTMLDivElement | null>(null);


  // Collect refs for cards safely
  const setCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  // GSAP Animation
  useGSAP(() => {

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(cardRefs.current, { y: 0, opacity: 1, scale: 1 });
      return;
    }

    gsap.fromTo(
      cardRefs.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });


  return (
    <section
      id="about"
      ref={sectionRef}
      className="section section--about relative w-full min-h-screen  text-white py-32 flex flex-col justify-center select-none overflow-hidden"
    >


      {/* Main Container */}
      <div className="container-wide relative z-10 space-y-16">
        
        {/* Section Header */}
        <header className="section-header">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span className="eyebrow-label">ABOUT THE DESIGNER</span>
          </div>
          <h2 className="section-heading">
            ABOUT THE DESIGNER
          </h2>
        </header>

        {/* About Grid */}
        <div className="about-grid grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1 */}
          <div
            ref={setCardRef}
            className="card about-card md:col-span-7 p-8 md:p-12 flex flex-col justify-between relative group transition-all duration-500 hover:[--card-border-color:rgba(243,108,33,0.6)]"
          >


            {/* Decorative Number */}
            <div className="absolute top-0 right-0 p-8 pointer-events-none z-0">
              <span className="text-white/5 font-sans text-7xl font-black">01</span>
            </div>

            {/* Card Content */}
            <div className="about-card__content relative z-10 space-y-6">
              <h3 className="about-card__header text-xs font-sans uppercase tracking-widest text-orange font-bold">
                CAST & BACKGROUND
              </h3>
              
              <div className="space-y-4">
                <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed font-sans">
                  I am <span className="text-white font-bold drop-shadow">Kollikani Sanmukh Sai</span>, a designer working across brand identity, packaging, and photorealistic 3D product visualisation, based in Rayagada, Odisha.
                </p>
                <p className="text-sm md:text-base text-white/60 font-light leading-relaxed font-sans">
                  Freelance since July 2023 — one person, owning the brief from the first sketch to the final press-ready file. My work sits where brand strategy meets production reality. A logo that doesn&apos;t survive dieline conversion or a render that can&apos;t hit Amazon&apos;s listing specs isn&apos;t finished.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="about-card__tags flex flex-wrap gap-2 relative z-10 mt-10">
              {["Brand Identity", "Packaging Design", "3D Visualisation", "Ui/Ux Design"].map(tag => (
                <span key={tag} className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-sans text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={setCardRef}
            className="card about-card md:col-span-5 p-8 md:p-12 flex flex-col justify-between relative group transition-all duration-500 hover:[--card-border-color:rgba(243,108,33,0.6)]"
          >


            {/* Decorative Number */}
            <div className="absolute top-0 right-0 p-8 pointer-events-none z-0">
              <span className="text-white/5 font-sans text-7xl font-black">02</span>
            </div>

            {/* Card Content */}
            <div className="about-card__content relative z-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="about-card__header text-xs font-sans uppercase tracking-widest text-orange font-bold mb-6">
                  MILESTONES & ACCOLADES
                </h3>
                
                <ul className="space-y-3.5 text-sm text-white/80 font-light font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="text-orange font-bold leading-relaxed">›</span>
                    <span>
                      Graphic Designer at <span className="font-bold">Pancham Studios Pvt. Ltd.</span>, Bhubaneswar — led the studio&apos;s complete rebrand.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-orange font-bold leading-relaxed">›</span>
                    <span>
                      Graphic Designer at <span className="font-bold">Samaavesh Consultancy</span>, New Delhi — social impact communications.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-orange font-bold leading-relaxed">›</span>
                    <span>
                      Product renders <span className="font-bold">live on Amazon & Shopify</span> for 18+ D2C brands across India.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-orange font-bold leading-relaxed">›</span>
                    <span>
                      Delivered brand systems across <span className="font-bold">technology, beauty, and food & beverage</span>.
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={setCardRef}
            className="card about-card md:col-span-12 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative group transition-all duration-500 hover:[--card-border-color:rgba(243,108,33,0.6)]"
          >


            {/* Card Content (Left Side) */}
            <div className="about-card__content relative z-10 space-y-3 md:w-1/2 w-full text-center md:text-left flex flex-col items-center md:items-start">
              <h3 className="about-card__header text-xs font-sans uppercase tracking-widest text-orange font-bold">
                PRODUCTION DESIGN STACK
              </h3>
              <p className="text-base md:text-lg font-semibold text-white font-sans">
                Equipped with industry-grade tools for brand systems, print production, and photorealistic 3D.
              </p>
            </div>

            {/* Tool Tags (Right Side) */}
            <div className="about-card__tags relative z-10 flex flex-wrap items-center justify-center md:justify-end gap-3 md:w-1/2 w-full">
              {["Illustrator", "Photoshop", "InDesign", "Figma", "Blender", "After Effects", "Framer", "Webflow"].map(tool => (
                <div 
                  key={tool}
                  className="px-4 py-2 rounded bg-white/5 border border-orange/40 text-xs font-sans uppercase tracking-wider text-white shadow-inner transition-all duration-300 hover:bg-orange/20 hover:border-orange/60 hover:scale-105"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

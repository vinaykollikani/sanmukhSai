"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
      className="section section--about"
    >


      {/* Main Container */}
      <div className="about-container">
        
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
        <div className="about-grid">
          
          {/* Card 1 */}
          <div
            ref={setCardRef}
            className="card about-card about-card-1"
          >


            {/* Decorative Number */}
            <div className="about-card-num-wrapper">
              <span className="about-card-num">01</span>
            </div>

            {/* Card Content */}
            <div className="about-card-content">
              <h3 className="about-card-header">
                CAST & BACKGROUND
              </h3>
              
              <div className="about-card-body">
                <p className="about-card-text">
                  I am <span className="about-card-highlight">Kollikani Sanmukh Sai</span>, a designer working across brand identity, packaging, and photorealistic 3D product visualisation, based in Rayagada, Odisha.
                </p>
                <p className="about-card-subtext">
                  Freelance since July 2023 — one person, owning the brief from the first sketch to the final press-ready file. My work sits where brand strategy meets production reality. A logo that doesn&apos;t survive dieline conversion or a render that can&apos;t hit Amazon&apos;s listing specs isn&apos;t finished.
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="about-card-tags">
              {["Brand Identity", "Packaging Design", "3D Visualisation", "Ui/Ux Design"].map(tag => (
                <span key={tag} className="about-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={setCardRef}
            className="card about-card about-card-2"
          >


            {/* Decorative Number */}
            <div className="about-card-num-wrapper">
              <span className="about-card-num">02</span>
            </div>

            {/* Card Content */}
            <div className="about-card-content">
              <div>
                <h3 className="about-card-header mb-6">
                  MILESTONES & ACCOLADES
                </h3>
                
                <ul className="about-milestones">
                  <li className="about-milestone-item">
                    <span className="about-milestone-bullet">›</span>
                    <span className="about-milestone-text">
                      Graphic Designer at <span className="about-milestone-bold">Pancham Studios Pvt. Ltd.</span>, Bhubaneswar — led the studio&apos;s complete rebrand.
                    </span>
                  </li>
                  <li className="about-milestone-item">
                    <span className="about-milestone-bullet">›</span>
                    <span className="about-milestone-text">
                      Graphic Designer at <span className="about-milestone-bold">Samaavesh Consultancy</span>, New Delhi — social impact communications.
                    </span>
                  </li>
                  <li className="about-milestone-item">
                    <span className="about-milestone-bullet">›</span>
                    <span className="about-milestone-text">
                      Product renders <span className="about-milestone-bold">live on Amazon & Shopify</span> for 18+ D2C brands across India.
                    </span>
                  </li>
                  <li className="about-milestone-item">
                    <span className="about-milestone-bullet">›</span>
                    <span className="about-milestone-text">
                      Delivered brand systems across <span className="about-milestone-bold">technology, beauty, and food & beverage</span>.
                    </span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={setCardRef}
            className="card about-card about-card-3"
          >


            {/* Card Content (Left Side) */}
            <div className="about-card-content">
              <h3 className="about-card-header">
                PRODUCTION DESIGN STACK
              </h3>
              <p className="about-card-text">
                Equipped with industry-grade tools for brand systems, print production, and photorealistic 3D.
              </p>
            </div>

            {/* Tool Tags (Right Side) */}
            <div className="about-tool-tags">
              {["Illustrator", "Photoshop", "InDesign", "Figma", "Blender", "After Effects", "Framer", "Webflow"].map(tool => (
                <div 
                  key={tool}
                  className="about-tool-tag"
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

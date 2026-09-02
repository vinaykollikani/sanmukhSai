"use client";

import { useRef } from "react";
import { useCursor } from "@/hooks/useCursor";

export function Footer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const spotlightRef = useCursor(sectionRef);

  return (
    <footer
      ref={sectionRef}
      className="bg-[#0C0C0C] text-white py-16 border-t border-white/10 select-none relative z-10 overflow-hidden w-full"
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

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex flex-col space-y-12 relative z-20">
        
        {/* Primary Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
          
          {/* Footer Branding */}
          <div>
            <div className="text-2xl font-black text-orange tracking-tighter flex items-center gap-2 font-sans drop-shadow-[0_0_15px_rgba(243,108,33,0.3)]">
              SANMUKH<span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
            </div>
            <div className="text-xs font-sans text-white/50 tracking-widest uppercase mt-2">
              {`// DESIGN PORTFOLIO • 2026`}
            </div>
          </div>

          {/* Footer Navigation */}
          <nav className="flex flex-wrap gap-6 md:gap-8 font-sans text-xs uppercase tracking-widest text-white/70">
            <a href="#home" className="hover:text-orange transition-colors duration-300">Home</a>
            <a href="#about" className="hover:text-orange transition-colors duration-300">About</a>
            <a href="#skills" className="hover:text-orange transition-colors duration-300">Skills</a>
            <a href="#work" className="hover:text-orange transition-colors duration-300">Work</a>
            <a href="#social" className="hover:text-orange transition-colors duration-300">Social</a>
            <a href="#contact" className="hover:text-orange transition-colors duration-300">Contact</a>
          </nav>
        </div>

        {/* Social / Contact Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-sans text-white/60">
          
          {/* Social Links */}
          <div className="flex flex-wrap gap-6 uppercase tracking-widest">
            <a href="https://behance.net/saisanmukh" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors duration-300">
              Behance //
            </a>
            <a href="https://linkedin.com/in/sanmukhsai" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors duration-300">
              LinkedIn //
            </a>
            <a href="https://instagram.com/sanmukh.designs" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors duration-300">
              Instagram //
            </a>
          </div>

          {/* Location */}
          <div className="uppercase tracking-widest text-white/40">
            LOCATION: RAYAGADA, ODISHA, IN
          </div>
        </div>

        {/* Copyright Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-[11px] font-sans text-white/40 uppercase tracking-widest">
          <div>
            © {new Date().getFullYear()} Kollikani Sanmukh Sai. All Rights Reserved.
          </div>
          <div className="text-orange/80">
            DESIGNED FOR THE SHELF, THE SCREEN & THE SCROLL
          </div>
        </div>

      </div>
    </footer>
  );
}

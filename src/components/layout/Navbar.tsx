"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Fallback items in case siteConfig is not passed
const fallbackNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Work", href: "/work" },
  { label: "Social", href: "/social" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // fadeInDown animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" } // Starts immediately without preloader
    );
  }, { scope: navRef });

  return (
    <header 
      ref={navRef}
      className="navbar fixed top-0 left-0 w-full z-[100] bg-background/80 backdrop-blur-md border-b border-white/10 opacity-0"
    >
      <div className="navbar__inner container-wide h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="navbar__logo flex items-baseline gap-1 group">
          <span className="font-display text-2xl font-bold tracking-widest">SANMUKH</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-orange transition-colors duration-300"></span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="navbar__menu hidden md:flex items-center gap-8">
          {fallbackNav.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="navbar__link text-sm uppercase tracking-widest text-white/70 hover:text-orange transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* CTA */}
        <div className="navbar__actions hidden md:block">
          <Link 
            href="#contact"
            className="btn btn-secondary px-6 py-2.5 rounded-full border border-white/20 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Download CV
          </Link>
        </div>
        
        {/* Mobile Menu Placeholder (Hidden on desktop) */}
        <div className="navbar__mobile-toggle md:hidden flex items-center">
          <button className="text-sm uppercase tracking-widest text-white/70">Menu</button>
        </div>
        
      </div>
    </header>
  );
}

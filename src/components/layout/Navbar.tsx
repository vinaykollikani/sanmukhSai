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
      className="navbar opacity-0"
    >
      <div className="navbar-inner container-wide">
        
        {/* Logo */}
        <Link href="/" className="navbar-logo group">
          <span className="navbar-logo-text">SANMUKH</span>
          <span className="navbar-logo-dot"></span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="navbar-menu">
          {fallbackNav.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="nav-link nav-link-underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* CTA */}
        <div className="navbar-actions">
          <Link 
            href="#contact"
            className="btn btn-secondary btn-navbar"
          >
            Download CV
          </Link>
        </div>
        
        {/* Mobile Menu Placeholder (Hidden on desktop) */}
        <div className="navbar-mobile-toggle">
          <button className="nav-link">Menu</button>
        </div>
        
      </div>
    </header>
  );
}

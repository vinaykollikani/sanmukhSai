"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the device has a fine pointer (like a mouse)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    
    // Set initial state
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFinePointer(mediaQuery.matches);

    // Update state if device capabilities change
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener("change", handler);
    
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useGSAP(() => {
    if (!isFinePointer || !dotRef.current || !ringRef.current) return;

    // quickTo is highly optimized for tracking mouse movements
    const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 0.05, ease: "power3" });
    const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 0.05, ease: "power3" });
    
    const xToRing = gsap.quickTo(ringRef.current, "x", { duration: 0.15, ease: "power3" });
    const yToRing = gsap.quickTo(ringRef.current, "y", { duration: 0.15, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isFinePointer]);

  // Render nothing if it's a touch device or doesn't support hover
  if (!isFinePointer) return null;

  return (
    <>
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-orange pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-orange pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}

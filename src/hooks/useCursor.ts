"use client";

import { useRef, RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useCursor(sectionRef: RefObject<HTMLElement | null>) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !spotlightRef.current) return;

    const section = sectionRef.current;
    const spotlight = spotlightRef.current;

    // Use quickTo for performant tracking
    const xTo = gsap.quickTo(spotlight, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(spotlight, "y", { duration: 0.15, ease: "power3" });

    // Track mouse movement globally to know exactly where the cursor is
    // even if it enters the section very fast.
    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is within the section bounds
      const rect = section.getBoundingClientRect();
      const isInside = 
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        // Fade in
        gsap.to(spotlight, { opacity: 1, duration: 0.3, overwrite: "auto" });
        // Track
        // The spotlight uses fixed positioning relative to the viewport, 
        // or absolute positioning relative to the section.
        // We assume absolute relative to the section.
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      } else {
        // Fade out
        gsap.to(spotlight, { opacity: 0, duration: 0.3, overwrite: "auto" });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(spotlight, { opacity: 0, duration: 0.3, overwrite: "auto" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    // As a fallback if the window loses focus or mouse leaves window completely
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [sectionRef]);

  return spotlightRef;
}

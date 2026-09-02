"use client";

import { useEffect, useRef, useState, useMemo } from "react";

type MorphingImageRevealProps = {
  baseSrc: string;
  revealSrc: string;
  alt?: string;
  size?: number;
  feather?: number;
  stiffness?: number;
  revealOffset?: [number, number];
  revealScale?: number;
  className?: string;
};

export function MorphingImageReveal({
  baseSrc,
  revealSrc,
  alt = "",
  size = 200,
  feather = 0.35,
  stiffness = 0.15,
  revealOffset = [0, 0],
  revealScale = 1,
  className = "",
}: MorphingImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLImageElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const [hasHoverCapability, setHasHoverCapability] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check capabilities
  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHoverCapability(hoverQuery.matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(motionQuery.matches);

    const handleHoverChange = (e: MediaQueryListEvent) => setHasHoverCapability(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    hoverQuery.addEventListener("change", handleHoverChange);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      hoverQuery.removeEventListener("change", handleHoverChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Generate radial gradient mask stops
  const gradientMask = useMemo(() => {
    const radius = size / 2;
    const f = Math.max(0, Math.min(feather, 0.95));
    const solidR = radius * (1 - f);
    const steps = 15;
    const stops: string[] = [];

    // Transparent inner solid circle
    stops.push(`transparent 0px`);
    stops.push(`transparent ${solidR}px`);

    // Smoothstep transition
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const alpha = t * t * (3 - 2 * t);
      const currentRadius = solidR + (radius - solidR) * t;
      stops.push(`rgba(0,0,0,${alpha}) ${currentRadius}px`);
    }

    // Opaque outside
    stops.push(`rgba(0,0,0,1) ${radius + 1}px`);

    return stops.join(", ");
  }, [size, feather]);

  const updateMask = () => {
    if (baseRef.current) {
      const { x, y } = currentPos.current;
      baseRef.current.style.webkitMaskImage = `radial-gradient(circle at ${x}px ${y}px, ${gradientMask})`;
      baseRef.current.style.maskImage = `radial-gradient(circle at ${x}px ${y}px, ${gradientMask})`;
    }
  };

  const clearMask = () => {
    if (baseRef.current) {
      baseRef.current.style.webkitMaskImage = "none";
      baseRef.current.style.maskImage = "none";
    }
  };

  // Animation Loop
  const loop = () => {
    if (!isHoveredRef.current) {
      rafRef.current = null;
      return;
    }

    const s = prefersReducedMotion ? 1 : stiffness;
    currentPos.current.x += (mousePos.current.x - currentPos.current.x) * s;
    currentPos.current.y += (mousePos.current.y - currentPos.current.y) * s;

    updateMask();

    rafRef.current = requestAnimationFrame(loop);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!hasHoverCapability || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mousePos.current = { x, y };
    currentPos.current = { x, y };
    isHoveredRef.current = true;

    updateMask();

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(loop);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasHoverCapability || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = { 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    };
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    clearMask();
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative block select-none overflow-hidden rounded-[12px] ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Reveal Image (Behind) */}
      <img
        src={revealSrc}
        alt={`${alt} (Reveal)`}
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        style={{
          transform: `translate(${revealOffset[0]}%, ${revealOffset[1]}%) scale(${revealScale})`,
        }}
        draggable={false}
      />
      
      {/* Base Image (On Top) */}
      <img
        ref={baseRef}
        src={baseSrc}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center z-[1]"
        draggable={false}
      />
    </div>
  );
}

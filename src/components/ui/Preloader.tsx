"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
        },
      });

      // Entrance animation
      tl.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      )
      .fromTo(
        textRef.current,
        { y: 20, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
        "-=0.2"
      )
      // Small holding pulse for the dot
      .to(
        dotRef.current,
        { scale: 1.2, duration: 0.4, yoyo: true, repeat: 1, ease: "power1.inOut" },
        "-=0.2"
      )
      // Exit animation
      .to(
        textRef.current,
        { y: -20, opacity: 0, filter: "blur(10px)", duration: 0.6, ease: "power3.in" },
        "+=0.2"
      )
      .to(
        dotRef.current,
        { scale: 0, opacity: 0, duration: 0.4, ease: "back.in(1.7)" },
        "-=0.4"
      )
      .to(
        containerRef.current,
        { opacity: 0, duration: 0.6, ease: "power2.inOut" }
      );

      // The entire timeline lifecycle will take around 2400ms.
    },
    { scope: containerRef }
  );

  if (isComplete) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C]"
    >
      <div className="flex items-center gap-4">
        <div 
          ref={dotRef}
          className="w-3 h-3 rounded-full bg-orange opacity-0"
        />
        <h1 
          ref={textRef}
          className="text-white font-sans text-sm md:text-base font-semibold tracking-[0.2em] uppercase opacity-0"
        >
          Sanmukh Sai
        </h1>
      </div>
    </div>
  );
}

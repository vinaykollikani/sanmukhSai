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
      className="preloader-container"
    >
      <div className="preloader-content">
        <div 
          ref={dotRef}
          className="preloader-dot"
        />
        <h1 
          ref={textRef}
          className="preloader-text"
        >
          Sanmukh Sai
        </h1>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * AtmosphericBg
 *
 * Three large radial-gradient light fields fixed to the viewport.
 * Each blob is CSS-anchored to its home position (upper-right, lower-left,
 * center-right) and drifts a small percentage of its own dimensions in the
 * direction of the pointer — driven by GSAP quickTo with independent durations
 * so each layer has a distinctly different inertia.
 *
 * Key: we use xPercent/yPercent (not x/y) so GSAP's offset is additive on top
 * of the CSS top/right/left/bottom positioning, not a replacement for it.
 */
export function AtmosphericBg() {
  const o1 = useRef<HTMLDivElement>(null); // orange primary   – upper-right
  const b1 = useRef<HTMLDivElement>(null); // blue secondary   – lower-left
  const o2 = useRef<HTMLDivElement>(null); // orange ambient   – center-right

  useGSAP(() => {
    const canMove     = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canMove || reducedMotion) return;

    const el1 = o1.current;
    const el2 = b1.current;
    const el3 = o2.current;
    if (!el1 || !el2 || !el3) return;

    // Layer 1: fast follow  — 2.8s duration, 6% drift
    const xp1 = gsap.quickTo(el1, "xPercent", { duration: 2.8, ease: "power1.out" });
    const yp1 = gsap.quickTo(el1, "yPercent", { duration: 2.8, ease: "power1.out" });

    // Layer 2: medium follow — 4.2s duration, 3.5% drift
    const xp2 = gsap.quickTo(el2, "xPercent", { duration: 4.2, ease: "power1.out" });
    const yp2 = gsap.quickTo(el2, "yPercent", { duration: 4.2, ease: "power1.out" });

    // Layer 3: slowest follow — 5.5s duration, 2% drift
    const xp3 = gsap.quickTo(el3, "xPercent", { duration: 5.5, ease: "power1.out" });
    const yp3 = gsap.quickTo(el3, "yPercent", { duration: 5.5, ease: "power1.out" });

    const handleMove = (e: MouseEvent) => {
      // Normalise pointer position to -1…+1 relative to viewport centre
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;

      xp1(nx * 6);   yp1(ny * 6);
      xp2(nx * 3.5); yp2(ny * 3.5);
      xp3(nx * 2);   yp3(ny * 2);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        overflow:      "hidden",
        pointerEvents: "none",
        zIndex:        0,
      }}
    >
      {/* ORANGE PRIMARY — upper-right anchor */}
      <div
        ref={o1}
        style={{
          position:     "absolute",
          top:          "-20%",
          right:        "-15%",
          width:        "900px",
          height:       "700px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(243,108,33,0.07) 0%, transparent 68%)",
          filter:       "blur(200px)",
          willChange:   "transform",
        }}
      />

      {/* BLUE SECONDARY — lower-left anchor */}
      <div
        ref={b1}
        style={{
          position:     "absolute",
          bottom:       "-15%",
          left:         "-12%",
          width:        "750px",
          height:       "620px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(1,86,254,0.045) 0%, transparent 68%)",
          filter:       "blur(170px)",
          willChange:   "transform",
        }}
      />

      {/* ORANGE AMBIENT — center-right anchor */}
      <div
        ref={o2}
        style={{
          position:     "absolute",
          top:          "25%",
          right:        "2%",
          width:        "650px",
          height:       "650px",
          borderRadius: "50%",
          background:   "radial-gradient(circle, rgba(243,108,33,0.03) 0%, transparent 68%)",
          filter:       "blur(260px)",
          willChange:   "transform",
        }}
      />
    </div>
  );
}

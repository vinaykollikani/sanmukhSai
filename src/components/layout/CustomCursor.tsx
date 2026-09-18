"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * CustomCursor
 *
 * TWO ELEMENT SYSTEM
 *   Inner dot  — 6px white circle, near-zero lag  (quickTo 0.04s)
 *   Outer ring — 18px circle, 1px stroke, slower  (quickTo 0.14s)
 *
 * CENTERING CONTRACT
 *   Both elements sit at position:fixed, top:0, left:0.
 *   GSAP owns ALL transform via xPercent:-50 / yPercent:-50 (centering)
 *   plus x / y (position tracking).
 *   No inline CSS `transform` is set — that would fight GSAP and produce drift.
 *
 * WORK-ROW HOVER
 *   When the pointer enters any `.wa-row` element the outer ring expands
 *   18px -> 36px and a VIEW label fades in, via event delegation on mouseover.
 *   isHoveringWork ref gates the animations so adjacent-row transitions
 *   don't flicker.
 *
 * ACCESSIBILITY
 *   Only active on (hover: hover) and (pointer: fine).
 *   Respects prefers-reduced-motion.
 *   Touch / coarse-pointer: renders null, native cursor kept.
 */
export function CustomCursor() {
  const [isFinePointer, setIsFinePointer] = useState(false);

  const dotRef         = useRef<HTMLDivElement>(null);
  const ringRef        = useRef<HTMLDivElement>(null);
  const labelRef       = useRef<HTMLSpanElement>(null);
  const isHoveringWork = useRef(false);

  const setPointerState = useCallback((val: boolean) => {
    setIsFinePointer(val);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    Promise.resolve().then(() => setPointerState(mq.matches));
    const handler = (e: MediaQueryListEvent) => setPointerState(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [setPointerState]);

  useGSAP(() => {
    if (!isFinePointer) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    const lbl  = labelRef.current;
    if (!dot || !ring || !lbl) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) {
      gsap.set([dot, ring], { autoAlpha: 0 });
      document.body.style.cursor = "";
      return;
    }

    // Off-screen until first mousemove; xPercent/yPercent own centering
    gsap.set(dot,  { xPercent: -50, yPercent: -50, x: -200, y: -200 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: -200, y: -200 });

    const xDot  = gsap.quickTo(dot,  "x", { duration: 0.04, ease: "none" });
    const yDot  = gsap.quickTo(dot,  "y", { duration: 0.04, ease: "none" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.14, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.14, ease: "power2.out" });

    const enterWorkRow = () => {
      if (isHoveringWork.current) return;
      isHoveringWork.current = true;
      gsap.to(ring, {
        width: 36, height: 36,
        borderColor: "rgba(255,255,255,0.65)",
        duration: 0.3, ease: "power3.out", overwrite: "auto",
      });
      gsap.to(lbl, {
        opacity: 1,
        duration: 0.25, ease: "power3.out", overwrite: "auto",
      });
    };

    const leaveWorkRow = () => {
      if (!isHoveringWork.current) return;
      isHoveringWork.current = false;
      gsap.to(ring, {
        width: 18, height: 18,
        borderColor: "rgba(255,255,255,0.4)",
        duration: 0.25, ease: "power3.out", overwrite: "auto",
      });
      gsap.to(lbl, {
        opacity: 0,
        duration: 0.18, ease: "power3.out", overwrite: "auto",
      });
    };

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const inRow = !!(e.target as Element | null)?.closest?.(".wa-row");
      if (inRow) {
        enterWorkRow();
      } else if (isHoveringWork.current) {
        leaveWorkRow();
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:       "fixed",
          top:            0,
          left:           0,
          width:          18,
          height:         18,
          borderRadius:   "50%",
          border:         "1px solid rgba(255,255,255,0.4)",
          pointerEvents:  "none",
          zIndex:         9998,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          willChange:     "transform",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily:    "var(--font-body, sans-serif)",
            fontSize:      "6px",
            fontWeight:    700,
            letterSpacing: "0.20em",
            textTransform: "uppercase",
            color:         "#ffffff",
            opacity:       0,
            userSelect:    "none",
            whiteSpace:    "nowrap",
            lineHeight:    1,
          }}
        >
          VIEW
        </span>
      </div>

      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         6,
          height:        6,
          borderRadius:  "50%",
          background:    "#ffffff",
          pointerEvents: "none",
          zIndex:        9999,
          willChange:    "transform",
        }}
      />
    </>
  );
}

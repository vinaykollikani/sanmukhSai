import { RefObject, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealOptions {
  yOffset?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
  scrub?: boolean;
}

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector: string = '.reveal-item',
  options: ScrollRevealOptions = {}
) {
  const ctx = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    ctx.current = gsap.context(() => {
      const elements = gsap.utils.toArray(selector);
      if (elements.length === 0) return;

      gsap.fromTo(
        elements,
        {
          y: options.yOffset ?? 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: options.duration ?? 1,
          delay: options.delay ?? 0,
          ease: options.ease ?? 'power3.out',
          stagger: options.stagger ?? 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            scrub: options.scrub ?? false,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.current?.revert();
    };
  }, [containerRef, selector, options]);

  return ctx;
}

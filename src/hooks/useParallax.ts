import { RefObject, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxOptions {
  yAmount?: number;
  start?: string;
  end?: string;
}

export function useParallax(
  elementRef: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const ctx = useRef<gsap.Context | null>(null);

  useIsomorphicLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !elementRef.current) return;

    ctx.current = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: options.yAmount ?? -100,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: options.start ?? 'top bottom',
          end: options.end ?? 'bottom top',
          scrub: true,
        },
      });
    }, elementRef);

    return () => {
      ctx.current?.revert();
    };
  }, [elementRef, options]);

  return ctx;
}

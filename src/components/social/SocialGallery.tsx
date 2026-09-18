"use client";

import { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { SocialPost } from "@/types/social";

interface SocialGalleryProps {
  posts: SocialPost[];
}

/* ─── Base card geometry (3 : 4 portrait) ───────────────────── */
const CARD_W = 270;
const CARD_H = 360;

/* ─── Visual slot configs ────────────────────────────────────── */
const DESKTOP_SLOTS = [
  { x: -518, y:  24, scale: 0.72, opacity: 0.20, zIndex: 1, rotationY:  10 },
  { x: -278, y: -16, scale: 0.85, opacity: 0.52, zIndex: 3, rotationY:   5 },
  { x:    0, y:   0, scale: 1.00, opacity: 1.00, zIndex: 5, rotationY:   0 },
  { x:  278, y: -16, scale: 0.85, opacity: 0.52, zIndex: 3, rotationY:  -5 },
  { x:  518, y:  24, scale: 0.72, opacity: 0.20, zIndex: 1, rotationY: -10 },
];

const MOBILE_SLOTS = [
  { x: -450, y: 0, scale: 0.62, opacity: 0.00, zIndex: 0, rotationY: 0 },
  { x: -228, y: 0, scale: 0.76, opacity: 0.40, zIndex: 2, rotationY: 0 },
  { x:    0, y: 0, scale: 0.92, opacity: 1.00, zIndex: 5, rotationY: 0 },
  { x:  228, y: 0, scale: 0.76, opacity: 0.40, zIndex: 2, rotationY: 0 },
  { x:  450, y: 0, scale: 0.62, opacity: 0.00, zIndex: 0, rotationY: 0 },
];

const ANIM_DURATION = 0.85;
const ANIM_EASE     = "power3.out";
const OFFSCREEN_X   = 780;

function currentSlots() {
  if (typeof window === "undefined") return DESKTOP_SLOTS;
  return window.innerWidth < 768 ? MOBILE_SLOTS : DESKTOP_SLOTS;
}

export function SocialGallery({ posts }: SocialGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const imgRefs  = useRef<(HTMLImageElement | null)[]>(Array(5).fill(null));

  const visualOrder = useRef([0, 1, 2, 3, 4]);
  const centerIdx   = useRef(0);
  const isAnimating = useRef(false);
  const touchStartX = useRef(0);
  const wheelLocked = useRef(false);

  const n = posts.length;

  const getPost = useCallback(
    (idx: number) => posts[((idx % n) + n) % n],
    [posts, n],
  );

  // Force scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    if (!n) return;
    const slots = currentSlots();

    for (let vp = 0; vp < 5; vp++) {
      const domIdx = visualOrder.current[vp];
      const card   = cardRefs.current[domIdx];
      if (!card) continue;

      const cfg = slots[vp];
      gsap.set(card, { transformPerspective: 1400 });

      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        x:         cfg.x,
        y:         cfg.y,
        scale:     cfg.scale,
        opacity:   cfg.opacity,
        zIndex:    cfg.zIndex,
        rotationY: cfg.rotationY,
      });

      const postIdx = ((centerIdx.current + vp - 2) % n + n) % n;
      const img = imgRefs.current[domIdx];
      if (img) img.src = getPost(postIdx).cover;
    }
  }, { scope: containerRef });

  const navigate = useCallback(
    (direction: 1 | -1) => {
      if (isAnimating.current || !n) return;
      isAnimating.current = true;

      const vo    = [...visualOrder.current];
      const slots = currentSlots();

      if (direction === 1) {
        const recycleDom  = vo[0];
        const recycleCard = cardRefs.current[recycleDom];
        const newCenter   = (centerIdx.current + 1) % n;

        if (recycleCard) {
          gsap.set(recycleCard, { x: OFFSCREEN_X, opacity: 0, zIndex: 0 });
          const img = imgRefs.current[recycleDom];
          if (img) img.src = getPost((newCenter + 2) % n).cover;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            visualOrder.current = [vo[1], vo[2], vo[3], vo[4], vo[0]];
            centerIdx.current   = newCenter;
            isAnimating.current = false;
          },
        });

        for (let vp = 1; vp <= 4; vp++) {
          const card = cardRefs.current[vo[vp]];
          if (!card) continue;
          const cfg = slots[vp - 1];
          gsap.set(card, { zIndex: cfg.zIndex });
          
          let duration = ANIM_DURATION;
          if (cfg.zIndex <= 1) duration = ANIM_DURATION * 1.3;
          else if (cfg.zIndex <= 3) duration = ANIM_DURATION * 1.15;

          tl.to(card, {
            x: cfg.x, y: cfg.y, scale: cfg.scale,
            opacity: cfg.opacity, rotationY: cfg.rotationY,
            duration: duration, ease: ANIM_EASE,
          }, 0);
        }

        if (recycleCard) {
          const cfg = slots[4];
          gsap.set(recycleCard, { zIndex: cfg.zIndex });
          tl.to(recycleCard, {
            x: cfg.x, y: cfg.y, scale: cfg.scale,
            opacity: cfg.opacity, rotationY: cfg.rotationY,
            duration: cfg.zIndex <= 1 ? ANIM_DURATION * 1.3 : ANIM_DURATION * 1.15, ease: ANIM_EASE,
          }, 0);
        }

      } else {
        const recycleDom  = vo[4];
        const recycleCard = cardRefs.current[recycleDom];
        const newCenter   = ((centerIdx.current - 1) + n) % n;

        if (recycleCard) {
          gsap.set(recycleCard, { x: -OFFSCREEN_X, opacity: 0, zIndex: 0 });
          const img = imgRefs.current[recycleDom];
          if (img) img.src = getPost(((newCenter - 2) + n) % n).cover;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            visualOrder.current = [vo[4], vo[0], vo[1], vo[2], vo[3]];
            centerIdx.current   = newCenter;
            isAnimating.current = false;
          },
        });

        for (let vp = 0; vp <= 3; vp++) {
          const card = cardRefs.current[vo[vp]];
          if (!card) continue;
          const cfg = slots[vp + 1];
          gsap.set(card, { zIndex: cfg.zIndex });

          let duration = ANIM_DURATION;
          if (cfg.zIndex <= 1) duration = ANIM_DURATION * 1.3;
          else if (cfg.zIndex <= 3) duration = ANIM_DURATION * 1.15;

          tl.to(card, {
            x: cfg.x, y: cfg.y, scale: cfg.scale,
            opacity: cfg.opacity, rotationY: cfg.rotationY,
            duration: duration, ease: ANIM_EASE,
          }, 0);
        }

        if (recycleCard) {
          const cfg = slots[0];
          gsap.set(recycleCard, { zIndex: cfg.zIndex });
          tl.to(recycleCard, {
            x: cfg.x, y: cfg.y, scale: cfg.scale,
            opacity: cfg.opacity, rotationY: cfg.rotationY,
            duration: cfg.zIndex <= 1 ? ANIM_DURATION * 1.3 : ANIM_DURATION * 1.15, ease: ANIM_EASE,
          }, 0);
        }
      }
    },
    [n, getPost],
  );

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 45) navigate(dx < 0 ? 1 : -1);
  };

  if (!n) return null;

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#0C0C0C] text-white overflow-hidden relative flex flex-col justify-center selection:bg-orange selection:text-[#0C0C0C]"
    >
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 w-full px-6 md:px-16 py-6 flex items-center justify-between pointer-events-none">
        <Link
          href="/#social"
          className="group pointer-events-auto flex items-center gap-2 text-[10px] font-sans text-white/50 hover:text-orange uppercase tracking-widest transition-colors duration-300"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span> BACK TO HOME
        </Link>
        <Link href="/" className="pointer-events-auto">
          <div className="text-xl font-black text-orange tracking-tighter flex items-center gap-1.5 drop-shadow-[0_0_10px_rgba(243,108,33,0.3)]">
            SANMUKH<span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
          </div>
        </Link>
      </nav>

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white whitespace-nowrap">
          SOCIAL
        </div>
      </div>

      <div className="flex flex-col items-center z-10 w-full pb-24 md:pb-12">
        <div
          className="relative w-full"
          style={{ height: `${CARD_H + 40}px` }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onWheel={(e) => {
            if (wheelLocked.current) return;
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
              wheelLocked.current = true;
              navigate(e.deltaX > 0 ? 1 : -1);
              setTimeout(() => { wheelLocked.current = false; }, 1200);
            }
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {([0, 1, 2, 3, 4] as const).map((domIdx) => (
              <div
                key={domIdx}
                ref={(el) => { cardRefs.current[domIdx] = el; }}
                className="absolute rounded-[18px] overflow-hidden bg-[#161616] cursor-pointer group"
                onClick={() => {
                  const vp = visualOrder.current.indexOf(domIdx);
                  if (vp === 0 || vp === 1) navigate(-1);
                  else if (vp === 3 || vp === 4) navigate(1);
                  else if (vp === 2 && posts[centerIdx.current]?.url) {
                    window.open(posts[centerIdx.current].url, "_blank");
                  }
                }}
                style={{
                  width:      `${CARD_W}px`,
                  height:     `${CARD_H}px`,
                  left:       "50%",
                  top:        "50%",
                  willChange: "transform, opacity",
                  boxShadow:  "0 20px 60px rgba(0,0,0,0.85)",
                }}
              >
                <img
                  ref={(el) => { imgRefs.current[domIdx] = el; }}
                  alt="Social media post"
                  className="w-full h-full object-cover object-center block transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                />
                
                {/* Central Overlay logic (Only active for the center card) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {/* The visualOrder check handles this dynamically, but we add a generic play button styling */}
                  <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90 shadow-[0_0_20px_rgba(243,108,33,0.5)]">
                    <Play fill="currentColor" size={18} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Controls */}
        <div className="relative z-20 flex items-center justify-center gap-8 mt-12">
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous post"
            className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/45 transition-all duration-300 hover:border-orange/60 hover:text-orange hover:bg-orange/10 hover:shadow-[0_0_24px_rgba(243,108,33,0.22)]"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>

          <button
            onClick={() => navigate(1)}
            aria-label="Next post"
            className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/45 transition-all duration-300 hover:border-orange/60 hover:text-orange hover:bg-orange/10 hover:shadow-[0_0_24px_rgba(243,108,33,0.22)]"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </main>
  );
}

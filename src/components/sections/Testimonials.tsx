"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Testimonial } from "@/types/testimonial";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const QuoteIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="testimonial-card-icon"
  >
    <path
      d="M10.84 21.32C8.6 21.32 6.68 20.64 5.08 19.28C3.56 17.92 2.8 16.12 2.8 13.88C2.8 12.12 3.2 10.4 4 8.72C4.88 7.04 6 5.6 7.36 4.4L8.72 6C7.68 6.96 6.84 8.04 6.2 9.24C5.64 10.44 5.36 11.64 5.36 12.84C6 12.28 6.72 11.84 7.52 11.52C8.4 11.12 9.32 10.92 10.28 10.92C11.96 10.92 13.36 11.52 14.48 12.72C15.6 13.92 16.16 15.36 16.16 17.04C16.16 18.24 15.84 19.32 15.2 20.28C14.64 21.16 13.84 21.84 12.8 22.32C11.76 22.8 10.6 23.04 9.32 23.04L10.84 21.32ZM26.2 21.32C23.96 21.32 22.04 20.64 20.44 19.28C18.92 17.92 18.16 16.12 18.16 13.88C18.16 12.12 18.56 10.4 19.36 8.72C20.24 7.04 21.36 5.6 22.72 4.4L24.08 6C23.04 6.96 22.2 8.04 21.56 9.24C21 10.44 20.72 11.64 20.72 12.84C21.36 12.28 22.08 11.84 22.88 11.52C23.76 11.12 24.68 10.92 25.64 10.92C27.32 10.92 28.72 11.52 29.84 12.72C30.96 13.92 31.52 15.36 31.52 17.04C31.52 18.24 31.2 19.32 30.56 20.28C30 21.16 29.2 21.84 28.16 22.32C27.12 22.8 25.96 23.04 24.68 23.04L26.2 21.32Z"
      fill="currentColor"
    />
  </svg>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <article
      className="card testimonial-card group"
    >

      <div className="testimonial-card-body">
        <QuoteIcon />
        <p className="testimonial-card-quote">
          &quot;{testimonial.text}&quot;
        </p>
      </div>

      <div className="testimonial-card-meta">
        <div>
          <div className="testimonial-card-author">
            {testimonial.author}
          </div>
          <div className="testimonial-card-role">
            {testimonial.role}
          </div>
        </div>
        
        <div className="testimonial-card-project">
          {testimonial.project}
        </div>
      </div>
    </article>
  );
};

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement | null>(null);


  useGSAP(() => {

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="section section--testimonials"
    >

      <div className="container-wide relative z-10">
        
        {/* Header */}
        <header className="section-header mb-20">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            <span className="eyebrow-label">CLIENT RECEPTION</span>
            <span className="eyebrow-divider">|</span>
            <span className="font-bold">REVIEWS</span>
          </div>

          <h2 className="section-heading">
            TESTIMONIALS
          </h2>
        </header>

        {/* Testimonial Grid */}
        <div className="testimonials-grid">
          {testimonials.map((review, i) => (
            <div key={i} ref={(el) => { cardsRef.current[i] = el; }}>
              <TestimonialCard testimonial={review} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

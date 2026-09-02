"use client";

import { useRef, useState, FormEvent, ChangeEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCursor } from "@/hooks/useCursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  permission: boolean;
}

const initialFormState: FormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  permission: false,
};

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useCursor(sectionRef);

  const [formData, setFormData] = useState<FormData>(initialFormState);

  useGSAP(() => {
    if (!sectionRef.current || !panelRef.current || !textRef.current) return;

    // Background Parallax
    gsap.fromTo(
      textRef.current,
      { y: "-10%" },
      {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Panel Entrance
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top bottom-=100px",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.permission) {
      alert("Please accept the contact permission checkbox.");
      return;
    }

    console.log("Form Submitted:", formData);
    alert(`Thanks ${formData.name}! Message received — I'll reply within 24 hours.`);
    setFormData(initialFormState);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-[#0C0C0C] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 border-t border-white/10 select-none"
    >
      {/* Spotlight & Background Glow */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(243,108,33,0.18) 0%, rgba(243,108,33,0.06) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/10 rounded blur-[160px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Giant Background CONTACT Typography */}
      <div className="absolute inset-0 flex flex-col items-center pt-16 md:pt-12 opacity-10 pointer-events-none z-0 overflow-hidden">
        <div ref={textRef} className="text-[25vw] leading-[0.75] font-black uppercase tracking-tighter text-orange scale-y-[1.6] origin-top font-sans">
          CONTACT
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full flex justify-end items-end">
        {/* Contact Panel */}
        <div
          ref={panelRef}
          className="bg-[#0C0C0C]/95 backdrop-blur-2xl border-t border-l border-white/15 w-full md:w-[90%] lg:w-[82%] p-8 md:p-16 text-white flex flex-col justify-between rounded-tl-[3rem] shadow-[0_-25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-orange to-transparent opacity-90" />

          {/* Header */}
          <div className="flex items-center justify-between mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-black/40 border border-orange text-orange font-sans uppercase tracking-widest shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
              <span className="font-bold text-xs">EPISODE 07 // GET IN TOUCH</span>
            </div>
            
            <div className="hidden md:block text-white/40 font-sans text-xs tracking-widest">
              {`// LET'S BUILD THE THING PEOPLE WILL PICK UP`}
            </div>
          </div>

          <p className="text-white/60 text-sm font-light mb-10 max-w-md font-sans leading-relaxed">
            Tell me about the product, the timeline, and where it needs to show up. I reply within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              
              {/* Left Column */}
              <div className="flex flex-col gap-8 w-full md:w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="sr-only">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg font-medium text-white placeholder-white/40 rounded-none outline-none focus:border-orange transition-colors"
                  />
                </div>
                
                <div className="relative">
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg font-medium text-white placeholder-white/40 rounded-none outline-none focus:border-orange transition-colors"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="company" className="sr-only">Company / Brand</label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company / Brand"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg font-medium text-white placeholder-white/40 rounded-none outline-none focus:border-orange transition-colors"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="projectType" className="sr-only">Project Type</label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg font-medium text-white/70 appearance-none rounded-none outline-none focus:border-orange transition-colors cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Project Type</option>
                    <option value="Brand Identity" className="bg-[#1a1a1a]">Brand Identity</option>
                    <option value="Packaging" className="bg-[#1a1a1a]">Packaging</option>
                    <option value="3D Visualisation" className="bg-[#1a1a1a]">3D Visualisation</option>
                    <option value="Multiple" className="bg-[#1a1a1a]">Multiple Disciplines</option>
                    <option value="Not Sure" className="bg-[#1a1a1a]">Not Sure Yet</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8 w-full md:w-1/2">
                <div className="relative">
                  <label htmlFor="budget" className="sr-only">Budget Range (₹)</label>
                  <input
                    id="budget"
                    type="text"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Budget Range (₹)"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg font-medium text-white placeholder-white/40 rounded-none outline-none focus:border-orange transition-colors"
                  />
                </div>

                <div className="relative">
                  <label htmlFor="timeline" className="sr-only">Timeline / Deadline</label>
                  <input
                    id="timeline"
                    type="text"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="Timeline / Deadline"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg font-medium text-white placeholder-white/40 rounded-none outline-none focus:border-orange transition-colors"
                  />
                </div>

                <div className="relative h-full flex flex-col">
                  <label htmlFor="message" className="sr-only">Tell me about the project...</label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about the project..."
                    className="w-full h-full min-h-[140px] bg-transparent border-b border-white/20 pb-3 text-lg font-medium text-white placeholder-white/40 rounded-none outline-none focus:border-orange transition-colors resize-none"
                  />
                </div>
              </div>

            </div>

            {/* Permission Row */}
            <div className="flex flex-col md:flex-row gap-12 mt-4 pt-6 border-t border-white/10">
              <div className="flex items-start gap-3 md:w-1/2">
                <input
                  id="permission"
                  type="checkbox"
                  checked={formData.permission}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 accent-orange cursor-pointer"
                />
                <label htmlFor="permission" className="text-white/70 text-sm font-sans font-light select-none cursor-pointer">
                  I give permission to contact me at this email address.
                </label>
              </div>
              
              <div className="md:w-1/2 text-white/50 text-sm font-light font-sans max-w-[400px] leading-relaxed">
                Direct contact: sanmukhsai@gmail.com<br />
                Behance: behance.net/saisanmukh · Instagram: @sanmukh.designs
              </div>
            </div>

            {/* Final CTA Row */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <p className="text-white/50 text-sm font-sans max-w-[250px] leading-relaxed">
                Ready to start a project or collaboration? Send a direct signal.
              </p>
              
              <button
                type="submit"
                className="group flex items-center justify-center gap-3 bg-orange text-[#0C0C0C] px-8 py-3.5 rounded font-bold text-xs uppercase tracking-widest whitespace-nowrap shadow-[0_0_15px_rgba(243,108,33,0.3)] hover:opacity-90 hover:scale-105 transition-all duration-300"
              >
                SEND MESSAGE
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path
                    d="M1 7H13M13 7L7 1M13 7L7 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}

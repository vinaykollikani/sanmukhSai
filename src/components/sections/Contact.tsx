"use client";

import { useRef, useState, FormEvent, ChangeEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
  const glowRef = useRef<HTMLDivElement | null>(null);


  const [formData, setFormData] = useState<FormData>(initialFormState);

  useGSAP(() => {
    if (!sectionRef.current || !panelRef.current) return;


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
      className="section section--contact"
    >

      <div className="contact-bg-text-wrapper">
        <div ref={textRef} className="contact-bg-text">
          CONTACT
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container-wide contact-container">
        {/* Contact Panel */}
        <div
          ref={panelRef}
          className="contact-panel"
        >


          {/* Header */}
          <header className="contact-header">
            <div className="contact-header-top">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span className="eyebrow-label">CONTACT</span>
                <span className="eyebrow-divider">|</span>
                <span className="font-bold">GET IN TOUCH</span>
              </div>
              <div className="contact-header-subtitle">
                {`// LET'S BUILD THE THING PEOPLE WILL PICK UP`}
              </div>
            </div>
            <h2 className="section-heading">
              START A PROJECT
            </h2>
          </header>

          <p className="contact-description">
            Tell me about the product, the timeline, and where it needs to show up. I reply within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-grid">
              
              {/* Left Column */}
              <div className="contact-form-col">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="form-input"
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="company" className="form-label">Company / Brand</label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company / Brand"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="projectType" className="form-label">Project Type</label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="" disabled>Project Type</option>
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Packaging">Packaging</option>
                    <option value="3D Visualisation">3D Visualisation</option>
                    <option value="Multiple">Multiple Disciplines</option>
                    <option value="Not Sure">Not Sure Yet</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="contact-form-col textarea-col">
                <div className="form-field">
                  <label htmlFor="budget" className="form-label">Budget Range (₹)</label>
                  <input
                    id="budget"
                    type="text"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Budget Range (₹)"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="timeline" className="form-label">Timeline / Deadline</label>
                  <input
                    id="timeline"
                    type="text"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="Timeline / Deadline"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="form-label">Tell me about the project...</label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about the project..."
                    className="form-textarea"
                  />
                </div>
              </div>

            </div>

            {/* Permission Row */}
            <div className="contact-permission-row">
              <div className="contact-permission-checkbox-group">
                <input
                  id="permission"
                  type="checkbox"
                  checked={formData.permission}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <label htmlFor="permission" className="contact-permission-label">
                  I give permission to contact me at this email address.
                </label>
              </div>
              
              <div className="contact-info">
                Direct contact: sanmukhsai@gmail.com<br />
                Behance: behance.net/saisanmukh · Instagram: @sanmukh.designs
              </div>
            </div>

            {/* Final CTA Row */}
            <div className="contact-actions">
              <p className="contact-cta-text">
                Ready to start a project or collaboration? Send a direct signal.
              </p>
              
              <button
                type="submit"
                className="btn btn-primary"
              >
                SEND MESSAGE
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="contact-link-icon"
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

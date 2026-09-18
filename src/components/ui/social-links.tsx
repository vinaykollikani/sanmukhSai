"use client";

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { SocialCatalogEntry } from '../layout/socials';

interface SocialLinksProps {
  socials: (SocialCatalogEntry & { href?: string })[];
  className?: string;
}

export function SocialLinks({ socials, className = '' }: SocialLinksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`social-links ${className}`}>
      {socials.map((social, idx) => (
        <SocialLink
          key={social.key}
          social={social}
          isHovered={hoveredIndex === idx}
          isDimmed={hoveredIndex !== null && hoveredIndex !== idx}
          onHover={() => setHoveredIndex(idx)}
          onLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}

function SocialLink({
  social,
  isHovered,
  isDimmed,
  onHover,
  onLeave,
}: {
  social: SocialCatalogEntry & { href?: string };
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;

    if (isHovered) {
      const rotation = Math.random() * 20 - 10;
      gsap.to(iconRef.current, {
        y: -50,
        xPercent: -50,
        opacity: 1,
        rotation: rotation,
        filter: 'blur(0px)',
        duration: 0.2,
        ease: 'power2.out',
      });
    } else {
      gsap.to(iconRef.current, {
        y: -40,
        xPercent: -50,
        opacity: 0,
        rotation: 0,
        filter: 'blur(2px)',
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  }, [isHovered]);

  const handleClick = () => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 1 },
        { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' }
      );
    }
  };

  const Content = (
    <>
      <span className="social-link-name">{social.label}</span>
      <span
        ref={iconRef}
        className="social-icon-stage"
        style={{ opacity: 0, transform: 'translate(-50%, -40px)', filter: 'blur(2px)', left: '50%' }}
      >
        {social.icon}
      </span>
    </>
  );

  const linkClass = `social-link ${isDimmed ? 'is-dimmed' : ''}`;

  if (social.href) {
    return (
      <a
        href={social.href}
        className={linkClass}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={handleClick}
      >
        {Content}
      </a>
    );
  }

  return (
    <span
      className={linkClass}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      {Content}
    </span>
  );
}

"use client";

import React from 'react';
import Image from 'next/image';
import { useSiteConfig } from '../../hooks/useSiteConfig';
import { SocialLinks } from '../ui/social-links';
import { SOCIAL_CATALOG, toHref } from './socials';

export const FULL_SOCIALS = SOCIAL_CATALOG;

interface FooterProps {
  socials?: typeof SOCIAL_CATALOG;
  copyright?: string;
  centered?: boolean;
}

export function Footer({
  socials = SOCIAL_CATALOG,
  copyright = '© 2026 Sanmukh Sai K.',
  centered = false,
}: FooterProps) {
  const { config } = useSiteConfig();

  const links = socials.map(s => ({
    ...s,
    href: toHref(s.key, config[s.key] || s.url),
  }));

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-inner container-wide">
          {links.length > 0 && (
            <div className={`footer-socials-row${centered ? ' is-centered' : ''}`}>
              <SocialLinks socials={links} className={centered ? 'is-centered' : ''} />
            </div>
          )}
          <p className={`footer-copyright${centered ? ' is-centered' : ''}`}>
            {copyright}
          </p>
        </div>
      </div>

      <div className="footer-wordmark" aria-hidden="true">
        <div className="footer-wordmark-inner">
          <Image 
            src="/images/footer-logo.svg" 
            alt="Sanmukh Logo" 
            width={1200} 
            height={300} 
            className="footer-wordmark-img"
            priority
          />
        </div>
      </div>
      <span className="visually-hidden">Sanmukh</span>
    </footer>
  );
}

export default Footer;

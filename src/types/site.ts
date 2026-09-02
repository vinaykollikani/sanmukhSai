export interface SiteBrand {
  name: string;
  shortName: string;
}

export interface SiteHero {
  designRoles: string[];
  tagline: string;
  bio: string;
  years: string;
  portraitCharacter: string;
  portraitPhoto: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SiteNavigation {
  items: NavigationItem[];
  ctaLabel: string;
}

export interface SiteContact {
  email: string;
  behance: string;
  instagram: string;
}

export interface SiteSocial {
  behance: string;
  linkedin: string;
  instagram: string;
}

export interface SiteConfig {
  brand: SiteBrand;
  hero: SiteHero;
  navigation: SiteNavigation;
  contact: SiteContact;
  social: SiteSocial;
  location: string;
  footerTagline: string;
}

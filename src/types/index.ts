// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
// SPDX-License-Identifier: MIT

export interface HeroSlide {
  title: string;
  subtitle: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface Location {
  id: string;
  name: string;
  when: string;
  where: string;
  postcode: string;
  description: string;
  teamImage: string;
  color: 'blue' | 'green' | 'purple';
  imagePosition?: 'left' | 'right';
  status?: 'active' | 'coming-soon';
}

export interface Supporter {
  name: string;
  logo: string;
  link?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface OtherCafe {
  name: string;
  shortName: string;
  description: string;
  logo: string;
  link: string;
}

import React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  logoUrl?: string;
  current?: boolean;
  tech?: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  stars?: number;
}

export interface TechItem {
  name: string;
  icon?: React.ReactNode;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  grade: string;
  logoUrl?: string;
}
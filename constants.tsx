import React from 'react';
import {
  GitHubIcon,
  TwitterIcon,
  LinkedInIcon,
  MailIcon,
  ReactLogo,
  TypescriptLogo,
  NextLogo,
  TailwindLogo,
  JavaScriptLogo,
  PythonLogo,
  NodeLogo,
  GitLogo,
  VsCodeLogo,
  FigmaLogo,
  MongoDBLogo,
  PostgreSQLLogo,
  AWSLogo,
  DockerLogo,
  HTMLLogo,
  CSSLogo
} from './components/Icons';
import { SocialLink, ExperienceItem, ProjectItem, TechItem, EducationItem } from './types';

export const BIO = {
  name: "Shorya Bansal",
  firstName: "Shorya",
  lastName: "Bansal",
  title: "Full Stack Developer",
  headline: "meet your\nnew favourite frontend developer",
  description: "I build interactive web apps using React, Next.js, and TypeScript. With a focus on UI design and performance, I aim to create digital experiences that feel as timeless as print.",
  avatar: "/image.png"
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Email', url: 'mailto:bansalshorya13@gmail.com', icon: MailIcon },
  { name: 'LinkedIn', url: 'https://in.linkedin.com/in/shorya-bansal-621586312', icon: LinkedInIcon },
  { name: 'Twitter', url: 'https://x.com/Shorya_codes', icon: TwitterIcon },
  { name: 'GitHub', url: 'https://github.com/shoryabansalgithub', icon: GitHubIcon },
];

export const TECH_STACK: TechItem[] = [
  { name: 'React', icon: <ReactLogo className="w-4 h-4" /> },
  { name: 'Next.js', icon: <NextLogo className="w-4 h-4" /> },
  { name: 'TypeScript', icon: <TypescriptLogo className="w-4 h-4" /> },
  { name: 'Tailwind', icon: <TailwindLogo className="w-4 h-4" /> },
];

export const FULL_TECH_STACK: TechItem[] = [
  // Frontend
  { name: 'React', icon: <ReactLogo className="w-6 h-6" />, category: 'Frontend' },
  { name: 'Next.js', icon: <NextLogo className="w-6 h-6" />, category: 'Frontend' },
  { name: 'TypeScript', icon: <TypescriptLogo className="w-6 h-6" />, category: 'Frontend' },
  { name: 'JavaScript', icon: <JavaScriptLogo className="w-6 h-6" />, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: <TailwindLogo className="w-6 h-6" />, category: 'Frontend' },
  { name: 'HTML5', icon: <HTMLLogo className="w-6 h-6" />, category: 'Frontend' },
  { name: 'CSS3', icon: <CSSLogo className="w-6 h-6" />, category: 'Frontend' },
  // Backend
  { name: 'Node.js', icon: <NodeLogo className="w-6 h-6" />, category: 'Backend' },
  { name: 'Python', icon: <PythonLogo className="w-6 h-6" />, category: 'Backend' },
  // Database
  { name: 'MongoDB', icon: <MongoDBLogo className="w-6 h-6" />, category: 'Database' },
  { name: 'PostgreSQL', icon: <PostgreSQLLogo className="w-6 h-6" />, category: 'Database' },
  // DevOps & Tools
  { name: 'Git', icon: <GitLogo className="w-6 h-6" />, category: 'Tools' },
  { name: 'Docker', icon: <DockerLogo className="w-6 h-6" />, category: 'Tools' },
  { name: 'AWS', icon: <AWSLogo className="w-6 h-6" />, category: 'Tools' },
  { name: 'VS Code', icon: <VsCodeLogo className="w-6 h-6" />, category: 'Tools' },
  { name: 'Figma', icon: <FigmaLogo className="w-6 h-6" />, category: 'Tools' },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Excelerate",
    role: "Data Engineer Early Intern",
    period: "Nov 2024 - Nov 2024",
    description: "Assisted in building data pipelines and optimizing data flow. Collaborated with the team to improve data quality and accessibility.",
    tech: ["Python", "SQL", "AWS"],
    current: false,
  },
  {
    company: "Headstarter AI",
    role: "Software Engineer Intern",
    period: "Aug 2024 - Sep 2024",
    description: "Developed features for the AI-powered platform using Next.js. Implemented responsive UI components and integrated APIs.",
    tech: ["Next.js", "React", "Tailwind CSS"],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "JECRC University",
    degree: "B.Tech in Computer Science",
    period: "2024 - 2028",
    location: "Jaipur, India",
    grade: "CGPA: 6.9"
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "Kisan Mitra",
    description: "One-stop digital companion that helps farmers track crops, weather, subsidies, and market rates in one place.",
    tags: ["Next.js", "Tailwind", "Farmer Tech"],
    link: "https://demo2-0.vercel.app/",
    preview: "/projects/kisaan.png"
  },
  {
    title: "Crypt",
    description: "Lightweight crypto tracker that keeps an eye on top coins, daily movements, and personalized watchlists.",
    tags: ["React", "Typescript", "API"],
    link: "#",
    github: "#",
    preview: "/projects/crypt .png"
  },
  {
    title: "Mindful — Your AI Therapist",
    description: "Guided support experience that blends CBT-inspired prompts with AI to help users reflect and journal safely.",
    tags: ["Next.js", "OpenAI", "UI"],
    link: "https://mindful-bice.vercel.app/",
    github: "https://github.com/shoryabansalgithub/mindful",
    preview: "/projects/mindful.png"
  },
  {
    title: "Spartan",
    description: "Browser extension for ChatGPT that lets you remix conversation backgrounds and vibe while you chat.",
    tags: ["Extension", "Tailwind", "UX"],
    github: "https://github.com/shoryabansalgithub/chatgpt-gradient-extension",
    preview: "/projects/damn.png"
  }
];

export const NOW_BUILDING = {
  title: "remoteIQ",
  description: "A mock interview platform",
  link: "#",
};

export const NOW_PLAYING = {
  song: "Lo-Fi Beats",
  artist: "Spotify",
  cover: "https://picsum.photos/id/10/200/200",
  link: "#"
};
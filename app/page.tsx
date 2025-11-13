'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, MapPin, Mail, Github, Linkedin, Twitter, ExternalLink, X, ChevronDown, ChevronUp, Code2, Database, Server, Palette, FileText, Video, Menu, Phone, MapPinned, Calendar } from 'lucide-react';
import Image from 'next/image';
import { SiTiktok } from "react-icons/si";
interface Education {
  school: string;
  degree: string;
  period: string;
  current: boolean;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  current: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

interface VisibilityState {
  [key: string]: boolean;
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [showAllEducation, setShowAllEducation] = useState<boolean>(false);
  const [showAllCertifications, setShowAllCertifications] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [showAllTimeline, setShowAllTimeline] = useState<boolean>(false);
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const fullText = 'Full Stack Web Developer';

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    // Typing animation
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Scroll progress
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = (totalScroll / windowHeight) * 100;
      setScrollProgress(scroll);
      setShowBackToTop(totalScroll > 500);
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => {
      clearInterval(typingInterval);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const handleShowMoreTimeline = () => {
    setAnimateItems(true);
    setTimeout(() => {
      setShowAllTimeline(!showAllTimeline);
      setAnimateItems(false);
    }, 300);
  };

  const education: Education[] = [
    {
      school: 'Northeaster Cebu Colleges',
      degree: 'Bachelor of Science in Information Technologies',
      period: '2025 - Current',
      current: false,
      description: 'Focus on Web Development'
    },

    {
      school: 'Northeaster Cebu Colleges',
      degree: 'Associate in Computer Technology',
      period: '2022 - 2024',
      current: false,
      description: 'Focus on Web Development and desktop application development'
    },

    {
      school: 'Compostela National Highschool Evening Class',
      degree: 'Senior High School - GAS ABM',
      period: '2021-2022',
      current: false,
      description: 'Accountancy, Business, and Management'
    }
  ];

  const certifications: Certification[] = [
    {
      name: 'Associate in Computer Technology',
      issuer: 'Northeaster Cebu Colleges',
      date: '2024',
      current: false
    },

    {
      name: 'High-School Demploma',
      issuer: 'Compostela National Highschool Evening Class',
      date: '2022',
      current: false
    },

  ];

  // Combine education and certifications into timeline
  const timeline = [
    ...education.map(edu => ({ ...edu, type: 'education' as const })),
    ...certifications.map(cert => ({
      school: cert.issuer,
      degree: cert.name,
      period: cert.date,
      current: cert.current,
      description: '',
      type: 'certification' as const
    }))
  ].sort((a, b) => {
    const yearA = parseInt(a.period.split('-').pop()?.trim() || a.period);
    const yearB = parseInt(b.period.split('-').pop()?.trim() || b.period);
    return yearB - yearA;
  });

  const projects: Project[] = [
    {
      id: 1,
      title: 'Museo',
      description: 'Museu is a visually stunning, responsive online gallery showcasing your diverse photography and graphic art collections through easily navigable, categorized sections enhanced with project details and a clear commission pathway.',
      tech: ['React', 'Tailwind'],
      link: 'https://marshall5368.github.io/Museo/',
      image: '/img/museo.PNG' // Add image path
    },
    {
      id: 2,
      title: 'Elevate',
      description: ' is a highly engaging, gamified learning system that transforms simple English skills tests into a structured platform featuring adaptive difficulty, tiered Skill Trees, and immediate contextual feedback to drive user mastery and community interaction.',
      tech: ['Javascript', 'HTML', 'CSS'],
      link: 'https://elevateedu2d.netlify.app/',
      image: '/img/elevcate.PNG' // Add image path
    },
    {
      id: 3,
      title: 'WORBO',
      description: 'WORBO, is a competitive, daily word-guessing game that challenges vocabulary and memory within six attempts and features a global leaderboard, daily streaks, and detailed rules for strategic play.',
      tech: ['Next.js', 'Supabase', 'TailwindCSS'],
      link: 'https://worboo.vercel.app/',
      image: '/img/Worbo.PNG' // Add image path
    },
    {
      id: 4,
      title: 'Pasahi',
      description: 'Pasahi is a peer-to-peer file sharing platform that utilizes WebRTC with TURN servers to ensure reliable connections, powered by Next.js and Supabase for server orchestration and user management.',
      tech: ['Nextjs', 'webRTC', 'TURN servers', 'Supabase', 'Tailwind'],
      link: '#',
      image: '/img/pasahi.PNG' // Add image path
    },
    {
      id: 5,
      title: 'Linya',
      description: 'Linya is a real-time queue management system built with Laravel Livewire, designed to streamline customer flow and automate ticket handling with dynamic, live-updating components.',
      tech: ['Laravel', 'Livewire', 'Mysql', 'Flux'],
      link: 'https://github.com/kayceelyoDev/linya_queManagementSystem.git',
      image: '/img/linya.PNG' // Add image path
    }
  ];

  const skills: Skill[] = [
    { name: 'HTML', icon: <Code2 size={20} />, category: 'frontend' },
    { name: 'CSS', icon: <Palette size={20} />, category: 'frontend' },
    { name: 'JavaScript', icon: <Code2 size={20} />, category: 'frontend' },
    { name: 'React', icon: <Code2 size={20} />, category: 'frontend' },
    { name: 'Next.js', icon: <Code2 size={20} />, category: 'frontend' },
    { name: 'MySQL', icon: <Database size={20} />, category: 'backend' },
    { name: 'PHP', icon: <Server size={20} />, category: 'backend' },
    { name: 'Laravel', icon: <Server size={20} />, category: 'backend' },
    { name: 'Supabase', icon: <Database size={20} />, category: 'backend' },
    { name: 'MS Office', icon: <FileText size={20} />, category: 'tools' },
    { name: 'Canva', icon: <Palette size={20} />, category: 'tools' },
    { name: 'Video Editing', icon: <Video size={20} />, category: 'tools' }
  ];

  const bgColor = darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-50';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const secondaryTextColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-800' : 'border-gray-200';
  const cardBg = darkMode ? 'bg-[#111111]' : 'bg-white';
  const hoverBg = darkMode ? 'hover:bg-[#1a1a1a]' : 'hover:bg-gray-100';

  const filteredSkills = activeSkillCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeSkillCategory);

  // Calculate animation delays for smooth staggered animations
  const getAnimationDelay = (index: number) => {
    const baseDelay = 100;
    return baseDelay * index;
  };

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-500 relative overflow-hidden`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[60]">
        <div
          className={`h-full ${darkMode ? 'bg-white' : 'bg-black'} transition-all duration-300`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 -left-40 w-80 h-80 ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} rounded-full mix-blend-multiply filter blur-3xl ${darkMode ? 'opacity-10' : 'opacity-20'} animate-blob`}></div>
        <div className={`absolute top-0 -right-40 w-80 h-80 ${darkMode ? 'bg-purple-500' : 'bg-purple-400'} rounded-full mix-blend-multiply filter blur-3xl ${darkMode ? 'opacity-10' : 'opacity-20'} animate-blob animation-delay-2000`}></div>
        <div className={`absolute -bottom-40 left-20 w-80 h-80 ${darkMode ? 'bg-pink-500' : 'bg-pink-400'} rounded-full mix-blend-multiply filter blur-3xl ${darkMode ? 'opacity-10' : 'opacity-20'} animate-blob animation-delay-4000`}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${cardBg} border-b ${borderColor} z-50 backdrop-blur-md bg-opacity-90 mt-1`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold tracking-tight"><h1>Kayceelyo</h1></div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className={`${secondaryTextColor} hover:${textColor} transition-colors text-sm font-medium`}>Home</a>
              <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className={`${secondaryTextColor} hover:${textColor} transition-colors text-sm font-medium`}>Skills</a>
              <a href="#education" onClick={(e) => handleNavClick(e, '#education')} className={`${secondaryTextColor} hover:${textColor} transition-colors text-sm font-medium`}>Education</a>
              <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className={`${secondaryTextColor} hover:${textColor} transition-colors text-sm font-medium`}>Projects</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className={`${secondaryTextColor} hover:${textColor} transition-colors text-sm font-medium`}>Contact</a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${hoverBg} transition-colors`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${hoverBg} transition-colors`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                className="p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-2">
              <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className={`block ${secondaryTextColor} hover:${textColor} py-2 text-sm font-medium`}>Home</a>
              <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className={`block ${secondaryTextColor} hover:${textColor} py-2 text-sm font-medium`}>Skills</a>
              <a href="#education" onClick={(e) => handleNavClick(e, '#education')} className={`block ${secondaryTextColor} hover:${textColor} py-2 text-sm font-medium`}>Education</a>
              <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className={`block ${secondaryTextColor} hover:${textColor} py-2 text-sm font-medium`}>Projects</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className={`block ${secondaryTextColor} hover:${textColor} py-2 text-sm font-medium`}>Contact</a>
            </div>
          )}
        </div>
      </nav>

     // Hero Section with Resume Download
      <section id="home" className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className={`grid md:grid-cols-2 gap-8 sm:gap-12 items-center transition-all duration-1000 ${isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="order-2 md:order-1">

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                Kent Clarence Evangelista
              </h1>
              <h2 className={`text-xl sm:text-2xl md:text-3xl ${secondaryTextColor} mb-3 sm:mb-4 h-10 sm:h-12`}>
                {typedText}<span className="animate-pulse">{typedText.length < fullText.length ? '|' : ''}</span>
              </h2>
              <div className={`flex items-center gap-2 ${secondaryTextColor} mb-4 sm:mb-6`}>
                <MapPin size={18} />
                <span className="text-sm sm:text-base">Cebu City, Philippines</span>
              </div>
              <p className={`text-base sm:text-lg ${secondaryTextColor} mb-6 sm:mb-8 leading-relaxed`}>
                Crafting modern web experiences with clean code and innovative solutions.
                Passionate about turning ideas into reality through technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    // Create a temporary anchor element to trigger download
                    const link = document.createElement('a');
                    link.href = '/doc/kent-clarence-resume.pdf'; // Update this path to your actual resume file
                    link.download = 'Kent-Clarence-Evangelista-Resume.pdf'; // File name when downloaded
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className={`px-6 sm:px-8 py-3 ${darkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-900'} rounded-lg font-medium transition-all duration-300 text-center text-sm sm:text-base flex items-center justify-center gap-2 hover:scale-105 shadow-lg`}
                >
                  <FileText size={18} />
                  Download Resume
                </button>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className={`px-6 sm:px-8 py-3 border-2 ${darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'} rounded-lg font-medium transition-all duration-300 text-center text-sm sm:text-base`}
                >
                  Get in Touch
                </a>


              </div>
            </div>
            <div className="flex justify-center order-1 md:order-2">
              <div className={`w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] aspect-square ${cardBg} rounded-2xl border ${borderColor} shadow-2xl overflow-hidden`}>
                <div className="w-full h-full">
                  <Image
                    src={'/img/profile.jpeg'}
                    alt='Kent Clarence Evangelista - Full Stack Web Developer'
                    width={480}
                    height={480}
                    className="w-full h-full object-cover object-center"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12">Skills & Technologies</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className={`${cardBg} p-6 sm:p-8 rounded-2xl border ${borderColor} transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Frontend Development</h3>
              <div className="space-y-3 sm:space-y-4">
                {skills.filter(s => s.category === 'frontend').map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3">
                    <div className={`p-2 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-lg flex-shrink-0`}>
                      {skill.icon}
                    </div>
                    <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${cardBg} p-6 sm:p-8 rounded-2xl border ${borderColor} transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Backend Development</h3>
              <div className="space-y-3 sm:space-y-4">
                {skills.filter(s => s.category === 'backend').map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3">
                    <div className={`p-2 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-lg flex-shrink-0`}>
                      {skill.icon}
                    </div>
                    <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${cardBg} p-6 sm:p-8 rounded-2xl border ${borderColor} transition-all duration-300 hover:scale-105 hover:shadow-xl sm:col-span-2 md:col-span-1`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Tools & Design</h3>
              <div className="space-y-3 sm:space-y-4">
                {skills.filter(s => s.category === 'tools').map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3">
                    <div className={`p-2 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-lg flex-shrink-0`}>
                      {skill.icon}
                    </div>
                    <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Education & Certification Timeline Section */}
      <section id="education" className={`py-16 sm:py-20 px-4 sm:px-6 relative z-10 ${cardBg} border-y ${borderColor}`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Education & Certifications</h2>
            <p className={`${secondaryTextColor} text-base sm:text-lg`}>
              My academic background and professional certifications
            </p>
          </div>

          <div className="relative">
            {/* Timeline vertical line */}
            <div className={`absolute left-6 md:left-8 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-white/20' : 'bg-black/20'} transition-all duration-500 ${showAllTimeline ? 'h-full' : 'h-48'}`}></div>

            <div className="space-y-8 sm:space-y-12">
              {(showAllTimeline ? timeline : timeline.slice(0, 2)).map((item, index) => (
                <div
                  key={index}
                  className={`relative pl-12 md:pl-16 transition-all duration-500 ${animateItems ? 'opacity-0 transform -translate-x-4' : 'opacity-100 transform translate-x-0'
                    }`}
                  style={{
                    transitionDelay: animateItems ? '0ms' : `${getAnimationDelay(index)}ms`
                  }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-6 md:left-8 top-2 w-3 h-3 rounded-full ${darkMode ? 'bg-white' : 'bg-black'} transform -translate-x-1/2 z-10 transition-all duration-300`}>
                    <div className={`absolute inset-0 rounded-full ${darkMode ? 'bg-white' : 'bg-black'} animate-ping opacity-20`}></div>
                  </div>

                  {/* Timeline content */}
                  <div className="group transition-all duration-300 hover:translate-x-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {item.type === 'education' ? (
                            <FileText size={20} className={darkMode ? 'text-white' : 'text-black'} />
                          ) : (
                            <Code2 size={20} className={darkMode ? 'text-white' : 'text-black'} />
                          )}
                          <h3 className="text-lg sm:text-xl font-bold transition-all duration-300 group-hover:scale-105">
                            {item.degree}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={16} className={secondaryTextColor} />
                          <p className={`${secondaryTextColor} text-sm sm:text-base font-medium`}>
                            {item.school}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1 transition-all duration-300 group-hover:scale-105">
                          <Calendar size={16} className={secondaryTextColor} />
                          <span className={`text-sm ${secondaryTextColor} font-medium`}>
                            {item.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 text-xs rounded-lg font-medium border transition-all duration-300 group-hover:scale-105 ${darkMode ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'}`}>
                        {item.type === 'education' ? 'Education' : 'Certification'}
                      </span>
                      {item.current && (
                        <span className={`px-3 py-1 text-xs rounded-lg font-medium transition-all duration-300 group-hover:scale-105 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                          Current
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className={`${secondaryTextColor} text-sm sm:text-base leading-relaxed transition-all duration-300 group-hover:translate-x-1`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {timeline.length > 2 && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleShowMoreTimeline}
                  className={`px-6 py-3 border-2 transition-all duration-500 transform ${showAllTimeline ? 'rotate-0' : 'rotate-0'
                    } ${darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'} rounded-lg font-medium text-sm sm:text-base inline-flex items-center gap-2 hover:scale-105 shadow-lg`}
                >
                  {showAllTimeline ? (
                    <>
                      <ChevronUp size={18} className="transition-transform duration-500" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} className="transition-transform duration-500" />
                      Show More ({timeline.length - 2} more)
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="hidden">
      </section>

      <section id="projects" className={`py-16 sm:py-20 px-4 sm:px-6 relative z-10 ${cardBg} border-y ${borderColor}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className={`${secondaryTextColor} mb-12 text-base sm:text-lg`}>
            A collection of projects I've worked on
          </p>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`${darkMode ? 'bg-[#1a1a1a]' : 'bg-white'} p-6 sm:p-8 rounded-2xl border ${borderColor} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group relative overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 ${darkMode ? 'bg-white' : 'bg-black'} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

                <div className="relative z-10">
                  <div className={`w-full h-40 sm:h-48 ${darkMode ? 'bg-[#0a0a0a]' : 'bg-gray-100'} rounded-xl mb-4 sm:mb-6 flex items-center justify-center ${secondaryTextColor} overflow-hidden group-hover:scale-105 transition-transform duration-300 relative`}>
                    <Image
                      src={project.image}
                      alt={`${project.title} - Project Preview`}
                      width={400}
                      height={240}
                      className="w-full h-full object-cover object-center"
                      priority={index < 2} // Prioritize loading first 2 images
                    />
                    {/* Fallback background in case image doesn't load */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 transition-colors">{project.title}</h3>
                  <p className={`${secondaryTextColor} mb-4 sm:mb-6 line-clamp-2 text-sm sm:text-base`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs ${darkMode ? 'bg-[#0a0a0a] group-hover:bg-white group-hover:text-black' : 'bg-gray-100 group-hover:bg-black group-hover:text-white'} rounded-lg font-medium transition-colors duration-300 border ${borderColor}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className={`${secondaryTextColor} text-base sm:text-lg max-w-2xl`}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* Contact Information Card */}
            <div className={`${cardBg} p-6 sm:p-8 rounded-2xl border ${borderColor} shadow-lg`}>
              <h3 className="text-xl sm:text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-lg flex-shrink-0`}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className={`${secondaryTextColor} text-sm mb-1`}>Email</p>
                    <a href="mailto:Kentclarence5368@gmail.com" className="font-medium hover:text-blue-500 transition-colors break-all">
                      Kentclarence5368@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-lg flex-shrink-0`}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className={`${secondaryTextColor} text-sm mb-1`}>Phone</p>
                    <a href="tel:+639605675738" className="font-medium hover:text-blue-500 transition-colors">
                      +63 9605675738
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`p-3 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-lg flex-shrink-0`}>
                    <MapPinned size={20} />
                  </div>
                  <div>
                    <p className={`${secondaryTextColor} text-sm mb-1`}>Address</p>
                    <p className="font-medium">
                      Compostela, Cebu<br />
                      Philippines
                    </p>
                  </div>
                </div>
              </div>

              <div className={`mt-8 pt-6 border-t ${borderColor}`}>
                <p className={`${secondaryTextColor} text-sm mb-4`}>Connect with me</p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/kayceelyoDev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-lg ${hoverBg} transition-all hover:scale-110`}
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kent-clarence-evangelista-98592036b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-lg ${hoverBg} transition-all hover:scale-110`}
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@kayceelyo.dev?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-lg ${hoverBg} transition-all hover:scale-110`}
                    aria-label="Twitter"
                  >
                    <SiTiktok size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className={`${cardBg} rounded-2xl border ${borderColor} shadow-lg overflow-hidden h-full min-h-[400px]`}>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125483.88094847433!2d123.98886887136948!3d10.459701894999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99fefcf895c6b%3A0x4028094f9c524c0!2sCompostela%2C%20Cebu!5e0!3m2!1sen!2sph!4v1699999999999!5m2!1sen!2sph&style=feature:all|element:geometry|color:${darkMode ? '0x1a1a1a' : '0xf5f5f5'}&style=feature:all|element:labels.text.fill|color:${darkMode ? '0x9ca3af' : '0x4b5563'}&style=feature:all|element:labels.text.stroke|color:${darkMode ? '0x0a0a0a' : '0xffffff'}&style=feature:road|element:geometry|color:${darkMode ? '0x111111' : '0xffffff'}&style=feature:water|element:geometry|color:${darkMode ? '0x000000' : '0xc9e9ff'}`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px', filter: darkMode ? 'invert(0.9) hue-rotate(180deg)' : 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 sm:py-8 px-4 sm:px-6 border-t ${borderColor} relative z-10`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4 text-center md:text-left">
            <p className={`${secondaryTextColor} text-sm`}>© 2025 Kayceelyo. All rights reserved.</p>

          </div>
        </div>
      </footer>

      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 sm:p-6 z-50 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
          <div className={`${cardBg} rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl border ${borderColor}`} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedProject(null)}
              className={`absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-lg ${hoverBg} transition-colors z-10`}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className={`w-full h-48 sm:h-64 ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} rounded-xl mb-6 sm:mb-8 flex items-center justify-center ${secondaryTextColor} overflow-hidden relative`}>
              <Image
                src={selectedProject.image}
                alt={`${selectedProject.title} - Project Preview`}
                width={600}
                height={320}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 pr-8">{selectedProject.title}</h3>
            <p className={`${secondaryTextColor} mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed`}>{selectedProject.description}</p>
            <div className="mb-6 sm:mb-8">
              <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Technologies Used</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {selectedProject.tech.map((tech) => (
                  <span key={tech} className={`px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base ${darkMode ? 'bg-[#1a1a1a]' : 'bg-gray-100'} border ${borderColor} rounded-xl font-medium`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={selectedProject.link}
              className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} rounded-xl font-medium transition-all hover:scale-105 shadow-lg text-sm sm:text-base`}
            >
              View Project <ExternalLink size={18} />
            </a>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 right-8 p-4 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'} rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40 group`}
          aria-label="Back to top"
        >
          <ChevronUp size={24} className="group-hover:animate-bounce" />
        </button>
      )}

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowRight, ArrowUpRight, Code2, Database, Server, Palette, FileText, Video, Github, Linkedin, Mail, Phone, MapPinned, Award, Scroll, GraduationCap, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

import profileImg from '../public/img/profile.jpeg';
import museoImg from '../public/img/museo.png';
import likhaImg from '../public/img/likha.png';
import edustructImg from '../public/img/edustruct.png';
import pasahiImg from '../public/img/pasahi.png';
import rmsImg from '../public/img/roomManagementSystem.png';
import crsImg from '../public/img/classroomScheduling.png';
import dokidoki from '../public/img/dokidoki.png';

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
  description: string;
  location?: string;
  type: 'recognition' | 'certificate';
  imageUrl?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: StaticImageData | string;
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  brandColor: string;
  brandTextColor: string;
  abbr: string;
  logoUrl?: string;
  invertInDark?: boolean;
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showAllTimeline, setShowAllTimeline] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkMode(storedTheme === 'dark');
    }

    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    if (selectedProject || selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, selectedCert]);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/doc/KentClarenceEvangelista.pdf'; 
    link.download = 'KentEvangelistaResume.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      name: 'Associate in Computer Technology (ACT)',
      issuer: 'Northeastern Cebu Colleges, Inc.',
      date: 'June 14, 2025',
      current: false,
      type: 'certificate',
      location: 'Danao City, Cebu, Philippines',
      description: 'Completed a 2-year program focused on computer systems, programming, and IT support, earning an Associate in Computer Technology.',
      imageUrl: '/img/certs/cert_act.jpg',
    },
    {
      name: 'Academic Excellence in Software Engineering',
      issuer: 'Northeastern Cebu Colleges, Inc.',
      date: 'June 9, 2026',
      current: false,
      type: 'recognition',
      location: 'Activity Center, Cambanay, Danao City',
      description: 'Honored for mastery of the complete software development lifecycle, applying Agile methodologies to architect and deploy comprehensive, multi-role web systems and full-stack management applications.',
      imageUrl: '/img/certs/cert_software_eng.jpg',
    },
    {
      name: 'Server-Side Technologies Distinction Award',
      issuer: 'Northeastern Cebu Colleges, Inc.',
      date: 'June 9, 2026',
      current: false,
      type: 'recognition',
      location: 'Activity Center, Cambanay, Danao City',
      description: 'Recognized for exceptional aptitude in backend architecture, demonstrating advanced proficiency in building secure APIs, managing complex database operations, and deploying robust server-side frameworks.',
      imageUrl: '/img/certs/cert_server_side.jpg',
    },
    {
      name: 'Top Performance in Game Programming and Design',
      issuer: 'Northeastern Cebu Colleges, Inc.',
      date: 'June 9, 2026',
      current: false,
      type: 'recognition',
      location: 'Activity Center, Cambanay, Danao City',
      description: 'Awarded for outstanding achievement in interactive media, utilizing the Godot Engine and custom scripting to design dynamic 2D/3D sandbox environments and procedural generation mechanics.',
      imageUrl: '/img/certs/cert_game_prog.jpg',
    },
  ];

  const timeline = [
    ...education.map(edu => ({ ...edu, type: 'education' as const })),
  ].sort((a, b) => {
    const yearA = parseInt(a.period.split('-').pop()?.trim() || a.period);
    const yearB = parseInt(b.period.split('-').pop()?.trim() || b.period);
    return yearB - yearA;
  });

  const projects: Project[] = [
    {
      id: 1,
      title: 'Doki Doki',
      description: 'Doki Doki is a web application that has all around tools like background removal, file compression, and pdf merging, and more.',
      tech: ['React', 'Tailwind'],
      link: 'https://dokidokis.vercel.app/',
      image: dokidoki
    },
    {
      id: 2,
      title: 'Likha',
      description: 'likha is a web application that combines google forms, google classrooms, and notebookLm to provide a seamless platform for assignments.',
      tech: ['Javascript', 'HTML', 'CSS'],
      link: 'https://learnlikha.vercel.app/',
      image: likhaImg
    },
    {
      id: 3,
      title: 'EduStruct',
      description: 'EduStruct is lesson plan generator web application that utilizes Gemini AI to assist educators in creating structured and effective lesson plans.',
      tech: ['Next.js', 'Gemini AI', 'TailwindCSS'],
      link: 'https://edustructs.vercel.app/',
      image: edustructImg
    },
    {
      id: 4,
      title: 'Pasahi',
      description: 'Pasahi is a peer-to-peer file sharing platform that utilizes WebRTC with TURN servers to ensure reliable connections.',
      tech: ['Nextjs', 'webRTC', 'TURN servers', 'Supabase', 'Tailwind'],
      link: '#',
      image: pasahiImg
    },
    {
      id: 5,
      title: 'Room Management System',
      description: 'Room Management System is a web application that allows users to manage and book rooms efficiently, built with Laravel and React, featuring a MySQL database.',
      tech: ['Laravel', 'React', 'Mysql', 'Type Script'],
      link: 'https://rmsestaca.laravel.cloud/',
      image: rmsImg
    },
    {
      id: 6,
      title: 'Class Room Scheduling System',
      description: 'A comprehensive classroom scheduling system built with Laravel and Blade, featuring a MySQL database.',
      tech: ['Laravel', 'Blade', 'Mysql', 'Alpine.js', 'Tailwind'],
      link: 'https://schoolroomscheduling.laravel.cloud/',
      image: crsImg
    },
  ];

  const skills: Skill[] = [
    {
      name: 'HTML', category: 'frontend', abbr: 'HT',
      icon: <Code2 size={18} />, brandColor: '#e34f26', brandTextColor: '#fff',
      logoUrl: 'https://skillicons.dev/icons?i=html',
    },
    {
      name: 'CSS', category: 'frontend', abbr: 'CS',
      icon: <Palette size={18} />, brandColor: '#1572b6', brandTextColor: '#fff',
      logoUrl: 'https://skillicons.dev/icons?i=css',
    },
    {
      name: 'JavaScript', category: 'frontend', abbr: 'JS',
      icon: <Code2 size={18} />, brandColor: '#f7df1e', brandTextColor: '#000',
      logoUrl: 'https://skillicons.dev/icons?i=js',
    },
    {
      name: 'React', category: 'frontend', abbr: 'Re',
      icon: <Code2 size={18} />, brandColor: '#087ea4', brandTextColor: '#fff',
      logoUrl: 'https://skillicons.dev/icons?i=react',
    },
    {
      name: 'Next.js', category: 'frontend', abbr: 'N•',
      icon: <Code2 size={18} />, brandColor: '#111111', brandTextColor: '#fff',
      logoUrl: 'https://skillicons.dev/icons?i=nextjs',
    },
    {
      name: 'MySQL', category: 'backend', abbr: 'My',
      icon: <Database size={18} />, brandColor: '#4479a1', brandTextColor: '#fff',
      logoUrl: 'https://skillicons.dev/icons?i=mysql',
    },
    {
      name: 'PHP', category: 'backend', abbr: 'PH',
      icon: <Server size={18} />, brandColor: '#777bb4', brandTextColor: '#fff',
      logoUrl: 'https://skillicons.dev/icons?i=php',
    },
    {
      name: 'Laravel', category: 'backend', abbr: 'La',
      icon: <Server size={18} />, brandColor: '#ff2d20', brandTextColor: '#fff',
      logoUrl: 'https://skillicons.dev/icons?i=laravel',
    },
    {
      name: 'Node.js', category: 'backend', abbr: 'No',
      icon: <Server size={18} />, brandColor: '#339933', brandTextColor: '#fff',
      logoUrl: 'https://skillicons.dev/icons?i=nodejs',
    },
    {
      name: 'Supabase', category: 'backend', abbr: 'Su',
      icon: <Database size={18} />, brandColor: '#3ecf8e', brandTextColor: '#fff',
      logoUrl: 'https://skillicons.dev/icons?i=supabase',
    },
    {
      name: 'MS Office', category: 'tools', abbr: 'Ms',
      icon: <FileText size={18} />, brandColor: '#d83b01', brandTextColor: '#fff',
    },
    {
      name: 'Canva', category: 'tools', abbr: 'Cv',
      icon: <Palette size={18} />, brandColor: '#00c4cc', brandTextColor: '#fff',
    },
    {
      name: 'Video Editing', category: 'tools', abbr: 'VE',
      icon: <Video size={18} />, brandColor: '#7c3aed', brandTextColor: '#fff',
    },
  ];

  const bgColor = darkMode ? 'bg-[#191919]' : 'bg-[#ffffff]';
  const textColor = darkMode ? 'text-[#ffffff]' : 'text-[#37352f]';
  const grayText = darkMode ? 'text-[#9b9a97]' : 'text-[#787774]'; // Notion style gray emphasis
  const mutedText = darkMode ? 'text-[#9b9a97]' : 'text-[#787774]';
  const borderColor = darkMode ? 'border-[#2f2f2f]' : 'border-[#e9e9e7]';
  const invertBg = darkMode ? 'bg-[#ffffff] text-[#191919]' : 'bg-[#37352f] text-[#ffffff]';
  const pillOutline = darkMode ? 'border-[#ffffff] hover:bg-[#ffffff] hover:text-[#191919]' : 'border-[#37352f] hover:bg-[#37352f] hover:text-[#ffffff]';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300 font-sans selection:bg-[#a3a3a3] selection:text-white`}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? (darkMode ? 'bg-[#191919]/80 backdrop-blur-md border-b border-[#262626]' : 'bg-[#ffffff]/80 backdrop-blur-md border-b border-[#e5e5e5]') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-xl sm:text-2xl font-bold tracking-tight">kayceelyo.</a>
            
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={toggleTheme}
                className={`w-10 h-10 rounded-full flex items-center justify-center border ${borderColor} transition-colors`}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <button
                onClick={handleDownloadResume}
                className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border ${borderColor} text-sm font-medium transition-all ${pillOutline}`}
              >
                Download Resume <ArrowRight size={16} />
              </button>

              <button
                className={`relative w-10 h-10 rounded-full flex items-center justify-center border ${borderColor} z-50`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileMenuOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed inset-0 z-40 pt-24 px-6 ${bgColor} ${textColor} flex flex-col`}
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                }
              }}
              className="flex flex-col text-3xl font-medium tracking-tight space-y-6"
            >
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Education', href: '#education' },
                { name: 'Certifications', href: '#certifications' },
                { name: 'Works', href: '#works' },
                { name: 'Contact', href: '#contact' }
              ].map((item) => (
                <motion.a 
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)} 
                  className="hover:opacity-60 transition-opacity"
                >
                  {item.name}
                </motion.a>
              ))}
              
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                onClick={handleDownloadResume}
                className={`mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-full ${invertBg} text-lg font-medium`}
              >
                Download Resume <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6">
        
        {/* Hero Section */}
        <motion.section 
          id="home" 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-40 sm:pt-48 pb-20 sm:pb-32 flex flex-col justify-center min-h-[85vh]"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-6">Hello! I'm Kent Clarence.</p>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.2 }
              }
            }}
            className="text-[12vw] sm:text-[8vw] md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[1.05] tracking-tighter max-w-[1400px]"
          >
            {"Crafting modern web experiences with emphasis on".split(" ").map((word, i) => (
              <motion.span 
                key={i} 
                className="inline-block px-1 -mx-1 mr-[0.25em] rounded-md"
                variants={{
                  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: 'blur(0px)', 
                    backgroundColor: ['transparent', darkMode ? '#2f2f2f' : '#e9e9e7', 'transparent'],
                    transition: { 
                      opacity: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
                      y: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
                      filter: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
                      backgroundColor: { duration: 0.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut", delay: i * 0.15 }
                    } 
                  }
                }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span 
              className={`inline-block px-1 -mx-1 rounded-md ${grayText}`}
              variants={{
                hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  filter: 'blur(0px)', 
                  backgroundColor: ['transparent', darkMode ? '#2f2f2f' : '#e9e9e7', 'transparent'],
                  transition: { 
                    opacity: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
                    y: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
                    filter: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
                    backgroundColor: { duration: 0.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut", delay: 7 * 0.15 }
                  } 
                }
              }}
            >
              clean code
            </motion.span>
          </motion.h1>
          
          <div className="mt-16 sm:mt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-t pt-8 border-transparent sm:border-current sm:border-opacity-10 dark:sm:border-opacity-20">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full ${invertBg} font-medium text-lg transition-transform hover:scale-[1.02]`}
            >
              Let's Talk <ArrowRight size={20} />
            </a>
            
            <p className={`text-base sm:text-lg md:text-xl max-w-md font-medium ${mutedText}`}>
              A full stack developer passionate about turning ideas into reality through technology and robust solutions.
            </p>
          </div>
        </motion.section>

        {/* About Section (Profile Image moved here) */}
        <motion.section 
          id="about" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-20 sm:py-32 border-t border-opacity-10 border-current dark:border-opacity-20"
        >
          <div className="grid md:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">About me</h2>
              <div className="space-y-6 text-lg sm:text-xl leading-relaxed">
                <p>
                  I am Kent Clarence Evangelista, a Full Stack Web Developer based in Cebu City, Philippines.
                </p>
                <p className={grayText}>
                  I specialize in both frontend and backend development, utilizing technologies like React, Next.js, Laravel, and MySQL to build scalable and efficient applications.
                </p>
                <p>
                  Whether it's designing a visually stunning interface or architecting a robust database, I am dedicated to delivering high-quality digital products.
                </p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden transition-all duration-700 shadow-2xl aspect-[4/5] hover:scale-[1.02]">
                <Image
                  src={profileImg}
                  alt="Kent Clarence Evangelista"
                  fill
                  sizes="(max-width: 640px) 100vw, 500px"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-20 sm:py-32 border-t border-opacity-10 border-current dark:border-opacity-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Skills</h2>
          <p className={`text-lg mb-16 ${mutedText}`}>Technologies and tools I work with.</p>

          <div className="space-y-14">
            {(['frontend', 'backend', 'tools'] as const).map((cat) => (
              <div key={cat}>
                <h3 className={`text-sm uppercase tracking-widest font-semibold mb-8 ${mutedText}`}>
                  {cat === 'frontend' ? 'Frontend' : cat === 'backend' ? 'Backend' : 'Tools & Others'}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {skills.filter(s => s.category === cat).map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl border ${
                        borderColor
                      } transition-all duration-200 hover:shadow-md ${
                        darkMode ? 'hover:border-[#4a4a4a] hover:bg-[#1e1e1e]' : 'hover:border-[#c5c5c3] hover:bg-[#fafaf9]'
                      }`}
                    >
                      {/* Logo or fallback badge */}
                      {skill.logoUrl ? (
                        <img
                          src={skill.logoUrl}
                          alt={skill.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 shrink-0 object-contain rounded-md"
                        />
                      ) : (
                        <span
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 select-none"
                          style={{ backgroundColor: skill.brandColor, color: skill.brandTextColor }}
                        >
                          {skill.abbr}
                        </span>
                      )}
                      <span className="text-sm font-semibold">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-20 sm:py-32 border-t border-opacity-10 border-current dark:border-opacity-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Education</h2>
          <p className={`text-lg mb-16 ${mutedText}`}>My academic background and learning journey.</p>

          <div className="space-y-0">
            <AnimatePresence initial={false}>
              {(showAllTimeline ? timeline : timeline.slice(0, 3)).map((item, index) => (
                <motion.div
                  key={item.degree + item.school + index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className={`flex gap-5 sm:gap-8 pb-10 pt-2 ${
                    index !== (showAllTimeline ? timeline.length : 3) - 1 ? 'border-b ' + borderColor : ''
                  }`}>
                    {/* Icon column */}
                    <div className="flex flex-col items-center pt-1">
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        item.type === 'education'
                          ? darkMode ? 'border-[#3a3a3a] bg-[#242424]' : 'border-[#e0e0dd] bg-[#f4f4f3]'
                          : darkMode ? 'border-amber-400/30 bg-amber-400/10' : 'border-amber-400/40 bg-amber-50'
                      }`}>
                        {item.type === 'education'
                          ? <GraduationCap size={16} className={mutedText} />
                          : <BookOpen size={16} className={darkMode ? 'text-amber-300' : 'text-amber-600'} />
                        }
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-2">
                      <div className="flex justify-between items-start flex-col sm:flex-row gap-2 sm:gap-4 mb-1.5">
                        <h3 className="text-xl sm:text-2xl font-bold">{item.degree}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${borderColor} ${mutedText} whitespace-nowrap`}>
                          {item.period}
                        </span>
                      </div>
                      <p className={`text-base font-semibold mb-1 ${grayText}`}>{item.school}</p>
                      {item.description && (
                        <p className={`text-sm ${mutedText}`}>{item.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {timeline.length > 3 && (
              <button
                onClick={() => setShowAllTimeline(!showAllTimeline)}
                className="mt-6 text-base font-medium flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                {showAllTimeline ? 'Show Less' : 'Show All'}{' '}
                <ArrowRight size={18} className={showAllTimeline ? '-rotate-90' : 'rotate-90'} style={{ transition: 'transform 0.3s' }} />
              </button>
            )}
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section
          id="certifications"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-20 sm:py-32 border-t border-opacity-10 border-current dark:border-opacity-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Certifications</h2>
          <p className={`text-lg mb-16 ${mutedText}`}>Academic recognitions and credentials earned throughout my studies.</p>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {certifications.map((cert, index) => (
              <motion.button
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedCert(cert)}
                className={`relative rounded-2xl border ${borderColor} p-8 flex flex-col gap-4 overflow-hidden text-left w-full transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  darkMode ? 'hover:border-[#4a4a4a] hover:bg-[#1e1e1e]' : 'hover:border-[#c5c5c3] hover:bg-[#fafaf9]'
                }`}
              >
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 ${
                  cert.type === 'recognition'
                    ? darkMode ? 'bg-amber-400' : 'bg-amber-500'
                    : darkMode ? 'bg-sky-400' : 'bg-sky-500'
                }`} />

                {/* Badge row */}
                <div className="flex items-center justify-between gap-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${
                    cert.type === 'recognition'
                      ? darkMode
                        ? 'border-amber-400/40 text-amber-300 bg-amber-400/10'
                        : 'border-amber-500/40 text-amber-700 bg-amber-50'
                      : darkMode
                      ? 'border-sky-400/40 text-sky-300 bg-sky-400/10'
                      : 'border-sky-500/40 text-sky-700 bg-sky-50'
                  }`}>
                    {cert.type === 'recognition' ? <Award size={12} /> : <Scroll size={12} />}
                    {cert.type === 'recognition' ? 'Recognition' : 'Certificate'}
                  </span>
                  <span className={`text-sm font-medium whitespace-nowrap ${mutedText}`}>{cert.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">{cert.name}</h3>

                {/* Issuer */}
                <p className={`text-base font-semibold ${grayText}`}>{cert.issuer}</p>

                {/* Location */}
                {cert.location && (
                  <p className={`text-sm flex items-center gap-1.5 ${mutedText}`}>
                    <MapPinned size={14} className="shrink-0" />
                    {cert.location}
                  </p>
                )}

                <div className={`border-t ${borderColor}`} />

                <p className={`text-sm leading-relaxed ${mutedText}`}>{cert.description}</p>

                {/* View hint */}
                {cert.imageUrl && (
                  <p className={`text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 mt-auto pt-2 ${
                    cert.type === 'recognition'
                      ? darkMode ? 'text-amber-400' : 'text-amber-600'
                      : darkMode ? 'text-sky-400' : 'text-sky-600'
                  }`}>
                    <ArrowUpRight size={13} /> View Certificate
                  </p>
                )}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Selected Works (Projects) */}
        <motion.section
          id="works"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-20 sm:py-32 border-t border-opacity-10 border-current dark:border-opacity-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-16 sm:mb-24">Selected works</h2>

          <div className="grid sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-16 sm:gap-y-24">
            {projects.map((project, index) => (
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                key={project.id}
                className={`group block text-left w-full ${index % 2 !== 0 ? 'sm:mt-24' : ''}`}
              >
                <div className={`relative w-full rounded-3xl overflow-hidden mb-6 ${darkMode ? 'bg-[#111111]' : 'bg-[#f5f5f5]'} aspect-[4/3]`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 600px"
                    className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">{project.title}</h3>
                    <p className={`text-lg ${mutedText} line-clamp-2 mb-4`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className={`px-3 py-1 text-sm font-medium rounded-full border ${borderColor} ${grayText}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="py-32 sm:py-48 border-t border-opacity-10 border-current dark:border-opacity-20 text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 sm:mb-12"
          >
            Let's work <br className="hidden sm:block" />
            <span className={grayText}>together.</span>
          </motion.h2>
          
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Kentclarence5368@gmail.com" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-12 py-4 sm:py-6 rounded-full ${invertBg} text-sm sm:text-xl md:text-2xl font-medium transition-transform hover:scale-105 mb-16 sm:mb-24 w-[90%] sm:w-auto max-w-full mx-auto`}>
            <span className="truncate">Kentclarence5368@gmail.com</span> <ArrowUpRight className="shrink-0" size={24} />
          </a>

          <div className="grid sm:grid-cols-3 gap-8 text-left max-w-4xl mx-auto border-t border-opacity-10 border-current pt-12 dark:border-opacity-20">
            <div>
              <p className={`text-sm uppercase tracking-widest font-medium mb-4 ${mutedText}`}>Socials</p>
              <div className="flex flex-col gap-3 text-lg font-medium">
                <a href="https://github.com/kayceelyoDev" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 flex items-center gap-2"><Github size={18}/> Github</a>
                <a href="https://www.linkedin.com/in/kayceelyodev/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 flex items-center gap-2"><Linkedin size={18}/> LinkedIn</a>
              </div>
            </div>
            <div>
              <p className={`text-sm uppercase tracking-widest font-medium mb-4 ${mutedText}`}>Contact</p>
              <div className="flex flex-col gap-3 text-lg font-medium">
                <a href="tel:+639605675738" className="hover:opacity-60 flex items-center gap-2"><Phone size={18}/> +63 9605675738</a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Kentclarence5368@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 flex items-center gap-2"><Mail size={18}/> Email Me</a>
              </div>
            </div>
            <div>
              <p className={`text-sm uppercase tracking-widest font-medium mb-4 ${mutedText}`}>Location</p>
              <div className="flex flex-col gap-3 text-lg font-medium">
                <span className="flex items-start gap-2"><MapPinned size={18} className="mt-1 shrink-0"/> Compostela, Cebu<br/>Philippines</span>
              </div>
            </div>
          </div>
        </motion.section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${bgColor} ${textColor} border ${borderColor} shadow-2xl flex flex-col md:flex-row`}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full ${darkMode ? 'bg-[#2f2f2f] hover:bg-[#3f3f3f]' : 'bg-[#f7f6f3] hover:bg-[#e9e9e7]'} transition-colors`}
              >
                <X size={20} />
              </button>
              
              {/* Image Side */}
              <div className={`w-full md:w-1/2 p-6 flex items-center justify-center ${darkMode ? 'bg-[#111111]' : 'bg-[#f7f6f3]'}`}>
                <div className="relative w-full aspect-video md:aspect-square rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{selectedProject.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className={`px-3 py-1 text-sm font-medium rounded-full border ${borderColor} ${grayText}`}>
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p className={`text-lg leading-relaxed ${mutedText} mb-12`}>
                  {selectedProject.description}
                </p>
                
                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  {selectedProject.link !== '#' && (
                    <a 
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 inline-flex items-center justify-center gap-2 py-4 rounded-xl ${invertBg} font-medium transition-transform hover:scale-[1.02]`}
                    >
                      Visit Project <ArrowUpRight size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${bgColor} ${textColor} border ${borderColor} shadow-2xl flex flex-col md:flex-row`}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full ${darkMode ? 'bg-[#2f2f2f] hover:bg-[#3f3f3f]' : 'bg-[#f7f6f3] hover:bg-[#e9e9e7]'} transition-colors`}
              >
                <X size={20} />
              </button>

              {/* Certificate Image */}
              {selectedCert.imageUrl && (
                <div className={`w-full md:w-3/5 p-6 flex items-center justify-center ${darkMode ? 'bg-[#111111]' : 'bg-[#f7f6f3]'}`}>
                  <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/3' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedCert.imageUrl}
                      alt={selectedCert.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Details Side */}
              <div className="w-full md:w-2/5 p-8 sm:p-10 flex flex-col justify-center gap-4">
                {/* Badge */}
                <span className={`self-start inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full border ${
                  selectedCert.type === 'recognition'
                    ? darkMode ? 'border-amber-400/40 text-amber-300 bg-amber-400/10' : 'border-amber-500/40 text-amber-700 bg-amber-50'
                    : darkMode ? 'border-sky-400/40 text-sky-300 bg-sky-400/10' : 'border-sky-500/40 text-sky-700 bg-sky-50'
                }`}>
                  {selectedCert.type === 'recognition' ? <Award size={12} /> : <Scroll size={12} />}
                  {selectedCert.type === 'recognition' ? 'Recognition' : 'Certificate'}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">{selectedCert.name}</h3>
                <p className={`text-base font-semibold ${grayText}`}>{selectedCert.issuer}</p>

                {selectedCert.location && (
                  <p className={`text-sm flex items-center gap-1.5 ${mutedText}`}>
                    <MapPinned size={14} className="shrink-0" /> {selectedCert.location}
                  </p>
                )}

                <p className={`text-sm flex items-center gap-1.5 font-medium ${mutedText}`}>
                  {selectedCert.date}
                </p>

                <div className={`border-t ${borderColor}`} />

                <p className={`text-sm leading-relaxed ${mutedText}`}>{selectedCert.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </main>
      
      <footer className={`py-8 text-center text-sm font-medium ${mutedText} border-t border-opacity-10 border-current dark:border-opacity-20`}>
        <p>© {new Date().getFullYear()} Kayceelyo. All rights reserved.</p>
      </footer>

    </div>
  );
}
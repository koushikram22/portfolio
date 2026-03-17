import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Github, Linkedin, Mail, Download, ExternalLink, 
  Award, Code2, Users, Zap 
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  demo: string;
}

interface SkillCategory {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: 1,
    title: "CureCraft",
    description: "Healthcare platform with OCR prescription detection using Tesseract.js, PHP, and MySQL. Revolutionizing medical record management.",
    image: "/images/curecraft.jpg",
    tech: ["Tesseract.js", "PHP", "MySQL", "Tailwind"],
    demo: "#"
  },
  {
    id: 2,
    title: "Backbenchers Unite",
    description: "Comprehensive educational platform featuring mock tests, academic resources, and community features for engineering students.",
    image: "/images/backbenchers.jpg",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    demo: "#"
  },
  {
    id: 3,
    title: "The Shoe Company",
    description: "Premium responsive e-commerce website for a luxury shoe brand with immersive product experiences and smooth animations.",
    image: "/images/shoecompany.png",
    tech: ["React", "Tailwind CSS", "JavaScript", "Framer Motion"],
    demo: "https://kr-shoe-company.vercel.app"
  }
];

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Java", "JavaScript", "TypeScript", "SQL", "Python"],
    icon: <Code2 className="w-6 h-6" />
  },
  {
    title: "Frameworks & Tools",
    skills: ["React", "Tailwind CSS", "Node.js", "Express", "Next.js"],
    icon: <Zap className="w-6 h-6" />
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Netlify", "MySQL"],
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Soft Skills",
    skills: ["Leadership", "Problem Solving", "Critical Thinking", "Team Collaboration", "Agile Methodologies"],
    icon: <Award className="w-6 h-6" />
  }
];

const achievements = [
  {
    title: "2nd Place • Code Verse 2025",
    desc: "OCR-based healthcare application",
    icon: <Award className="w-8 h-8 text-[#00E5FF]" />
  },
  {
    title: "Shortlisted • ThinkQbator 2024",
    desc: "Innovative project idea presentation",
    icon: <Award className="w-8 h-8 text-[#00E5FF]" />
  }
];

const certifications = [
  { 
    name: "Cloud Computing", 
    org: "NPTEL", 
    icon: "☁️",
    link: "/certificates/cloud-computing.pdf"
  },
  { 
    name: "Artificial Intelligence", 
    org: "Infosys Springboard", 
    icon: "🤖",
    link: "/certificates/ai.pdf"
  },
  { 
    name: "Java Programming", 
    org: "IBM SkillsBuild", 
    icon: "☕",
    link: "/certificates/java.pdf"
  },
  { 
    name: "JavaScript Mastery", 
    org: "IBM SkillsBuild", 
    icon: "🟨",
    link: "/certificates/javascript.pdf"
  }
];

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * -25,
      size: Math.random() * 4 + 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.4 + Math.random() * 0.3
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Scroll handler for navbar and progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch("https://formspree.io/f/xkoqqzgd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  });

  if (response.ok) {
    setIsSubmitted(true);
    setShowToast(true);

    setFormData({
      name: "",
      email: "",
      message: ""
    });

    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  } else {
    alert("Failed to send message.");
  }
};

  const downloadResume = () => {
  const link = document.createElement("a");
  link.href = "/resume.pdf";
  link.download = "Koushik_Ram_Addagarla_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setShowToast(true);
  setTimeout(() => setShowToast(false), 2200);
};

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <div className="bg-[#000000] text-white overflow-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/10 z-[100]">
        <div 
          className="h-full bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] transition-all duration-150" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[99] transition-all duration-500 ${isScrolled ? 'glass' : 'bg-black/70'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] flex items-center justify-center">
              <span className="text-black font-bold text-xl tracking-tighter">KR</span>
            </div>
            <div>
              <div className="font-semibold tracking-tight text-xl">Koushik Ram</div>
              <div className="text-[10px] text-white/50 -mt-1">ADDAGARLA</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[2px]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className="nav-link cursor-pointer text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social + Contact */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/koushikram22" target="_blank" className="p-2 text-white/70 hover:text-[#00E5FF] transition-colors">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/koushik-ram-addagarla/" target="_blank" className="p-2 text-white/70 hover:text-[#00E5FF] transition-colors">
              <Linkedin size={18} />
            </a>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 text-sm border border-white/30 rounded-full hover:bg-white hover:text-black transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.985 }}
            >
              LET'S TALK
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-3 text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/10"
            >
              <div className="px-6 py-8 flex flex-col gap-6 text-lg">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                    className="py-1 border-b border-white/10 last:border-none"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 flex gap-6">
                  <a href="https://github.com" target="_blank"><Github /></a>
                  <a href="https://linkedin.com" target="_blank"><Linkedin /></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen relative flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] bg-[length:4px_4px]"></div>
        
        <ParticleBackground />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-3 px-5 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm tracking-[3px]"
          >
            HYDERABAD, INDIA
          </motion.div>

          <h1 className="text-[92px] md:text-[130px] font-semibold tracking-tighter leading-[0.92] mb-8">
            KOUSHIK RAM<br />ADDAGARLA
          </h1>

          <div className="max-w-lg mx-auto mb-12">
            <p className="text-3xl md:text-4xl font-light tracking-tight text-white/90">
              Software Developer
            </p>
            <p className="mt-4 text-xl text-white/60">
              Crafting exceptional digital experiences with code and creativity
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.button 
              onClick={() => scrollToSection('projects')}
              className="group px-10 py-5 rounded-2xl border border-[#00E5FF] text-[#00E5FF] flex items-center justify-center gap-3 text-sm uppercase tracking-[3px] hover:bg-[#00E5FF] hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
            >
              EXPLORE WORK
              <ExternalLink className="group-hover:rotate-45 transition" />
            </motion.button>

            <motion.button 
              onClick={downloadResume}
              className="group px-10 py-5 rounded-2xl bg-white text-black flex items-center justify-center gap-3 text-sm uppercase tracking-[3px] hover:bg-white/90 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.985 }}
            >
              <Download className="group-hover:-translate-y-0.5 transition" /> RESUME
            </motion.button>
          </div>

          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 3.2, repeat: Infinity }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center text-[10px] tracking-[3px] text-white/40"
          >
            SCROLL TO BEGIN
            <div className="w-px h-12 bg-white/30 mt-3" />
          </motion.div>
        </div>

        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-28 border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="uppercase tracking-[3px] text-sm mb-4 text-white/50">CHAPTER 01 — ORIGINS</div>
            <h2 className="section-title text-7xl md:text-8xl font-semibold tracking-tighter mb-9">
              THE STORY
            </h2>
            
            <div className="space-y-8 text-lg leading-relaxed text-white/80 max-w-[38ch]">
              <p>
                B.Tech Computer Science student at MLR Institute of Technology with a passion for building intuitive and scalable digital platforms.
              </p>
              <p>
                I specialize in full-stack development, AI-driven applications, and creating delightful user experiences that captivate audiences.
              </p>
            </div>

            <div className="mt-12 flex gap-4">
              <div className="px-6 py-3 border border-white/20 text-sm">CURRENTLY EXPLORING AI</div>
              <div className="px-6 py-3 border border-white/20 text-sm">CLOUD NATIVE</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 relative">
              <img 
                src="/images/koushik profile.jpg" 
                alt="Koushik Ram Addagarla" 
                className="w-full h-full object-cover grayscale-[0.3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>
            
            <div className="absolute -bottom-12 -right-12 glass px-7 py-6 rounded-2xl border border-white/10 max-w-[260px]">
              <div className="text-[#00E5FF] text-xs tracking-widest mb-2">CURRENT FOCUS</div>
              <div className="text-2xl font-light leading-tight">Building next-gen platforms that blend beautiful interfaces with powerful functionality.</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="bg-black py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <div className="uppercase text-xs tracking-[3px] text-[#00E5FF]">CHAPTER 02</div>
              <h2 className="section-title text-7xl font-semibold tracking-[-3px]">EXPERTISE</h2>
            </div>
            <div className="hidden md:block text-right max-w-xs text-sm text-white/60">
              Constantly evolving my toolkit to stay at the cutting edge of modern web development
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-9 rounded-3xl group"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="text-[#00E5FF]">{category.icon}</div>
                  <div className="text-xs uppercase tracking-widest pt-1 text-white/50">{category.title}</div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,229,255,0.1)' }}
                      className="px-6 py-2.5 border border-white/20 rounded-full text-sm transition-all hover:border-[#00E5FF] hover:text-[#00E5FF]"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-28 border-t border-white/10">
        <div className="mb-16">
          <div className="text-xs uppercase tracking-[4px] text-[#00E5FF] mb-3">CHAPTER 03 — SELECTED WORK</div>
          <h2 className="text-7xl font-semibold tracking-tight">Featured Projects</h2>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="project-card group bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col lg:flex-row"
            >
              <div className="lg:w-5/12 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-left transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>
              
              <div className="lg:w-7/12 p-12 lg:p-16 flex flex-col">
                <div className="uppercase tracking-[3px] text-xs mb-3 text-white/50">PROJECT {String(index+1).padStart(2,'0')}</div>
                
                <h3 className="text-6xl font-semibold tracking-tighter mb-7">{project.title}</h3>
                
                <p className="text-xl text-white/70 max-w-md mb-auto">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-12">
                  {project.tech.map((tech, i) => (
                    <div key={i} className="text-xs px-5 py-1 bg-white/5 rounded-full border border-white/10">{tech}</div>
                  ))}
                </div>

                <div className="mt-auto pt-12 flex gap-4">
                  <motion.a 
                    href={project.demo} 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => { if (project.demo === '#') e.preventDefault(); }}
                    className="px-8 py-3 bg-white hover:bg-white/90 text-black flex items-center justify-center gap-3 rounded-xl text-sm font-medium transition-all w-fit"
                    whileHover={{ scale: 1.05 }}
>
                    LIVE DEMO <ExternalLink size={14} />
                    </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="py-24 border-t border-white/10 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[4px] text-[#00E5FF]">CHAPTER 04</div>
            <h2 className="text-7xl font-semibold tracking-tight mt-2">Recognition</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((ach, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="glass p-14 rounded-3xl group hover:border-[#00E5FF]/30 transition-all"
              >
                <div className="mb-9">{ach.icon}</div>
                <div className="text-5xl font-light tracking-tight leading-none mb-8">{ach.title}</div>
                <p className="text-lg text-white/80">{ach.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-[#00E5FF]">CHAPTER 05</div>
            <h3 className="text-6xl tracking-tight font-medium">Certifications</h3>
          </div>
          <div className="text-sm text-white/60 max-w-xs hidden md:block">
            Continuously learning and staying ahead with industry certifications.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, index) => (
  <motion.a
    key={index}
    href={cert.link}
    target="_blank"
    initial={{ opacity: 0, scale: 0.88 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07 }}
    whileHover={{ y: -10, transition: { duration: 0.2 } }}
    className="glass p-9 rounded-3xl group flex flex-col justify-between min-h-[260px] hover:border-[#00E5FF]/40 cursor-pointer"
  >
    <div className="text-6xl mb-7 transition group-hover:scale-110">
      {cert.icon}
    </div>

    <div>
      <div className="font-semibold text-2xl tracking-tight">
        {cert.name}
      </div>

      <div className="text-sm text-white/60 mt-1 tracking-wider">
        {cert.org}
      </div>
    </div>
  </motion.a>
))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative py-28 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-8" />
            <h2 className="text-7xl font-semibold tracking-[-1.5px]">Let's create<br />something great</h2>
            <p className="mt-5 text-xl text-white/70">Open to opportunities and interesting projects</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs tracking-widest mb-3 text-white/50">YOUR NAME</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 pb-4 text-2xl placeholder:text-white/30 focus:outline-none" 
                  placeholder="Alex Rivera" 
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest mb-3 text-white/50">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent border-b border-white/30 pb-4 text-2xl placeholder:text-white/30 focus:outline-none" 
                  placeholder="you@domain.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest mb-3 text-white/50">MESSAGE</label>
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={7} 
                className="w-full resize-y bg-transparent border-b border-white/30 pb-4 text-xl placeholder:text-white/30 focus:outline-none" 
                placeholder="Tell me about your project..." 
              />
            </div>

            <motion.button 
              type="submit"
              disabled={!formData.name || !formData.email || !formData.message}
              className="mt-8 w-full py-7 text-sm tracking-[4px] border border-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed flex justify-center items-center gap-4 group"
              whileHover={{ scale: formData.name && formData.email && formData.message ? 1 : 1 }}
            >
              SEND MESSAGE
              <Mail className="group-hover:-rotate-12 transition" />
            </motion.button>
          </form>

          <div className="mt-16 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-y-8 text-sm">
            <div>
              <a href="mailto:ram404844@gmail.com" className="hover:text-[#00E5FF] flex items-center gap-3">
                <Mail className="inline" /> ram404844@gmail.com
              </a>
            </div>
            
            <div className="flex gap-7">
              <a href="https://github.com/koushikram22" target="_blank" className="hover:text-[#00E5FF] transition">GITHUB</a>
              <a href="https://www.linkedin.com/in/koushik-ram-addagarla/" target="_blank" className="hover:text-[#00E5FF] transition">LINKEDIN</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-16 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-y-8">
          <div className="flex items-center gap-4">
            <div className="w-7 h-px bg-white/70" />
            <div>© {new Date().getFullYear()} KOUSHIK RAM ADDAGARLA</div>
          </div>
          
          <div className="flex gap-8 text-white/50">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Legal</a>
          </div>
          
          <div className="text-white/50">Made with precision in Hyderabad</div>
        </div>
      </footer>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 60, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 60, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[200] px-8 py-4 rounded-2xl glass border border-[#00E5FF]/30 flex items-center gap-4 shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <div>
              {isSubmitted ? "Message received. I'll get back to you shortly." : "Resume downloaded successfully"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;


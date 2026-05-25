import React, { Suspense, lazy, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  ArrowDown,
  Award,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Send,
  Terminal,
  Wrench,
} from 'lucide-react';
import './styles.css';

const sections = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];
const githubUrl = 'https://github.com/Emy-gold';
const linkedinUrl = 'https://www.linkedin.com/in/iman-el-garate';
const email = 'imanelgarate@gmail.com';
const phone = '0607 20 13 21';
const WorkspaceScene = lazy(() => import('./ThreeScenes.jsx').then((module) => ({ default: module.WorkspaceScene })));
const TechOrbit = lazy(() => import('./ThreeScenes.jsx').then((module) => ({ default: module.TechOrbit })));

function CursorGlow() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const haloX = useSpring(dotX, { stiffness: 160, damping: 26 });
  const haloY = useSpring(dotY, { stiffness: 160, damping: 26 });

  useEffect(() => {
    const move = (event) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [dotX, dotY]);

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
      <motion.div className="cursor-halo" style={{ x: haloX, y: haloY }} />
    </>
  );
}

function Navbar() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 80], ['rgba(5,8,18,0)', 'rgba(5,8,18,.72)']);

  return (
    <motion.header className="fixed inset-x-0 top-0 z-50 border-b border-white/10" style={{ backgroundColor: blur }}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3" aria-label="Iman home">
          <motion.span
            animate={{ rotate: [0, 6, -5, 0], boxShadow: ['0 0 18px #20e6ff44', '0 0 30px #9b5cff66', '0 0 18px #20e6ff44'] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-300/30 bg-white/10 font-mono text-sm text-cyan-100"
          >
            IG
          </motion.span>
          <span className="hidden text-sm font-semibold uppercase tracking-[0.24em] text-slate-100 sm:inline dark:text-white">
            Iman
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1 md:flex">
          {sections.map((section) => (
            <a key={section} href={`#${section.toLowerCase()}`} className="rounded-full px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-cyan-100">
              {section}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <IconLink href={githubUrl} label="GitHub">
            <Github size={18} />
          </IconLink>
          <IconLink href={linkedinUrl} label="LinkedIn">
            <Linkedin size={18} />
          </IconLink>
        </div>
      </nav>
    </motion.header>
  );
}

function IconLink({ href, label, children }) {
  return (
    <a className="icon-button" href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
      {children}
    </a>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0 bg-grid bg-[length:46px_46px] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(32,230,255,.16),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(155,92,255,.18),transparent_28%)]" />
      <div className="absolute inset-0">
        <Suspense fallback={<div className="h-full w-full bg-ink" />}>
          <WorkspaceScene />
        </Suspense>
      </div>
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl py-24">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100 backdrop-blur-md">
            <Terminal size={15} /> Tangier, Morocco
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="text-balance text-5xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl">
            Iman EL GARAT
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-6 max-w-xl text-xl font-semibold leading-8 text-cyan-100">
            Software Engineering Student - Full-Stack Developer
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }} className="mt-3 max-w-xl text-base leading-8 text-slate-300">
            Building scalable Java/Spring Boot backends, modern web interfaces, and cloud-ready applications. Actively looking for a PFA internship.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }} className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="cta-primary">
              <Rocket size={18} /> View Projects
            </a>
            <a href={`mailto:${email}`} className="cta-secondary">
              <Mail size={18} /> Email Me
            </a>
          </motion.div>
        </div>
      </div>
      <a href="#about" className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-cyan-100" aria-label="Scroll to about">
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="grid h-11 w-11 place-items-center rounded-full border border-cyan-300/30 bg-white/10 backdrop-blur-xl">
          <ArrowDown size={18} />
        </motion.span>
      </a>
    </section>
  );
}

const skillGroups = [
  { title: 'Backend', icon: Code2, items: ['Java', 'Spring Boot', 'Security', 'JWT', 'JPA', 'Java EE', 'ASP.NET', 'PHP'] },
  { title: 'Frontend', icon: Layers3, items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Angular 19', 'Tailwind CSS'] },
  { title: 'CMS & SEO', icon: Wrench, items: ['WordPress', 'Elementor', 'WP Bakery', 'Ahrefs'] },
  { title: 'Databases', icon: Database, items: ['MySQL', 'SQL Server', 'Oracle PL/SQL'] },
  { title: 'DevOps & Cloud', icon: Cloud, items: ['Git', 'GitHub', 'Docker basic', 'AWS Cloud Foundations', 'Azure basic'] },
  { title: 'Tools', icon: Terminal, items: ['VS Code', 'IntelliJ IDEA', 'Eclipse', 'Postman'] },
];

const orbitSkills = ['Java', 'Spring Boot', 'React.js', 'Angular 19', 'Tailwind CSS', 'MySQL', 'Docker', 'AWS', 'WordPress', 'GitHub', 'Postman', 'Oracle PL/SQL'];

function SectionHeading({ eyebrow, title, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-120px' }} transition={{ duration: 0.55 }} className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-cyan-400 dark:text-cyan-200">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-slate-600 dark:text-slate-300">{children}</p>}
    </motion.div>
  );
}

function About() {
  const education = [
    { school: 'ENSI - School for New Science and Engineering', detail: 'Software Engineering, Tangier', date: '2025 - 2027' },
    { school: 'SUPTEM Group BMHS', detail: 'Bachelor in Software Engineering & Decision Systems, Tangier', date: '2022 - 2025' },
    { school: 'Lycee El Kortobi', detail: 'High School - Physics Sciences', date: '2021 - 2022' },
  ];
  const certifications = ['AWS Cloud Foundations - Amazon Web Services (2026)', 'ALX Front-End Development (React)', 'ALX Professional Foundations'];
  const languages = ['Arabic: Native', 'French: Intermediate (B1)', 'English: Upper Intermediate (B2)'];

  return (
    <section id="about" className="section-shell relative">
      <SectionHeading eyebrow="About" title="Full-stack profile built for real projects">
        Software Engineering student specializing in Java/Spring Boot, modern web technologies, backend architecture, and cloud fundamentals.
      </SectionHeading>
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        <InfoCard icon={GraduationCap} title="Education" items={education.map((item) => `${item.school} - ${item.detail} (${item.date})`)} />
        <InfoCard icon={Award} title="Certifications" items={certifications} />
        <InfoCard icon={MapPin} title="Languages" items={languages} />
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, items }) {
  return (
    <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel">
      <Icon className="mb-4 text-cyan-400 dark:text-cyan-200" size={26} />
      <h3 className="mb-3 text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
      <ul className="grid gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </motion.article>
  );
}

function Experience() {
  const items = [
    {
      title: 'Logidesk - WordPress & SEO Internship',
      meta: 'WordPress, WP Bakery, Ahrefs',
      text: 'Created and customized WordPress sites, optimized SEO with Ahrefs, performed keyword research, and improved organic ranking potential.',
    },
    {
      title: 'HB Developpement - Frontend Internship',
      meta: 'React.js, responsive UI, Lumi system',
      text: 'Developed React.js interfaces, implemented responsive layouts, and contributed to an e-learning platform interface.',
    },
    {
      title: 'SODEV - WordPress Internship',
      meta: 'Catalog integration, theme customization',
      text: 'Integrated CSV product catalogs, customized themes, created pages, and structured WordPress site content.',
    },
    {
      title: 'Italia Machines - WordPress Internship',
      meta: 'Elementor, company website',
      text: 'Built the official company website using Elementor with UI customization and responsive design.',
    },
  ];

  return (
    <section id="experience" className="section-shell">
      <SectionHeading eyebrow="Experience" title="Internships across frontend, CMS, and SEO">
        Practical delivery experience with React interfaces, WordPress production work, SEO optimization, and responsive design.
      </SectionHeading>
      <div className="mx-auto max-w-4xl">
        <div className="relative border-l border-cyan-400/30 pl-8">
          {items.map((item, index) => (
            <motion.article key={item.title} initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative mb-8 rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl last:mb-0">
              <span className="absolute -left-[42px] top-7 h-5 w-5 rounded-full border-4 border-ink bg-cyan-300 shadow-neon" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">{item.meta}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section-shell">
      <SectionHeading eyebrow="Skills" title="Technical stack with backend depth">
        A full-stack toolkit spanning Java/Spring Boot, React and Angular, CMS delivery, databases, DevOps basics, and cloud foundations.
      </SectionHeading>
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.25fr_.85fr]">
        <Suspense fallback={<div className="h-[520px] min-h-[520px] rounded-lg border border-white/10 bg-white/[0.04]" />}>
          <TechOrbit skills={orbitSkills} />
        </Suspense>
        <div className="grid gap-4">
          {skillGroups.map((group, index) => (
            <motion.article key={group.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="glass-panel p-5">
              <div className="mb-4 flex items-center gap-3">
                <group.icon className="text-cyan-400 dark:text-cyan-200" size={22} />
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    title: 'LinkUp',
    featured: true,
    description: 'A professional networking platform connecting candidates, recruiters, and organizations.',
    task: 'Designed the platform structure, implemented role-based user flows, and connected recruitment features with a secure database-backed architecture.',
    features: ['Multi-role authentication system', 'Job posting and applications', 'Admin dashboard', 'Secure backend architecture'],
    tech: ['Java EE', 'J2EE', 'MySQL', 'Tailwind CSS'],
    github: 'https://github.com/Emy-gold/linkup_project',
  },
  {
    title: 'LuxeHome',
    description: 'E-commerce backend system with advanced architecture and secure API foundations.',
    task: 'Built the backend domain model, organized entity relationships, secured API access, and prepared REST endpoints for e-commerce workflows.',
    features: ['18 database entities', 'JWT authentication', 'Spring Security', 'REST APIs'],
    tech: ['Spring Boot 3', 'JPA', 'MySQL', 'Security'],
  },
  {
    title: 'SmartTrainer',
    description: 'Fitness coaching platform backend with secure APIs for users, coaches, roles, reviews, and ratings.',
    task: 'Developed secure backend services for coach/client management, protected routes, authentication, reviews, and rating workflows.',
    features: ['JWT authentication', 'Role-based access', 'Coach and client management', 'Ratings and reviews', 'Secure REST APIs'],
    tech: ['Java', 'Spring Boot', 'MySQL', 'JWT'],
  },
  {
    title: 'Todo List Full Stack',
    description: 'Full-stack productivity application with a modern frontend and REST backend.',
    task: 'Connected an Angular task interface to a Spring Boot REST API with persistence, validation, and task management flows.',
    features: ['Angular interface', 'Spring Boot REST API', 'MySQL persistence', 'Task workflow management'],
    tech: ['Angular 19', 'Spring Boot', 'MySQL'],
  },
];

function Projects() {
  const [expanded, setExpanded] = useState('LinkUp');

  return (
    <section id="projects" className="section-shell">
      <SectionHeading eyebrow="Projects" title="Premium engineering projects">
        Recruiter-focused project cards with secure architecture, backend systems, and modern web interfaces.
      </SectionHeading>
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {projects.map((project, index) => {
          const isOpen = expanded === project.title;
          return (
            <motion.article key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ rotateX: 2.5, rotateY: -3, y: -8 }} className={`project-card ${project.featured ? 'md:col-span-2' : ''}`}>
              <div className="mb-5 flex w-full items-start justify-between gap-4 text-left">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                    {project.featured && <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-100">Featured</span>}
                  </div>
                  <p className="leading-7 text-slate-300">{project.description}</p>
                </div>
                <Code2 className="mt-1 shrink-0 text-cyan-200" size={23} />
              </div>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span key={item} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
                    {item}
                  </span>
                ))}
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-6 overflow-hidden text-sm text-slate-300">
                    <div className="mb-4 rounded-lg border border-white/10 bg-white/[0.05] p-4">
                      <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Task</p>
                      <p className="leading-6">{project.task}</p>
                    </div>
                    <ul className="grid">
                      {project.features.map((feature) => (
                        <li key={feature} className="mb-2 flex items-center gap-2 last:mb-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setExpanded(isOpen ? '' : project.title)} className="small-action">
                  Details
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown size={16} />
                  </motion.span>
                </button>
                <a href={project.github || githubUrl} target="_blank" rel="noreferrer" className="small-action">
                  <Github size={16} /> GitHub
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-shell pb-24">
      <SectionHeading eyebrow="Contact" title="Available for a PFA internship">
        Send a message or use the direct email CTA for internship and collaboration opportunities.
      </SectionHeading>
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[.85fr_1fr]">
        <div className="glass-panel">
          <MapPin className="mb-5 text-cyan-300" />
          <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">Iman EL GARAT</h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Software Engineering Student and Full-Stack Developer based in Tangier, Morocco.</p>
          <div className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            <a className="flex items-center gap-3 hover:text-cyan-300" href={`mailto:${email}`}>
              <Mail size={17} /> {email}
            </a>
            <a className="flex items-center gap-3 hover:text-cyan-300" href={`tel:${phone.replaceAll(' ', '')}`}>
              <Phone size={17} /> {phone}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="small-action dark:bg-white/10">
              <Github size={16} /> GitHub
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="small-action dark:bg-white/10">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={`mailto:${email}`} className="small-action dark:bg-white/10">
              <Mail size={16} /> Email CTA
            </a>
          </div>
        </div>
        <form className="glass-panel grid gap-4" onSubmit={(event) => event.preventDefault()}>
          <input className="field" placeholder="Name" aria-label="Name" />
          <input className="field" type="email" placeholder="Email" aria-label="Email" />
          <textarea className="field min-h-36 resize-none" placeholder="Message" aria-label="Message" />
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="submit" className="cta-primary justify-center">
            <Send size={18} /> Send Message
          </motion.button>
        </form>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="dark min-h-screen bg-ink text-white">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <SkillsSection />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);

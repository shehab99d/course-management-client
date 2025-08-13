import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  PenTool,
  BarChart,
  BookOpen,
  Briefcase,
  Database,
  Server,
  Cpu,
  Globe,
  Shield,
  Layers,
  Cloud,
} from "lucide-react";

/** ====== DATA (12 items) ====== */
const paths = [
  {
    title: "Frontend Developer",
    icon: <Code className="w-10 h-10 text-indigo-500" />,
    description:
      "Master HTML, CSS, JavaScript, and React to build stunning user interfaces and responsive designs.",
    avgSalary: "$60,000 - $90,000/yr",
    skills: ["React", "Tailwind", "API Integration"],
  },
  {
    title: "UI/UX Designer",
    icon: <PenTool className="w-10 h-10 text-pink-500" />,
    description:
      "Design user-friendly, visually appealing layouts using Figma, Sketch, and accessibility principles.",
    avgSalary: "$55,000 - $85,000/yr",
    skills: ["Figma", "User Testing", "Wireframing"],
  },
  {
    title: "Digital Marketer",
    icon: <BarChart className="w-10 h-10 text-green-500" />,
    description:
      "Learn SEO, social media, and email marketing to grow brands and optimize campaigns effectively.",
    avgSalary: "$50,000 - $75,000/yr",
    skills: ["SEO", "Analytics", "Google Ads"],
  },
  {
    title: "Technical Writer",
    icon: <BookOpen className="w-10 h-10 text-blue-600" />,
    description:
      "Craft clear documentation and tutorials. Ideal for those who enjoy explaining complex topics.",
    avgSalary: "$45,000 - $70,000/yr",
    skills: ["Markdown", "Git", "API Docs"],
  },
  {
    title: "Project Manager",
    icon: <Briefcase className="w-10 h-10 text-yellow-600" />,
    description:
      "Plan, coordinate, and lead software projects from start to finish with agile methodologies.",
    avgSalary: "$70,000 - $100,000/yr",
    skills: ["Agile", "Scrum", "Communication"],
  },
  {
    title: "Backend Developer",
    icon: <Server className="w-10 h-10 text-purple-500" />,
    description:
      "Develop and maintain server-side logic, APIs, and databases for high-performance applications.",
    avgSalary: "$65,000 - $95,000/yr",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "Database Administrator",
    icon: <Database className="w-10 h-10 text-red-500" />,
    description:
      "Manage, optimize, and secure databases ensuring data availability and reliability.",
    avgSalary: "$60,000 - $92,000/yr",
    skills: ["SQL", "PostgreSQL", "Backup Management"],
  },
  {
    title: "Cybersecurity Specialist",
    icon: <Shield className="w-10 h-10 text-teal-500" />,
    description:
      "Protect systems from cyber threats by implementing security protocols and monitoring activities.",
    avgSalary: "$70,000 - $110,000/yr",
    skills: ["Network Security", "Penetration Testing", "Encryption"],
  },
  {
    title: "Cloud Engineer",
    icon: <Cloud className="w-10 h-10 text-sky-500" />,
    description:
      "Design, deploy, and manage scalable cloud infrastructure and services.",
    avgSalary: "$75,000 - $115,000/yr",
    skills: ["AWS", "Azure", "Docker"],
  },
  {
    title: "Full Stack Developer",
    icon: <Layers className="w-10 h-10 text-orange-500" />,
    description:
      "Work on both frontend and backend, building complete web applications from scratch.",
    avgSalary: "$70,000 - $105,000/yr",
    skills: ["React", "Node.js", "REST APIs"],
  },
  {
    title: "AI/ML Engineer",
    icon: <Cpu className="w-10 h-10 text-fuchsia-500" />,
    description:
      "Build intelligent systems and predictive models using machine learning techniques.",
    avgSalary: "$80,000 - $130,000/yr",
    skills: ["Python", "TensorFlow", "Data Analysis"],
  },
  {
    title: "Web Developer",
    icon: <Globe className="w-10 h-10 text-cyan-500" />,
    description:
      "Create responsive, fast, and accessible websites for various industries.",
    avgSalary: "$55,000 - $85,000/yr",
    skills: ["HTML", "CSS", "JavaScript"],
  },
];

/** ====== ANIMATION VARIANTS ====== */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(2px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
};

/** ====== CARD UTIL ====== */
const Card = ({ path }) => {
  return (
    <motion.article
      variants={item}
      tabIndex={0}
      aria-label={`${path.title} card`}
      className="
        group relative rounded-2xl p-6 
        
        backdrop-blur-xl
        border border-slate-200/60 dark:border-white/10
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]
        hover:shadow-[0_20px_60px_-20px_rgba(66,99,235,0.45)]
        transition-all duration-300 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
      "
    >
      {/* glow ring */}
      <span
        className="
          pointer-events-none absolute inset-0 rounded-2xl 
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          ring-1 ring-indigo-400/30
        "
      />
      {/* gradient streak */}
      <span
        className="
          pointer-events-none absolute -inset-px rounded-2xl
          bg-gradient-to-br from-indigo-500/0 via-indigo-400/0 to-emerald-400/0
          group-hover:from-indigo-500/10 group-hover:via-indigo-400/10 group-hover:to-emerald-400/10
          transition-colors duration-300
        "
      />

      <div className="flex items-center gap-4 mb-4">
        <div
          className="
            grid place-items-center rounded-xl p-3
            
            dark:from-slate-800 dark:to-slate-850
            border border-slate-200/70 dark:border-white/10
            shadow-inner
          "
          aria-hidden="true"
        >
          {path.icon}
        </div>
        <h3 className="text-xl font-semibold ">
          {path.title}
        </h3>
      </div>

      <p className=" mb-4 leading-relaxed">
        {path.description}
      </p>

      <div className="mb-3 text-sm">
        <span className="font-medium">
          Avg. Salary:
        </span>{" "}
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
          {path.avgSalary}
        </span>
      </div>

      <div className="text-sm mb-2">Skills:</div>
      <ul className="flex flex-wrap gap-2">
        {path.skills.map((skill) => (
          <li
            key={skill}
            className="
              px-3 py-1 rounded-full text-sm
              
              border border-indigo-200/60 dark:border-indigo-700/40
              transition-colors
            "
          >
            {skill}
          </li>
        ))}
      </ul>

      {/* subtle bottom gradient bar */}
      <div
        className="
          mt-6 h-1 rounded-full 
          bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400
          opacity-70 group-hover:opacity-100 transition-opacity
        "
        aria-hidden="true"
      />
    </motion.article>
  );
};

/** ====== MAIN COMPONENT ====== */
const CareerPaths = () => {
  return (
    <section
      className="
        relative py-20 transition-colors duration-500 
        
      "
      aria-labelledby="career-paths-heading"
    >
      {/* decorative background grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10 
          [background-image:radial-gradient(#94a3b8_0.5px,transparent_0.5px)]
          [background-size:20px_20px]
          opacity-40 dark:opacity-15
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14"
      >
        <h2
          id="career-paths-heading"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight 
                     bg-clip-text text-transparent 
                     bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600
                     dark:from-indigo-400 dark:via-sky-400 dark:to-emerald-400
                     mb-4"
        >
          Career Paths You Can Take
        </h2>
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-700 dark:text-slate-300">
          Our courses prepare you for real-world careers. Explore the top paths our graduates follow,
          their average salary, and the core skills you’ll build.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className=" mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Responsive grid: 1 / 2 / 3 / 4 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paths.map((p) => (
            <Card key={p.title} path={p} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CareerPaths;

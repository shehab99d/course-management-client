import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, PenTool, BarChart, BookOpen } from "lucide-react";

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
];

const CareerPaths = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-6 sm:px-10 lg:px-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl font-bold text-indigo-700 mb-4">
          Career Paths You Can Take
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our courses prepare you for real-world careers. Explore the top paths our graduates follow, their average salary, and required skills.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {paths.map((path, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all"
          >
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 p-3 rounded-xl mr-4">{path.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {path.title}
              </h3>
            </div>
            <p className="text-gray-600 mb-3">{path.description}</p>
            <p className="text-sm font-medium text-gray-700 mb-1">
              💼 Avg. Salary: <span className="text-green-600">{path.avgSalary}</span>
            </p>
            <p className="text-sm text-gray-500 mb-2">Skills:</p>
            <ul className="flex flex-wrap gap-2">
              {path.skills.map((skill, idx) => (
                <li
                  key={idx}
                  className="bg-indigo-50 text-indigo-600 px-3 py-1 text-sm rounded-full"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CareerPaths;

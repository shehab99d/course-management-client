import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const JobCard = ({ title, skills, salary, growth }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
  >
    <h3 className="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-2"><span className="font-semibold">Skills:</span> {skills}</p>
    <p className="text-gray-600 dark:text-gray-300 mb-2"><span className="font-semibold">Salary:</span> {salary}</p>
    <p className="text-gray-600 dark:text-gray-300"><span className="font-semibold">Career Growth:</span> {growth}</p>
  </motion.div>
);

const SectionWrapper = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mt-20"
  >
    <h3 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-8">{title}</h3>
    <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20">
      {children}
    </div>
  </motion.div>
);

const jobData = [
  { title: "Frontend Developer", skills: "HTML, CSS, JavaScript, React, Redux", salary: "30k – 60k BDT/month", growth: "UI Lead → Frontend Architect" },
  { title: "Backend Developer", skills: "Node.js, Express.js, MongoDB, REST APIs", salary: "35k – 70k BDT/month", growth: "Tech Lead → System Architect" },
  { title: "Full Stack Developer", skills: "MERN Stack, DevOps Basics", salary: "45k – 90k BDT/month", growth: "Product Engineer → CTO" },
  { title: "Game Developer", skills: "Unity, C#, Blender, C++", salary: "50k – 100k+ BDT/month", growth: "Senior Game Dev → Game Director" },
  { title: "Junior Developer", skills: "Git, Debugging, Basic Web Stack", salary: "15k – 30k BDT/month", growth: "Junior → Mid → Senior" },
  { title: "Software Intern (SI)", skills: "Git, Firebase, Team Tools", salary: "10k – 20k BDT/month (Stipend)", growth: "Intern → Junior Developer" },
  { title: "DevOps Engineer", skills: "Docker, Kubernetes, CI/CD, AWS", salary: "60k – 120k BDT/month", growth: "Senior DevOps → Cloud Architect" },
  { title: "Mobile App Developer", skills: "Flutter, Dart, Android, Firebase", salary: "40k – 80k BDT/month", growth: "App Lead → Mobile Architect" },
  { title: "UI/UX Designer", skills: "Figma, Adobe XD, Prototyping", salary: "35k – 70k BDT/month", growth: "Lead Designer → Creative Director" },
  { title: "QA Engineer", skills: "Testing Tools, Selenium, Debugging", salary: "30k – 60k BDT/month", growth: "QA Lead → Quality Director" },
  { title: "AI/ML Engineer", skills: "Python, TensorFlow, Data Science", salary: "70k – 150k BDT/month", growth: "ML Lead → Research Scientist" },
  { title: "Cybersecurity Analyst", skills: "Security Tools, Ethical Hacking, Networking", salary: "60k – 130k BDT/month", growth: "Security Lead → CISO" }
];

const Jobs = () => {
  return (
    <section className="py-20 px-4 md:px-10 lg:px-20 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          Career & Jobs Hub
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
          Discover the paths to your dream tech job. Learn the skills, track the salary, and follow the steps to success.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {jobData.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>

      <SectionWrapper title="How to Get Hired?">
        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li>✅ Enroll in a relevant course and complete it with dedication</li>
          <li>✅ Build real-world projects and upload them to GitHub</li>
          <li>✅ Create a portfolio website showcasing your work</li>
          <li>✅ Prepare a clean CV & LinkedIn profile</li>
          <li>✅ Apply to jobs using proper cover letters</li>
          <li>✅ Prepare for interviews with mock practice</li>
        </ul>
      </SectionWrapper>

      <SectionWrapper title="Job Preparation Tips">
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Study job-specific technical questions regularly</li>
          <li>Take mock interviews with friends or online platforms</li>
          <li>Improve communication and problem-solving skills</li>
          <li>Contribute to open-source or freelance for experience</li>
          <li>Stay consistent and motivated throughout your journey</li>
        </ol>
      </SectionWrapper>

      <SectionWrapper title="Soft Skills You Need">
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Effective communication</li>
          <li>Teamwork & collaboration</li>
          <li>Time management</li>
          <li>Adaptability</li>
          <li>Critical thinking & creativity</li>
        </ul>
      </SectionWrapper>

      <SectionWrapper title="Freelancing vs Job">
        <div className="text-gray-700 dark:text-gray-300 space-y-4">
          <p><strong>Freelancing:</strong> Freedom to choose work, flexible timing, but inconsistent income.</p>
          <p><strong>Job:</strong> Stable salary, benefits, and growth within a team, but less flexible.</p>
          <p>Choose based on your personality, goals, and current situation.</p>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Top Platforms to Find Jobs">
        <ul className="grid sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <li>✅ LinkedIn</li>
          <li>✅ Glassdoor</li>
          <li>✅ RemoteOK</li>
          <li>✅ We Work Remotely</li>
          <li>✅ Upwork & Fiverr (for freelancers)</li>
          <li>✅ Local Job Portals (e.g. Bdjobs)</li>
        </ul>
      </SectionWrapper>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-20 max-w-3xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400"
      >
        *Note: Salaries mentioned are based on market data and may vary based on experience, company, and location.
      </motion.div>
    </section>
  );
};

export default Jobs;

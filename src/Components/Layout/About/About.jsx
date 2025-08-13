import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUsers, FaStar, FaGlobe, FaBook } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="px-6 md:px-16 py-12 space-y-16">
        <Helmet>
            <title>About - Course Management</title>
        </Helmet>
      <section className="text-center max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
        >
          Our Mission & Vision
        </motion.h2>
        <p className="text-lg leading-relaxed">
          We believe that quality education should be accessible to all. Our mission is to bridge the gap between ambition and opportunity by offering affordable, real-world courses with a modern learning experience. We envision a future where every learner, regardless of background, has the tools to succeed.
        </p>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Journey
        </motion.h2>
        <p className="text-lg leading-relaxed">
          Started in early 2025 by a group of passionate developers and educators, our platform began with only 5 foundational courses. Through continuous innovation and a dedication to student success, we've now grown into a thriving learning community with thousands of active learners from around the globe.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          className="p-6 rounded-xl shadow-md"
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-2xl font-semibold mb-2">Why Choose Us?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Expert-led high quality courses</li>
            <li>Secure and smooth enrollment</li>
            <li>Modern UI & user experience</li>
            <li>Budget-friendly learning options</li>
            <li>Real-world projects & guidance</li>
          </ul>
        </motion.div>

        {/* Platform Stats */}
        <motion.div 
          className="p-6 rounded-xl shadow-md space-y-4"
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Our Impact</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <FaUsers className="text-3xl text-primary" />
              <span><strong>10,000+</strong> Students</span>
            </div>
            <div className="flex items-center gap-4">
              <FaBook className="text-3xl text-primary" />
              <span><strong>150+</strong> Courses</span>
            </div>
            <div className="flex items-center gap-4">
              <FaGlobe className="text-3xl text-primary" />
              <span><strong>12+</strong> Countries</span>
            </div>
            <div className="flex items-center gap-4">
              <FaStar className="text-3xl text-primary" />
              <span><strong>4.9/5</strong> Rating</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
        <Link to="/courses">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition">Explore Courses</button>
        </Link>
      </motion.div>
    </div>
  );
};

export default About;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const MostEnrolled = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://course-management-server.vercel.app/most-enrolled")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses([]);
        }
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load courses. Please try again later.");
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 120,
      },
    },
  };

  if (loading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="text-center text-red-500 mt-10">{error}</div>
    );

  if (courses.length === 0)
    return (
      <p className="text-center text-gray-600 text-lg mt-10">
        No popular courses found.
      </p>
    );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return "N/A";
    return dateObj.toLocaleString();
  };

  // Top 8 courses sorted by enrollCount descending
  const topCourses = [...courses]
    .sort((a, b) => b.enrollCount - a.enrollCount)
    .slice(0, 8);

  return (
    <section className="w-full">
      <h2 className="text-4xl font-extrabold text-center mb-14
         bg-gradient-to-r from-green-400 via-green-600 to-green-500
         text-transparent bg-clip-text drop-shadow-md">
        Most Popular Courses
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8  mx-auto"
      >
        {topCourses.map((course) => (
          <motion.div
            key={course._id}
            variants={cardVariants}
            className="rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="text-sm font-medium">
                Instructor: {course.instructor || "N/A"}
              </p>
              <p className="text-sm">
                {formatDate(course.createdAt)}
              </p>
              <p className="text-sm font-semibold">
                Enrolled: <span className="text-pink-600">{course.enrollCount}</span> students
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MostEnrolled;

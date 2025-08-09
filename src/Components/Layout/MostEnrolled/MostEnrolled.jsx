import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const MostEnrolled = () => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://course-management-server.vercel.app/most-enrolled")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setCourses(data);
                } else {
                    setCourses([]);
                }
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load courses. Please try again later.');
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

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-10">
                {error}
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <p className="text-center text-gray-200 text-lg mt-10">
                No popular courses found.
            </p>
        );
    }

    // Helper to format date safely
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';

        let dateObj;
        // Check if string is ISO or timestamp
        if (typeof dateString === 'string') {
            dateObj = new Date(dateString);
        } else if (dateString instanceof Date) {
            dateObj = dateString;
        } else {
            return 'N/A';
        }
        if (isNaN(dateObj)) return 'N/A';

        return dateObj.toLocaleString(); // Locale string like "6/19/2025, 5:30:00 PM"
    };

    return (
        <div className="relative mx-10 rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 py-16 px-4">
            <div className="absolute inset-0 bg-opacity-40"></div>

            <div className="relative lg:max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400 text-transparent bg-clip-text drop-shadow-md">
                    Most Popular Courses
                </h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {courses.map((course) => (
                        <motion.div
                            key={course._id}
                            variants={cardVariants}
                            className="rounded-2xl p-1 bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <div className="bg-white rounded-2xl overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5 space-y-2">
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                        Instructor:{" "}
                                        <span className="font-medium text-gray-900">{course.instructor}</span>
                                    </p>
                                    <p className="text-gray-700 text-sm">
                                        {formatDate(course.createdAt)}
                                    </p>
                                    <p className="text-sm text-indigo-700 font-semibold">
                                        Enrolled: <span className="text-pink-600">{course.enrollCount}</span> students
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default MostEnrolled;

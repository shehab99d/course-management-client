import React, { useEffect, useState } from 'react';

const MostEnrolled = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/most-enrolled")
            .then(res => res.json())
            .then(data => setCourses(data))
    }, []);
    return (
        <div className="relative mx-10 rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 py-16 px-4">
            <div className="absolute inset-0  bg-opacity-40"></div>

            <div className="relative max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 via-indigo-400 to-purple-400 text-transparent bg-clip-text drop-shadow-md">
                    Most Enrolled Courses
                </h2>

                {courses.length === 0 ? (
                    <p className="text-center text-gray-200">No popular courses found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                className="rounded-2xl p-1 bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 shadow-2xl transform hover:scale-105 transition duration-300"
                            >
                                <div className="bg-white rounded-2xl overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-5">
                                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-700 mb-1">
                                            Instructor:{" "}
                                            <span className="font-medium text-gray-900">
                                                {course.instructor}
                                            </span>
                                        </p>
                                        <p className="text-sm text-indigo-700 font-semibold">
                                            Enrolled:{" "}
                                            <span className="text-pink-600">{course.enrollCount}</span>{" "}
                                            students
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default MostEnrolled;
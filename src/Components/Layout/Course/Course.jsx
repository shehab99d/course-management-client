import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';
import { useLoaderData } from 'react-router-dom';

const Course = () => {
  const data = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Helmet>
        <title>Course - Course Management</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-center text-purple-600 mb-12">All Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map(course => (
          <div
            key={course._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                Added: {new Date(course.createdAt).toLocaleDateString()}
              </p>
              <Link to={`/course-details/${course._id}`}>
                <button className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:scale-105 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;

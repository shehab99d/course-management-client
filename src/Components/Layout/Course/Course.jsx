import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigation, useLoaderData } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const Course = () => {
  const data = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen transition-colors duration-500">
      <Helmet>
        <title>Course - Course Management</title>
      </Helmet>

      <h2 className="text-4xl font-bold text-center mb-12 transition-colors duration-500">
        All Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map(course => (
          <div
            key={course._id}
            className="rounded-2xl border border-white/20 shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-500">
                {course.title}
              </h3>
              <p className="text-sm mb-3 transition-colors duration-500">
                Added: {new Date(course.createdAt).toLocaleDateString()}
              </p>
              <Link to={`/course-details/${course._id}`}>
                <button className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300">
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

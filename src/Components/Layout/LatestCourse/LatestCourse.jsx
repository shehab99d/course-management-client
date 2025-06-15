// Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ fixed "react-router" to "react-router-dom"

const LatestCourse = () => {
  const [latestCourses, setLatestCourses] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ added loading state

  useEffect(() => {
    axios
      .get("https://course-management-server.vercel.app/latest-courses")
      .then(res => {
        setLatestCourses(res.data);
        setLoading(false); // ✅ done loading
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="my-14 px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 underline">
        Latest Courses
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {latestCourses.map(course => (
            <div
              key={course._id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {course.title}
                </h3>
                <p className="text-sm text-indigo-500 font-medium">
                  {course.duration}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {course.description.slice(0, 100)}...
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {course.createdAt.slice(0, 19).replace("T", " ")}
                </p>
                <Link to={`/course-details/${course._id}`}>
                  <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition font-medium">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestCourse;

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LatestCourse = () => {
  const [latestCourses, setLatestCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://course-management-server.vercel.app/latest-courses")
      .then(res => {
        if (Array.isArray(res.data)) {
          setLatestCourses(res.data);
        } else {
          setLatestCourses([]);
        }
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load latest courses. Please try again.");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj)) return "N/A";
    return dateObj.toLocaleString();
  };

  if (loading) {
    return (
      <section className="my-14 px-4">
        <h2 className="text-4xl font-bold text-center mb-10 underline
                       ">
          Latest Courses
        </h2>
        <div className="flex justify-center items-center h-48">
          <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="my-14 px-4">
        <h2 className="text-4xl font-bold text-center mb-10 underline
                       ">
          Latest Courses
        </h2>
        <p className="text-center text-red-500">{error}</p>
      </section>
    );
  }

  if (latestCourses.length === 0) {
    return (
      <section className="my-14 px-4">
        <h2 className="text-4xl font-bold text-center mb-10 underline
                       ">
          Latest Courses
        </h2>
        <p className="text-center">No courses available.</p>
      </section>
    );
  }

  return (
    <section className="my-14">
      <h2 className="text-4xl font-bold text-center mb-10 underline
                     ">
        Latest Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {latestCourses.map(course => (
          <div
            key={course._id}
            className="rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300
                       0"
          >
            <img
              src={course.image}
              alt={course.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 space-y-2 ">
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-sm  font-medium">{course.duration}</p>
              <p className="text-sm leading-relaxed">
                {course.description?.slice(0, 100) || "No description"}...
              </p>
              <p className="text-sm leading-relaxed">{formatDate(course.createdAt)}</p>
              <Link to={`/course-details/${course._id}`}>
                <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600
                                   hover:from-blue-700 hover:to-indigo-700
                                   text-white py-2 rounded-lg transition font-medium">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestCourse;

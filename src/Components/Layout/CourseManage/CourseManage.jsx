import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (!user?.email) return;

    fetch(`https://course-management-server.vercel.app/my-uploaded-courses?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user courses:', err);
        setLoading(false);
      });
  }, [user?.email]);

  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`);
  };

  const handleDelete = () => {
    setLoading(true);
    fetch(`https://course-management-server.vercel.app/courses/${deletingCourse._id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setCourses(prev => prev.filter(c => c._id !== deletingCourse._id));
        setDeletingCourse(null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 d min-h-screen transition-colors duration-500">
      <Helmet>
        <title>Course Details - Course Management</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center border-b border-yellow-400 pb-3">
        🎓 My Uploaded Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-lg transition-colors duration-500">
          You haven’t uploaded any courses yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-md rounded-lg transition-colors duration-500">
            <thead className="bg-gradient-to-r from-purple-600 to-purple-500">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr
                  key={course._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-3 px-4 transition-colors duration-500">{course.title}</td>
                  <td className="py-3 px-4 truncate max-w-md transition-colors duration-500">
                    {course.shortDescription || course.description}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(course._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingCourse(course)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deletingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-xl space-y-4 transition-colors duration-500">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Confirm Delete</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete <strong>{deletingCourse.title}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeletingCourse(null)}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCourses;

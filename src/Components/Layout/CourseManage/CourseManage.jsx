import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const CourseManage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    fetch('http://localhost:5000/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-course/${id}`);
  };

  const handleDelete = () => {
    setLoading(true);
    fetch(`http://localhost:5000/courses/${deletingCourse._id}`, {
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-3">
        📚 Manage Your Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No courses found. Start by adding some!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm sm:text-base">Title</th>
                <th className="py-3 px-4 text-left text-sm sm:text-base">Description</th>
                <th className="py-3 px-4 text-center text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id} className="border-b border-gray-100 hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4 text-sm sm:text-base">{course.title}</td>
                  <td className="py-3 px-4 text-sm sm:text-base max-w-xs sm:max-w-md truncate">
                    {course.shortDescription || course.description}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(course._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm sm:text-base"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingCourse(course)}
                      className="bg-red-600 hover:bg-red-700 my-2 text-white px-4 py-1 rounded text-sm sm:text-base"
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

      {/* Delete confirmation modal */}
      {deletingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Confirm Delete</h3>
            <p className="text-gray-600">
              Are you sure you want to delete <strong>{deletingCourse.title}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeletingCourse(null)}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
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

export default CourseManage;

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    if (!user?.email) return;

    fetch(`http://localhost:5000/my-uploaded-courses?email=${user.email}`, {
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
        🎓 My Uploaded Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">You haven’t uploaded any courses yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id} className="border-b hover:bg-gray-50 transition duration-150">
                  <td className="py-3 px-4">{course.title}</td>
                  <td className="py-3 px-4 truncate max-w-md">{course.shortDescription || course.description}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(course._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingCourse(course)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
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

export default MyCourses;

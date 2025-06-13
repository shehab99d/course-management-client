import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddCourse = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const image = form.image.value;
    const duration = form.duration.value;

    const courseData = {
      title,
      description,
      image,
      duration,
      createdAt: new Date(),
      instructorEmail: user?.email,
      instructorName: user?.displayName,
      instructorPhoto: user?.photoURL,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/courses`, courseData, {
        withCredentials: true,
      });

      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Course added successfully!',
          confirmButtonColor: '#6b46c1'
        });
        form.reset();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add course. Please try again.',
        confirmButtonColor: '#e53e3e'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10 mb-16">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">Add New Course</h2>

      <form onSubmit={handleAddCourse} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Course Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="e.g. Web Development Basics"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Short Description</label>
          <textarea
            name="description"
            required
            rows="4"
            placeholder="Write a short description of the course..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            required
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            required
            placeholder="e.g. 6 weeks"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-md hover:scale-105 transition font-semibold"
          >
            {loading ? 'Adding...' : 'Add Course'}
          </button>
        </div>

        
      </form>
    </div>
  );
};

export default AddCourse;


import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';


const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = useContext(AuthContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(course.seats);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/enroll-check?email=${user.email}&courseId=${course._id}`)
        .then(res => res.json())
        .then(data => {
          if (data?.enrolled) {
            setIsEnrolled(true);
          }
        });
    }
  }, [user, course._id]);

  const handleEnroll = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to enroll in this course.',
        confirmButtonColor: '#6366F1'
      });
      return;
    }

    const enrollmentData = {
      email: user.email,
      courseId: course._id,
      title: course.title,
      image: course.image,
      date: new Date(),
    };

    fetch("http://localhost:5000/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrollmentData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          setIsEnrolled(true);
          setSeatsLeft(prev => prev - 1);
          Swal.fire({
            icon: 'success',
            title: 'Enrolled Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-xl rounded-xl">
      <img src={course.image} alt={course.title} className="w-full h-72 object-cover rounded-lg" />
      <div className="mt-6 space-y-3">
        <h2 className="text-3xl font-bold text-gray-800">{course.title}</h2>
        <p className="text-sm text-indigo-500 font-medium">Duration: {course.duration}</p>
        <p className="text-gray-600">{course.description}</p>
        <p className="font-semibold text-gray-700">Available Seats: {seatsLeft}</p>

        <button
          onClick={handleEnroll}
          disabled={!user || isEnrolled || seatsLeft <= 0}
          className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold transition
            ${!user || isEnrolled || seatsLeft <= 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-400 hover:from-blue-700 hover:to-indigo-700'
            }`}
        >
          {!user
            ? "Login to Enroll"
            : isEnrolled
              ? "Enrolled"
              : seatsLeft <= 0
                ? "No Seats Left"
                : "Enroll"
          }
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;

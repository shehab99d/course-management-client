import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const CourseDetails = () => {
  const course = useLoaderData();
  const { user, loading } = useContext(AuthContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(0);
  // const [loadings, setLoadings] = useState(true)

  useEffect(() => {

    console.log(user, course._id)

    if (loading || !user || !course._id) return;
    // Get seat info
    fetch(`https://course-management-server.vercel.app/courses/${course._id}/seats-left`)
      .then(res => res.json())
      .then(data => setSeatsLeft(data.seatsLeft || 0));

    // Check enrollment
    if (user?.email) {
      fetch(`https://course-management-server.vercel.app/enroll-check?email=${user.email}&courseId=${course._id}`)
        .then(res => res.json())
        .then(data => setIsEnrolled(data.enrolled));
    }
  }, [loading, user, course._id]);

  const handleEnroll = () => {
    if (!user) {
      return Swal.fire("Please login to enroll", "", "warning");
    }

    fetch(`https://course-management-server.vercel.app/enroll-check?email=${user.email}&courseId=${course._id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Enroll check response:", data); 
        setIsEnrolled(data.enrolled); 
      });


    if (!isEnrolled) {
      // Enroll
      fetch('https://course-management-server.vercel.app/enroll', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          courseId: course._id,
          title: course.title,
          image: course.image
        })
      })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(({ status, body }) => {
          if (status === 200 && body.success) {
            Swal.fire("Enrolled Successfully!", "", "success");
            setIsEnrolled(true);
            setSeatsLeft(prev => prev - 1);
          } else {
            Swal.fire("Error", body.message, "error");
          }
        });
    } else {
      fetch(`https://course-management-server.vercel.app/unenroll`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          courseId: course._id
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            Swal.fire("Unenrolled Successfully!", "", "info");
            setIsEnrolled(false);
            setSeatsLeft(prev => prev + 1);
          } else {
            Swal.fire("Error", data.message, "error");
          }
        });
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-3xl mt-10">
      <Helmet>
        <title>Course Details - Course Management</title>
      </Helmet>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-[300px] object-cover rounded-2xl shadow-md"
          />
        </div>
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">{course.title}</h2>
          <p className="text-lg text-gray-600 mb-1"><span className="font-medium text-gray-700">Instructor:</span> {course.instructor}</p>
          <p className="text-base text-gray-600 mb-2"><span className="font-medium text-gray-700">Description:</span> {course.description}</p>
          <p className="text-base text-gray-600 mb-4"><span className="font-medium text-gray-700">Seats Left:</span> <strong className="text-blue-600">{seatsLeft}</strong></p>

          <button
            onClick={handleEnroll}
            disabled={!user || (!isEnrolled && seatsLeft <= 0)}
            className={`px-6 py-3 text-lg rounded-xl shadow-md transition duration-300 font-semibold ${!user
              ? "bg-gray-400 cursor-not-allowed text-white"
              : isEnrolled
                ? "bg-red-500 hover:bg-red-600 text-white"
                : seatsLeft <= 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {
              !user
                ? "Login to Enroll"
                : isEnrolled
                  ? "Unenroll Now"
                  : seatsLeft <= 0
                    ? "No Seats Left"
                    : "Enroll Now"
            }
          </button>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

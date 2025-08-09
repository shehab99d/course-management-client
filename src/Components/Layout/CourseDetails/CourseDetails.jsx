// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../AuthProvider/AuthProvider";
// import { useLoaderData } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Helmet } from "react-helmet-async";

// const CourseDetails = () => {
//   const courseData = useLoaderData();
//   const { user, loading } = useContext(AuthContext);
//   const [isEnrolled, setIsEnrolled] = useState(false);
//   const [seatsLeft, setSeatsLeft] = useState(0);

//   // Fetch seats and enrollment status
//   useEffect(() => {
//     if (loading || !user || !courseData._id) return;

//     // Get seats left
//     fetch(`https://course-management-server.vercel.app/courses/${courseData._id}/seats-left`)
//       .then((res) => res.json())
//       .then((data) => setSeatsLeft(data.seatsLeft || 0));

//     // Check if enrolled
//     fetch(
//       `https://course-management-server.vercel.app/enroll-check?email=${user.email}&courseId=${courseData._id}`
//     )
//       .then((res) => res.json())
//       .then((data) => setIsEnrolled(data.enrolled));
//   }, [loading, user, courseData._id]);

//   const handleEnroll = () => {
//     if (!user) {
//       return Swal.fire("Please login to enroll", "", "warning");
//     }

//     // Check enrollment status
//     fetch(
//       `https://course-management-server.vercel.app/enroll-check?email=${user.email}&courseId=${courseData._id}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         const alreadyEnrolled = data.enrolled;
//         const enrolledCount = data.enrolledCount || 0;

//         if (alreadyEnrolled) {
//           // Unenroll confirmation
//           Swal.fire({
//             title: "Do you want to unenroll?",
//             icon: "question",
//             showCancelButton: true,
//             confirmButtonText: "Yes, Unenroll",
//             cancelButtonText: "Cancel",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               fetch(`https://course-management-server.vercel.app/unenroll/${courseData._id}`, {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   email: user.email,
//                   courseId: course._id,
//                 }),
//               })
//                 .then(async (res) => {
//                   const data = await res.json();

//                   if (!res.ok || !data.success) {
//                     throw new Error(data.message || "Unenroll failed.");
//                   }

//                   Swal.fire("✅ Unenrolled Successfully!", "", "success");
//                   setIsEnrolled(false);
//                   setSeatsLeft((prev) => prev + 1);
//                 })
//                 .catch((err) => {
//                   Swal.fire("❌ Error", err.message || "Something went wrong.", "error");
//                 });


//             }
//           });
//           return;
//         }

//         // Check max limit
//         if (enrolledCount >= 3) {
//           return Swal.fire("⚠️ You have already enrolled in 3 courses.", "", "warning");
//         }

//         // Check seats
//         if (seatsLeft <= 0) {
//           return Swal.fire("⚠️ No seats left for this course.", "", "warning");
//         }

//         // Proceed to enroll
//         fetch("https://course-management-server.vercel.app/enroll", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: user.email,
//             courseId: courseData._id,
//             title: courseData.title,
//             image: courseData.image,
//           }),
//         })
//           .then(async (res) => {
//             const data = await res.json();
//             if (!res.ok) {
//               throw new Error(data.message || "Something went wrong");
//             }

//             Swal.fire("✅ Enrolled Successfully!", "", "success");
//             setIsEnrolled(true);
//             setSeatsLeft((prev) => prev - 1);
//           })
//           .catch((error) => {
//             console.error(error);
//             Swal.fire("❌ Error", error.message, "error");
//           });
//       });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-3xl mt-10">
//       <Helmet>
//         <title>Course Details - Course Management</title>
//       </Helmet>

//       <div className="grid md:grid-cols-2 gap-8 items-center">
//         {/* Image */}
//         <div>
//           <img
//             src={courseData.image}
//             alt={courseData.title}
//             className="w-full h-[300px] object-cover rounded-2xl shadow-md"
//           />
//         </div>

//         {/* Course Info */}
//         <div>
//           <h2 className="text-4xl font-bold text-gray-800 mb-3">{courseData.title}</h2>
//           <p className="text-lg text-gray-600 mb-1">
//             <span className="font-medium text-gray-700">Instructor:</span> {courseData.instructor}
//           </p>
//           <p className="text-base text-gray-600 mb-2">
//             <span className="font-medium text-gray-700">Description:</span> {courseData.description}
//           </p>
//           <p className="text-base text-gray-600 mb-4">
//             <span className="font-medium text-gray-700">Seats Left:</span>{" "}
//             <strong className="text-blue-600">{seatsLeft}</strong>
//           </p>

//           {/* Enroll Button */}
//           <button
//             onClick={handleEnroll}
//             disabled={!user || (!isEnrolled && seatsLeft <= 0)}
//             className={`px-6 py-3 text-lg rounded-xl shadow-md transition duration-300 font-semibold ${!user
//               ? "bg-gray-400 cursor-not-allowed text-white"
//               : isEnrolled
//                 ? "bg-red-500 hover:bg-red-600 text-white"
//                 : seatsLeft <= 0
//                   ? "bg-gray-400 cursor-not-allowed text-white"
//                   : "bg-blue-600 hover:bg-blue-700 text-white"
//               }`}
//           >
//             {!user
//               ? "Login to Enroll"
//               : isEnrolled
//                 ? "Unenroll Now"
//                 : seatsLeft <= 0
//                   ? "No Seats Left"
//                   : "Enroll Now"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;




import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const CourseDetails = () => {
  const courseData = useLoaderData();
  const { user, loading } = useContext(AuthContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null); // Save enrollment _id
  const [seatsLeft, setSeatsLeft] = useState(0);

  // Fetch seats and enrollment status
  useEffect(() => {
    if (loading || !user || !courseData._id) return;

    fetch(`https://course-management-server.vercel.app/courses/${courseData._id}/seats-left`)
      .then(res => res.json())
      .then(data => setSeatsLeft(data.seatsLeft || 0));

    // Fetch enrollment by email and courseId to get enrollment _id and status
    fetch(`https://course-management-server.vercel.app/my-enrollments?email=${user.email}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` }
    })
      .then(res => res.json())
      .then(data => {
        const enrollment = data.find(enr => enr.courseId === courseData._id);
        if (enrollment) {
          setIsEnrolled(true);
          setEnrollmentId(enrollment._id);
        } else {
          setIsEnrolled(false);
          setEnrollmentId(null);
        }
      });
  }, [loading, user, courseData._id]);

  const handleEnroll = () => {
    if (!user) {
      return Swal.fire("Please login to enroll", "", "warning");
    }

    if (isEnrolled) {
      Swal.fire({
        title: "Are you sure you want to unenroll?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Unenroll",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://course-management-server.vercel.app/unenroll/${enrollmentId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          })
            .then(async (res) => {
              const data = await res.json();
              if (!res.ok || !data.success) {
                throw new Error(data.message || "Unenroll failed");
              }
              Swal.fire("Unenrolled Successfully!", "", "success");
              setIsEnrolled(false);
              setEnrollmentId(null);
              setSeatsLeft(prev => prev + 1);
            })
            .catch((err) => {
              Swal.fire("Error", err.message || "Something went wrong.", "error");
            });
        }
      });
      return;
    }

    // Enroll if not enrolled
    if (seatsLeft <= 0) {
      return Swal.fire("No seats left for this course", "", "warning");
    }

    fetch("https://course-management-server.vercel.app/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        courseId: courseData._id,
        title: courseData.title,
        image: courseData.image,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Enroll failed");
        }
        Swal.fire("Enrolled Successfully!", "", "success");
        setIsEnrolled(true);
        setSeatsLeft(prev => prev - 1);

        // Get the new enrollment _id (optional: fetch my-enrollments again or get it from response if backend sends)
        // For now, do a fresh fetch:
        fetch(`https://course-management-server.vercel.app/my-enrollments?email=${user.email}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` }
        })
          .then(res => res.json())
          .then(data => {
            const enrollment = data.find(enr => enr.courseId === courseData._id);
            if (enrollment) {
              setEnrollmentId(enrollment._id);
            }
          });
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-3xl mt-10">
      <Helmet>
        <title>Course Details - Course Management</title>
      </Helmet>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div>
          <img
            src={courseData.image}
            alt={courseData.title}
            className="w-full h-[300px] object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Course Info */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-3">{courseData.title}</h2>
          <p className="text-lg text-gray-600 mb-1">
            <span className="font-medium text-gray-700">Instructor:</span> {courseData.instructor}
          </p>
          <p className="text-base text-gray-600 mb-2">
            <span className="font-medium text-gray-700">Description:</span> {courseData.description}
          </p>
          <p className="text-base text-gray-600 mb-4">
            <span className="font-medium text-gray-700">Seats Left:</span>{" "}
            <strong className="text-blue-600">{seatsLeft}</strong>
          </p>

          {/* Enroll Button */}
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
            {!user
              ? "Login to Enroll"
              : isEnrolled
                ? "Unenroll Now"
                : seatsLeft <= 0
                  ? "No Seats Left"
                  : "Enroll Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyEnrolledPage = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://course-management-server.vercel.app/my-enrollments?email=${user.email}`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`,
                },
            })
                .then(res => {
                    if (res.status === 403) {
                        Swal.fire("Forbidden!", "You are not authorized to view this data", "error");
                        return [];
                    }
                    return res.json();
                })
                .then(data => setCourses(data));
        }
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this enrollment!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://course-management-server.vercel.app/delete-enrollment/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("access-token")}`,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your enrolled course has been deleted.", "success");
                            setCourses(courses.filter((course) => course._id !== id));
                        }
                    });
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <Helmet>
                <title>My Enrolled Page - Course Management</title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-6">My Enrolled Courses</h2>

            {courses.length === 0 ? (
                <p className="">You have not enrolled in any courses yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {courses.map((course, idx) => (
                        <div key={idx} className=" shadow-lg rounded-xl p-4 border border-white/20">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                            />
                            <h3 className="text-xl font-semibold">{course.title}</h3>
                            <p className="text-sm ">Instructor: {course.instructor}</p>
                            <button
                                onClick={() => handleDelete(course._id)}
                                className="btn btn-error mt-3 w-full"
                            >
                                Remove Enrollment
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEnrolledPage;

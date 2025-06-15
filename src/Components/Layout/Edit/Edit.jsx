import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        fetch(`https://course-management-server.vercel.app/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                setCourse(data);
            });
    }, [id]);

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const updatedCourse = {
            title: form.title.value,
            description: form.description.value,
            shortDescription: form.shortDescription.value
        };

        fetch(`https://course-management-server.vercel.app/courses/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCourse)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0 || data.matchedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Updated!',
                        text: 'Course has been successfully updated.',
                        confirmButtonColor: '#3085d6',
                    }).then(() => {
                        navigate('/manage-courses');
                    });
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: 'No Changes!',
                        text: 'No update was made to the course.',
                        confirmButtonColor: '#3085d6',
                    });
                }
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Something went wrong while updating the course.',
                    confirmButtonColor: '#d33',
                });
            });
    };

    if (!course) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b pb-4">✏️ Edit Course</h2>

            <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Course Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={course.title}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter course title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="shortDescription" className="block text-gray-700 font-medium mb-1">Short Description</label>
                    <input
                        type="text"
                        name="shortDescription"
                        defaultValue={course.shortDescription}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter short description"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Full Description</label>
                    <textarea
                        name="description"
                        defaultValue={course.description}
                        rows="5"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter full description"
                    ></textarea>
                </div>

                <div className="text-center pt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-400 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 shadow-md"
                    >
                        Update Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;

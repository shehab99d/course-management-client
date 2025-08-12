import React from "react";
import { motion } from "framer-motion";
import { GoStarFill } from "react-icons/go";

const reviews = [
    {
        name: "Rahim",
        stars: 5,
        text: "This course really cleared up my confusion. The instructor explained each topic in a very simple way.",
    },
    {
        name: "Meherun",
        stars: 4,
        text: "Assignments were interesting. I just wish there were more advanced topics too.",
    },
    {
        name: "Tariq",
        stars: 5,
        text: "Loved the instructor’s teaching style. He always gave real-life examples which made it easy to understand.",
    },
    {
        name: "Ayesha",
        stars: 5,
        text: "Can’t believe I landed a job after completing this course! Thank you so much!",
    },
    {
        name: "Naim",
        stars: 4,
        text: "Good course overall. A bit fast-paced in some modules but manageable.",
    },
    {
        name: "Sadia",
        stars: 5,
        text: "Highly effective for beginners. Everything is well-structured and easy to follow.",
    },
    {
        name: "Rakib",
        stars: 4,
        text: "The practical approach helped me build confidence. Would love more quizzes though.",
    },
    {
        name: "Fatima",
        stars: 5,
        text: "Honestly, this is one of the best online courses I've taken. Very helpful and motivating!",
    },
];

const CourseReview = () => {
    return (
        <div className="mt-16">
            <h3 className="text-4xl font-bold text-center mb-10 text-indigo-700">
                What Students Say
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {reviews.map((review, index) => (
                    <motion.div
                        key={index}
                        className="p-6 rounded-2xl shadow-md text-white bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg mb-3">"{review.text}"</p>
                        <p className="text-sm opacity-90 flex justify-start items-center gap-1">
                            - {review.name}, <span>{review.stars} </span>
                            <GoStarFill />
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CourseReview;

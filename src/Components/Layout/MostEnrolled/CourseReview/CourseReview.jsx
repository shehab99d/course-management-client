import { motion } from "framer-motion";
import { useState } from "react";


const reviews = [
    {
        id: 1,
        name: "John Doe",
        location: "New York, USA",
        rating: 5,
        review: "This course was a game-changer! Highly recommend it.",
        image: "https://i.pravatar.cc/150?img=1",
    },
    {
        id: 2,
        name: "Emily Johnson",
        location: "London, UK",
        rating: 4,
        review: "Very informative and well-structured content.",
        image: "https://i.pravatar.cc/150?img=2",
    },
    {
        id: 3,
        name: "Liam Smith",
        location: "Sydney, Australia",
        rating: 5,
        review: "The instructor explained everything clearly.",
        image: "https://i.pravatar.cc/150?img=3",
    },
    {
        id: 4,
        name: "Sophia Brown",
        location: "Toronto, Canada",
        rating: 4,
        review: "Good course for beginners and intermediates.",
        image: "https://i.pravatar.cc/150?img=4",
    },
    {
        id: 5,
        name: "Michael Wilson",
        location: "Berlin, Germany",
        rating: 5,
        review: "Loved the interactive lessons and assignments.",
        image: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: 6,
        name: "Olivia Miller",
        location: "Paris, France",
        rating: 5,
        review: "Fantastic experience! Learned a lot.",
        image: "https://i.pravatar.cc/150?img=6",
    },
    {
        id: 7,
        name: "Noah Davis",
        location: "Rome, Italy",
        rating: 4,
        review: "Good pacing and clear explanations.",
        image: "https://i.pravatar.cc/150?img=7",
    },
    {
        id: 8,
        name: "Ava Garcia",
        location: "Madrid, Spain",
        rating: 5,
        review: "I finally understood the concepts I was struggling with!",
        image: "https://i.pravatar.cc/150?img=8",
    },
    {
        id: 9,
        name: "James Martinez",
        location: "Tokyo, Japan",
        rating: 5,
        review: "Excellent examples and real-world applications.",
        image: "https://i.pravatar.cc/150?img=9",
    },
    {
        id: 10,
        name: "Isabella Hernandez",
        location: "Dubai, UAE",
        rating: 4,
        review: "A few lessons were too fast, but overall great.",
        image: "https://i.pravatar.cc/150?img=10",
    },
    // আরও ১০টা ডাটা যোগ করলাম
    {
        id: 11,
        name: "Ethan Lee",
        location: "Singapore",
        rating: 5,
        review: "Best course I have taken in years!",
        image: "https://i.pravatar.cc/150?img=11",
    },
    {
        id: 12,
        name: "Mia Kim",
        location: "Seoul, South Korea",
        rating: 5,
        review: "I learned so much, thank you!",
        image: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: 13,
        name: "Alexander Walker",
        location: "Moscow, Russia",
        rating: 4,
        review: "Informative and engaging.",
        image: "https://i.pravatar.cc/150?img=13",
    },
    {
        id: 14,
        name: "Charlotte Hall",
        location: "Bangkok, Thailand",
        rating: 5,
        review: "Easy to follow and practical.",
        image: "https://i.pravatar.cc/150?img=14",
    },
    {
        id: 15,
        name: "Daniel Allen",
        location: "Kuala Lumpur, Malaysia",
        rating: 4,
        review: "Helped me land my first job!",
        image: "https://i.pravatar.cc/150?img=15",
    },
    {
        id: 16,
        name: "Harper Young",
        location: "Cape Town, South Africa",
        rating: 5,
        review: "Simply amazing. Loved every bit of it.",
        image: "https://i.pravatar.cc/150?img=16",
    },
    {
        id: 17,
        name: "Benjamin King",
        location: "Rio de Janeiro, Brazil",
        rating: 5,
        review: "The best investment in my education so far.",
        image: "https://i.pravatar.cc/150?img=17",
    },
    {
        id: 18,
        name: "Amelia Wright",
        location: "Cairo, Egypt",
        rating: 4,
        review: "I enjoyed the quizzes and projects.",
        image: "https://i.pravatar.cc/150?img=18",
    },
    {
        id: 19,
        name: "Logan Scott",
        location: "Mexico City, Mexico",
        rating: 5,
        review: "This was worth every penny.",
        image: "https://i.pravatar.cc/150?img=19",
    },
    {
        id: 20,
        name: "Grace Adams",
        location: "Athens, Greece",
        rating: 5,
        review: "Very professional and high quality content.",
        image: "https://i.pravatar.cc/150?img=20",
    },
    {
        id: 18,
        name: "Robert",
        location: "Rio de Janeiro, Brazil",
        rating: 4,
        review: "The best investment in my education so far.",
        image: "https://i.ibb.co.com/DHpxszfZ/IMG-20250625-WA0019.jpg",
    }
];


const Reviews = () => {
    const [showAll, setShowAll] = useState(false);
    const visible = showAll ? reviews : reviews.slice(0, 9)

    // const [showLess, setShowLess] = useState(false);
    // const invisible = showLess ? reviews.splice(0, 9) : reviews;

    return (
        <section className="py-10 bg-base-200 mt-6 rounded-xl">
            <div className=" mx-auto ">
                <h2 className="text-3xl font-bold text-center mb-8">What Our Students Say</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {visible.map((review, index) => (
                        <motion.div
                            key={review.id}
                            className="card bg-base-100 shadow-xl p-5 border border-base-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-14 h-14 rounded-full object-cover border"
                                />
                                <div>
                                    <h3 className="font-semibold">{review.name}</h3>
                                    <p className="text-sm opacity-70">{review.location}</p>
                                </div>
                            </div>
                            <p className="mb-3 text-sm opacity-90">"{review.review}"</p>
                            <div className="flex gap-1">
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <span key={i} className="text-yellow-400">★</span>
                                ))}
                                {Array.from({ length: 5 - review.rating }, (_, i) => (
                                    <span key={i} className="text-gray-400">★</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Show Less */}

            {showAll && reviews.length > 9 && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => setShowAll(false)}
                        className="btn bg-blue-300 text-black"
                    >
                        Show less
                    </button>
                </div>
            )}

            {/* Read more button */}

            {!showAll && reviews.length > 9 && (
                <div className="text-center mt-6">
                    <button
                        onClick={() => setShowAll(true)}
                        className="bg-blue-400 btn text-black"
                    >
                        Read More
                    </button>
                </div>
            )}
        </section>
    );
};

export default Reviews;

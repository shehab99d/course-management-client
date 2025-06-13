import React from 'react';

const CourseReview = () => {
    return (
        <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">What Students Say</h3>
            <div className="space-y-3">
                <div className="p-4 border rounded-md shadow-sm">
                    <p className="text-sm text-gray-700">"Very helpful and well explained!"</p>
                    <p className="text-xs text-gray-500 mt-1">– Rahim, ⭐️⭐️⭐️⭐️⭐️</p>
                </div>
                <div className="p-4 border rounded-md shadow-sm">
                    <p className="text-sm text-gray-700">"Loved the assignments and practice work."</p>
                    <p className="text-xs text-gray-500 mt-1">– Meherun, ⭐️⭐️⭐️⭐️</p>
                </div>
            </div>
        </div>

    );
};

export default CourseReview;
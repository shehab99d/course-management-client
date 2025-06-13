import React from 'react';
import Banner from '../Layout/Banner/Banner';
import LatestCourse from '../Layout/LatestCourse/LatestCourse';
import MostEnrolled from '../Layout/MostEnrolled/MostEnrolled';
import CourseReview from '../Layout/MostEnrolled/CourseReview/CourseReview';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestCourse></LatestCourse>
            <MostEnrolled></MostEnrolled>
            <CourseReview></CourseReview>
        </div>
    );
};

export default Home;
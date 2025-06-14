import React from 'react';
import Banner from '../Layout/Banner/Banner';
import LatestCourse from '../Layout/LatestCourse/LatestCourse';
import MostEnrolled from '../Layout/MostEnrolled/MostEnrolled';
import CourseReview from '../Layout/MostEnrolled/CourseReview/CourseReview';
import Testimonials from '../Layout/Tastimonial/Tastimonial';
import CareerPaths from '../Layout/Tastimonial/Tastimonial';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestCourse></LatestCourse>
            <MostEnrolled></MostEnrolled>
            <CourseReview></CourseReview>
            <CareerPaths></CareerPaths>
        </div>
    );
};

export default Home;
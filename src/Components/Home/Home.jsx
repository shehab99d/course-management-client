import React from 'react';
import Banner from '../Layout/Banner/Banner';
import LatestCourse from '../Layout/LatestCourse/LatestCourse';
import MostEnrolled from '../Layout/MostEnrolled/MostEnrolled';
import CourseReview from '../Layout/MostEnrolled/CourseReview/CourseReview';
// import Testimonials from '../Layout/Tastimonial/Tastimonial';
import CareerPaths from '../Layout/Tastimonial/Tastimonial';
import { Helmet } from 'react-helmet-async';
import StatsSection from '../StatsSection';
// import Reviews from '../../../Review';

const Home = () => {
    return (
        <div className='lg:mx-10 md:mx-4 mx-3.5'>
            <Helmet>
                <title>Home - Course Management</title>
            </Helmet>
            <Banner></Banner>
            <LatestCourse></LatestCourse>
            <MostEnrolled></MostEnrolled>
            <CourseReview></CourseReview>
            <CareerPaths></CareerPaths>
            {/* <Reviews></Reviews> */}
            <StatsSection></StatsSection>
        </div>
    );
};

export default Home;
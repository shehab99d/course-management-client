import React from 'react';
import Banner from '../Layout/Banner/Banner';
import LatestCourse from '../Layout/LatestCourse/LatestCourse';
import MostEnrolled from '../Layout/MostEnrolled/MostEnrolled';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestCourse></LatestCourse>
            <MostEnrolled></MostEnrolled>
        </div>
    );
};

export default Home;
import React from 'react'
import HeroSection from '../Components/Other/Home/HeroSection'
import MediaSection from '../Components/Other/Home/MediaSection'
import RecentBlogs from '../Components/Other/Home/RecentBlogs'
import GiveReview from '../Components/Other/Home/GiveReview'
import TributeSection from '../Components/Other/Home/TributeSection'

const HomePageLayOut = () => {
    return (
        <div>
            <HeroSection />

            <MediaSection />

            <RecentBlogs />

            <TributeSection />

            <GiveReview />
        </div>
    )
}

export default HomePageLayOut

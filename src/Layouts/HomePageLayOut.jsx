import React from 'react'
import HeroSection from '../Components/Other/Home/HeroSection'
import MediaSection from '../Components/Other/Home/MediaSection'
import RecentBlogs from '../Components/Other/Home/RecentBlogs'

const HomePageLayOut = () => {
    return (
        <div>
            <HeroSection />

            <MediaSection />

            <RecentBlogs />
        </div>
    )
}

export default HomePageLayOut

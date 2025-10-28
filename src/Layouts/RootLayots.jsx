import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../Components/Fixed/NavBar'
import Footer from '../Components/Fixed/Footer'

const RootLayots = () => {
    return (
        <div>
            <NavBar />

            <div className='pt-10'>
                <Outlet />
            </div>
            <Footer />

        </div>
    )
}

export default RootLayots

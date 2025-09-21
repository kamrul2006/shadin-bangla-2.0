import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../Components/Fixed/NavBar'
import Footer from '../Components/Fixed/Footer'

const RootLayots = () => {
    return (
        <div>
            <NavBar />

            <Outlet />

            <Footer />

        </div>
    )
}

export default RootLayots

import React from 'react'
import { Outlet } from 'react-router'
import NavBar from '../Components/Fixed/NavBar'

const RootLayots = () => {
    return (
        <div>
            <NavBar />

            <Outlet />

        </div>
    )
}

export default RootLayots

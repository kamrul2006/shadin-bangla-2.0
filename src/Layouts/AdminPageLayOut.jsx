import React from 'react'
import ManageNavbar from '../Components/AdminPage/AdminNav'
import { Outlet } from 'react-router'

const AdminPageLayOut = () => {
    return (
        <div>
            <ManageNavbar />

            <Outlet />



        </div>
    )
}

export default AdminPageLayOut

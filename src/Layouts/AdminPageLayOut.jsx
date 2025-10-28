import React from 'react'
import ManageNavbar from '../Components/AdminPage/AdminNav'
import { Outlet } from 'react-router'

const AdminPageLayOut = () => {
    return (
        <div>
            <ManageNavbar />

            <div className='pt-10'>
                <Outlet />

            </div>

        </div>
    )
}

export default AdminPageLayOut

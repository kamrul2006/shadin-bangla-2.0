import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import {
    FiHome,
    FiFileText,
    FiUsers,
    FiStar,
    FiInfo,
    FiLogOut,
} from "react-icons/fi";
import { AuthContext } from "../../Auth/Providers/AuthProvider";

const ManageNavbar = () => {
    const { user, UserSignOut } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // ------------------ Check user role------------------------
    useEffect(() => {
        if (user?.email) {
            fetch(`https://shadin-bangla-2-0-server.vercel.app/users`)
                .then((res) => res.json())
                .then((data) => {
                    const currentUser = data.find((u) => u.email === user.email);
                    if (currentUser?.role === "admin" || currentUser?.role === "Superadmin") {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                        navigate("/"); // ------------ Redirect non-admins
                    }
                })
                .catch((err) => console.error("User fetch error:", err));
        } else {
            navigate("/"); // --------------- Redirect if not logged in
        }
    }, [user, navigate]);

    const handleSignOut = async () => {
        await UserSignOut();
        navigate("/");
    };

    // ------------------------ Navigation Links for Admin
    const adminLinks = [
        { to: "/", label: "হোম", icon: <FiHome /> },
        { to: "/manage/manageBlogs", label: "ব্লগ ম্যানেজ", icon: <FiFileText /> },
        { to: "/manage/manageReviews", label: "রিভিউ ম্যানেজ", icon: <FiStar /> },
        { to: "/manage/shohidInfo", label: "শহীদ তথ্য", icon: <FiInfo /> },
        { to: "/manage/manageUsers", label: "ইউজার ম্যানেজ", icon: <FiUsers /> },
    ];

    return (
        <nav className="bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-700 shadow-md fixed w-full z-40 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

                {/* -------- Left: Dashboard Title -------- */}
                <Fade direction="left" triggerOnce>
                    <div className="flex items-center gap-2 text-white font-extrabold text-lg tracking-wide">
                        🛠️ <span>অ্যাডমিন ড্যাশবোর্ড</span>
                    </div>
                </Fade>

                {/* -------- Center: Nav Links -------- */}
                <div className="flex gap-6 items-center">
                    {adminLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-2 font-medium px-3 py-2 rounded-md transition-all 
                ${location.pathname === link.to
                                    ? "bg-green-800 text-yellow-300 shadow-sm"
                                    : "text-white hover:text-yellow-300 hover:bg-green-700/30 "
                                }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* -------- Right: Profile / Logout -------- */}
                <div className="flex items-center gap-3 text-white">
                    {user && (
                        <>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-all"
                            >
                                <FiLogOut /> সাইন আউট
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default ManageNavbar;

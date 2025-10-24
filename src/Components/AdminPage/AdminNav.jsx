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
    FiMenu,
    FiX,
} from "react-icons/fi";
import { AuthContext } from "../../Auth/Providers/AuthProvider";

const ManageNavbar = () => {
    const { user, UserSignOut } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // ------------------ Check user role ------------------------
    useEffect(() => {
        if (user?.email) {
            fetch(`https://shadin-bangla-2-0-server.vercel.app/users`)
                .then((res) => res.json())
                .then((data) => {
                    const currentUser = data.find((u) => u.email === user.email);
                    if (
                        currentUser?.role === "admin" ||
                        currentUser?.role === "Superadmin"
                    ) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                        navigate("/"); // Redirect non-admins
                    }
                })
                .catch((err) => console.error("User fetch error:", err));
        } else {
            navigate("/"); // Redirect if not logged in
        }
    }, [user, navigate]);

    const handleSignOut = async () => {
        await UserSignOut();
        navigate("/");
    };

    const adminLinks = [
        { to: "/", label: "হোম", icon: <FiHome /> },
        { to: "/manage/manageBlogs", label: "ব্লগ ম্যানেজ", icon: <FiFileText /> },
        { to: "/manage/manageReviews", label: "রিভিউ ম্যানেজ", icon: <FiStar /> },
        { to: "/manage/shohidInfo", label: "শহীদ তথ্য", icon: <FiInfo /> },
        { to: "/manage/manageUsers", label: "ইউজার ম্যানেজ", icon: <FiUsers /> },
    ];

    return (
        <nav className="bg-gradient-to-r from-green-900 via-emerald-800 to-teal-900 backdrop-blur-lg shadow-lg fixed w-full z-50 border-b border-green-700/40">
            <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
                {/* -------- Left: Dashboard Title -------- */}
                <Fade direction="left" triggerOnce>
                    <div className="flex items-center gap-2 text-white font-extrabold text-lg tracking-wide">
                        🛠️ <span>অ্যাডমিন ড্যাশবোর্ড</span>
                    </div>
                </Fade>

                {/* -------- Center: Nav Links (Desktop) -------- */}
                <div className="hidden md:flex gap-4 items-center">
                    {adminLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-2 font-medium px-3 py-2 rounded-md transition-all duration-300
                ${location.pathname === link.to
                                    ? "bg-green-700/80 text-yellow-300 shadow-sm"
                                    : "text-gray-100 hover:text-yellow-300 hover:bg-green-800/40"
                                }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* -------- Right: User + Logout + Mobile Menu -------- */}
                <div className="flex items-center gap-3 text-white">
                    {/* User Avatar */}
                    {user && (
                        <div
                            className="bg-green-700 text-white w-8 h-8 flex items-center justify-center rounded-full font-semibold border border-yellow-300/60"
                            title={user.displayName || user.email}
                        >
                            {user.displayName
                                ? user.displayName.charAt(0).toUpperCase()
                                : "U"}
                        </div>
                    )}

                    {/* Logout Button */}
                    {user && (
                        <button
                            onClick={handleSignOut}
                            className="hidden md:flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-all duration-300 text-sm font-semibold"
                        >
                            <FiLogOut /> সাইন আউট
                        </button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-2xl text-yellow-300 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* -------- Mobile Dropdown Menu -------- */}
            {menuOpen && (
                <div className="md:hidden bg-gradient-to-b from-green-900 to-teal-900 px-6 py-4 border-t border-green-700/40 animate__animated animate__fadeInDown">
                    <div className="flex flex-col gap-3">
                        {adminLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={`flex items-center gap-2 font-medium px-3 py-2 rounded-md transition-all duration-300
                  ${location.pathname === link.to
                                        ? "bg-green-700 text-yellow-300"
                                        : "text-gray-100 hover:text-yellow-300 hover:bg-green-800/40"
                                    }`}
                            >
                                {link.icon}
                                {link.label}
                            </Link>
                        ))}

                        {/* Logout (Mobile) */}
                        {user && (
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    handleSignOut();
                                }}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-all duration-300 text-sm font-semibold text-white mt-2"
                            >
                                <FiLogOut /> সাইন আউট
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default ManageNavbar;

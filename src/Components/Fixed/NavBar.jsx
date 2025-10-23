import React, { useContext, useState, useEffect } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import {
    BiPhotoAlbum,
    BiLogOut,
    BiUserCircle,
} from "react-icons/bi";
import {
    FiMenu,
    FiX,
    FiHome,
    FiBookOpen,
    FiInfo,
    FiMail,
    FiLogIn,
    FiUserPlus,
    FiSettings,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/Providers/AuthProvider";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, UserSignOut } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleNavClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ✅ Fetch user role from backend
    useEffect(() => {
        if (user?.email) {
            fetch(`https://shadin-bangla-2-0-server.vercel.app/users/${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data?.role === "admin" || data?.role === "Superadmin") {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                })
                .catch((err) => console.error("User fetch error:", err));
        }
    }, [user]);

    const navLinks = [
        { to: "/", label: "হোম", icon: <FiHome className="inline-block mr-1" /> },
        { to: "/shohid", label: "জুলাই শহীদ", icon: <FiInfo className="inline-block mr-1" /> },
        { to: "/blog", label: "ব্লগ", icon: <FiBookOpen className="inline-block mr-1" /> },
        { to: "/julyGallery", label: "জুলাই গ্যালারি", icon: <BiPhotoAlbum className="inline-block mr-1" /> },
        { to: "/contact", label: "যোগাযোগ", icon: <FiMail className="inline-block mr-1" /> },
    ];

    // -------------------- Add admin-only route dynamically
    if (isAdmin) {
        navLinks.push({
            to: "/manage",
            label: "ম্যানেজ",
            icon: <FiSettings className="inline-block mr-1" />,
        });
    }

    const handleSignOut = async () => {
        await UserSignOut();
        navigate("/");
    };

    return (
        <nav className="bg-gradient-to-r from-green-600/80 via-emerald-600/80 to-teal-700/80 shadow-md fixed w-full z-30 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Fade direction="left" triggerOnce>
                        <Link
                            to="/"
                            onClick={handleNavClick}
                            className="flex items-center gap-2 hover:opacity-80 transition"
                        >
                            <img className="w-10 drop-shadow-md" src="/icons/g.png" alt="২.০" />
                            <h1 className="hidden md:block text-xl font-extrabold text-white tracking-wide">
                                স্বাধীন বাংলা ২.০
                            </h1>
                        </Link>
                    </Fade>

                    {/* Center Nav Links */}
                    <div className="hidden md:flex space-x-3 mx-auto">
                        {navLinks.map((link, index) => (
                            <Fade delay={index * 100} triggerOnce key={link.to}>
                                <Link
                                    to={link.to}
                                    onClick={handleNavClick}
                                    className={`flex items-center gap-2 font-medium px-3 py-1 rounded-md transition-all transform-border transform-3d
                ${location.pathname === link.to
                                            ? "border-b-2 border-amber-400 text-yellow-300 shadow"
                                            : "text-white hover:text-yellow-300 hover:bg-green-700/30 "
                                        }`}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            </Fade>
                        ))}
                    </div>

                    {/* Right Side: Auth Area */}
                    <div className="hidden md:flex items-center gap-3 relative">
                        {user ? (
                            <>
                                <button
                                    onClick={() => setDropdown(!dropdown)}
                                    className="focus:outline-none flex items-center gap-2 text-white"
                                >
                                    <img
                                        src={user?.photoURL || "/icons/defaultUser.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full border-2 border-white object-cover"
                                    />
                                </button>

                                {/* Dropdown */}
                                {dropdown && (
                                    <div className="absolute right-0 top-14 bg-white rounded-lg shadow-md w-44 py-2 border border-gray-200 animate-fadeIn">
                                        <p className="px-4 text-sm text-gray-700 font-semibold border-b pb-2">
                                            {user.displayName || "ইউজার"}
                                        </p>
                                        {isAdmin && (
                                            <Link
                                                to="/manage"
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                            >
                                                <FiSettings /> ম্যানেজ
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleSignOut}
                                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                        >
                                            <BiLogOut /> সাইন আউট
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-1 text-white font-medium hover:text-yellow-300 transition"
                                >
                                    <FiLogIn /> লগইন
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-3 py-1.5 rounded-md transition"
                                >
                                    <FiUserPlus /> সাইন আপ
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none"
                        >
                            {isOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <Slide direction="down" duration={400}>
                    <div className="md:hidden bg-white border-t shadow-md">
                        <div className="flex flex-col space-y-3 px-4 py-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleNavClick();
                                    }}
                                    className="text-gray-700 hover:text-green-600 font-medium flex items-center gap-1"
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}

                            {/* Auth Area (Mobile) */}
                            <div className="border-t pt-3 mt-2">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-2">
                                            <img
                                                src={user?.photoURL || "/icons/defaultUser.png"}
                                                alt="Profile"
                                                className="w-9 h-9 rounded-full border border-gray-300"
                                            />
                                            <span className="font-medium text-gray-700">{user.displayName}</span>
                                        </div>
                                        {isAdmin && (
                                            <Link
                                                to="/manage"
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-2 text-blue-600 font-medium"
                                            >
                                                <FiSettings /> ম্যানেজ
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2 text-red-600 font-medium"
                                        >
                                            <BiLogOut /> সাইন আউট
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-2 text-green-700 font-medium"
                                        >
                                            <FiLogIn /> লগইন
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-2 text-yellow-600 font-medium"
                                        >
                                            <FiUserPlus /> সাইন আপ
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Slide>
            )}
        </nav>
    );
};

export default NavBar;

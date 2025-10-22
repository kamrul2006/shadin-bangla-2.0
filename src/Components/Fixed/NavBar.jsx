import React, { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { BiPhotoAlbum } from "react-icons/bi";
import { FiMenu, FiX, FiHome, FiBookOpen, FiInfo, FiMail } from "react-icons/fi";
import { MdArticle } from "react-icons/md";
import { Link } from "react-router";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navLinks = [
        { to: "/", label: "হোম", icon: <FiHome className="inline-block mr-1" /> },
        { to: "/shohid", label: "জুলাই শহীদ", icon: <FiInfo className="inline-block mr-1" /> },
        { to: "/blog", label: "ব্লগ", icon: <FiBookOpen className="inline-block mr-1" /> },
        { to: "/julyGallery", label: "জুলাই গ্যালারি", icon: <BiPhotoAlbum className="inline-block mr-1" /> },
        { to: "/contact", label: "যোগাযোগ", icon: <FiMail className="inline-block mr-1" /> },
    ];

    return (
        <nav className="bg-gradient-to-r from-green-500/70 via-emerald-500/70 to-teal-600/70 shadow-lg fixed w-full z-20 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo + Name */}
                    <Fade direction="left" triggerOnce>
                        <Link
                            to="/"
                            onClick={handleNavClick}
                            className="flex items-center gap-2 hover:opacity-80 transition duration-300"
                        >
                            <img className="w-10 drop-shadow-md" src="/icons/g.png" alt="২.০" />
                            <h1 className="hidden md:block text-xl font-extrabold text-white tracking-wide">
                                স্বাধীন বাংলা ২.০
                            </h1>
                        </Link>
                    </Fade>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        {navLinks.map((link, index) => (
                            <Slide direction="down" delay={index * 100} triggerOnce key={link.to}>
                                <Link
                                    to={link.to}
                                    onClick={handleNavClick}
                                    className="text-white font-medium hover:text-yellow-300 transition duration-300 flex items-center"
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            </Slide>
                        ))}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white focus:outline-none"
                        >
                            {isOpen ? (
                                <FiX className="w-7 h-7" />
                            ) : (
                                <FiMenu className="w-7 h-7" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <Slide direction="down" duration={500}>
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
                                    className="text-gray-700 hover:text-green-600 font-medium transition flex items-center gap-1"
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </Slide>
            )}
        </nav>
    );
};

export default NavBar;

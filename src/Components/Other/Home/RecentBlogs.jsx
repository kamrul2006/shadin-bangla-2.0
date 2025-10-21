import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const RecentBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("/blogs.json")
            .then((res) => res.json())
            .then((data) => setBlogs(data.slice(-4))) // show last 4 blogs
            .catch((err) => console.error("Error loading blogs:", err));
    }, []);

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-black">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        সাম্প্রতিক <span className="text-red-600">ব্লগ</span>
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
                        আন্দোলনের অভিজ্ঞতা, শহীদের স্মৃতি ও নতুন প্রজন্মের ভাবনা—সব এক জায়গায়।
                    </p>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                    {blogs.map((blog, index) => (
                        <Fade direction="up" delay={index * 100} triggerOnce key={blog.id}>
                            <div
                                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-md 
                hover:shadow-2xl transition duration-300 h-full"
                            >
                                {/* Blog Image */}
                                <div className="relative overflow-hidden group">
                                    <img
                                        src={blog.img}
                                        alt={blog.title}
                                        className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                                    />
                                    <span
                                        className="absolute top-3 left-3 bg-red-600 text-white 
                    text-xs font-semibold px-3 py-1 rounded-full shadow-md"
                                    >
                                        {blog.category}
                                    </span>
                                    <div
                                        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 
                    transition duration-500"
                                    ></div>
                                </div>

                                {/* Blog Content */}
                                <div className="flex flex-col flex-grow justify-between p-5">
                                    <div>
                                        <h3
                                            className="text-lg md:text-lg font-bold mb-2 text-gray-900 
                      line-clamp-2 group-hover:text-red-600 transition-colors duration-300 pl-2"
                                        >
                                            {blog.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                            {blog.shortDis}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <FaCalendarAlt className="text-red-500" />
                                            <span>{blog.date || "জুলাই ২০২৪"}</span>
                                        </div>
                                        <Link
                                            to={`/blog`}
                                            className="text-red-600 font-semibold hover:underline flex items-center gap-1 text-sm"
                                        >
                                            পড়ুন <FaArrowRight className="text-xs" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center mt-14">
                    <Link
                        to="/blog"
                        className="inline-block px-6 py-3 rounded-lg border-2 border-black font-semibold
            hover:bg-black hover:text-green-400 transform hover:scale-105 transition duration-300"
                    >
                        সব ব্লগ দেখুন
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RecentBlogs;

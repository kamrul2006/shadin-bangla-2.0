import React, { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";

// -------- Blog Page Component --------
const BlogPage = () => {
    // -------- State to Store Blogs --------
    const [blogs, setBlogs] = useState([]);

    // -------- Fetch Blogs from JSON --------
    useEffect(() => {
        fetch("/blogs.json")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((err) => console.error("Error loading blogs:", err));
    }, []);

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white text-gray-900">
            {/* -------- Page Header -------- */}
            <div className="max-w-7xl mx-auto px-6 text-center mb-10">
                <Slide direction="down" triggerOnce>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        <span className="text-red-600">জুলাই আন্দোলন</span> ব্লগসমূহ
                    </h1>
                </Slide>
                <Fade direction="up" delay={200} triggerOnce>
                    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                        আন্দোলনের পেছনের গল্প, শহীদদের আত্মত্যাগ, এবং শিক্ষার্থীদের সংগ্রামের ইতিহাস জানুন।
                    </p>
                </Fade>
            </div>

            {/* -------- Blog Grid -------- */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {blogs.map((blog, index) => (
                    <Fade direction="up" delay={index * 150} triggerOnce key={blog.id}>
                        <div
                            className="bg-white shadow-lg rounded-2xl overflow-hidden group hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border border-gray-100"
                        >
                            {/* -------- Blog Image -------- */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={blog.img}
                                    alt={blog.title}
                                    className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
                                    <h3 className="text-white font-bold text-lg">{blog.category}</h3>
                                </div>
                            </div>

                            {/* -------- Blog Info -------- */}
                            <div className="p-5">
                                <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-red-700 transition">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 text-sm mb-3">{blog.shortDis}</p>

                                {/* -------- Author & Date -------- */}
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>✍️ {blog.author}</span>
                                    <span>📅 {blog.date}</span>
                                </div>

                                {/* -------- Read More Button -------- */}
                                <div className="mt-4 text-right">
                                    <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition">
                                        বিস্তারিত দেখুন
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </section>
    );
};

export default BlogPage;

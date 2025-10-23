import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaSearch } from "react-icons/fa";

const AllBlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --------------------- Fetch Blogs from Backend--------------
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch("http://localhost:5000/Blogs");
                if (!response.ok) throw new Error("Failed to load blogs");
                const data = await response.json();
                setBlogs(data);
            } catch (err) {
                console.error("Error loading blogs:", err);
                setError("ব্লগ লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const categories = ["all", ...new Set(blogs.map((blog) => blog.category))];

    // ----------- Filter by search and category------------
    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-gray-100 text-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/*---------------- Header + Filters ----------------*/}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-extrabold">
                            সমস্ত <span className="text-red-600">ব্লগ</span>
                        </h2>
                        <p className="text-gray-600 mt-1 text-sm md:text-base">
                            আন্দোলনের গল্প, শহীদের স্মৃতি এবং নতুন প্রজন্মের ভাবনা এক জায়গায়।
                        </p>
                    </div>

                    {/* Search + Category Filter */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0 lg:items-center">
                        {/* Search */}
                        <div className="relative w-full sm:w-64">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="ব্লগ অনুসন্ধান করুন..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm placeholder-gray-400 text-sm sm:text-base transition duration-300 hover:shadow-md"
                            />
                        </div>

                        {/* Category */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full sm:w-48 px-4 py-2 rounded-3xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm text-sm sm:text-base hover:shadow-md transition duration-300"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === "all" ? "সবগুলো" : cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <hr className="border-gray-300 mb-8" />

                {/*---------------- Loading & Error ----------------*/}
                {loading && (
                    <div className="text-center text-gray-500 mt-16 text-lg">
                        ⏳ ব্লগগুলো লোড হচ্ছে...
                    </div>
                )}

                {error && (
                    <div className="text-center text-red-600 mt-16 text-lg font-semibold">
                        {error}
                    </div>
                )}

                {/*---------------- Blog Grid ----------------*/}
                {!loading && !error && filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredBlogs.map((blog, index) => (
                            <Fade delay={index * 50} duration={600} triggerOnce key={blog._id || index}>
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
                                    {/* Blog Image */}
                                    <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
                                        <img
                                            src={blog.image || "/images/default-blog.jpg"}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                                        />
                                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                            {blog.category || "অনির্দিষ্ট"}
                                        </span>
                                    </div>

                                    {/* Blog Content */}
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-red-600 transition duration-300 text-lg">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                                {blog.content?.slice(0, 120)}...
                                            </p>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between text-gray-500 text-sm border-t border-gray-100 pt-3">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-red-500" />
                                                <span>{blog.date || "অজানা তারিখ"}</span>
                                            </div>
                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="text-red-600 font-semibold hover:underline flex items-center gap-2"
                                            >
                                                পড়ুন <FaArrowRight className="text-xs" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                ) : (
                    !loading && !error && (
                        <p className="text-center text-gray-500 mt-10 text-lg">
                            কোনো ব্লগ পাওয়া যায়নি।
                        </p>
                    )
                )}
            </div>
        </section>
    );
};

export default AllBlogsPage;

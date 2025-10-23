import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FaCalendarAlt, FaUserAlt, FaTag, FaArrowLeft } from "react-icons/fa";

const BlogDetailsPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ---------- Fetch selected blog + related blogs ----------
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/Blogs/${id}`);
                if (!res.ok) throw new Error("Failed to load blog");
                const data = await res.json();
                setBlog(data);

                // ---------- Fetch related blogs ----------
                const allRes = await fetch(`http://localhost:5000/Blogs`);
                const allData = await allRes.json();
                const related = allData.filter(
                    (b) => b.category === data.category && b._id !== data._id
                );
                setRelatedBlogs(related);
            } catch (err) {
                console.error(err);
                setError("ব্লগ লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
                ⏳ ব্লগটি লোড হচ্ছে...
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <p className="text-red-600 text-xl font-semibold">
                    {error || "ব্লগটি পাওয়া যায়নি।"}
                </p>
                <Link
                    to="/blogs"
                    className="mt-4 text-red-600 hover:underline font-semibold"
                >
                    🔙 সব ব্লগ দেখুন
                </Link>
            </div>
        );
    }

    return (
        <section className="bg-gradient-to-b from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8 min-h-screen relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* ---------------- Blog Details ---------------- */}
                <div className="lg:col-span-2 bg-white shadow-lg rounded-3xl overflow-hidden p-6 sm:p-10 relative">
                    <Fade triggerOnce>
                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-3">
                                {blog.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm">
                                <div className="flex items-center gap-2">
                                    <FaUserAlt className="text-red-500" />
                                    <span>{blog.author || "অজানা লেখক"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-red-500" />
                                    <span>{blog.date || "অজানা তারিখ"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaTag className="text-red-500" />
                                    <span>{blog.category || "অনির্দিষ্ট"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Blog Image */}
                        {blog.image && (
                            <div className="rounded-2xl overflow-hidden mb-8">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-72 sm:h-96 object-cover transform hover:scale-[1.02] transition duration-500"
                                />
                            </div>
                        )}

                        {/* Blog Content */}
                        <div className="prose prose-red max-w-none text-gray-800 leading-relaxed text-justify">
                            {blog.content?.split("\n").map((para, i) => (
                                <p key={i} className="mb-4 text-[15px] sm:text-base">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </Fade>

                    {/* ---------- Footer: Back button + watermark ---------- */}
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-12 border-t border-gray-200 pt-6">
                        {/* Back Button */}
                        <Link
                            to="/blog"
                            className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 transition duration-300 px-4 py-2 rounded-full font-medium text-sm shadow-md"
                        >
                            <FaArrowLeft /> সব ব্লগে ফিরে যান
                        </Link>

                        {/* Watermark / Logo */}
                        <div className="opacity-40 text-gray-400  mt-4 sm:mt-0 font-semibold flex items-center gap-2 select-none">
                            <img
                                src="/icons/g.png" alt="২.০"
                                className="md:w-12 w-6 md:h-12 h-6 opacity-60"
                            />
                            <span className="hidden text-xl md:block text-green-700">স্বাধীন বাংলা ২.০ </span>
                        </div>
                    </div>
                </div>

                {/* ---------------- Related Blogs Sidebar ---------------- */}
                <aside className="bg-white shadow-md rounded-3xl p-6 sm:p-8 h-fit sticky top-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-b border-red-500 pb-2">
                        সম্পর্কিত ব্লগসমূহ
                    </h2>

                    {relatedBlogs.length > 0 ? (
                        <div className="space-y-4">
                            {relatedBlogs.map((rBlog, i) => (
                                <Fade key={rBlog._id || i} delay={i * 80} triggerOnce>
                                    <Link
                                        to={`/blog/${rBlog._id}`}
                                        className="flex gap-4 items-center group"
                                    >
                                        <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={rBlog.image || "/images/default-blog.jpg"}
                                                alt={rBlog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 group-hover:text-red-600 transition duration-300">
                                                {rBlog.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs mt-1">
                                                {rBlog.date || "অজানা তারিখ"}
                                            </p>
                                        </div>
                                    </Link>
                                </Fade>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm mt-4">
                            এই ক্যাটাগরিতে আর কোনো ব্লগ নেই।
                        </p>
                    )}
                </aside>
            </div>
        </section>
    );
};

export default BlogDetailsPage;

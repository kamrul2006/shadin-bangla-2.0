import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaCheck, FaTrash, FaClock, FaArrowRight } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/blogs")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data.reverse());
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching blogs:", err));
    }, []);

    const handleApprove = async (id) => {
        const confirm = await Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "এই ব্লগটি অনুমোদন দিতে চান?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ",
            cancelButtonText: "বাতিল",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:5000/blogs/approve/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "approved" }),
                });

                if (res.ok) {
                    setBlogs(
                        blogs.map((blog) =>
                            blog._id === id ? { ...blog, status: "approved" } : blog
                        )
                    );
                    Swal.fire("✅ অনুমোদিত!", "ব্লগটি অনুমোদিত হয়েছে।", "success");
                } else {
                    Swal.fire("❌ ত্রুটি!", "অনুমোদনে সমস্যা হয়েছে।", "error");
                }
            } catch (error) {
                console.error(error);
                Swal.fire("⚠️ সার্ভার সমস্যা!", "দয়া করে আবার চেষ্টা করুন।", "error");
            }
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "ব্লগটি স্থায়ীভাবে মুছে ফেলা হবে।",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "হ্যাঁ",
            cancelButtonText: "বাতিল",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`http://localhost:5000/blogs/${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    setBlogs(blogs.filter((blog) => blog._id !== id));
                    Swal.fire("🗑️ মুছে ফেলা হয়েছে!", "ব্লগটি মুছে ফেলা হয়েছে।", "success");
                } else {
                    Swal.fire("❌ ত্রুটি!", "ব্লগটি মুছে ফেলা যায়নি।", "error");
                }
            } catch (error) {
                console.error(error);
                Swal.fire("⚠️ সার্ভার ত্রুটি!", "আবার চেষ্টা করুন।", "error");
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center py-10 text-gray-600">
                <span className="loading loading-spinner text-success text-lg"></span>
                <p>ডেটা লোড হচ্ছে...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 md:pt-20">
            <Fade direction="up" triggerOnce>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-green-700">
                        📰 ব্লগ ম্যানেজ প্যানেল
                    </h1>
                    <Link
                        to="/blog"
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition"
                    >
                        সব ব্লগ দেখুন <FaArrowRight />
                    </Link>
                </div>
            </Fade>

            {blogs.length === 0 ? (
                <p className="text-center text-gray-500">কোনো ব্লগ পাওয়া যায়নি।</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">শিরোনাম</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">লেখক</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">ক্যাটাগরি</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">তারিখ</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">স্ট্যাটাস</th>
                                <th className="px-6 py-3 text-center text-sm font-semibold">অ্যাকশন</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {blogs.map((blog) => (
                                <tr
                                    key={blog._id}
                                    className="hover:bg-gray-50 transition-all duration-200"
                                >
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/blog/${blog._id}`}
                                            className="font-semibold text-green-700 hover:text-green-900 transition"
                                        >
                                            {blog.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{blog.author || "অজানা"}</td>
                                    <td className="px-6 py-4 text-gray-700">{blog.category}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{blog.date}</td>
                                    <td className="px-6 py-4">
                                        {blog.status === "approved" ? (
                                            <span className="flex items-center gap-1 text-green-600 font-medium">
                                                <FaCheck /> অনুমোদিত
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-yellow-600 font-medium">
                                                <FaClock /> অপেক্ষমান
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                                        {blog.status !== "approved" && (
                                            <button
                                                onClick={() => handleApprove(blog._id)}
                                                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition"
                                                title="অনুমোদন"
                                            >
                                                <FaCheck />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                                            title="মুছে ফেলুন"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageBlogs;

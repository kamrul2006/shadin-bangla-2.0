import React, { useContext, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
import {
    FaUserAlt,
    FaHeading,
    FaImage,
    FaPenFancy,
    FaTags,
    FaHome,
    FaSignInAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Auth/Providers/AuthProvider";

const WriteBlog = () => {
    const { user } = useContext(AuthContext); // 🔐 ইউজার কনটেক্সট
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        image: "",
        category: "",
        content: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blogData = {
            ...formData,
            status: "pending",
            date: new Date().toLocaleDateString("bn-BD"),
        };

        if (!formData.category) {
            Swal.fire({
                icon: "warning",
                title: "⚠️ বিভাগ নির্বাচন করুন",
                text: "দয়া করে একটি ক্যাটাগরি নির্বাচন করুন।",
                confirmButtonColor: "#dc2626",
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://shadin-bangla-2-0-server.vercel.app/Blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "🎉 ধন্যবাদ!",
                    text: "আপনার ব্লগটি জমা হয়েছে এবং অনুমোদনের অপেক্ষায় আছে।",
                    confirmButtonColor: "#dc2626",
                });
                setFormData({
                    title: "",
                    author: "",
                    image: "",
                    category: "",
                    content: "",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "❌ ত্রুটি!",
                    text: "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।",
                    confirmButtonColor: "#dc2626",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "⚠️ সংযোগ ব্যর্থ!",
                text: "সার্ভারের সাথে সংযোগ করা যাচ্ছে না। পরে চেষ্টা করুন।",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setLoading(false);
        }
    };

    // ------------------------
    // If user not logged in
    // ------------------------
    if (!user) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 px-4 py-12">
                <div className="max-w-md w-full bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 rounded-3xl p-8 text-center">
                    <Fade triggerOnce>
                        <h2 className="text-2xl font-bold text-red-600 mb-3">
                            ⚠️ আপনি লগইন করেননি!
                        </h2>
                        <p className="text-gray-700 mb-6 text-sm sm:text-base">
                            ব্লগ লিখতে হলে আগে লগইন করতে হবে। লগইন করলে আপনি আপনার চিন্তা ও গল্প অন্যদের সঙ্গে ভাগ করতে পারবেন।
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <Link
                                to="/"
                                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition"
                            >
                                <FaHome /> হোমে ফিরে যান
                            </Link>
                            <Link
                                to="/login"
                                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition"
                            >
                                <FaSignInAlt /> এখনই লগইন করুন
                            </Link>
                        </div>
                    </Fade>
                </div>
            </section>
        );
    }

    // ------------------------
    // If user logged in
    // ------------------------
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-gray-100 py-10 px-4">
            <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
                <Fade triggerOnce>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                            <span className="text-red-600">নতুন ব্লগ</span> লিখুন ✍️
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
                            আপনার চিন্তা, অভিজ্ঞতা ও অনুভূতি অন্যদের সাথে ভাগ করুন। নিচের ফর্মটি পূরণ করুন
                            এবং আপনার গল্প পৃথিবীর সাথে শেয়ার করুন।
                        </p>
                    </div>
                </Fade>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 sm:space-y-7 transition-all"
                >
                    {/* Blog Title */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
                            <FaHeading className="text-red-500" /> ব্লগের শিরোনাম
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="একটি সুন্দর শিরোনাম দিন..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-400 outline-none transition duration-200 hover:shadow-md"
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
                            <FaUserAlt className="text-red-500" /> লেখকের নাম
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            placeholder="আপনার নাম লিখুন"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-400 outline-none transition duration-200 hover:shadow-md"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
                            <FaTags className="text-red-500" /> ক্যাটাগরি নির্বাচন করুন
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-white shadow-sm focus:ring-2 focus:ring-red-400 outline-none transition duration-200 hover:shadow-md"
                        >
                            <option value="">-- একটি ক্যাটাগরি নির্বাচন করুন --</option>
                            <option value="আন্দোলন">আন্দোলন</option>
                            <option value="শহীদ স্মরণ">শহীদ স্মরণ</option>
                            <option value="ইতিহাস">ইতিহাস</option>
                            <option value="সংগ্রাম">সংগ্রাম</option>
                            <option value="নারীর ভূমিকা">নারীর ভূমিকা</option>
                            <option value="এক দফা">এক দফা</option>
                            <option value="পুলিশি হামলা">পুলিশি হামলা</option>
                            <option value="কুকুরলীগের হামলা">কুকুরলীগের হামলা</option>
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
                            <FaImage className="text-red-500" /> ছবির লিঙ্ক (ঐচ্ছিক)
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="যদি থাকে, ব্লগের ছবির লিঙ্ক দিন"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-400 outline-none transition duration-200 hover:shadow-md"
                        />
                    </div>

                    {/* Blog Content */}
                    <div>
                        <label className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-1">
                            <FaPenFancy className="text-red-500" /> ব্লগের মূল লেখা
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="8"
                            placeholder="এখানে আপনার গল্প, অভিজ্ঞতা বা মতামত লিখুন..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-400 outline-none resize-none transition duration-200 hover:shadow-md"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full sm:w-auto font-semibold px-8 py-3 rounded-xl transition duration-300 flex items-center justify-center gap-2 mx-auto ${loading
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:scale-[1.03] shadow-md hover:shadow-lg"
                                }`}
                        >
                            {loading ? "⏳ জমা দেওয়া হচ্ছে..." : "📨 ব্লগ জমা দিন"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default WriteBlog;

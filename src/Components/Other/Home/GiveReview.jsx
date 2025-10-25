import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import Marquee from "react-fast-marquee";
import { Fade } from "react-awesome-reveal";
import { FaUserCircle, FaQuoteLeft, FaStar } from "react-icons/fa";
import { AuthContext } from "../../../Auth/Providers/AuthProvider";

const GiveReview = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        message: "",
        rating: "",
    });
    const [loading, setLoading] = useState(false);

    // Fetch approved reviews only
    useEffect(() => {
        fetch("https://shadin-bangla-2-0-server.vercel.app/reviews")
            .then((res) => res.json())
            .then((data) => {
                const approvedReviews = data
                    .filter((r) => r.status === "approved")
                    .reverse();
                setReviews(approvedReviews);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "🔒 লগইন করুন!",
                text: "রিভিউ দেওয়ার জন্য প্রথমে লগইন করুন।",
                confirmButtonColor: "#dc2626",
                showCancelButton: true,
                confirmButtonText: "লগইন করুন",
                cancelButtonText: "বাতিল",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login";
                }
            });
            return;
        }

        if (!formData.rating) {
            Swal.fire({
                icon: "warning",
                title: "⚠️ রেটিং দিন!",
                text: "দয়া করে একটি রেটিং নির্বাচন করুন।",
                confirmButtonColor: "#dc2626",
            });
            return;
        }

        setLoading(true);

        const reviewData = {
            name: user.displayName || "অজানা",
            ...formData,
            date: new Date().toLocaleDateString("bn-BD"),
            status: "pending",
        };

        try {
            const res = await fetch(
                "https://shadin-bangla-2-0-server.vercel.app/reviews",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reviewData),
                }
            );

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "🎉 ধন্যবাদ!",
                    text: "আপনার রিভিউ সফলভাবে জমা হয়েছে (অনুমোদনের অপেক্ষায়)।",
                    confirmButtonColor: "#dc2626",
                });
                setFormData({ message: "", rating: "" });
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
                title: "⚠️ সার্ভার সংযোগ ব্যর্থ!",
                text: "সার্ভারের সাথে সংযোগ করা যাচ্ছে না। পরে চেষ্টা করুন।",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 px-5 sm:px-8 bg-gradient-to-br from-rose-50 via-white to-red-50 text-black relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,228,230,0.2)_0%,_transparent_60%)] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto text-center mb-12 relative z-10">
                <Fade direction="up" triggerOnce>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                        আপনার মতামত দিন 💬
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        স্বাধীন বাংলা ২.০ সম্পর্কে আপনার মূল্যবান মতামত দিন এবং আমাদের আরও
                        উন্নত করতে সাহায্য করুন।
                    </p>
                </Fade>
            </div>

            {/* Review Form */}
            <div className="max-w-2xl mx-auto backdrop-blur-lg bg-white/70 border border-gray-200 shadow-2xl rounded-2xl p-8 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            আপনার বার্তা 📝
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder="আপনার মতামত লিখুন..."
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white/90 focus:ring-2 focus:ring-red-400 outline-none resize-none transition-all duration-300"
                        ></textarea>
                    </div>

                    {/* Rating Dropdown */}
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                            রেটিং দিন ⭐
                        </label>
                        <div className="relative">
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white/90 focus:ring-2 focus:ring-red-400 outline-none transition-all duration-300 appearance-none"
                            >
                                <option value="">-- রেটিং নির্বাচন করুন --</option>
                                <option value="5">⭐⭐⭐⭐⭐ অসাধারণ! (দারুণ অভিজ্ঞতা)</option>
                                <option value="4">
                                    ⭐⭐⭐⭐ খুব ভালো (ছোটখাটো উন্নতির সুযোগ আছে)
                                </option>
                                <option value="3">⭐⭐⭐ মোটামুটি (আরও ভালো হতে পারে)</option>
                                <option value="2">⭐⭐ তেমন ভালো না (কিছু সমস্যা আছে)</option>
                                <option value="1">⭐ খারাপ (অভিজ্ঞতা সন্তোষজনক নয়)</option>
                            </select>
                            <FaStar className="absolute right-4 top-3.5 text-yellow-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-10 py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 ${loading
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:scale-105 hover:shadow-xl"
                                }`}
                        >
                            {loading ? "⏳ জমা হচ্ছে..." : "📩 রিভিউ জমা দিন"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Approved Reviews Marquee */}
            {reviews.length > 0 && (
                <div className="mt-16 bg-white/70 backdrop-blur-md py-8 rounded-2xl shadow-inner border border-gray-200 relative z-10">
                    <Marquee pauseOnHover speed={60} gradient={false}>
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="mx-5 bg-gradient-to-br from-white/90 to-rose-50 border border-gray-200 rounded-2xl shadow-md p-5 min-w-[260px] max-w-[300px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 my-4"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <FaUserCircle className="text-red-500 text-2xl" />
                                    <h3 className="font-semibold text-gray-800 text-sm">
                                        {review.name}
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-2 italic">
                                    <FaQuoteLeft className="inline-block text-rose-400 mr-1" />
                                    {review.message}
                                </p>
                                <p className="text-yellow-500 text-base mb-1">
                                    {"⭐".repeat(review.rating || 0)}
                                </p>
                                <p className="text-gray-400 text-xs">{review.date}</p>
                            </div>
                        ))}
                    </Marquee>
                </div>
            )}
        </section>
    );
};

export default GiveReview;

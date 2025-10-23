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

    // Fetch reviews
    useEffect(() => {
        fetch("https://shadin-bangla-2-0-server.vercel.app/reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data.reverse()))
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
            const res = await fetch("https://shadin-bangla-2-0-server.vercel.app/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reviewData),
            });

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "🎉 ধন্যবাদ!",
                    text: "আপনার রিভিউ সফলভাবে জমা হয়েছে।",
                    confirmButtonColor: "#dc2626",
                });
                setFormData({ message: "", rating: "" });

                // Refresh reviews instantly
                const updatedReviews = await fetch("https://shadin-bangla-2-0-server.vercel.app/reviews").then((r) =>
                    r.json()
                );
                setReviews(updatedReviews.reverse());
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
        <section className="py-12 px-4 bg-gradient-to-br from-white via-rose-50 to-gray-100 text-black">
            <div className="max-w-4xl mx-auto text-center mb-8">
                <Fade direction="up" triggerOnce>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                        আপনার মতামত দিন 💬
                    </h2>
                    <p className="text-gray-600 max-w-lg mx-auto">
                        স্বাধীন বাংলা ২.০ সম্পর্কে আপনার মূল্যবান মতামত দিন এবং আমাদের আরও ভালো করতে সাহায্য করুন।
                    </p>
                </Fade>
            </div>

            {/* Review Form */}
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-100 mb-12">
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            আপনার বার্তা
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder="আপনার মতামত লিখুন..."
                            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none resize-none transition duration-200"
                        ></textarea>
                    </div>

                    {/* New Dropdown Rating */}
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            রেটিং দিন ⭐
                        </label>
                        <div className="relative">
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-red-400 outline-none transition duration-200 appearance-none"
                            >
                                <option value="">-- রেটিং নির্বাচন করুন --</option>
                                <option value="5">⭐⭐⭐⭐⭐ অসাধারণ! (দারুণ অভিজ্ঞতা)</option>
                                <option value="4">⭐⭐⭐⭐ খুব ভালো (ছোটখাটো উন্নতির সুযোগ আছে)</option>
                                <option value="3">⭐⭐⭐ মোটামুটি (আরও ভালো হতে পারে)</option>
                                <option value="2">⭐⭐ তেমন ভালো না (কিছু সমস্যা আছে)</option>
                                <option value="1">⭐ খারাপ (অভিজ্ঞতা সন্তোষজনক নয়)</option>
                            </select>
                            <FaStar className="absolute right-3 top-3 text-yellow-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-8 py-3 rounded-xl font-semibold transition duration-300 ${loading
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:scale-[1.03] shadow-md hover:shadow-lg"
                                }`}
                        >
                            {loading ? "⏳ জমা হচ্ছে..." : "📩 রিভিউ জমা দিন"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Reviews Marquee */}
            {reviews.length > 0 && (
                <div className="bg-white py-6 rounded-2xl shadow-inner border border-gray-100">
                    <Marquee pauseOnHover speed={60} gradient={false}>
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="mx-4 bg-gradient-to-br from-rose-50 to-white border border-gray-200 rounded-2xl shadow p-4 min-w-[230px] max-w-[280px]"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <FaUserCircle className="text-red-500 text-2xl" />
                                    <h3 className="font-semibold text-gray-800 text-sm">
                                        {review.name}
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-1">
                                    <FaQuoteLeft className="inline-block text-rose-400 mr-1" />
                                    {review.message}
                                </p>
                                <p className="text-yellow-500 text-base">
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

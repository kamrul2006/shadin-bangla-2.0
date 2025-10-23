import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Marquee from "react-fast-marquee";
import { Fade } from "react-awesome-reveal";
import { FaUserCircle, FaStar, FaQuoteLeft } from "react-icons/fa";

const GiveReview = () => {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        message: "",
        rating: "",
    });
    const [loading, setLoading] = useState(false);

    // Fetch all reviews
    useEffect(() => {
        fetch("http://localhost:5000/reviews")
            .then((res) => res.json())
            .then((data) => setReviews(data.reverse()))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            ...formData,
            date: new Date().toLocaleDateString("bn-BD"),
        };

        try {
            const res = await fetch("http://localhost:5000/reviews", {
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
                setFormData({ name: "", message: "", rating: "" });

                // Refresh reviews instantly
                const updatedReviews = await fetch("http://localhost:5000/reviews").then((r) => r.json());
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
        <section className="py-16 px-4 bg-gradient-to-br from-white via-rose-50 to-gray-100">
            <div className="max-w-5xl mx-auto text-center mb-10">
                <Fade direction="up" triggerOnce>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                        আপনার মতামত দিন 💬
                    </h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        স্বাধীন বাংলা ২.০ সম্পর্কে আপনার মূল্যবান মতামত দিন এবং আমাদের জানাতে সাহায্য করুন কিভাবে আমরা আরও ভালো হতে পারি।
                    </p>
                </Fade>
            </div>

            {/* Review Form */}
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-gray-100 mb-12">
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            নাম
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="আপনার নাম লিখুন"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-400 outline-none transition duration-200"
                        />
                    </div>

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
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-red-400 outline-none resize-none transition duration-200"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                            রেটিং দিন ⭐
                        </label>
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-white focus:ring-2 focus:ring-red-400 outline-none transition duration-200"
                        >
                            <option value="">-- রেটিং নির্বাচন করুন --</option>
                            <option value="5">⭐⭐⭐⭐⭐ (দারুণ)</option>
                            <option value="4">⭐⭐⭐⭐ (ভালো)</option>
                            <option value="3">⭐⭐⭐ (মোটামুটি)</option>
                            <option value="2">⭐⭐ (খারাপ না)</option>
                            <option value="1">⭐ (খারাপ)</option>
                        </select>
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
                                className="mx-6 bg-gradient-to-br from-rose-50 to-white border border-gray-200 rounded-2xl shadow p-4 min-w-[250px] max-w-[300px]"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaUserCircle className="text-red-500 text-2xl" />
                                    <h3 className="font-semibold text-gray-800">{review.name}</h3>
                                </div>
                                <p className="text-gray-600 text-sm mb-2">
                                    <FaQuoteLeft className="inline-block text-rose-400 mr-1" />
                                    {review.message}
                                </p>
                                <p className="text-yellow-500 text-lg">
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

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaCheck, FaTrash, FaClock } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import CustomLoader from "../Fixed/CustomLoader";

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://shadin-bangla-2-0-server.vercel.app/reviews")
            .then((res) => res.json())
            .then((data) => {
                setReviews(data.reverse());
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleApprove = async (id) => {
        const confirm = await Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "এই রিভিউ অনুমোদন করতে চান?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ",
            cancelButtonText: "বাতিল",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`https://shadin-bangla-2-0-server.vercel.app/reviews/approve/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: "approved" }),
                });

                if (res.ok) {
                    setReviews(reviews.map((r) => (r._id === id ? { ...r, status: "approved" } : r)));
                    Swal.fire("✅ অনুমোদিত!", "রিভিউ অনুমোদিত হয়েছে।", "success");
                } else {
                    Swal.fire("❌ ত্রুটি!", "অনুমোদনে সমস্যা হয়েছে।", "error");
                }
            } catch (error) {
                console.error(error);
                Swal.fire("⚠️ সার্ভার সমস্যা!", "আবার চেষ্টা করুন।", "error");
            }
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "রিভিউটি স্থায়ীভাবে মুছে ফেলা হবে।",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "হ্যাঁ",
            cancelButtonText: "বাতিল",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`https://shadin-bangla-2-0-server.vercel.app/reviews/${id}`, { method: "DELETE" });
                if (res.ok) {
                    setReviews(reviews.filter((r) => r._id !== id));
                    Swal.fire("🗑️ মুছে ফেলা হয়েছে!", "রিভিউ মুছে ফেলা হয়েছে।", "success");
                } else {
                    Swal.fire("❌ ত্রুটি!", "রিভিউ মুছে ফেলা যায়নি।", "error");
                }
            } catch (error) {
                console.error(error);
                Swal.fire("⚠️ সার্ভার ত্রুটি!", "আবার চেষ্টা করুন।", "error");
            }
        }
    };

    if (loading) return (
        <CustomLoader />

    )
    return (
        <div className="max-w-6xl mx-auto py-8 px-4 md:pt-20">
            <Fade direction="up" triggerOnce>
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">💬 রিভিউ ম্যানেজ প্যানেল</h1>
            </Fade>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200 text-black">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">নাম</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">বার্তা</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">রেটিং</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">তারিখ</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">স্ট্যাটাস</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {reviews.map((r) => (
                            <tr key={r._id} className="hover:bg-gray-50 transition-all">
                                <td className="px-6 py-4">{r.name}</td>
                                <td className="px-6 py-4">{r.message}</td>
                                <td className="px-6 py-4">{r.rating} ⭐</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{r.date}</td>
                                <td className="px-6 py-4">
                                    {r.status === "approved" ? (
                                        <span className="text-green-600 font-medium">✅A</span>
                                    ) : (
                                        <span className="text-yellow-600 font-medium">⏳P</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center flex justify-center gap-2">
                                    {r.status !== "approved" && (
                                        <button
                                            onClick={() => handleApprove(r._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition"
                                            title="অনুমোদন"
                                        >
                                            <FaCheck />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(r._id)}
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
        </div>
    );
};

export default ManageReviews;

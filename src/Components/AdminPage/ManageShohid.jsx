import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { FaPlusCircle, FaTrashAlt, FaUsers } from "react-icons/fa";
import CustomLoader from "../Fixed/CustomLoader";

const ManageShohid = () => {
    const [shohids, setShohids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newShohid, setNewShohid] = useState({
        name: "",
        image: "",
        date_of_death: "",
        short_info: "",
    });

    // -------------------Fetch Shohid Data
    useEffect(() => {
        fetch("https://shadin-bangla-2-0-server.vercel.app/Shohid")
            .then((res) => res.json())
            .then((data) => {
                setShohids(data.reverse());
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching Shohid data:", err);
                setLoading(false);
            });
    }, []);

    // ------------------------ Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewShohid({ ...newShohid, [name]: value });
    };

    // -------------------------- Add New Shohid
    const handleAddShohid = async (e) => {
        e.preventDefault();

        if (!newShohid.name || !newShohid.image || !newShohid.date_of_death || !newShohid.short_info) {
            return Swal.fire("⚠️ দুঃখিত!", "সবগুলো ঘর পূরণ করুন।", "warning");
        }

        try {
            const res = await fetch("https://shadin-bangla-2-0-server.vercel.app/Shohid", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newShohid),
            });

            if (res.ok) {
                const data = await res.json();
                setShohids([data, ...shohids]);
                Swal.fire("✅ সফল!", "নতুন শহীদের তথ্য যুক্ত হয়েছে।", "success");
                setNewShohid({ name: "", image: "", date_of_death: "", short_info: "" });
            } else {
                Swal.fire("❌ ত্রুটি!", "তথ্য সংরক্ষণ ব্যর্থ হয়েছে।", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("⚠️ সার্ভার সমস্যা!", "আবার চেষ্টা করুন।", "error");
        }
    };

    // ----------------- Delete Shohid
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "এই শহীদের তথ্য মুছে ফেলা হবে।",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
            cancelButtonText: "বাতিল",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`https://shadin-bangla-2-0-server.vercel.app/Shohid/${id}`, { method: "DELETE" });

            if (res.ok) {
                setShohids(shohids.filter((s) => s._id !== id));
                Swal.fire("🗑️ মুছে ফেলা হয়েছে!", "তথ্যটি সফলভাবে মুছে ফেলা হয়েছে।", "success");
            } else {
                Swal.fire("❌ ত্রুটি!", "তথ্য মুছে ফেলা ব্যর্থ হয়েছে।", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("⚠️ সার্ভার সমস্যা!", "আবার চেষ্টা করুন।", "error");
        }
    };

    if (loading)
        return (
            <CustomLoader />

        );

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 md:pt-20 text-black">
            <Fade direction="up" triggerOnce>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2">
                        <FaUsers /> জুলাই শহীদ ব্যবস্থাপনা
                    </h1>
                    <Link
                        to="/shohid"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-medium"
                    >
                        🔗 সব শহীদ দেখুন
                    </Link>
                </div>
            </Fade>

            {/* ---------------- Add Form ---------------- */}
            <div className="bg-white shadow-md rounded-lg p-3 md:p-6 mb-8 border border-gray-100">

                <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                    <FaPlusCircle /> নতুন শহীদ যুক্ত করুন
                </h2>

                <form onSubmit={handleAddShohid} className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    <input
                        type="text"
                        name="name"
                        value={newShohid.name}
                        onChange={handleChange}
                        placeholder="শহীদের নাম"
                        className="border p-2 rounded-md focus:outline-green-500"
                    />

                    <input
                        type="text"
                        name="date_of_death"
                        value={newShohid.date_of_death}
                        onChange={handleChange}
                        placeholder="মৃত্যুর তারিখ"
                        className="border p-2 rounded-md focus:outline-green-500"
                    />

                    <input
                        type="text"
                        name="image"
                        value={newShohid.image}
                        onChange={handleChange}
                        placeholder="ছবির লিংক"
                        className="border p-2 rounded-md focus:outline-green-500 col-span-2"
                    />

                    <textarea
                        name="short_info"
                        value={newShohid.short_info}
                        onChange={handleChange}
                        placeholder="সংক্ষিপ্ত বিবরণ"
                        rows="3"
                        className="border p-2 rounded-md md:col-span-2 focus:outline-green-500"
                    ></textarea>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold md:col-span-2 transition"
                    >
                        ✅ যুক্ত করুন
                    </button>
                </form>
            </div>

            {/* ---------------- Shohid List ---------------- */}
            {shohids.length === 0 ? (
                <p className="text-center text-gray-500">কোনো শহীদের তথ্য নেই।</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5">
                    {shohids.map((s) => (
                        <div
                            key={s._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-100"
                        >
                            <img
                                src={s.image}
                                alt={s.name}
                                className="w-full h-40 md:h-48 object-cover"
                            />
                            <div className="p-2">

                                <div className="flex items-center justify-between ">
                                    <h3 className=" md:font-bold md:text-base text-sm  text-green-700 py-1">{s.name}</h3>
                                    <button
                                        onClick={() => handleDelete(s._id)}
                                        className=" bg-white md:bg-red-500 hover:bg-red-600 md:p-2  md:text-white text-red-600 rounded-full text-sm flex items-center gap-1 transition"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>

                                <p className="text-sm text-red-900 py-1 border-y  rounded pl-2 shadow-gray-300 shadow-md">মৃত্যুঃ {s.date_of_death}</p>

                                <p className="text-gray-700 text-xs text-justify mt-2">{s.short_info?.slice(0, 150)}...</p>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageShohid;

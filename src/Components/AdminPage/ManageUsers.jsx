import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaUserShield, FaUserMinus, FaSpinner } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔹 Fetch all users
    useEffect(() => {
        fetch("https://shadin-bangla-2-0-server.vercel.app/Users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching users:", err));
    }, []);

    // 🔹 Make Admin
    const makeAdmin = async (id) => {
        const confirm = await Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "এই ব্যবহারকারীকে Admin করা হবে!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "হ্যাঁ, Admin করুন",
            cancelButtonText: "বাতিল",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`https://shadin-bangla-2-0-server.vercel.app/Users/admin/${id}`, {
                method: "PATCH",
            });

            if (res.ok) {
                setUsers(users.map((u) => (u._id === id ? { ...u, role: "admin" } : u)));
                Swal.fire("✅ সফল!", "ব্যবহারকারী এখন Admin।", "success");
            } else {
                Swal.fire("❌ ত্রুটি!", "Admin করা সম্ভব হয়নি।", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("⚠️ সার্ভার সমস্যা!", "আবার চেষ্টা করুন।", "error");
        }
    };

    // 🔹 Remove Admin
    const removeAdmin = async (id) => {
        const confirm = await Swal.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "এই ব্যবহারকারীর Admin রোল সরানো হবে!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "হ্যাঁ, সরান",
            cancelButtonText: "বাতিল",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`https://shadin-bangla-2-0-server.vercel.app/Users/remove-admin/${id}`, {
                method: "PATCH",
            });

            if (res.ok) {
                setUsers(users.map((u) => (u._id === id ? { ...u, role: "user" } : u)));
                Swal.fire("🗑️ সরানো হয়েছে!", "Admin রোল সরানো হয়েছে।", "success");
            } else {
                Swal.fire("❌ ত্রুটি!", "রোল সরানো যায়নি।", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("⚠️ সার্ভার সমস্যা!", "আবার চেষ্টা করুন।", "error");
        }
    };

    // 🔹 Loading State
    if (loading)
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                <FaSpinner className="animate-spin text-4xl mb-3" />
                <p>ব্যবহারকারীর ডেটা লোড হচ্ছে...</p>
            </div>
        );

    // 🔹 Render UI
    return (
        <div className="max-w-6xl mx-auto py-8 px-4 md:pt-20 text-black">
            <Fade triggerOnce>
                <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
                    👥 ব্যবহারকারী ম্যানেজ প্যানেল
                </h1>
            </Fade>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">নাম</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">ইমেইল</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">রোল</th>
                            <th className="px-6 py-3 text-center text-sm font-semibold">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((u) => (
                            <tr
                                key={u._id}
                                className="hover:bg-gray-50 transition-all duration-150"
                            >
                                <td className="px-6 py-4">{u.name}</td>
                                <td className="px-6 py-4">{u.email}</td>
                                <td className="px-6 py-4 font-medium">
                                    {u.role === "Superadmin" ? (
                                        <span className="text-purple-700 font-semibold">🛡️ Super Admin</span>
                                    ) : u.role === "admin" ? (
                                        <span className="text-green-600 font-semibold">🔹 Admin</span>
                                    ) : (
                                        <span className="text-gray-600">User</span>
                                    )}
                                </td>

                                <td className="px-6 py-4 text-center">
                                    {u.role === "Superadmin" ? (
                                        <span className="text-gray-400 text-sm">No Action</span>
                                    ) : u.role === "admin" ? (
                                        <button
                                            onClick={() => removeAdmin(u._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                                            title="Admin সরান"
                                        >
                                            <FaUserMinus />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => makeAdmin(u._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition"
                                            title="Admin বানান"
                                        >
                                            <FaUserShield />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;

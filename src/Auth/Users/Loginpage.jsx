import React, { useContext, useState } from "react";
import {
    FaGoogle,
    FaEyeSlash,
    FaEye,
    FaHome,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const LoginPage = () => {
    const axiosPublic = UseAxiosPublic();
    const { LoginUser, setUser, GoogleLogin } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const togglePassword = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    // -------- Handle email/password login --------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const userCredential = await LoginUser(email, password);
            const user = userCredential.user;
            setUser(user);

            Swal.fire({
                icon: "success",
                title: "লগইন সফল!",
                text: "স্বাগতম শাদিন বাংলায়।",
                timer: 1800,
                showConfirmButton: false,
            });

            navigate(location.state ? location.state : "/");
        } catch (err) {
            setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়!");
        } finally {
            setLoading(false);
        }
    };

    // -------- Google Login --------
    const HandleGoogleLogin = () => {
        GoogleLogin()
            .then((res) => {
                setUser(res.user);

                const UserInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: "user",
                    isSubscribed: false,
                };

                axiosPublic.post("/users", UserInfo);

                Swal.fire({
                    icon: "success",
                    title: "গুগল লগইন সফল!",
                    text: "স্বাগতম স্বাধীন বাংলা  ২.০ এ",
                    timer: 2000,
                    showConfirmButton: false,
                });

                navigate(location.state ? location.state : "/");
            })
            .catch(() => {
                setUser(null);
                Swal.fire({
                    icon: "error",
                    title: "লগইন ব্যর্থ!",
                    text: "পুনরায় চেষ্টা করুন।",
                });
            });
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('/backgrounds/login-bg.jpg')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Main Container */}
            <div className="relative z-10 w-11/12 max-w-4xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

                {/* Left Section - Branding */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-gradient-to-b from-red-600/50 to-red-800/50 p-10 text-white text-center backdrop-blur">
                    <img
                        src="/icons/g.png"
                        alt="Shadin Bangla"
                        className="w-24 sm:w-32 mb-5 drop-shadow-lg"
                    />
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">স্বাধীন বাংলা ২.০</h2>
                    <p className="text-sm sm:text-base text-red-100 mb-6">
                        আন্দোলনের গল্প, শহীদের স্মৃতি ও নতুন প্রজন্মের কণ্ঠ।
                    </p>

                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-white text-red-700 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition"
                    >
                        <FaHome /> হোম পেজে ফিরে যান
                    </Link>
                </div>

                {/* Right Section - Login Form */}
                <div className="w-full lg:w-1/2 bg-white/60 p-8 sm:p-10 backdrop-blur-md">
                    <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
                        লগইন করুন
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                ইমেইল
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="আপনার ইমেইল দিন"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                পাসওয়ার্ড
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="আপনার পাসওয়ার্ড দিন"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                            <button
                                onClick={togglePassword}
                                className="absolute right-3 top-9 text-gray-500 hover:text-red-600"
                            >
                                {show ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-sm text-red-600 font-medium text-center">{error}</p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-5 border-t border-gray-300"></div>

                    {/* Google Login */}
                    <button
                        onClick={HandleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 py-2 border border-red-500 rounded-lg text-red-600 font-semibold hover:bg-red-600 hover:text-white transition"
                    >
                        <FaGoogle /> গুগল দিয়ে লগইন করুন
                    </button>

                    {/* Register link */}
                    <p className="mt-5 text-center text-sm text-gray-600">
                        নতুন একাউন্ট তৈরি করতে চান?{" "}
                        <Link
                            to="/register"
                            className="text-red-600 hover:underline font-semibold"
                        >
                            রেজিস্ট্রেশন করুন
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

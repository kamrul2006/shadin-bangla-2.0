import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaHome } from "react-icons/fa";
import { sendEmailVerification } from "firebase/auth";
import { AuthContext } from "../Providers/AuthProvider";
import { auth } from "../FireBase/firebase.init";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const SignupPage = () => {
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();
    const { CreateUserByMailPass, setUser, updatedProfile, GoogleLogin } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [show, setShow] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        const terms = form.terms.checked;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!terms) return setError("দয়া করে শর্তাবলী ও নীতিমালা মেনে নিন।");
        if (password.length < 6) return setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
        if (!passwordRegex.test(password))
            return setError("পাসওয়ার্ডে বড় হাতের, ছোট হাতের অক্ষর, সংখ্যা ও বিশেষ চিহ্ন থাকতে হবে।");

        try {
            const userCredential = await CreateUserByMailPass(email, password);
            const user = userCredential.user;
            setUser(user);

            await updatedProfile({ displayName: name, photoURL: photo });
            await sendEmailVerification(auth.currentUser);

            const userInfo = {
                name,
                email,
                role: "user",
                isSubscribed: false,
            };

            await axiosPublic.post("/users", userInfo);
            setSuccess("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
            form.reset();
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const res = await GoogleLogin();
            setUser(res.user);

            const userInfo = {
                name: res.user.displayName,
                email: res.user.email,
                role: "user",
                isSubscribed: false,
            };
            await axiosPublic.post("/users", userInfo);
            setSuccess("গুগল দিয়ে সফলভাবে সাইন আপ হয়েছে!");
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("গুগল লগইন ব্যর্থ হয়েছে।");
            setUser(null);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center "
            style={{ backgroundImage: "url('/backgrounds/login-bg.jpg')" }}
        >

            {/*------------- Overlay --------------*/}
            <div className=" bg-black/60 w-full h-full backdrop-blur-sm flex items-center justify-center px-4 py-12">

                <div className="w-full max-w-5xl bg-white/50 backdrop-blur border border-white/20 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse">

                    {/* ---------- বাম দিক ---------- */}
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-b from-green-600/90 to-green-700/90 text-white p-8 md:p-10">

                        <img src="/icons/g.png" alt="Shadin Bangla" className="w-32  md:w-44 mb-4 drop-shadow-xl drop-shadow-blue-50" />

                        <h2 className="text-2xl font-bold tracking-wide">স্বাধীন বাংলা ২.০</h2>
                        <p className="text-sm text-gray-100 mt-2 text-center">
                            ব্লগ পড়ুন, লিখুন এবং আপনার চিন্তা সবার সাথে ভাগ করুন।
                        </p>
                        <Link
                            to="/"
                            className="mt-6 inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                        >
                            <FaHome /> হোমে ফিরে যান
                        </Link>
                    </div>


                    {/* ---------- ডান দিক ---------- */}
                    <div className="w-full md:w-1/2 bg-white/80 text-gray-800 p-8 md:p-10">
                        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
                            নতুন একাউন্ট তৈরি করুন
                        </h2>

                        <form onSubmit={handleSignUp} className="space-y-4">
                            {/* নাম */}
                            <div>
                                <label className="text-sm font-semibold">পূর্ণ নাম</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    placeholder="আপনার নাম লিখুন"
                                    required
                                />
                            </div>

                            {/* ছবি লিংক */}
                            <div>
                                <label className="text-sm font-semibold">ছবির লিংক</label>
                                <input
                                    type="text"
                                    name="photo"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    placeholder="ছবির URL লিখুন"
                                    required
                                />
                            </div>

                            {/* ইমেইল */}
                            <div>
                                <label className="text-sm font-semibold">ইমেইল ঠিকানা</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    placeholder="আপনার ইমেইল লিখুন"
                                    required
                                />
                            </div>

                            {/* পাসওয়ার্ড */}
                            <div className="relative">
                                <label className="text-sm font-semibold">পাসওয়ার্ড</label>
                                <input
                                    type={show ? "text" : "password"}
                                    name="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                                    placeholder="পাসওয়ার্ড লিখুন"
                                    required
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShow(!show);
                                    }}
                                    className="absolute right-3 top-9 text-gray-600 text-lg"
                                >
                                    {show ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* শর্তাবলী */}
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="terms" className="accent-green-600" />
                                <span className="text-sm">
                                    আমি{" "}
                                    <Link to="/terms" className="text-green-600 underline">
                                        শর্তাবলী ও নীতিমালা
                                    </Link>{" "}
                                    মেনে নিচ্ছি।
                                </span>
                            </div>

                            {/* বার্তা */}
                            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                            {success && <p className="text-sm text-green-600 text-center">{success}</p>}

                            {/* বোতাম */}
                            <button
                                type="submit"
                                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                            >
                                সাইন আপ করুন
                            </button>
                        </form>

                        {/* বিভাজক */}
                        <div className="flex items-center my-2">
                            <div className="flex-grow border-t border-gray-600"></div>
                            <span className="mx-3 text-gray-500 text-sm">অথবা</span>
                            <div className="flex-grow border-t border-gray-600"></div>
                        </div>

                        {/* গুগল লগইন */}
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white  py-2 rounded-lg transition"
                        >
                            <FaGoogle /> গুগল দিয়ে লগইন করুন
                        </button>

                        {/* লগইন লিংক */}
                        <p className="text-center text-sm mt-4">
                            ইতিমধ্যে একাউন্ট আছে?{" "}
                            <Link to="/login" className="text-green-600  hover:underline">
                                লগইন করুন
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

import React from "react";
import { Link } from "react-router-dom";
import { Fade, Zoom } from "react-awesome-reveal";
import { FiHome } from "react-icons/fi";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 text-gray-800 text-center px-6">

            {/* Floating Illustration Style Circle */}
            <div className="absolute w-72 h-72 bg-green-200/30 rounded-full blur-3xl top-10 left-10 animate-pulse" />
            <div className="absolute w-80 h-80 bg-yellow-100/40 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />

            {/* 404 Number */}
            <Zoom triggerOnce>
                <h1 className="text-[7rem]  font-extrabold text-green-700 drop-shadow-sm mb-2 animate-pulse">
                    404
                </h1>
            </Zoom>

            {/* Title */}
            <Fade direction="up" delay={200} triggerOnce>
                <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-700">
                    ওহ! আপনি যে পাতায় যেতে চাচ্ছেন তা খুঁজে পাওয়া যায়নি 😅
                </h2>
            </Fade>

            {/* Message */}
            <Fade direction="up" delay={400} triggerOnce>
                <p className="max-w-xl  text-gray-600 mb-8 leading-relaxed">
                    মনে হচ্ছে লিংকটি পরিবর্তিত হয়েছে, মুছে ফেলা হয়েছে, অথবা ভুলভাবে টাইপ করা হয়েছে।
                    চিন্তার কিছু নেই — নিচের বোতামটি চাপুন, আপনাকে আমরা হোমপেজে ফিরিয়ে নিয়ে যাব। 🌿
                </p>
            </Fade>

            {/* Back to Home Button */}
            <Fade direction="up" delay={600} triggerOnce>
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-md 
          hover:bg-green-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    <FiHome className="text-xl" />
                    হোমে ফিরে যান
                </Link>
            </Fade>

            {/* Footer Hint */}
            <Fade direction="up" delay={800} triggerOnce>
                <p className="text-sm text-gray-500 mt-8 italic">
                    — স্বাধীন বাংলা ২.০ টিমের পক্ষ থেকে ধন্যবাদ 💚
                </p>
            </Fade>
        </div>
    );
};

export default ErrorPage;

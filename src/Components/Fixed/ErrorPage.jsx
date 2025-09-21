import React from "react";
import { Link } from "react-router-dom";
import { Zoom, Fade } from "react-awesome-reveal";
import { FiHome } from "react-icons/fi";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-600 via-black to-green-600 text-white text-center px-4">

            {/* Big 404 Number */}
            <Zoom triggerOnce>
                <h1 className="text-[6rem] md:text-[10rem] font-extrabold drop-shadow-2xl">
                    404
                </h1>
            </Zoom>

            {/* Message */}
            <Fade direction="up" delay={200} triggerOnce>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                    ওহ! পেজটি খুঁজে পাওয়া যায়নি 😢
                </h2>
            </Fade>

            <Fade direction="up" delay={400} triggerOnce>
                <p className="mb-6 text-lg opacity-90 max-w-lg">
                    আপনি যে পাতায় যেতে চাচ্ছেন সেটি নেই অথবা মুছে ফেলা হয়েছে।
                    অনুগ্রহ করে হোমপেজে ফিরে যান।
                </p>
            </Fade>

            {/* Home Button */}
            <Fade direction="up" delay={600} triggerOnce>
                <Link
                    to="/"
                    className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg 
                     hover:bg-yellow-300 transition transform hover:scale-110"
                >
                    <FiHome className="text-xl" />
                    হোমে ফিরে যান
                </Link>
            </Fade>
        </div>
    );
};

export default ErrorPage;

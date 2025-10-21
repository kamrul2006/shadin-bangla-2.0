import React from "react";
import { Slide, Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const ShohidBanner = () => {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat min-h-[70vh] flex items-center px-6 text-white"
            style={{ backgroundImage: "url('/backgrounds/bannerBg.png')" }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl pt-10">
                <Fade direction="down" triggerOnce>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
                        শহীদের স্মরণে  শহীদের স্মৃতিতে
                    </h1>
                </Fade>

                <Fade direction="up" delay={300} triggerOnce>
                    <p className="mt-4 border-l-4 border-red-600 p-4 text-sm sm:text-base md:text-lg leading-relaxed ">
                        স্বাধীনতা অর্জনের চেয়ে স্বাধীনতা রক্ষা করা কঠিন। তাই স্বাধীনতা
                        রক্ষায় জাতিকে থাকতে হয় সদা জাগ্রত। জুলাই আন্দোলনে শহীদদের তালিকা
                        মনে করিয়ে দেয় তাদের কথা। জাতি তুমাদের ভুলবে না।
                    </p>
                </Fade>

                <Slide direction="up" delay={600} triggerOnce>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/julyGallery"
                            className="px-5 py-3 rounded-lg bg-red-600 text-white font-semibold shadow-lg 
                        hover:bg-red-800 hover:scale-105 transform transition duration-300 text-center"
                        >
                            জুলাই গ্যালারি দেখুন
                        </Link>
                        <Link
                            to="/history"
                            className="px-5 py-3 rounded-lg border-2 border-red-500 font-semibold text-white 
                        hover:bg-red-600 hover:border-red-600 hover:text-white hover:scale-105 
                        transform transition duration-300 text-center"
                        >
                            জুলাই বিপ্লব সম্পর্কে জানুন
                        </Link>
                    </div>
                </Slide>
            </div>
        </div>
    );
};

export default ShohidBanner;

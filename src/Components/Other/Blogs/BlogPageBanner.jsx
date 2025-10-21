import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { Link } from "react-router";

const BlogPageBanner = () => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat  min-h-[400px] max-h-[500px] flex items-center px-6"
            style={{ backgroundImage: "url('/backgrounds/abcd.jpg')" }}
        >
            {/* --------- Dark Overlay --------- */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/40"></div>

            {/* --------- Content --------- */}
            <div className="relative z-10 max-w-3xl w-full  flex flex-col gap-4">

                {/* --------- Title --------- */}
                <Zoom triggerOnce>
                    <h1 className="text-3xl sm:text-3xl md:text-5xl  font-extrabold text-white drop-shadow-xl leading-tight">
                        ব্লগ <span className="text-red-400">পৃষ্ঠায় স্বাগতম</span>
                    </h1>
                </Zoom>

                {/* --------- Description --------- */}
                <Fade direction="up" delay={300} triggerOnce>
                    <p className="mt-2 text-sm sm:text-base md:text-lg  text-white opacity-95 leading-relaxed border-l-4 border-red-600 pl-3 md:pl-4">
                        শহীদদের স্মৃতি, আন্দোলনের গল্প এবং নতুন প্রজন্মের ভাবনা এখানে পাবেন।
                        আমাদের ব্লগ পৃষ্ঠায় পড়ুন এবং শিক্ষণীয় গল্পগুলো শেয়ার করুন।
                    </p>
                </Fade>

                {/* --------- Buttons --------- */}
                <Fade direction="up" delay={600} triggerOnce>
                    <div className="mt-4 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                        <Link
                            to="/writeBlog"
                            className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transform hover:scale-105 transition duration-300"
                        >
                            নতুন ব্লগ লিখুন
                        </Link>
                        <Link
                            to="/"
                            className="px-6 py-2 rounded-lg border-2 border-white font-semibold hover:bg-white hover:text-red-700 transform hover:scale-105 transition duration-300"
                        >
                            হোম পেজে ফিরে যান
                        </Link>
                    </div>
                </Fade>

            </div>
        </section>
    );
};

export default BlogPageBanner;

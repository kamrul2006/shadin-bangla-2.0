import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Link } from "react-router";

const JulyGalleryBanner = () => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat min-h-[70vh] flex items-center justify-center px-6"
            style={{ backgroundImage: "url('/backgrounds/july-bg.jpg')" }}
        >
            {/* --------- Dark Overlay --------- */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-red-900/60"></div>

            {/* --------- Content --------- */}
            <div className="relative z-10 max-w-3xl text-center text-white">
                <Zoom triggerOnce>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold drop-shadow-lg">
                        জুলাই <span className="text-red-400">গ্যালারি</span>
                    </h1>
                </Zoom>

                <Fade direction="up" delay={300} triggerOnce>
                    <p className="mt-4 text-base sm:text-lg md:text-xl opacity-90 leading-relaxed">
                        শহীদের স্মৃতি ধরে রাখার প্রয়াস।
                        ছবির মাধ্যমে আমরা ফিরিয়ে দেখি ইতিহাসের সেই অগ্নিঝরা দিনগুলো।
                    </p>
                </Fade>

                <Slide direction="up" delay={600} triggerOnce>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/shohid"
                            className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold shadow-lg 
                         hover:bg-red-700 transform hover:scale-105 transition duration-300"
                        >
                            শহীদদের সম্পর্কে জানুন
                        </Link>
                        <Link
                            to="/history"
                            className="px-6 py-3 rounded-lg border-2 border-white font-semibold 
                         hover:bg-white hover:text-red-700 transform hover:scale-105 transition duration-300"
                        >
                            জুলাই আন্দোলন সম্পর্কে জানুন
                        </Link>
                    </div>
                </Slide>
            </div>
        </section>
    );
};

export default JulyGalleryBanner;

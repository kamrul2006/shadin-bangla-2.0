import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const JulyGalleryBanner = () => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center px-6"
            style={{ backgroundImage: "url('/backgrounds/july-bg.avif')" }}
        >
            {/* --------- Dark Overlay --------- */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-red-900"></div>

            {/* --------- Content Wrapper --------- */}
            <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">

                {/* --------- Left Content --------- */}
                <div className="text-center md:text-left text-white space-y-6">
                    <Zoom triggerOnce>
                        <h1 className="text-4xl pt-10 md:pt-0 md:text-6xl font-extrabold drop-shadow-lg">
                            জুলাই <span className="text-red-400">গ্যালারি</span>
                        </h1>
                    </Zoom>

                    <Fade direction="up" delay={300} triggerOnce>
                        <p className="text-base sm:text-lg md:text-xl opacity-90 leading-relaxed max-w-xl mx-auto md:mx-0">
                            জুলাই এর স্মৃতি ধরে রাখার প্রয়াস।
                            ছবির মাধ্যমে আমরা ফিরিয়ে দেখি ইতিহাসের সেই অগ্নিঝরা দিনগুলো।
                        </p>
                    </Fade>

                    <Slide direction="up" delay={600} triggerOnce>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                to="/shohid"
                                className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold shadow-lg 
                           hover:bg-red-700 hover:scale-110 transform transition duration-300 text-center"
                            >
                                শহীদদের সম্পর্কে জানুন
                            </Link>
                            <Link
                                to="/blog"
                                className="px-6 py-3 rounded-lg border-2 border-white font-semibold 
                           hover:bg-white hover:text-red-700 hover:scale-110 
                           transform transition duration-300 text-center"
                            >
                                জুলাই আন্দোলন সম্পর্কে জানুন
                            </Link>
                        </div>
                    </Slide>
                </div>

                {/* --------- Right Graphic --------- */}
                <div className="flex justify-center md:justify-end mt-8 md:mt-0">
                    <Fade delay={500} triggerOnce>
                        <img
                            src="/graphys/graphy1.png"
                            alt="july gallery"
                            className="w-72 sm:w-96 md:w-[420px] drop-shadow-2xl hover:scale-105 transform transition duration-500"
                        />
                    </Fade>
                </div>
            </div>

            {/* --------- Decorative Bottom Glow --------- */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-16 bg-red-500/30 blur-3xl rounded-full"></div>
        </section>
    );
};

export default JulyGalleryBanner;

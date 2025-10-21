import React from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom"; // corrected import

const mediaItems = [
    { id: 1, title: "ফিরে দেখা আন্দোলন", img: "/media/img1.JPG" },
    { id: 2, title: "পুলিশের হামলায় আহত", img: "/media/img2.jpg" },
    { id: 3, title: "কুকুর লীগের হামলা", img: "/media/img3.jpg" },
    { id: 4, title: "সংগ্রামী শিক্ষার্থীরা", img: "/media/img4.jpg" },
    { id: 5, title: "পুলিশি নির্যাতনের প্রতিবাদ", img: "/media/img5.jpg" },
    { id: 6, title: "জুলাইয়ের শহীদদের শ্রদ্ধা", img: "/media/img6.jpg" },
];

const MediaSection = () => {
    return (
        <section className="py-12 md:py-16 bg-gray-50 text-black">
            <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
                {/* ---------- Section Header ---------- */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
                    ফিরে দেখা <span className="text-red-600">জুলাই ২০২৪</span>
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-3xl mx-auto leading-relaxed">
                    বাংলাদেশের ২.০ এর প্রতিষ্ঠাকাল ২০২৪ এর জুলাই এর গণ-অভ্যুত্থান এর কিছু স্থির চিত্র।
                    ফিরে দেখা জুলাই ২০২৪ — আন্দোলনের সংগ্রামী মুহূর্তের সাক্ষী।
                </p>

                {/* ---------- Image Grid ---------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                    {mediaItems.map((item, index) => (
                        <Fade
                            delay={index * 80}
                            triggerOnce
                            key={item.id}
                        >
                            <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer bg-white">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-56 sm:h-64 md:h-72 object-cover transform group-hover:scale-105 transition duration-500"
                                />

                                {/* ---------- Overlay for Desktop ---------- */}
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-500 hidden sm:flex items-center justify-center">
                                    <h3 className="text-white font-semibold text-lg text-center px-2">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* ---------- Always-visible title on mobile ---------- */}
                                <div className="sm:hidden absolute bottom-0 inset-x-0 bg-black/60 text-white py-5 px-3">
                                    <h3 className="text-sm font-semibold text-center">{item.title}</h3>
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>

                {/* ---------- View More Button ---------- */}
                <div className="z-50 mt-10">
                    <Link
                        to="/julyGallery"
                        className="inline-block px-6 py-3 rounded-lg border-2 border-black font-semibold 
            hover:bg-black hover:text-green-400 transform hover:scale-105 transition duration-300"
                    >
                        আরও ছবি দেখুন
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MediaSection;

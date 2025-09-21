import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router";

const mediaItems = [
    { id: 1, title: "ফিরে দেখা আন্দোলন ", img: "/media/img1.JPG" },
    { id: 2, title: "পুলিশের  হামলায় আহত ", img: "/media/img2.jpg" },
    { id: 3, title: "কুকুর লীগের হামলা", img: "/media/img3.jpg" },
    { id: 4, title: "পুলিশের  হামলায় আহত ", img: "/media/img4.jpg" },
    { id: 5, title: "কুকুর লীগের হামলা", img: "/media/img5.jpg" },
    { id: 6, title: "জুলাই শহীদ", img: "/media/img6.jpg" },
];

const MediaSection = () => {
    return (
        <section className="py-16 bg-gray-50 text-black">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                    ফিরে দেখা জুলাই ২০২৪
                </h2>
                <p className="text-gray-600 mb-10">
                    বাংলাদেশের ২.০ এর প্রতিষ্ঠাকাল ২০২৪ এর জুলাই এর গন-অভ্যুত্বান এর কিছু স্থির চিত্র। ফিরে দেখা জুলায় ২০২৪। আর ছবি দেখতে নিচে বাটনে ক্লিক করুন।
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {mediaItems.map((item, index) => (
                        <Fade direction="up" delay={index * 150} triggerOnce key={item.id}>
                            <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-red-800 bg-opacity-40 opacity-0 group-hover:opacity-80 transition duration-300 flex items-center justify-center">
                                    <h3 className="text-white font-semibold text-lg px-2 text-center">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>

                <div className="z-50 mt-10">
                    <Link
                        to="/julyGallery"
                        className="px-6 py-3 rounded-lg border-2 border-black font-semibold mt-10
                          hover:bg-black hover:text-green-500 transform hover:scale-105 transition"
                    >
                        আরও ছবি দেখুন
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MediaSection;

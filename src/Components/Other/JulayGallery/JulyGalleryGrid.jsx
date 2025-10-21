import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const JulyGalleryGrid = () => {
    // ---------- State ----------
    const [gallery, setGallery] = useState([]);
    const [selectedType, setSelectedType] = useState("all");

    // ---------- Fetch JSON Data ----------
    useEffect(() => {
        fetch("/julyGallery.json")
            .then((res) => res.json())
            .then((data) => setGallery(data))
            .catch((err) => console.error("Error loading gallery:", err));
    }, []);

    // ---------- Unique types ----------
    const types = ["all", ...new Set(gallery.map((item) => item.type))];

    // ---------- Filtered gallery ----------
    const filteredGallery =
        selectedType === "all"
            ? gallery
            : gallery.filter((item) => item.type === selectedType);

    return (
        <section className="py-16 bg-gray-50 text-black">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">

                {/* ---------- Sidebar ---------- */}
                <aside className="md:col-span-1 min-h-screen">
                    <div className="sticky top-24 space-y-3 bg-white rounded-xl shadow p-5 min-h-screen">
                        <h3 className="text-lg font-bold mb-3">টাইপ অনুযায়ী ফিল্টার</h3>
                        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                            {types.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-4 py-2 rounded-lg font-medium capitalize transition duration-300 whitespace-nowrap ${selectedType === type
                                        ? "bg-red-600 text-white shadow"
                                        : "bg-gray-100 hover:bg-red-100 text-gray-700"
                                        }`}
                                >
                                    {type === "all" ? "সবগুলো" : type}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* ---------- Gallery Grid ---------- */}
                <div className="col-span-1 md:col-span-3">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            জুলাই <span className="text-red-600">গ্যালারি</span>
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                            ক্বোটা সংস্কার আন্দোলনের শহীদদের ছবি ও স্মৃতি ধরে রাখার প্রয়াস।
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    {filteredGallery.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredGallery.map((item, index) => (
                                <Fade
                                    direction="up"
                                    delay={index * 100}
                                    triggerOnce
                                    key={item.id}
                                >
                                    <div className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
                                        {/* ---------- Image ---------- */}
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                                        />

                                        {/* ---------- Overlay ---------- */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                                    opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col 
                                    justify-end p-4">
                                            <h3 className="text-lg font-bold text-white">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-200 mt-1">
                                                {item.shortDis}
                                            </p>
                                        </div>
                                    </div>
                                </Fade>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 font-medium">
                            এই টাইপে কোনো ছবি পাওয়া যায়নি।
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default JulyGalleryGrid;

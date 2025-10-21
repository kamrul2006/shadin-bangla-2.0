import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";

const JulyGalleryGrid = () => {
    // ---------- State ----------
    const [gallery, setGallery] = useState([]);
    const [selectedType, setSelectedType] = useState("all");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // ---------- Fetch JSON Data ----------
    useEffect(() => {
        fetch("/julyGallery.json")
            .then((res) => res.json())
            .then((data) => setGallery(data))
            .catch((err) => console.error("Error loading gallery:", err));
    }, []);

    // ---------- Unique Types ----------
    const types = ["all", ...new Set(gallery.map((item) => item.type))];

    // ---------- Filtered Gallery ----------
    const filteredGallery =
        selectedType === "all"
            ? gallery
            : gallery.filter((item) => item.type === selectedType);

    return (
        <section className="py-12 bg-gray-50 text-black">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* ---------- Sidebar (Desktop) ---------- */}
                <aside className="hidden md:block md:col-span-1">
                    <div className="sticky top-24 space-y-3 bg-white rounded-xl shadow p-5">
                        <h3 className="text-lg font-bold mb-3 text-gray-800">
                            টাইপ অনুযায়ী ফিল্টার
                        </h3>
                        <div className="flex flex-col gap-2">
                            {types.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-4 py-2 rounded-lg font-medium capitalize transition duration-300 ${selectedType === type
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

                {/* ---------- Mobile Filter Dropdown ---------- */}
                <div className="md:hidden col-span-1 mb-6">
                    <button
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-between"
                    >
                        {selectedType === "all" ? "সব ধরনের ছবি" : selectedType}
                        <span className="ml-2">
                            {isMobileFilterOpen ? "▲" : "▼"}
                        </span>
                    </button>

                    {isMobileFilterOpen && (
                        <div className="mt-2 bg-white rounded-xl shadow p-4 flex flex-wrap gap-2">
                            {types.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setSelectedType(type);
                                        setIsMobileFilterOpen(false);
                                    }}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition duration-300 ${selectedType === type
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-100 hover:bg-red-100 text-gray-700"
                                        }`}
                                >
                                    {type === "all" ? "সবগুলো" : type}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ---------- Gallery Grid ---------- */}
                <div className="md:col-span-3">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            জুলাই <span className="text-red-600">গ্যালারি</span>
                        </h2>
                        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                            ক্বোটা সংস্কার আন্দোলনের শহীদদের ছবি ও স্মৃতি ধরে রাখার প্রয়াস।
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    {filteredGallery.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredGallery.map((item, index) => (
                                <Fade
                                    delay={index * 50}
                                    triggerOnce
                                    key={item.id}
                                >
                                    <div className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer bg-white">
                                        {/* ---------- Image ---------- */}
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-64 sm:h-72 object-cover transform group-hover:scale-110 transition duration-700"
                                        />

                                        {/* ---------- Overlay ---------- */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-end p-4">
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
                        <p className="text-center text-gray-500 font-medium py-10">
                            এই টাইপে কোনো ছবি পাওয়া যায়নি।
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default JulyGalleryGrid;

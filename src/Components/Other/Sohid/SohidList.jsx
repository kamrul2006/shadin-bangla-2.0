import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { BiSearch } from "react-icons/bi";

const SohidList = () => {
    const [shohids, setShohids] = useState([]);
    const [filteredShohids, setFilteredShohids] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // -------------------Fetch Shohid data
    useEffect(() => {
        fetch("https://shadin-bangla-2-0-server.vercel.app/Shohid")
            .then((res) => res.json())
            .then((data) => {
                setShohids(data);
                setFilteredShohids(data);
            })
            .catch((err) => console.error("Error fetching Shohid data:", err));
    }, []);

    // ---------------- Filter by name (case-insensitive)
    useEffect(() => {
        const results = shohids.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredShohids(results);
        setCurrentPage(1);
    }, [searchTerm, shohids]);

    // -----------------Pagination logic
    const totalPages = Math.ceil(filteredShohids.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredShohids.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="py-16 bg-gray-50 text-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ---------------- Header + Search ---------------- */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center md:text-left">
                        জুলাই আন্দোলনের{" "}
                        <span className="text-red-700">শহীদদের</span> তালিকা
                    </h2>

                    <div className="flex items-center border rounded-2xl bg-gray-200 w-full md:w-80 px-3 py-2">
                        <BiSearch className="text-xl text-gray-600 mr-2" />
                        <input
                            type="text"
                            placeholder="নাম দ্বারা অনুসন্ধান করুন (বাংলায় লিখুন)"
                            className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <hr className="border-gray-300 mb-8" />

                {/* ---------------- Shohid Grid ---------------- */}
                {currentItems.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {currentItems.map((item, index) => (
                            <Fade delay={index * 60} triggerOnce key={item._id}>
                                <div className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer flex flex-col transition-transform duration-500 hover:scale-[1.03] hover:shadow-xl">
                                    {/* Image */}
                                    <div className="relative h-40 sm:h-56 md:h-64 w-full overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 md:flex flex-col justify-end p-3 sm:p-4 hidden ">
                                            <h3 className="text-white font-bold text-base sm:text-lg truncate">
                                                {item.name}
                                            </h3>
                                            <p className="text-red-300 font-bold text-xs sm:text-sm">
                                                মৃত্যুর তারিখ: {item.date_of_death}
                                            </p>
                                            <p className="text-white/60 text-xs ">
                                                {item.short_info?.slice(0, 150)}...
                                            </p>
                                        </div>
                                    </div>

                                    {/* ---------------Card Content (visible on mobile) ---------------------*/}
                                    <div className="p-3 md:hidden">
                                        <h3 className="text-gray-900 font-semibold text-base truncate px-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 text-xs h-[70px] overflow-hidden">
                                            {item.short_info?.slice(0, 120)}...
                                        </p>
                                        <p className="text-red-500 font-bold text-center text-sm border-t border-red-300 pt-2">
                                            মৃত্যুর তারিখ: {item.date_of_death}
                                        </p>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 font-medium mt-10">
                        কোন শহীদ পাওয়া যায়নি।
                    </p>
                )}

                {/* ---------------- Pagination ---------------- */}
                {filteredShohids.length > itemsPerPage && (
                    <div className="flex justify-center mt-10 gap-2 flex-wrap">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 rounded-md border text-sm font-medium transition-all ${currentPage === i + 1
                                    ? "bg-red-700 text-white border-red-700"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SohidList;

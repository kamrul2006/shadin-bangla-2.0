import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { BiSearch } from "react-icons/bi";

const mediaItems = [
    { id: 1, title: "আবু সাইদ", add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর", date: "১৬ জুলাই, ২০২৪", img: "/sohid/sohid.jpg" },
    { id: 2, title: "আব্দুল আহাদ", add: "৪ বছরের শিশু", date: "১৯ জুলাই, ২০২৪", img: "/sohid/sohid1.jpg" },
    { id: 3, title: "রিয়া গোপ", add: "৬ বছরের শিশু", date: "২৪ জুলাই, ২০২৪", img: "/sohid/sohid2.jpg" },
    { id: 4, title: "আবু সাইদ", add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর", date: "১৬ জুলাই, ২০২৪", img: "/sohid/sohid3.jpg" },
    { id: 5, title: "তাহমিদ তামিম", add: "কাদির মোল্লা হাই স্কুল, নরসিংদী", date: "১৮ জুলাই, ২০২৪", img: "/sohid/sohid6.jpg" },
    { id: 6, title: "মীর মুগ্ধ", add: "বাংলাদেশ ইউনিভার্সিটি অফ প্রফেশনালস", date: "১৮ জুলাই, ২০২৪", img: "/sohid/sohid7.jpg" },
    { id: 7, title: "আবু সাইদ", add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর", date: "১৬ জুলাই, ২০২৪", img: "/sohid/sohid5.jpg" },
    { id: 8, title: "আবু সাইদ", add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর", date: "১৬ জুলাই, ২০২৪", img: "/sohid/sohid4.jpg" },
];

const SohidList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    // --------------------Filter by name------------------
    const filteredItems = mediaItems.filter(item =>
        item.title.includes(searchTerm.toLowerCase())
    );

    return (
        <section className="py-16 bg-gray-50 text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ----------------------------Header + Search-------------------------*/}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center md:text-left">
                        জুলাই আন্দোলনে <span className="text-red-700">শহীদদের</span> তালিকা
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

                {/* -------------------------Grid-------------------- */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredItems.map((item, index) => (
                            <Fade delay={index * 80} triggerOnce key={item.id}>
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer flex flex-col transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
                                    {/* Image */}
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                                            <h3 className="text-white font-bold text-lg sm:text-xl">
                                                {item.title}
                                            </h3>
                                            <p className="text-white text-sm sm:text-base">{item.add}</p>
                                            <p className="text-white text-sm sm:text-base">মৃত্যু তারিখ: {item.date}</p>
                                        </div>
                                    </div>

                                    {/* ---------------------Card Content on sm devise------------ */}
                                    <div className="p-4 md:hidden">
                                        <h3 className="text-gray-900 font-semibold text-lg truncate">{item.title}</h3>
                                        <p className="text-gray-600 text-sm truncate">{item.add}</p>
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
            </div>
        </section>
    );
};

export default SohidList;

import React from "react";
import { Fade } from "react-awesome-reveal";
import { BiSearch } from "react-icons/bi";

const mediaItems = [
    {
        id: 1,
        title: "আবু সাইদ",
        add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর",
        date: "১৬ জুলাই, ২০২৪",
        img: "/sohid/sohid.jpg",
    },
    {
        id: 2,
        title: "আব্দুল আহাদ",
        add: "৪ বছরের শিশু",
        date: "১৯ জুলাই, ২০২৪",
        img: "/sohid/sohid1.jpg",
    },
    {
        id: 3,
        title: "রিয়া গোপ",
        add: "৬ বছরের শিশু",
        date: "২৪ জুলাই, ২০২৪",
        img: "/sohid/sohid2.jpg",
    },
    {
        id: 4,
        title: "আবু সাইদ",
        add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর",
        date: "১৬ জুলাই, ২০২৪",
        img: "/sohid/sohid3.jpg",
    },
    {
        id: 5,
        title: "তাহমিদ তামিম",
        add: "কাদির মোল্লা হাই স্কুল, নরসিংদী",
        date: "১৮ জুলাই, ২০২৪",
        img: "/sohid/sohid6.jpg",
    },
    {
        id: 6,
        title: "মীর মুগ্ধ",
        add: "বাংলাদেশ ইউনিভার্সিটি অফ প্রফেশনালস",
        date: "১৮ জুলাই, ২০২৪",
        img: "/sohid/sohid7.jpg",
    },
    {
        id: 7,
        title: "আবু সাইদ",
        add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর",
        date: "১৬ জুলাই, ২০২৪",
        img: "/sohid/sohid5.jpg",
    },
    {
        id: 8,
        title: "আবু সাইদ",
        add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর",
        date: "১৬ জুলাই, ২০২৪",
        img: "/sohid/sohid4.jpg",
    },
];

const SohidList = () => {
    return (
        <section className="py-16 bg-gray-50 text-black">
            <div className="max-w-7xl mx-auto px-6">
                {/* --------- Section Header with Search --------- */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-5 pb-5 gap-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center md:text-left">
                        জুলাই আন্দোলনে <span className="text-red-700">শহীদদের</span> তালিকা
                    </h2>

                    {/* --------- Search Box --------- */}
                    <div className="flex items-center border px-3 sm:px-5 rounded-2xl bg-gray-200 w-full md:w-96">
                        <BiSearch className="text-xl text-gray-600" />
                        <input
                            type="text"
                            placeholder="নাম দ্বারা অনুসন্ধান করুন (বাংলায় লিখুন)"
                            className="h-[48px] w-full px-3 sm:px-4 bg-transparent outline-none text-gray-950 placeholder:text-sm sm:placeholder:text-base text-[15px] sm:text-[16px] lg:text-lg font-medium"
                        />
                    </div>
                </div>

                <hr />

                {/* --------- Grid of Sohid Cards --------- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {mediaItems.map((item, index) => (
                        <Fade direction="up" delay={index * 120} triggerOnce key={item.id}>
                            <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer bg-white">
                                {/* --------- Image with Hover Zoom --------- */}
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                                />

                                {/* --------- Overlay Content on Hover --------- */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col items-center justify-end p-4 text-center">
                                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-white text-sm sm:text-base mb-1">
                                        {item.add}
                                    </p>
                                    <p className="text-white text-sm sm:text-base">
                                        মৃত্যু তারিখ: {item.date}
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SohidList;

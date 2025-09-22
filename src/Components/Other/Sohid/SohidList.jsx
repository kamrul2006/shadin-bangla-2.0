import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router";

const mediaItems = [
    {
        id: 1,
        title: "আবু সাইদ",
        add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর",
        date: " ১৬ জুলাই, ২০২৪",
        img: "/sohid/sohid.jpg"
    },
    {
        id: 2,
        title: "আব্দুল আহাদ",
        add: "৪ বছরের শিশু",
        date: "  ১৯ জুলাই, ২০২৪",
        img: "/sohid/sohid1.jpg"
    },
    {
        id: 3,
        title: "রিয়া গোপ",
        add: "৬ বছরের শিশু",
        date: " ২৪ জুলাই, ২০২৪",
        img: "/sohid/sohid2.jpg"
    },
    {
        id: 5,
        title: "তাহমিদ তামিম ",
        add: "কাদির মোল্লা হাই স্কুল, নরসিংদী",
        date: " ১৮ জুলাই, ২০২৪",
        img: "/sohid/sohid6.jpg"
    },
    {
        id: 6,
        title: "মীর মুগ্ধ",
        add: "বাংলাদেশ ইউনিভার্সিটি অফ প্রফেশনালস",
        date: " ১৮ জুলাই, ২০২৪",
        img: "/sohid/sohid7.jpg"
    },
    {
        id: 7,
        title: "আবু সাইদ",
        add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর",
        date: " ১৬ জুলাই, ২০২৪",
        img: "/sohid/sohid5.jpg"
    },
    {
        id: 8,
        title: "আবু সাইদ",
        add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর",
        date: " ১৬ জুলাই, ২০২৪",
        img: "/sohid/sohid4.jpg"
    },
    {
        id: 4,
        title: "আবু সাইদ",
        add: "বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর",
        date: " ১৬ জুলাই, ২০২৪",
        img: "/sohid/sohid3.jpg"
    },

];

const SohidList = () => {
    return (
        <section className="py-16 bg-gray-50 text-black">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <div className="flex items-center justify-between mb-5 pb-5">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 px-3">
                        জুলাই আন্দোলনে <span className="text-red-700">শহীদদের</span>  তালিকা
                    </h2>

                    <div className="flex items-center border px-5 rounded-2xl bg-gray-200">
                        <BiSearch />
                        <input
                            type="text"
                            placeholder="নাম দ্বারা অনুসন্ধান করুন (বাংলায় লিখুন)"
                            className=" h-[48px] w-full px-4 rounded-lg outline-none bg-transparent text-gray-950 placeholder:text-sm placeholder-grayscale-950 text-[16px] min-[400px]:text-[16px] sm:text-base lg:text-lg font-medium " />
                    </div>
                </div>

                <hr />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5">
                    {mediaItems.map((item, index) => (
                        <Fade direction="up" delay={index * 150} triggerOnce key={item.id}>
                            <div className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-[#fff0] via-black/50  to-red-900 bg-opacity-40 opacity-0 group-hover:opacity-90 transition duration-300 flex flex-col items-center z-50 justify-end ">

                                    <h3 className="text-white font-semibold text-xl text-center border-t-2 w-full py-2 bg-gradient-to-t from-[#fff0] via-[#fff0]  to-red-900 bg-opacity-40">
                                        {item.title}
                                    </h3>

                                    <h3 className="text-white px-2 text-center pt-2">
                                        {item.add}
                                    </h3>

                                    <h3 className="text-white px-2 text-center">
                                        মৃত্যু তারিখ : {item.date}
                                    </h3>

                                </div>

                            </div>

                        </Fade>
                    ))}
                </div>

            </div>
        </section >
    );
};

export default SohidList;

import React from 'react'
import { Slide } from 'react-awesome-reveal'
import { Link } from 'react-router'

const ShohidBanner = () => {
    return (
        <div
            className="relative py-20 md:py-10 bg-cover bg-center bg-no-repeat h-96 flex items-center px-6 bg-white text-black border-b-4 border-red-800 pt-30"
            style={{ backgroundImage: "url('/backgrounds/bannerBg.png')" }}
        >
            <div className='max-w-xl pt-10'>

                <h1 className='text-5xl font-semibold my-5'>শহীদের স্মরনে শহীদের স্মৃতিতে</h1>

                <p className='bg-white/20 backdrop-blur rounded-4xl p-2'>
                    স্বাধীনতা অর্জনের চেয়ে স্বাধীনতা রক্ষা করা কঠিন। তাই স্বাধীনতা রক্ষায় জাতিকে থাকতে হয় সদা জাগ্রত। জুলাই আন্দোলনে শহীদদের তালিকা। মনে করিয়ে দেয় তাদের কথা। জাতি তুমাদের ভুলবে না।
                </p>

                <Slide direction="up" delay={600} triggerOnce>
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            to="/julyGallery"
                            className="text-white px-3 py-1 rounded-lg bg-red-600  font-semibold shadow-lg 
                                          hover:bg-red-800 transform hover:scale-105 transition"
                        >
                            জুলাই গ্যালারি দেখুন
                        </Link>
                        <Link
                            to="/history"
                            className="px-3 py-1 rounded-lg border-2 border-red-700 font-semibold 
                                          hover:bg-red-700 hover:text-white transform hover:scale-105 transition"
                        >
                            জুলাই বিপ্লব সম্পর্কে জানুন
                        </Link>
                    </div>
                </Slide>
            </div>
        </div>
    )
}

export default ShohidBanner

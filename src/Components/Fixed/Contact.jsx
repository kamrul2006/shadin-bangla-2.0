import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaGlobe } from "react-icons/fa";

const Contact = () => {
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-4 md:px-8 text-black">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <Fade triggerOnce>
                    <div className="text-center mb-12 md:mt-10">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3">
                            <span className="text-red-600">যোগাযোগ</span> করুন
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                            আপনার পরামর্শ, মতামত বা সহযোগিতা আমাদের জন্য মূল্যবান। নিচের মাধ্যমে যোগাযোগ করুন।
                        </p>
                    </div>
                </Fade>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <Slide direction="left" triggerOnce>
                        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-red-600 pl-3">
                                যোগাযোগের তথ্য
                            </h2>
                            <ul className="space-y-5 text-gray-700">
                                <li className="flex items-center gap-3">
                                    <FaEnvelope className="text-red-600 text-xl" />
                                    <span>info@shadinbangla.org</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaPhoneAlt className="text-red-600 text-xl" />
                                    <span>+880 1700 000 000</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-red-600 text-xl" />
                                    <span>ঢাকা, বাংলাদেশ</span>
                                </li>
                            </ul>

                            <div className="mt-8 flex gap-4 text-xl">
                                <a
                                    href="https://facebook.com/shadinbangla"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 hover:text-blue-600 transition"
                                >
                                    <FaFacebook />
                                </a>
                                <a
                                    href="https://shadinbangla.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-700 hover:text-green-600 transition"
                                >
                                    <FaGlobe />
                                </a>
                            </div>
                        </div>
                    </Slide>

                    {/* Contact Form */}
                    <Fade triggerOnce>
                        <form
                            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300 space-y-5"
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Thanks for reaching out! We'll get back to you soon.");
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-red-600 pl-3">
                                বার্তা পাঠান
                            </h2>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">আপনার নাম</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="আপনার নাম লিখুন"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">ইমেইল</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="example@email.com"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">বার্তা</label>
                                <textarea
                                    rows="4"
                                    required
                                    placeholder="আপনার বার্তা লিখুন..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transform hover:scale-[1.02] transition duration-300"
                            >
                                পাঠান
                            </button>
                        </form>
                    </Fade>
                </div>

                {/* Map / Footer */}
                <Fade direction="up" triggerOnce>
                    <div className="mt-16 text-center">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9027152829194!2d90.39196361536608!3d23.75087649471383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b41f91d6e5%3A0xf9de44bfa693c9b1!2sDhaka!5e0!3m2!1sen!2sbd!4v1702561707483"
                            width="100%"
                            height="350"
                            className="rounded-2xl border-0 shadow-md"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </Fade>
            </div>
        </section>
    );
};

export default Contact;

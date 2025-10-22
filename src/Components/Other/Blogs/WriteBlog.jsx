import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

const WriteBlog = () => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        image: "",
        content: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("🎉 আপনার ব্লগ সফলভাবে জমা দেওয়া হয়েছে!");
        console.log("Blog Data:", formData);

        setFormData({
            title: "",
            author: "",
            image: "",
            content: "",
        });
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg shadow-lg rounded-3xl p-6 sm:p-10 border border-gray-200">
                <Fade triggerOnce>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-gray-900">
                        <span className="text-red-600">নতুন ব্লগ</span> লিখুন
                    </h1>
                    <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
                        আপনার ভাবনা, অভিজ্ঞতা বা গল্পটি শেয়ার করুন। নিচের ফর্মটি পূরণ করে আপনার ব্লগ জমা দিন।
                    </p>
                </Fade>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Blog Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            ব্লগের শিরোনাম
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="আপনার ব্লগের শিরোনাম লিখুন"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-500 outline-none transition duration-200 hover:shadow-md"
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            লেখকের নাম
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            placeholder="আপনার নাম লিখুন"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-500 outline-none transition duration-200 hover:shadow-md"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            ছবির লিঙ্ক (ঐচ্ছিক)
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="যদি থাকে, ব্লগের ছবির লিঙ্ক দিন"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-500 outline-none transition duration-200 hover:shadow-md"
                        />
                    </div>

                    {/* Blog Content */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                            ব্লগের মূল লেখা
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="8"
                            placeholder="এখানে আপনার ব্লগ লিখুন..."
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-red-500 outline-none resize-none transition duration-200 hover:shadow-md"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transform hover:scale-[1.03] shadow-md hover:shadow-lg transition duration-300"
                        >
                            ব্লগ জমা দিন
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default WriteBlog;

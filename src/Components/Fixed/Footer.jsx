import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-green-700 via-emerald-800 to-red-700 text-white pt-10 pb-6">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

                {/* Logo & About */}
                <div>
                    <img className="w-12 my-2" src="/icons/g.png" alt="2.0" />
                    <h1 className="text-2xl font-extrabold mb-3">স্বাধীন বাংলা ২.০</h1>
                    <p className="opacity-80 text-sm leading-relaxed">
                        ডিজিটাল প্রজন্মের জন্য বাংলার কণ্ঠস্বর। খবর, ব্লগ, আর্টিকেল
                        ও আরও অনেক কিছু একসাথে।
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">দ্রুত লিঙ্ক</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-yellow-300 transition">হোম</Link>
                        </li>
                        <li>
                            <Link to="/blog" className="hover:text-yellow-300 transition">ইতিহাস</Link>
                        </li>
                        <li>
                            <Link to="/shohid" className="hover:text-yellow-300 transition">শহীদ</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-yellow-300 transition">যোগাযোগ</Link>
                        </li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-3">আমাদের সাথে থাকুন</h2>
                    <div className="flex space-x-4 text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
                            <FaInstagram />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm opacity-80">


                {/* ---------------- Copyright / Developer ---------------- */}
                <div className="flex  justify-around">
                    <p className="mb-2 text-xs md:text-sm ">
                        © {new Date().getFullYear()} স্বাধীন বাংলা ২.০. All rights reserved.
                    </p>

                    <p className="text-xs md:text-sm text-gray-400">
                        Developed by <span className="text-yellow-400 font-semibold font-sans hover:text-amber-200 hover:border-b border-amber-400 transition-all">
                            <a href="https://kiapurba.vercel.app">
                                Kamrul Islam Apurba</a>
                        </span>
                    </p>
                </div>


            </div>

        </footer>
    );
};

export default Footer;

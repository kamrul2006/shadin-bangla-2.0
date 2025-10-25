import { motion } from "framer-motion";

const CustomLoader = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-center z-50 overflow-hidden">

            {/* 🔆 Glowing Pulse Background */}
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.05, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-600 blur-3xl opacity-20"
            ></motion.div>

            {/* 🇧🇩 Multi-Layered Circular Loader */}
            <div className="relative">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-28 h-28 border-[6px] border-green-700 border-t-red-600 border-l-yellow-400 rounded-full shadow-lg"
                ></motion.div>

                {/* Middle Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                    className="absolute inset-2 w-24 h-24 border-[5px] border-red-600 border-t-green-700 border-l-yellow-400 rounded-full"
                ></motion.div>

                {/* Inner Glowing Core */}
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.5, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    className="absolute inset-5 flex items-center justify-center text-xs bg-red-600 rounded-full shadow-[0_0_30px_5px_rgba(255,0,0,0.6)]"
                > Loading...</motion.div>
            </div>

            {/* 🕊️ Title Animation */}
            <h1
                className="mt-8 text-3xl font-extrabold tracking-wide animate-bounce"
            >
                <span className="bg-gradient-to-r from-green-700 via-red-600 to-yellow-500 text-transparent bg-clip-text drop-shadow-md p-5">
                    স্বাধীন বাংলা ২.০
                </span>
            </h1>

            {/* -------------------- Subtext Pulse */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-3 text-sm sm:text-base text-gray-700 font-medium"
            >
                "বাংলার ইতিহাস, সংগ্রাম ও চেতনার ডিজিটাল প্রতিচ্ছবি"
            </motion.p>


        </div>
    );
};

export default CustomLoader;

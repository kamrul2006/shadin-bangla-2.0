import { FaUser, FaLock } from 'react-icons/fa';
import logbg from "../../assets/lbg.jpg"
import { BsGoogle } from 'react-icons/bs';

const Login = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
            style={{ backgroundImage: `url(${logbg}) ` }} // Replace with your actual background image path
        >
            <div className=" backdrop-blur-lg rounded-xl shadow-lg max-w-sm w-full p-8 border border-gray-300/20 text-white">
                <div className="text-center mb-6">
                    <div className="inline-block bg-gray-200 text-gray-800 font-bold py-1 px-4 rounded-b-full text-lg shadow">
                        Login
                    </div>
                </div>

                <form className="space-y-5">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/80 focus:outline-none border border-white/20"
                        />
                        <FaUser className="absolute left-3 top-2.5 text-white/70" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/80 focus:outline-none border border-white/20"
                        />
                        <FaLock className="absolute left-3 top-2.5 text-white/70" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="accent-white" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-white/80 hover:text-white underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-gray-900 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="divider">OR</div>

                <button className="btn bg-white rounded-full w-full  text-black border-[#e5e5e5]">
                    <BsGoogle />
                    Login with Google
                </button>

                <p className="text-center text-sm mt-5">
                    Don’t have an account?{' '}
                    <a href="#" className="underline font-medium hover:text-white">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;

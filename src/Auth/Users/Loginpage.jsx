import React, { useContext, useEffect, useState } from "react";
import { FaGoogle, FaFacebook, FaGithub, FaEyeSlash, FaEye, FaHome } from "react-icons/fa";
import bg from "../../assets/lbg.jpg"
import ill from "../../assets/logo.png"

// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { AuthContext } from "../Providers/AuthProvider";

const LoginPage = () => {
    const axiosPublic = UseAxiosPublic()

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const [show, setShow] = useState(false)
    const ShowPassWord = (e) => {
        e.preventDefault();
        setShow(!show)
    }


    const navigate = useNavigate()
    const location = useLocation()

    //---------- Context use----------------------

    const { LoginUser, setUser, GoogleLogin } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null)
        setSuccess(null)
        const email = e.target.email.value;
        const password = e.target.password.value;


        //-------------------------login with email and password--------------------
        LoginUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                setSuccess('LOGIN Successful.')
                navigate(location.state ? location.state : '/')
            })
            .catch((error) => {
                // console.log(error)
                // navigate(location.state ? location.state : '/')
                if (error) { setError('Password or Email is invalid..!') }
            });
    }

    //------------------- HAndle google--------------
    const HandleGoogleLogin = () => {
        GoogleLogin()
            .then((res) => {
                // console.log(res.user)
                setUser(res.user)

                const UserInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: "user",
                    isSubscribed: false
                };

                setSuccess('LOGIN Successful.')
                navigate(location.state ? location.state : '/')

                axiosPublic.post('/users', UserInfo)
                    .then(res => {
                        // console.log(res)
                        if (res.data.insertedId) {
                        }
                    })
            })
            .catch(err => {

                setUser(null)
            })
    }


    return (
        <div
            className="flex items-center justify-center min-h-screen py-10 bg-cover md:bg-center"
            style={{ background: `url(${bg})`, backgroundSize: "cover" }}
        >

            <div className=" shadow-xl border backdrop-blur-lg text-white border-gray-400 rounded-lg flex flex-col lg:flex-row w-11/12 max-w-4xl overflow-hidden">

                {/*----------------------- Left Side ------------------------*/}
                <div className="w-full md:w-1/2 flex items-center justify-center flex-col p-3">

                    <img src={ill} alt="K-InfoNic" className="max-w-full h-auto object-contain md:w-40 w-20 " />

                    <Link to={'/'} className="btn btn-sm bg-green-500 mt-2 md:mt-5">
                        <FaHome className="mr-2" />
                        Back to Home</Link>
                </div>



                {/*---------------------- Right Side-------------------- */}
                <div className="lg:w-1/2 w-full p-8">

                    <h2 className="text-2xl font-bold text-black rounded-full md:rounded-t-4xl py-2 lg:w-30 mx-auto  text-center bg-white mb-6 ">
                        Login
                    </h2>


                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* ------------------------Email Field ---------------------*/}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  focus:border-green-400 peer"
                                placeholder="Type here"
                                required
                            />
                        </div>

                        {/* --------------------Password Field------------------- */}
                        <div className="relative">
                            <label className="my-1 text-sm font-semibold">Password</label>
                            <input
                                type={show ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 text-white border border-gray-300 rounded-lg focus:outline-none focus:border-green-400 peer"
                                placeholder="Enter Password."
                                required
                            />
                            <button
                                onClick={ShowPassWord}
                                className="mt-1 hover:text-green-400 btn-xs absolute right-3 top-8 text-lg text-white"
                            >
                                {show ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <p className="text-xs font-semibold text-green-500 text-center">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="text-xs font-semibold text-green-500 text-center">
                                {success}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-green-400 hover:bg-green-500 text-black font-medium rounded-md"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Registration Link */}
                    <p className="mt-4 text-center text-sm text-gray-300">
                        New here?{" "}
                        <Link
                            to="/register"
                            className="text-green-500 hover:underline hover:font-bold"
                        >
                            Create a New Account
                        </Link>
                    </p>

                    {/* Social Sign-in */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-300">Or sign in with</p>
                        <div className="flex justify-center space-x-4 mt-2">
                            <button
                                onClick={HandleGoogleLogin}
                                className="w-full btn  btn-sm text-green-900"
                            >
                                <FaGoogle className="mr-2" />
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

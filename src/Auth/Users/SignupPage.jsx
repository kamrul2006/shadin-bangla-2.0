import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle, FaHome } from "react-icons/fa";
import { sendEmailVerification } from "firebase/auth";
import { AuthContext } from "../Providers/AuthProvider";
import { auth } from "../FireBase/firebase.init";
import bg from "../../assets/lbgg.jpg";
import ill from "../../assets/logo.png";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";



const SignupPage = () => {
    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();
    const { CreateUserByMailPass, setUser, updatedProfile, GoogleLogin } = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [show, setShow] = useState(false);

    const HandleSignUp = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const Email = e.target.email.value;
        const Password = e.target.password.value;
        const Name = e.target.name.value;
        const Terms = e.target.terms.checked;
        const Photo = e.target.photo.value

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!Terms) {
            setError("Please accept all terms and conditions.");
            return;
        } else if (Password.length < 6) {
            setError("Password should be at least 6 characters long.");
            return;
        } else if (!passwordRegex.test(Password)) {
            setError("Password should contain a-z, A-Z, 0-9, and a special character.");
            return;
        }

        CreateUserByMailPass(Email, Password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);

                const UserInfo = {
                    name: Name,
                    email: Email,
                    role: "user",
                    isSubscribed: false
                };

                axiosPublic.post("/Users", UserInfo).then((res) => {
                    if (res.data.insertedId) {
                        setSuccess("Sign Up Successful.");
                    }
                });

                updatedProfile({ displayName: Name, photoURL: Photo })
                    .then(() => {
                        e.target.reset();
                        navigate("/");
                    })
                    .catch((err) => setError(err.message));

                sendEmailVerification(auth.currentUser).then(() => { });
            });
    };

    const HandleGoogleLogin = () => {
        GoogleLogin()
            .then((res) => {
                setUser(res.user);

                const UserInfo = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: "user",
                    isSubscribed: false
                };

                axiosPublic.post("/users", UserInfo).then(() => { });
                setSuccess("Sign Up Successful.");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
            });
    };

    const ShowPassWord = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    return (
        <div
            className="  flex items-center justify-center min-h-screen py-10 bg-cover md:bg-center"
            style={{ background: `url(${bg})`, backgroundSize: "cover" }}
        >
            <div className="backdrop-blur shadow-xl rounded-lg flex flex-col text-white md:flex-row-reverse w-full max-w-4xl overflow-hidden">
                {/* Left Side */}
                <div className="w-full md:w-1/2 flex items-center justify-center flex-col p-3">
                    <img src={ill} alt="K-InfoNic" className="max-w-full h-auto object-contain md:w-44 w-20" />
                    <Link to={'/'} className="btn btn-sm bg-green-500 mt-2 md:mt-5">
                        <FaHome className="mr-2" />
                        Back to Home</Link>
                </div>

                {/* Right Side */}
                <div className="w-full md:w-1/2 p-6 md:p-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Sign Up</h2>
                    <form onSubmit={HandleSignUp} className="space-y-2">

                        <div>
                            <label htmlFor="name" className="text-sm font-medium">
                                Full Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-green-400 focus:border-green-400"
                                placeholder="First name + Last name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="name" className="text-sm font-medium">
                                Photo Url:
                            </label>
                            <input
                                type="text"
                                id="photo"
                                name="photo"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-green-400 focus:border-green-400"
                                placeholder="Photo URL Link"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="text-sm font-medium">
                                Email Address:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-green-400 focus:border-green-400"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="text-sm font-medium">
                                Password:
                            </label>
                            <input
                                type={show ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-green-400 focus:border-green-400"
                                placeholder="Password"
                                required
                            />
                            <button
                                onClick={ShowPassWord}
                                className="absolute right-3 top-9 text-lg text-gray-600"
                            >
                                {show ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="terms" className="checkbox checkbox-success" />
                            <label className="text-sm text-green-500 cursor-pointer">
                                Accept all terms and conditions
                            </label>
                        </div>

                        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                        {success && <p className="text-sm text-green-500 text-center">{success}</p>}

                        <button
                            type="submit"
                            className="w-full py-2 bg-green-400 hover:bg-green-500 text-white font-medium rounded-md"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Or sign up with</p>
                        <div className="flex justify-center gap-4 mt-2">
                            <button
                                onClick={HandleGoogleLogin}
                                className="w-full btn bg-green-500 btn-sm text-black"
                            >
                                <FaGoogle className="mr-2" />
                                Sign in with Google
                            </button>
                        </div>
                    </div>

                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/logIn" className="text-green-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

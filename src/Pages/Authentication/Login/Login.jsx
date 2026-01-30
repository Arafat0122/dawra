import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const { logIn, sendResetPasswordEmail } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!email || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter both email and password!",
                confirmButtonColor: "#d33",
            });
            return;
        }

        try {
            // Firebase login
            const userCredential = await logIn(email, password);
            if (userCredential?.error) {
                throw new Error(userCredential.error);
            }

            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome back!",
                confirmButtonColor: "#11719b",
            }).then(() => {
                const redirectTo = location.state?.from?.pathname || "/";
                navigate(redirectTo);
            });

        } catch {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "The email address or password you entered is incorrect. Please double-check and try again.",
                confirmButtonColor: "#d33",
            });
        }
    };

    // Handle forgot password
    const handleForgotPassword = async () => {
        if (!email) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter your email first.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        try {
            await sendResetPasswordEmail(email);
            Swal.fire({
                icon: "success",
                title: "Password Reset Email Sent!",
                text: "Check your inbox for the reset link.",
                confirmButtonColor: "#11719b",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error Sending Email",
                text: error.message || "Something went wrong. Try again.",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-semibold text-[#11719b] text-center mb-4">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded bg-white text-gray-800"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded bg-white text-gray-800 pr-10"
                                placeholder="Enter your password"
                            />
                            <span
                                className="absolute top-3 right-3 text-gray-600 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-[#11719b] text-white p-2 rounded">
                        Login
                    </button>

                    {/* Forgot Password Link */}
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-[#11719b] text-sm hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <p className="text-center text-gray-600 mt-2">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="text-[#11719b] font-semibold">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
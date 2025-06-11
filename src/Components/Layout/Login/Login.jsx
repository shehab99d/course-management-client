import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    const { loginUserWithEmail, signInWithGoogle, signInGithub } = useContext(AuthContext);
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  try {
    await loginUserWithEmail(email, password);
    
    // ✅ ১. JWT token পাও
    const loggedInUser = { email };
    const res = await axios.post('http://localhost:5000/jwt', loggedInUser);
    const token = res.data.token;
    localStorage.setItem('token', token);
    console.log("JWT Token stored:", token); // ✅ check this

    // ✅ ২. Navigate করো token set হওয়ার পর
    navigate(from, { replace: true });
  } catch (err) {
    console.error(err.message);
    setError("Login failed! Please check your credentials.");
  }
};


    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch(() => setError("Google login failed!"));
    };

    const handleGithubLogin = () => {
        signInGithub()
            .then(() => {
                navigate(from, { replace: true });
            })
            .catch(() => setError("GitHub login failed!"));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
            <div className="card w-full max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered w-full"
                                placeholder="Enter your email"
                                required
                            />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    className="input input-bordered w-full pr-12"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-500"
                                >
                                    {showPass ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>


                        {error && <p className="text-red-500 text-sm">{error}</p>}


                        <div className="form-control mt-4">
                            <button className="btn btn-primary w-full">Login</button>
                        </div>
                    </form>

                    <div className="divider">OR</div>

                    <div className="flex flex-col gap-2">
                        <button onClick={handleGoogleLogin} className="btn btn-outline flex items-center gap-2">
                            <FaGoogle /> Continue with Google
                        </button>
                        <button onClick={handleGithubLogin} className="btn btn-outline flex items-center gap-2">
                            <FaGithub /> Continue with GitHub
                        </button>
                    </div>

                    <p className="text-center text-sm mt-4">
                        Don't have an account? <a href="/register" className="link text-blue-500">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

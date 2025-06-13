import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  const { createUserWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password, email) => {
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must have at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must have at least one lowercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must have at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must have at least one special character.";

    const emailUsername = email.split("@")[0];
    if (password.toLowerCase().includes(emailUsername.toLowerCase()))
      return "Password cannot contain your email username.";

    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const passError = validatePassword(password, email);
    if (passError) {
      setError(passError);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmail(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || undefined,
      });
      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered. Please login.");
      } else {
        setError(err.message || "Failed to register.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-md bg-white">
      <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Your full name"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="photoURL" className="block font-medium mb-1">
            Photo URL
          </label>
          <input
            type="url"
            name="photoURL"
            placeholder="https://example.com/photo.jpg"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Your password"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-medium mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="Confirm password"
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
          </div>
        </div>



        {error && (
          <p className="text-red-600 text-sm mt-1 text-center font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary w-full mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-center">
          <p>Already have an account? <Link className="text-blue-500 underline" to='/login'>Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;

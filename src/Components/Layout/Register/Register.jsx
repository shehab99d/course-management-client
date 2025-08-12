import React, { useState, useContext, useRef, useEffect } from "react";
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

  // refs for inputs to fill programmatically
  const nameRef = useRef(null);
  const photoURLRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Detect dark mode using media query or HTML attribute
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    // You can adjust this depending on how you set dark mode in your app
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeMediaQuery.matches);

    const listener = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", listener);
    return () => darkModeMediaQuery.removeEventListener("change", listener);
  }, []);

  const validatePassword = (password, email) => {
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must have at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must have at least one lowercase letter.";
    if (!/[0-9]/.test(password))
      return "Password must have at least one number.";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
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
      navigate("/", { replace: true }); // home page navigation
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

  const handleDummyRegister = async () => {
    setError("");
    setLoading(true);

    const baseEmail = "user@gmail.com";
    const dummyPassword = "User@1234"; // satisfies your password rules
    const dummyName = "Dummy User";

    const tryCreateUser = async (emailToTry) => {
      try {
        await createUserWithEmail(emailToTry, dummyPassword);
        return emailToTry;
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          return null;
        }
        throw err;
      }
    };

    try {
      let foundEmail = null;

      for (let i = 0; i <= 10; i++) {
        const emailToTry = i === 0 ? baseEmail : `user${i}@gmail.com`;
        const res = await tryCreateUser(emailToTry);
        if (res) {
          foundEmail = res;
          break;
        }
      }

      if (!foundEmail) {
        setError("Could not find an unused dummy email after multiple tries.");
        setLoading(false);
        return;
      }

      if (nameRef.current) nameRef.current.value = dummyName;
      if (photoURLRef.current) photoURLRef.current.value = "";
      if (emailRef.current) emailRef.current.value = foundEmail;
      if (passwordRef.current) passwordRef.current.value = dummyPassword;
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = dummyPassword;

      setError("");
    } catch (err) {
      setError(err.message || "Failed to create dummy user.");
    } finally {
      setLoading(false);
    }
  };

  // Common classes for dark/light mode input and label
  const inputClass =
    "input input-bordered w-full " +
    (isDarkMode
      ? "bg-gray-800 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500"
      : "bg-white text-black placeholder-gray-500");

  const labelClass = isDarkMode ? "block font-medium mb-1 text-white" : "block font-medium mb-1 text-black";

  const buttonPrimaryClass =
    "btn btn-primary w-full mt-4 " +
    (loading ? "opacity-50 cursor-not-allowed" : "") +
    (isDarkMode ? " bg-blue-700 hover:bg-blue-600" : " bg-blue-500 hover:bg-blue-600");

  const buttonSecondaryClass = "btn btn-secondary w-full mb-4 " + (loading ? "opacity-50 cursor-not-allowed" : "");

  return (
    <div
      className={
        "max-w-md mx-auto p-6 shadow-lg rounded-md " +
        (isDarkMode ? "bg-gray-900" : "bg-white")
      }
    >
      <h2 className={isDarkMode ? "text-3xl font-semibold text-center mb-6 text-white" : "text-3xl font-semibold text-center mb-6 text-black"}>
        Register
      </h2>

      <button onClick={handleDummyRegister} disabled={loading} className={buttonSecondaryClass}>
        {loading ? "Loading..." : "Login with Dummy Account"}
      </button>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            name="name"
            required
            placeholder="Your full name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="photoURL" className={labelClass}>
            Photo URL
          </label>
          <input
            ref={photoURLRef}
            type="url"
            name="photoURL"
            placeholder="https://example.com/photo.jpg"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            ref={emailRef}
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Your password"
              className={inputClass + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
            >
              {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirm Password
          </label>
          <div className="relative">
            <input
              ref={confirmPasswordRef}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="Confirm password"
              className={inputClass + " pr-10"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300"
            >
              {showConfirmPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-1 text-center font-medium">{error}</p>
        )}

        <button type="submit" disabled={loading} className={buttonPrimaryClass}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div className={isDarkMode ? "text-center text-white" : "text-center text-black"}>
          <p>
            Already have an account?{" "}
            <Link className="text-blue-500 underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;


import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from '../../assets/Animation - 1749396503129.json'; 
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-base-200">
      <Helmet>
        <title>404 Error</title>
      </Helmet>
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
        CourseHub 🚀
      </h2>

      <div className="w-full max-w-md mb-6">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      <h1 className="text-6xl font-bold text-red-500 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded hover:scale-105 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;

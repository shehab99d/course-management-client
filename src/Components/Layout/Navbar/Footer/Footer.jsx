import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 lg:mt-10 md:px-16 py-10">
      <div className="grid md:grid-cols-3 gap-10 border-b border-gray-700 pb-8">
        
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold text-white">CourseHub</h2>
          <p className="mt-3 text-sm">
            Empowering your learning journey with top-notch courses,
            expert instructors and lifelong skills.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/add-course">Add Course</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>

        {/* Contact Info / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
          <p className="text-sm">Shibpur, Narsingdi, Bangladesh</p>
          <p className="text-sm">Email: support@coursehub.com</p>
          <div className="flex space-x-4 mt-4 text-white">
            <a href="https://www.facebook.com/Shihab2975"><FaFacebookF /></a>
            <a href="https://x.com/shehab55755"><FaTwitter /></a>
            <a href="https://www.instagram.com/code__hub_69/"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/shehabul-islam/"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CourseHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

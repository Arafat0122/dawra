import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone } from "react-icons/fa";
import RahmahLogo from "/Rahmah-Institute.png"; // Adjust path as needed

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-white via-sky-50 to-white text-sky-900 py-12 px-6 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

                {/* Brand with Logo */}
                <div className="flex flex-col space-y-4 max-w-xs items-center md:items-start">
                    <img src={RahmahLogo} alt="Rahmah Institute Logo" className="w-36 object-contain" />
                    <p className="text-sm text-sky-700 text-center md:text-left">
                        Providing world-class Islamic education in a safe and respectful environment.
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col space-y-3 text-sky-700 text-sm md:text-base">
                    <h4 className="font-semibold mb-2">Quick Links</h4>
                    <a href="#about" className="hover:text-sky-900 transition">About Us</a>
                    <a href="#courses" className="hover:text-sky-900 transition">Courses</a>
                    <a href="#teachers" className="hover:text-sky-900 transition">Teachers</a>
                    <a href="#testimonials" className="hover:text-sky-900 transition">Testimonials</a>
                    <a href="#contact" className="hover:text-sky-900 transition">Contact</a>
                </nav>

                {/* Contact Info */}
                <div className="flex flex-col space-y-4 text-sky-700 max-w-xs text-sm md:text-base">
                    <h4 className="font-semibold">Contact Us</h4>
                    <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-sky-700" />
                        <a href="mailto:info@rahmahinstitute.com" className="hover:text-sky-900 transition">
                            info@rahmahinstitute.com
                        </a>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaPhone className="text-sky-700" />
                        <a href="tel:+1234567890" className="hover:text-sky-900 transition">
                            +44 7777 966288
                        </a>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col space-y-4">
                    <h4 className="font-semibold text-sky-700">Follow Us</h4>
                    <div className="flex space-x-5 text-sky-700 text-2xl">
                        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer" className="hover:text-sky-900 transition">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer" className="hover:text-sky-900 transition">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer" className="hover:text-sky-900 transition">
                            <FaInstagram />
                        </a>
                        <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="hover:text-sky-900 transition">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 border-t border-sky-200 pt-6 text-center text-xs text-sky-600 select-none flex flex-col md:flex-row justify-center items-center gap-2">
                <span>&copy; {new Date().getFullYear()} Rahmah Institute. All rights reserved.</span>
                <span>
                    Developed by{" "}
                    <a
                        href="https://codesraft.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-700 hover:text-sky-900 font-semibold"
                    >
                        CodesRaft
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
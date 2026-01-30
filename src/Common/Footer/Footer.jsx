import { FaFacebookF, FaYoutube, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi"; // For a more elegant location icon
import RahmahLogo from "/Rahmah-Institute.png";
import { Link } from "react-router-dom";

const Footer = () => {
    const navItems = [
        { name: 'About Us', to: '/about' },
        { name: 'Shuyukh', to: '/teachers' },
        { name: 'Contact', to: '/contact' },
    ];

    return (
        <footer className="relative bg-[#fafbfc] border-t border-sky-100 pt-16 pb-8 overflow-hidden">
            {/* Subtle Islamic Geometric Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/islamic-art.png')` }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* 1. Brand Section */}
                    <div className="flex flex-col items-center md:items-start space-y-6">
                        <Link to={"https://rahmahinstitute.com"} target="_blank">
                            <img src={RahmahLogo} alt="Rahmah Institute" className="h-20 w-auto object-contain" />
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed text-center md:text-left font-medium italic">
                            "Nurturing souls through the beauty of Prophetic knowledge and world-class Islamic education."
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: <FaFacebookF />, link: "https://www.facebook.com/RahmahInstitute01", color: "hover:bg-blue-600" },
                                { icon: <FaYoutube />, link: "https://www.youtube.com/@RAHMAHInstitute", color: "hover:bg-red-600" },
                                { icon: <FaWhatsapp />, link: "https://wa.me/447535745629", color: "hover:bg-emerald-600" }
                            ].map((social, idx) => (
                                <a key={idx} href={social.link} target="_blank" rel="noreferrer"
                                    className={`w-10 h-10 rounded-full border border-sky-100 flex items-center justify-center text-sky-700 bg-white shadow-sm transition-all duration-300 hover:text-white ${social.color}`}>
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-sky-900 font-serif font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-6 h-[1px] bg-sky-300"></span> Quick Links
                        </h4>
                        <nav className="flex flex-col space-y-4 text-slate-600 text-sm">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className="hover:text-sky-600 transition-colors flex items-center group"
                                >
                                    <span className="w-0 group-hover:w-2 h-[1px] bg-sky-400 transition-all mr-0 group-hover:mr-2"></span>
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <nav className="flex flex-col pt-4 text-slate-600 text-sm">
                            <Link
                                to={"https://rahmahinstitute.com/"}
                                target="_blank"
                                className="hover:text-sky-600 transition-colors flex items-center group"
                            >
                                <span className="w-0 group-hover:w-2 h-[1px] bg-sky-400 transition-all mr-0 group-hover:mr-2"></span>
                                Rahmah Institute
                            </Link>
                        </nav>
                    </div>

                    {/* 3. Contact Details */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-sky-900 font-serif font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-6 h-[1px] bg-sky-300"></span> Support
                        </h4>
                        <div className="space-y-4 text-sm text-slate-600">
                            <div className="flex items-start space-x-3 group">
                                <FaEnvelope className="text-sky-500 mt-1" />
                                <a href="mailto:info@rahmahinstitute.com" className="group-hover:text-sky-900 transition-colors">
                                    info@rahmahinstitute.com
                                </a>
                            </div>
                            <div className="flex items-start space-x-3 group">
                                <FaPhone className="text-sky-500 mt-1" />
                                <a href="tel:+447535745629" className="group-hover:text-sky-900 transition-colors">
                                    +44 7535 745629
                                </a>
                            </div>
                            <div className="flex items-start space-x-3 group text-center md:text-left">
                                <HiOutlineLocationMarker className="text-sky-500 mt-1 flex-shrink-0" />
                                <span>United Kingdom & Global Online Support</span>
                            </div>
                        </div>
                    </div>

                    {/* 4. Newsletter/Motto */}
                    <div className="flex flex-col items-center md:items-start p-6 rounded-3xl bg-sky-50/50 border border-sky-100">
                        <h4 className="text-sky-900 font-serif font-bold text-lg mb-3">Our Mission</h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed text-center md:text-left">
                            We aim to bridge the gap between tradition and modernity, providing a platform for students to excel spiritually and academically.
                        </p>
                        <div className="mt-4 pt-4 border-t border-sky-200 w-full text-center md:text-left">
                            <span className="text-[12px] uppercase font-bold tracking-widest text-sky-700">Rahmah Institute</span>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-[11px] font-medium tracking-wide text-center md:text-left uppercase">
                        &copy; {new Date().getFullYear()} Rahmah Institute. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium uppercase tracking-wide">
                        <span>Crafted by</span>
                        <a href="https://codesraft.com" target="_blank" rel="noopener noreferrer"
                            className="text-sky-600 hover:text-sky-800 font-bold transition-colors">
                            CodesRaft
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
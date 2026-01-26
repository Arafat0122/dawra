import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageSquare } from "react-icons/fi";
import Swal from "sweetalert2";
import { useState } from "react";

const Contact = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: "Message Sent!",
            text: "Thank you for reaching out. We’ll get back to you shortly.",
            icon: "success",
            confirmButtonColor: "#0ea5e9", // sky-500
            background: "#ffffff",
            customClass: {
                popup: 'rounded-[2rem]'
            }
        });

        setContact({ name: "", email: "", message: "" });
    };

    return (
        <section className="relative bg-white py-24 px-6 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-12 gap-0 shadow-2xl shadow-sky-100 rounded-[3rem] overflow-hidden border border-sky-100">
                    
                    {/* --- LEFT SIDE: DARK INFO PANEL (4 Columns) --- */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 bg-slate-900 p-10 md:p-14 text-white flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-4xl font-black mb-6 leading-tight">
                                Let's Start a <br />
                                <span className="text-sky-400">Conversation.</span>
                            </h2>
                            <p className="text-slate-400 font-medium mb-12">
                                Whether you're ready to enroll or just have a few questions, 
                                our team is here to guide you.
                            </p>

                            <div className="space-y-8">
                                <ContactItem 
                                    icon={<FiMail />} 
                                    label="Email us at" 
                                    value="info@rahmahinstitute.com" 
                                    link="mailto:info@rahmahinstitute.com"
                                />
                                <ContactItem 
                                    icon={<FiPhone />} 
                                    label="Call or WhatsApp" 
                                    value="+44 7777 966288" 
                                />
                                <ContactItem 
                                    icon={<FiMapPin />} 
                                    label="Our Location" 
                                    value="Cairo, Egypt" 
                                />
                            </div>
                        </div>

                        {/* Social/Status Badge */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                    Admissions are currently open
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* --- RIGHT SIDE: WHITE FORM PANEL (8 Columns) --- */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 bg-white p-10 md:p-14"
                    >
                        <div className="flex items-center gap-3 mb-8 text-sky-600">
                            <FiMessageSquare className="text-2xl" />
                            <span className="font-black uppercase tracking-widest text-xs">Send a Message</span>
                        </div>

                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-1">
                                <label className="block text-slate-900 text-sm font-bold mb-2 ml-1">Full Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Full Name"
                                    value={contact.name}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300"
                                    required
                                />
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-slate-900 text-sm font-bold mb-2 ml-1">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="jane@example.com"
                                    value={contact.email}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all placeholder:text-slate-300"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-slate-900 text-sm font-bold mb-2 ml-1">Your Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    placeholder="How can we help you today?"
                                    value={contact.message}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 rounded-3xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all resize-none placeholder:text-slate-300"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    className="group w-full md:w-auto bg-sky-600 hover:bg-slate-900 text-white font-bold px-12 py-5 rounded-2xl shadow-xl shadow-sky-100 transition-all flex items-center justify-center gap-3"
                                >
                                    Send Message 
                                    <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Helper Component for Contact Info
const ContactItem = ({ icon, label, value, link }) => (
    <div className="flex items-start gap-5 group">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{label}</p>
            {link ? (
                <a href={link} className="text-lg font-bold hover:text-sky-400 transition-colors">{value}</a>
            ) : (
                <p className="text-lg font-bold">{value}</p>
            )}
        </div>
    </div>
);

export default Contact;
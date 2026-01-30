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
            confirmButtonColor: "#0ea5e9",
            customClass: { popup: "rounded-3xl" }
        });

        setContact({ name: "", email: "", message: "" });
    };

    return (
        <section className="relative bg-white py-16 md:py-24 px-4 sm:px-6 overflow-hidden pt-24">
            {/* Decorative background (hidden on small screens) */}
            <div className="hidden lg:block absolute top-0 right-0 w-1/3 h-full bg-sky-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-12 rounded-3xl md:rounded-[3rem] overflow-hidden border border-sky-100 shadow-xl lg:shadow-2xl">

                    {/* LEFT PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 bg-slate-900 p-6 sm:p-10 md:p-14 text-white flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
                                Let's Start a <br />
                                <span className="text-sky-400">Conversation.</span>
                            </h2>

                            <p className="text-slate-400 text-sm sm:text-base font-medium mb-10">
                                Whether you're ready to enroll or just have a few questions,
                                our team is here to guide you.
                            </p>

                            <div className="space-y-6">
                                <ContactItem
                                    icon={<FiMail />}
                                    label="Email us at"
                                    value="info@rahmahinstitute.com"
                                    link="mailto:info@rahmahinstitute.com"
                                />
                                <ContactItem
                                    icon={<FiPhone />}
                                    label="Call or WhatsApp"
                                    value="+44 7535 745629"
                                />
                                <ContactItem
                                    icon={<FiMapPin />}
                                    label="Our Location"
                                    value="Cairo, Egypt"
                                />
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                    Admissions are open
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 bg-white p-6 sm:p-10 md:p-14"
                    >
                        <div className="flex items-center gap-3 mb-8 text-sky-600">
                            <FiMessageSquare className="text-2xl" />
                            <span className="font-black uppercase tracking-widest text-xs">
                                Send a Message
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold mb-2">Full Name</label>
                                <input
                                    name="name"
                                    value={contact.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={contact.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={contact.message}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none resize-none"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2 mt-4">
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto bg-sky-600 hover:bg-slate-900 text-white font-bold px-10 py-4 rounded-xl flex items-center justify-center gap-3 transition-all"
                                >
                                    Send Message
                                    <FiSend />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ContactItem = ({ icon, label, value, link }) => (
    <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-sky-400 text-lg">
            {icon}
        </div>
        <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                {label}
            </p>
            {link ? (
                <a href={link} className="font-bold hover:text-sky-400">
                    {value}
                </a>
            ) : (
                <p className="font-bold">{value}</p>
            )}
        </div>
    </div>
);

export default Contact;
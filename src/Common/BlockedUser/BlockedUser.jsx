import { FiShieldOff, FiMessageCircle, FiArrowLeft } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const BlockedUser = () => {
    const { user } = useContext(AuthContext);
    const whatsappNumber = "447535745629"; // Your WhatsApp number
    const whatsappMessage = encodeURIComponent(`As-salamu alaykum. My name is ${user.displayName || 'Student'}. My account is currently blocked and I would like to resolve this.`);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFBFB] px-6">
            {/* Background Decorative Element */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -right-[5%] w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-[10%] -left-[5%] w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-md w-full relative z-10">
                <div className="bg-white border border-red-100 shadow-2xl shadow-red-200/20 rounded-[3rem] p-10 text-center">

                    {/* Security Icon */}
                    <div className="relative mx-auto w-24 h-24 mb-8">
                        <div className="absolute inset-0 bg-red-100 rounded-[2.5rem] rotate-6 animate-pulse" />
                        <div className="relative w-full h-full bg-red-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-red-200">
                            <FiShieldOff size={40} />
                        </div>
                    </div>

                    {/* Content */}
                    <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                        Account <span className="text-red-600">Restricted</span>
                    </h1>

                    <p className="text-slate-600 leading-relaxed mb-2">
                        Assalamu Alaikum, <span className="font-bold text-slate-900">{user.displayName || 'Student'}</span>.
                    </p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        Your enrollment status at Rahmah Institute is currently <strong>inactive or blocked</strong>.
                        This usually happens due to pending verification or administrative updates.
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all hover:scale-[1.02] shadow-lg shadow-emerald-100"
                        >
                            <FaWhatsapp size={20} />
                            Contact Support
                        </a>

                        <button
                            onClick={() => window.location.href = '/'}
                            className="flex items-center justify-center gap-2 w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-200 transition-all"
                        >
                            <FiArrowLeft />
                            Return Home
                        </button>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 pt-8 border-t border-slate-50 text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">
                        Reference ID: {user.userId?.substring(0, 8) || 'N/A'} <br />
                        Rahmah Institute Administration
                    </div>
                </div>

                <p className="text-center mt-8 text-slate-400 text-xs italic">
                    If you believe this is a technical error, please clear your browser cache and try again.
                </p>
            </div>
        </div>
    );
};

export default BlockedUser;
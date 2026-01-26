import { useState } from "react";
import { FiX, FiLock, FiCreditCard, FiCopy, FiCheck, FiSmartphone, FiHash } from "react-icons/fi";

const StudentPay = ({ month, amount, onClose }) => {
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({ phone: "", trxId: "" });

    const accountNumber = "01317110122";

    const handleCopy = () => {
        navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Payment Details Submitted:", { ...formData, month, amount });
        alert(`Request Sent! We will verify the TrxID for ${month}.`);
        onClose();
    };

    return (
        <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="bg-brand-navy p-8 text-white text-center relative">
                <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                    <FiX size={24} />
                </button>
                <div className="w-14 h-14 bg-brand-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FiCreditCard size={28} className="text-brand-blue" />
                </div>
                <h3 className="text-xl font-heading font-bold uppercase tracking-tight">Fee Submission</h3>
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mt-1 italic">{month} Session</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
                {/* Step 1: Instruction Box */}
                <div className="bg-brand-light rounded-3xl p-5 border border-brand-blue/10 mb-6">
                    <p className="text-[10px] font-bold text-brand-blue uppercase mb-3 text-center">Step 1: Send Money (Personal)</p>
                    <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">Account Number</p>
                            <p className="text-lg font-mono font-bold text-brand-navy">{accountNumber}</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className={`p-3 rounded-xl transition-all ${copied ? 'bg-green-500 text-white' : 'bg-brand-light text-brand-blue hover:bg-brand-blue hover:text-white'}`}
                        >
                            {copied ? <FiCheck /> : <FiCopy />}
                        </button>
                    </div>
                    <div className="mt-4 flex justify-around opacity-70 grayscale hover:grayscale-0 transition-all">
                        <img src="/bkash.png" alt="bkash" className="h-7" />
                        <img src="/nagad.png" alt="nagad" className="h-7" />
                        <img src="/rocket.png" alt="rocket" className="h-7" />
                    </div>
                </div>

                {/* Step 2: Verification Fields */}
                <div className="space-y-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase ml-1">Step 2: Confirm Transaction</p>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FiSmartphone /></span>
                        <input
                            required
                            type="text"
                            placeholder="Your Phone Number"
                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-sm font-semibold"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FiHash /></span>
                        <input
                            required
                            type="text"
                            placeholder="Transaction ID (TrxID)"
                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-sm font-semibold"
                            value={formData.trxId}
                            onChange={(e) => setFormData({ ...formData, trxId: e.target.value })}
                        />
                    </div>
                </div>

                {/* Amount Summary */}
                <div className="mt-6 p-4 rounded-2xl bg-brand-navy/5 flex justify-between items-center border border-dashed border-brand-navy/20">
                    <span className="text-xs font-bold text-brand-navy uppercase">Total Payable</span>
                    <span className="text-xl font-extrabold text-brand-navy">{amount} BDT</span>
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-brand-blue text-white py-4 rounded-[1.5rem] font-bold shadow-xl shadow-brand-blue/30 hover:bg-brand-navy hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                    <FiLock /> Verify Payment
                </button>

                <p className="text-[9px] text-center text-gray-400 mt-4 px-6 leading-relaxed">
                    Note: Verification usually takes 2-12 hours. Please keep your SMS receipt until the status changes to <span className="text-green-600 font-bold uppercase">Paid</span>.
                </p>
            </form>
        </div>
    );
};

export default StudentPay;
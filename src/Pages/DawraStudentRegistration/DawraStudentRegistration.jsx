import { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
];

const DawraStudentRegistration = ({ user }) => {
    const countryOptions = useMemo(() => countryList().getData(), []);

    const [formData, setFormData] = useState({
        name: user?.displayName || "Soyeb Ahmed Arafat",
        email: user?.email || "soyebarafat@gmail.com",
        gender: "",
        dob: "",
        address: "",
        country: "",
        phone: "",
        whatsapp: "",
        fatherName: "",
        motherName: "",
        currentStudy: "",
        transactionId: "",
        paymentPhone: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            fees: { admissionFee: 1400, firstMonthFee: 1000, total: 2400 },
        };
        console.log("Dawra Registration Data:", payload);
    };

    // Reusable Tailwind class for inputs
    const inputClass = "w-full p-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all duration-200 bg-white font-sans text-brand-dark";
    const labelClass = "block text-sm font-semibold text-brand-navy mb-1.5 ml-1 font-heading";

    return (
        <div className="min-h-screen bg-brand-light font-sans py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl shadow-brand-navy/5 overflow-hidden border border-white">

                {/* Header Section */}
                <div className="bg-brand-navy p-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                        Dawra Program Registration
                    </h1>
                    <p className="text-brand-blue font-medium tracking-wide text-sm uppercase">
                        Rahmah Institute • Journey of Knowledge
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">

                    {/* Section 1: Personal Profile */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-brand-navy mb-5 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-sm font-bold">01</span>
                            Personal Profile
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Full Name</label>
                                <input type="text" value={formData.name} disabled className={`${inputClass} bg-gray-50 cursor-not-allowed`} />
                            </div>
                            <div>
                                <label className={labelClass}>Email Address</label>
                                <input type="email" value={formData.email} disabled className={`${inputClass} bg-gray-50 cursor-not-allowed`} />
                            </div>
                            <div>
                                <label className={labelClass}>Gender</label>
                                <Select
                                    options={genderOptions}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    onChange={(opt) => setFormData({ ...formData, gender: opt.value })}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: '0.75rem',
                                            padding: '0.15rem',
                                            borderColor: '#e5e7eb',
                                            boxShadow: 'none',
                                            '&:hover': { borderColor: '#31A9E0' }
                                        }),
                                    }}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Date of Birth</label>
                                <input type="date" name="dob" onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Section 2: Contact & Study */}
                    <section>
                        <h2 className="text-xl font-heading font-bold text-brand-navy mb-5 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-sm font-bold">02</span>
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className={labelClass}>Full Home Address</label>
                                <input type="text" name="address" placeholder="Street, City, Post Code" onChange={handleChange} className={inputClass} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Country</label>
                                    <Select
                                        options={countryOptions}
                                        onChange={(opt) => setFormData({ ...formData, country: opt.label })}
                                        styles={{ control: (base) => ({ ...base, borderRadius: '0.75rem', padding: '0.15rem' }) }}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Current Study Level</label>
                                    <input type="text" name="currentStudy" placeholder="Madrasa / School / College" onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Phone Number</label>
                                    <input type="text" name="phone" placeholder="+880..." onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>WhatsApp Number</label>
                                    <input type="text" name="whatsapp" placeholder="For class updates" onChange={handleChange} className={inputClass} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Family Info */}
                    <section className="bg-brand-light/50 p-6 rounded-2xl border border-brand-blue/5">
                        <h2 className="text-lg font-heading font-bold text-brand-navy mb-4">Family Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Father's Name</label>
                                <input type="text" name="fatherName" onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Mother's Name</label>
                                <input type="text" name="motherName" onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Secure Payment - REDESIGNED */}
                    <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                            <h2 className="font-heading font-bold text-brand-navy uppercase tracking-wider text-sm flex items-center gap-2">
                                <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                Payment Details
                            </h2>
                            <div className="text-right">
                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Amount</span>
                                <span className="text-brand-navy font-heading font-bold text-lg leading-none">2900 BDT</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-500 font-medium">Fee Breakdown:</p>
                                    <div className="flex justify-between text-sm py-1 border-b border-gray-50 text-brand-dark">
                                        <span>Admission Fee</span>
                                        <span>1500 BDT</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-1 text-brand-dark font-medium">
                                        <span>First Month Fee</span>
                                        <span>1400 BDT</span>
                                    </div>
                                </div>
                                <div className="bg-brand-navy rounded-xl p-4 text-white relative overflow-hidden">
                                    <p className="text-[10px] text-brand-blue font-bold uppercase mb-1">Send Payment to</p>
                                    <p className="text-xl font-heading font-bold tracking-wider">01317110122</p>
                                    <p className="text-[11px] opacity-80 mt-1">bKash / Rocket / Nagad</p>
                                    {/* Decorative Icon */}
                                    <svg className="absolute -right-2 -bottom-2 w-16 h-16 opacity-10" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path></svg>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Sender Phone Number</label>
                                    <input type="text" name="paymentPhone" placeholder="01XXX-XXXXXX" onChange={handleChange} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Transaction ID</label>
                                    <input type="text" name="transactionId" placeholder="TRX1234567" onChange={handleChange} className={inputClass} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-brand-blue text-white py-4 rounded-xl font-heading font-bold text-lg hover:bg-brand-navy shadow-lg shadow-brand-blue/20 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Submit Registration
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
                            By submitting this form, you commit to maintaining the discipline and <br />
                            Prophetic adab required for the Dawra Program.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DawraStudentRegistration;
import { useState, useMemo, useContext, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import Swal from "sweetalert2";
import { FiUploadCloud, FiCheck, FiX, FiInfo, FiFileText, FiCheckCircle } from 'react-icons/fi';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import useCurrentUserId from "../../Hooks/useCurrentUserId";
import { Link, useNavigate } from "react-router-dom";

const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
];

const DawraStudentRegistration = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { currentUserId, loading: userIdLoading, error: userIdError } = useCurrentUserId();
    const [uploading, setUploading] = useState(false);
    const [filePreview, setFilePreview] = useState(null);
    const [fileName, setFileName] = useState("");
    const countryOptions = useMemo(() => countryList().getData(), []);
    const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUserId) return;

        const checkDawraEnrollment = async () => {
            try {
                const response = await axiosPublic.get(`/dawra/${currentUserId}`);
                if (response.data?.success && response.data.dawra) {
                    setAlreadyEnrolled(true);
                }
            } catch (err) {
                if (err.response?.status === 404) {
                    setAlreadyEnrolled(false); // user not enrolled yet
                } else {
                    // only log unexpected errors
                    console.error("Error checking Dawra enrollment:", err);
                    Swal.fire("Error", "Failed to check Dawra enrollment", "error");
                }
            } finally {
                setLoading(false);
            }
        };

        checkDawraEnrollment();
    }, [currentUserId]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        birthdate: "",
        address: "",
        country: "",
        phone: "",
        whatsapp: "",
        fatherName: "",
        fatherPhone: "",
        currentStudy: "",
        paymentMethod: "",
        transactionId: "",
        paymentPhone: "",
        birthCertificateUrl: ""
    });

    // Prefill name/email once user loads
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user?.displayName || "",
                email: user?.email || ""
            }));
        }
    }, [user]);

    // Fetch existing Dawra/user data if currentUserId exists
    useEffect(() => {
        const fetchExistingData = async () => {
            if (!currentUserId || userIdLoading) return; // wait until ID is ready

            try {
                const response = await axiosPublic.get(`/users/${currentUserId}`);
                const existingData = response.data;

                if (existingData) {
                    setFormData(prev => ({
                        ...prev,
                        // Core profile info
                        name: existingData.displayName || prev.name,
                        email: existingData.email || prev.email,
                        gender: existingData.gender || prev.gender,
                        birthdate: existingData.birthdate || prev.birthdate,
                        address: existingData.presentAddress || prev.address,
                        country: existingData.presentCountry || prev.country,
                        phone: existingData.phone || prev.phone,
                        whatsapp: existingData.whatsapp || prev.whatsapp,

                        // Dawra-specific fields (may not exist yet)
                        fatherName: existingData.fatherName || prev.fatherName,
                        fatherPhone: existingData.fatherPhone || prev.fatherPhone,
                        currentStudy: existingData.currentStudy || prev.currentStudy,
                        birthCertificateUrl: existingData.birthCertificateUrl || prev.birthCertificateUrl,
                    }));
                }
            } catch (err) {
                console.error("Error fetching existing user data:", err);
                Swal.fire({
                    icon: "error",
                    title: "Failed to load existing data",
                    text: err.response?.data?.message || err.message
                });
            }
        };

        fetchExistingData();
    }, [currentUserId, userIdLoading, axiosPublic]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSelectChange = (selected, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: selected?.value || "",
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        setUploading(true);

        if (file.type.startsWith('image/')) {
            setFilePreview(URL.createObjectURL(file));
        } else {
            setFilePreview('pdf-icon');
        }

        const formDataUpload = new FormData();
        formDataUpload.append('image', file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=a5e5e92849d8703de144ff717ac0f126`, {
                method: 'POST',
                body: formDataUpload,
            });
            const data = await res.json();
            if (data.success) {
                setFormData(prev => ({ ...prev, birthCertificateUrl: data.data.url }));
                Swal.fire('Uploaded!', 'Birth certificate uploaded successfully', 'success');
            } else {
                Swal.fire('Error', 'Failed to upload document', 'error');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Upload failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Required fields validation
        if (!formData.email || !formData.birthCertificateUrl) {
            return Swal.fire('Missing Data', 'Email and Birth Certificate are required', 'warning');
        }

        // Required fields validation
        if (!formData.paymentMethod) {
            return Swal.fire('Missing Data', 'Choose a Payment Method', 'warning');
        }

        // Required fields validation
        if (!formData.paymentPhone) {
            return Swal.fire('Missing Data', 'Transaction Phone no is required', 'warning');
        }

        // Required fields validation
        if (!formData.transactionId) {
            return Swal.fire('Missing Data', 'Transaction Id is required', 'warning');
        }

        const payload = {
            email: formData.email,
            displayName: formData.name,
            birthCertificateUrl: formData.birthCertificateUrl,
            fatherName: formData.fatherName,
            fatherPhone: formData.fatherPhone,
            currentStudy: formData.currentStudy,
            phone: formData.phone,
            fees: {
                admissionFee: {
                    amount: 1500,
                    paid: true,
                    paidAt: new Date(),
                    transactionId: formData.transactionId || "",
                    paymentMethod: formData.paymentMethod || "",
                    paymentPhone: formData.paymentPhone || ""
                },
                firstMonthFee: 1400,
                total: 2900,
                monthly: [
                    {
                        month: "Shawwal",
                        year: 1447,
                        amount: 1400,
                        paid: true,
                        paidAt: new Date(),
                        transactionId: formData.transactionId || "",
                        paymentMethod: formData.paymentMethod || "",
                        paymentPhone: formData.paymentPhone || ""
                    }
                ]
            },
            address: formData.address,
            birthdate: formData.birthdate,
            gender: formData.gender,
            whatsapp: formData.whatsapp,
            country: formData.country,
        };

        try {
            const response = await axiosPublic.post("/dawra", payload);
            Swal.fire('Success', 'Dawra enrollment successful', 'success').then(() => {
                navigate("/dashboard");
            });
            console.log("Dawra saved:", response.data);

            // Reset Dawra-only fields after success
            setFormData(prev => ({
                ...prev,
                fatherName: '',
                fatherPhone: '',
                currentStudy: '',
                phone: '',
                transactionId: '',
                paymentMethod: '',
                paymentPhone: '',
            }));
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || 'Enrollment failed';
            Swal.fire('Error', message, 'error');
        }
    };

    if (userIdLoading || loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center pt-24 px-6">
                <div className="relative">
                    {/* Branded Outer Ring */}
                    <div className="w-16 h-16 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin" />
                    {/* Inner Pulse Dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-sky-600 rounded-full animate-pulse" />
                    </div>
                </div>
                <h3 className="mt-6 text-slate-900 font-bold uppercase tracking-[0.2em] text-[11px]">
                    Validating Session
                </h3>
                <p className="text-slate-400 text-sm mt-1 animate-pulse">Please wait a moment...</p>
            </div>
        );
    }

    if (alreadyEnrolled) {
        return (
            <div className="pt-24 min-h-[70vh] flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
                    {/* Decorative Background Glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-50 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-sky-50 text-sky-600 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-6 shadow-sm">
                            <FiCheckCircle size={40} />
                        </div>

                        <h2 className="text-2xl font-serif text-slate-900 mb-3">Application Received</h2>

                        <p className="text-slate-500 leading-relaxed mb-8">
                            Our records show that you have already applied for the <span className="text-sky-600 font-bold">Dawra Enrollment</span>.
                            Each student is limited to one active application per semester.
                        </p>

                        <div className="space-y-3">
                            <Link to={'/dashboard'}>
                                <button
                                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl shadow-slate-200"
                                >
                                    Go to Dashboard
                                </button>
                            </Link>
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                                Need help? Contact Admission Office
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Reusable Tailwind class for inputs
    const inputClass = "w-full p-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all duration-200 bg-white font-sans text-brand-dark";
    const labelClass = "block text-sm font-semibold text-brand-navy mb-1.5 ml-1 font-heading";

    return (
        <div className="min-h-screen bg-brand-light font-sans py-12 px-4 pt-24">
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
                                <input
                                    type="text"
                                    value={formData.name}
                                    disabled
                                    className={`${inputClass} bg-gray-50 cursor-not-allowed`}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className={`${inputClass} bg-gray-50 cursor-not-allowed`}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Gender</label>
                                <Select
                                    options={genderOptions}
                                    value={genderOptions.find(opt => opt.value === formData.gender)}
                                    onChange={(opt) =>
                                        setFormData(prev => ({ ...prev, gender: opt.value }))
                                    }
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
                                <input
                                    type="date"
                                    name="birthdate"
                                    value={formData.birthdate ? formData.birthdate.slice(0, 10) : ""}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
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
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Full Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClass}>Country</label>
                                    <Select
                                        options={countryOptions}
                                        value={countryOptions.find(opt => opt.value === formData.country)}
                                        onChange={(opt) =>
                                            setFormData(prev => ({ ...prev, country: opt.value }))
                                        }
                                        styles={{
                                            control: (base) => ({ ...base, borderRadius: '0.75rem', padding: '0.15rem' }),
                                        }}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Current Study Level</label>
                                    <input
                                        type="text"
                                        name="currentStudy"
                                        placeholder="Madrasa / School / College"
                                        value={formData.currentStudy}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="+880..."
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>WhatsApp Number</label>
                                    <input
                                        type="text"
                                        name="whatsapp"
                                        placeholder="For class updates"
                                        value={formData.whatsapp}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Father Info */}
                    <section className="bg-brand-light/50 p-6 rounded-2xl border border-brand-blue/5">
                        <h2 className="text-lg font-heading font-bold text-brand-navy mb-4">Father's Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>Father's Name</label>
                                <input type="text" name="fatherName" placeholder="Father's Name" onChange={handleChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Father's Phone No</label>
                                <input type="text" name="fatherPhone" placeholder="+880..." onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Birth Certificate */}
                    <section className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm mt-8">
                        <div className="bg-slate-50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                            <div className="bg-sky-100 p-2 rounded-lg text-sky-600">
                                <FiFileText size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Birth Certificate</h2>
                                <p className="text-[10px] text-slate-500 font-medium italic">Image or PDF</p>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="relative">
                                {!filePreview ? (
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-slate-50 hover:border-sky-300 transition-all cursor-pointer group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <div className="mb-3 p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                                <FiUploadCloud size={28} className="text-sky-500" />
                                            </div>
                                            <p className="mb-1 text-sm text-slate-700 font-bold">Click to upload document</p>
                                            <p className="text-xs text-slate-400">PNG, JPG or PDF (Max 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*,application/pdf"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                ) : (
                                    <div className="relative flex items-center gap-4 p-4 border-2 border-sky-100 bg-sky-50/30 rounded-2xl">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-white shadow-sm bg-white flex items-center justify-center">
                                            {filePreview === 'pdf-icon' ? (
                                                <FiFileText size={32} className="text-red-500" />
                                            ) : (
                                                <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-slate-800 truncate">{fileName}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {uploading ? (
                                                    <>
                                                        <div className="w-3 h-3 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
                                                        <span className="text-[11px] text-sky-600 font-bold animate-pulse">Uploading to server...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiCheck className="text-emerald-500" />
                                                        <span className="text-[11px] text-emerald-500 font-bold uppercase tracking-wider">Ready for submission</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => { setFilePreview(null); setFileName("") }}
                                            className="p-2 hover:bg-white rounded-full text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <FiX size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex items-start gap-2 text-slate-400">
                                <FiInfo size={14} className="mt-0.5 flex-shrink-0" />
                                <p className="text-[10px] leading-relaxed">
                                    Ensure the document is clearly visible and all text is readable.
                                    PDF files will be automatically processed as images for verification.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Secure Payment - REDESIGNED */}
                    <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                            <h2 className="font-heading font-bold text-brand-navy uppercase tracking-wider text-sm flex items-center gap-2">
                                <svg className="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                Payment Details
                            </h2>
                            <div className="text-right">
                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-widest">Total Amount</span>
                                <span className="text-brand-navy font-heading font-bold text-lg leading-none">2900 BDT</span>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* NEW: Payment Method Selection */}
                            <div className="mb-8">
                                <label className={`${labelClass} mb-3 block`}>Select Payment Method</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: 'bkash', name: 'bKash', img: '/bkash.png' },
                                        { id: 'nagad', name: 'Nagad', img: '/nagad.png' },
                                        { id: 'rocket', name: 'Rocket', img: '/rocket.png' }
                                    ].map((method) => (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => {
                                                // Assuming you have a handleChange or a specific state setter
                                                const event = { target: { name: 'paymentMethod', value: method.id } };
                                                handleChange(event);
                                            }}
                                            className={`relative group flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${formData.paymentMethod === method.id
                                                ? "border-brand-blue bg-blue-50/50 scale-[1.02]"
                                                : "border-gray-100 hover:border-gray-200 bg-white"
                                                }`}
                                        >
                                            {/* Selected Checkmark */}
                                            {formData.paymentMethod === method.id && (
                                                <div className="absolute top-2 right-2 bg-brand-blue text-white rounded-full p-0.5 shadow-sm">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </div>
                                            )}

                                            <img
                                                src={method.img}
                                                alt={method.name}
                                                className={`h-10 w-auto object-contain transition-transform duration-300 ${formData.paymentMethod === method.id ? "grayscale-0" : "grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

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

                                {/* Dynamic visual card based on selection */}
                                <div className="bg-brand-navy rounded-xl p-4 text-white relative overflow-hidden transition-all duration-500">
                                    <p className="text-[10px] text-brand-blue font-bold uppercase mb-1">
                                        Send Payment via {formData.paymentMethod || 'Mobile Banking'}
                                    </p>
                                    <p className="text-xl font-heading font-bold tracking-wider">01317110122</p>
                                    <p className="text-[11px] opacity-80 mt-1 uppercase tracking-wider">Personal Account</p>

                                    {/* Decorative background icon change based on selection */}
                                    <svg className="absolute -right-2 -bottom-2 w-16 h-16 opacity-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path>
                                    </svg>
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
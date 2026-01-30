import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { AiOutlineWarning } from "react-icons/ai";

const MailboxlayerAPIKey = import.meta.env.VITE_MAILBOXLAYER_API_KEY;

// Full country code → primary IANA timezone mapping
const countryTimezones = {
    AF: "Asia/Kabul",
    AL: "Europe/Tirane",
    DZ: "Africa/Algiers",
    AS: "Pacific/Pago_Pago",
    AD: "Europe/Andorra",
    AO: "Africa/Luanda",
    AR: "America/Argentina/Buenos_Aires",
    AM: "Asia/Yerevan",
    AU: "Australia/Sydney",
    AT: "Europe/Vienna",
    AZ: "Asia/Baku",
    BH: "Asia/Bahrain",
    BD: "Asia/Dhaka",
    BY: "Europe/Minsk",
    BE: "Europe/Brussels",
    BZ: "America/Belize",
    BJ: "Africa/Porto-Novo",
    BM: "Atlantic/Bermuda",
    BT: "Asia/Thimphu",
    BO: "America/La_Paz",
    BA: "Europe/Sarajevo",
    BW: "Africa/Gaborone",
    BR: "America/Sao_Paulo",
    BN: "Asia/Brunei",
    BG: "Europe/Sofia",
    BF: "Africa/Ouagadougou",
    BI: "Africa/Bujumbura",
    KH: "Asia/Phnom_Penh",
    CM: "Africa/Douala",
    CA: "America/Toronto",
    CV: "Atlantic/Cape_Verde",
    CF: "Africa/Bangui",
    TD: "Africa/Ndjamena",
    CL: "America/Santiago",
    CN: "Asia/Shanghai",
    CO: "America/Bogota",
    KM: "Indian/Comoro",
    CD: "Africa/Kinshasa",
    CG: "Africa/Brazzaville",
    CR: "America/Costa_Rica",
    CI: "Africa/Abidjan",
    HR: "Europe/Zagreb",
    CU: "America/Havana",
    CY: "Asia/Nicosia",
    CZ: "Europe/Prague",
    DK: "Europe/Copenhagen",
    DJ: "Africa/Djibouti",
    DM: "America/Dominica",
    DO: "America/Santo_Domingo",
    EC: "America/Guayaquil",
    EG: "Africa/Cairo",
    SV: "America/El_Salvador",
    GQ: "Africa/Malabo",
    ER: "Africa/Asmara",
    EE: "Europe/Tallinn",
    ET: "Africa/Addis_Ababa",
    FJ: "Pacific/Fiji",
    FI: "Europe/Helsinki",
    FR: "Europe/Paris",
    GA: "Africa/Libreville",
    GM: "Africa/Banjul",
    GE: "Asia/Tbilisi",
    DE: "Europe/Berlin",
    GH: "Africa/Accra",
    GR: "Europe/Athens",
    GL: "America/Godthab",
    GD: "America/Grenada",
    GT: "America/Guatemala",
    GN: "Africa/Conakry",
    GW: "Africa/Bissau",
    GY: "America/Guyana",
    HT: "America/Port-au-Prince",
    HN: "America/Tegucigalpa",
    HK: "Asia/Hong_Kong",
    HU: "Europe/Budapest",
    IS: "Atlantic/Reykjavik",
    IN: "Asia/Kolkata",
    ID: "Asia/Jakarta",
    IR: "Asia/Tehran",
    IQ: "Asia/Baghdad",
    IE: "Europe/Dublin",
    IL: "Asia/Jerusalem",
    IT: "Europe/Rome",
    JM: "America/Jamaica",
    JP: "Asia/Tokyo",
    JO: "Asia/Amman",
    KZ: "Asia/Almaty",
    KE: "Africa/Nairobi",
    KI: "Pacific/Tarawa",
    KW: "Asia/Kuwait",
    KG: "Asia/Bishkek",
    LA: "Asia/Vientiane",
    LV: "Europe/Riga",
    LB: "Asia/Beirut",
    LS: "Africa/Maseru",
    LR: "Africa/Monrovia",
    LY: "Africa/Tripoli",
    LT: "Europe/Vilnius",
    LU: "Europe/Luxembourg",
    MO: "Asia/Macau",
    MK: "Europe/Skopje",
    MG: "Indian/Antananarivo",
    MW: "Africa/Blantyre",
    MY: "Asia/Kuala_Lumpur",
    MV: "Indian/Maldives",
    ML: "Africa/Bamako",
    MT: "Europe/Malta",
    MH: "Pacific/Majuro",
    MR: "Africa/Nouakchott",
    MU: "Indian/Mauritius",
    MX: "America/Mexico_City",
    FM: "Pacific/Chuuk",
    MD: "Europe/Chisinau",
    MC: "Europe/Monaco",
    MN: "Asia/Ulaanbaatar",
    ME: "Europe/Podgorica",
    MA: "Africa/Casablanca",
    MZ: "Africa/Maputo",
    MM: "Asia/Yangon",
    NA: "Africa/Windhoek",
    NR: "Pacific/Nauru",
    NP: "Asia/Kathmandu",
    NL: "Europe/Amsterdam",
    NZ: "Pacific/Auckland",
    NI: "America/Managua",
    NE: "Africa/Niamey",
    NG: "Africa/Lagos",
    KP: "Asia/Pyongyang",
    NO: "Europe/Oslo",
    OM: "Asia/Muscat",
    PK: "Asia/Karachi",
    PW: "Pacific/Palau",
    PA: "America/Panama",
    PG: "Pacific/Port_Moresby",
    PY: "America/Asuncion",
    PE: "America/Lima",
    PH: "Asia/Manila",
    PL: "Europe/Warsaw",
    PT: "Europe/Lisbon",
    QA: "Asia/Qatar",
    RO: "Europe/Bucharest",
    RU: "Europe/Moscow",
    RW: "Africa/Kigali",
    KN: "America/St_Kitts",
    LC: "America/St_Lucia",
    VC: "America/St_Vincent",
    WS: "Pacific/Apia",
    SM: "Europe/San_Marino",
    ST: "Africa/Sao_Tome",
    SA: "Asia/Riyadh",
    SN: "Africa/Dakar",
    RS: "Europe/Belgrade",
    SC: "Indian/Mahe",
    SL: "Africa/Freetown",
    SG: "Asia/Singapore",
    SK: "Europe/Bratislava",
    SI: "Europe/Ljubljana",
    SB: "Pacific/Guadalcanal",
    SO: "Africa/Mogadishu",
    ZA: "Africa/Johannesburg",
    KR: "Asia/Seoul",
    ES: "Europe/Madrid",
    LK: "Asia/Colombo",
    SD: "Africa/Khartoum",
    SR: "America/Paramaribo",
    SZ: "Africa/Mbabane",
    SE: "Europe/Stockholm",
    CH: "Europe/Zurich",
    SY: "Asia/Damascus",
    TW: "Asia/Taipei",
    TJ: "Asia/Dushanbe",
    TZ: "Africa/Dar_es_Salaam",
    TH: "Asia/Bangkok",
    TL: "Asia/Dili",
    TG: "Africa/Lome",
    TO: "Pacific/Tongatapu",
    TT: "America/Port_of_Spain",
    TN: "Africa/Tunis",
    TR: "Europe/Istanbul",
    TM: "Asia/Ashgabat",
    UG: "Africa/Kampala",
    UA: "Europe/Kiev",
    AE: "Asia/Dubai",
    GB: "Europe/London",
    US: "America/New_York",
    UY: "America/Montevideo",
    UZ: "Asia/Tashkent",
    VU: "Pacific/Efate",
    VE: "America/Caracas",
    VN: "Asia/Ho_Chi_Minh",
    YE: "Asia/Aden",
    ZM: "Africa/Lusaka",
    ZW: "Africa/Harare",
};

const Registration = () => {
    const { createUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [role, setRole] = useState("");
    const [bgColor, setBgColor] = useState("bg-blue-100");
    const [emailValid, setEmailValid] = useState(null); // Store email validation state
    const [checkingEmail, setCheckingEmail] = useState(false); // State to track if we're checking the email
    const [emailError, setEmailError] = useState("");

    // Regular expression for password validation
    const passwordValidation = {
        minLength: { value: 6, message: "Password must be at least 6 characters" },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        }
    };

    // Email validation function
    const validateEmail = async (email) => {
        if (!email) return;

        setCheckingEmail(true);
        setEmailError(""); // Reset previous email error message

        // Check if Mailboxlayer API Key is provided
        if (!MailboxlayerAPIKey) {
            setEmailValid(null);
            setEmailError("Due to network issues, validator is not working. Please check the email carefully.");
            setCheckingEmail(false);
            return;
        }
        try {
            const response = await axios.get(`http://apilayer.net/api/check`, {
                params: {
                    access_key: MailboxlayerAPIKey,
                    email,
                    smtp: 1,
                    format: 1,
                },
            });

            // Check if email is valid and update state
            setEmailValid(response.data.format_valid && response.data.smtp_check);
        } catch (error) {
            console.error("Email validation error:", error);
            if (error.response && error.response.status === 429) {
                // Handle rate limit exceeded error (API specific)
                setEmailValid(null); // Reset email validation state
                setEmailError("Due to network issues, validator is not working. Please check the email carefully.");
            } else {
                // Handle network or other errors
                setEmailValid(null);
                setEmailError("Due to network issues, validator is not working. Please check the email carefully.");
            }
        }
        setCheckingEmail(false);
    };

    const onSubmit = async (data) => {
        // Check if all fields are filled
        if (!role) {
            Swal.fire({
                icon: "error",
                title: "Role Required",
                text: "Please select your role (Teacher/Student).",
                confirmButtonColor: "#d33",
            });
            return;
        }

        if (!data.name || !data.email || !data.password || !data.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Missing Fields",
                text: "Please fill out all fields, including selecting a role.",
                confirmButtonColor: "#d33",
            });
            return;
        }

        const { name, email, password } = data;

        try {
            Swal.fire({
                title: 'Registering...',
                text: 'Please wait while we registering you. Do not refresh',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const user = await createUser(email, password, name, "");
            if (user?.error) throw new Error(user.error);

            // Detect local timezone
            const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Map to country code with fallback
            let presentCountry = Object.keys(countryTimezones).find(
                (key) => countryTimezones[key] === localTimezone
            );

            // Try partial match if exact not found
            if (!presentCountry) {
                presentCountry = Object.keys(countryTimezones).find((key) =>
                    countryTimezones[key].includes(localTimezone.split("/")[1])
                );
            }

            // Final fallback
            if (!presentCountry) presentCountry = "";

            const userData = {
                displayName: name,
                email,
                role: role,
                join: new Date().toISOString(),
                status: "pending",
                userId: "",
                teacherTier: "General",
                presentCountry,
            };

            const response = await axiosPublic.post('/users', userData);
            if (response.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful!",
                    text: "Welcome aboard! Please check your mail and verify your account.",
                    confirmButtonColor: "#11719b",
                }).then(() => {
                    navigate("/verify-email");
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message || "Something went wrong. Try again.",
                confirmButtonColor: "#d33",
            });
        }
    };

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
        if (selectedRole === "teacher") {
            setBgColor("bg-green-100");
        } else if (selectedRole === "student") {
            setBgColor("bg-teal-100");
        }
    };

    // Check password criteria
    const passwordCriteria = {
        minLength: password?.length >= 6,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*]/.test(password),
    };

    return (
        <div className={`flex items-center justify-center min-h-screen py-5 px-3 ${bgColor}`}>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full md:w-[500px] lg:w-[600px]">
                <h2 className="text-2xl font-semibold text-[#11719b] text-center mb-4">Register</h2>

                <div className="mb-6 text-center">
                    <p className="text-lg font-medium text-gray-700">Select your role</p>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handleRoleChange("teacher")}
                            className={`p-2 rounded w-[48%] ${role === "teacher" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-green-600"}`}
                        >
                            Register as Teacher
                        </button>
                        <button
                            onClick={() => handleRoleChange("student")}
                            className={`p-2 rounded w-[48%] ${role === "student" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-600"}`}
                        >
                            Register as Student
                        </button>
                    </div>
                </div>

                {role && (
                    <h3 className="text-xl font-semibold text-center mb-4 text-[#11719b]">
                        You are registering as a {role.charAt(0).toUpperCase() + role.slice(1)}
                    </h3>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            className="w-full p-2 border rounded bg-white text-gray-800"
                            placeholder="Enter your name"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full p-2 border rounded bg-white text-gray-800"
                            placeholder="Enter your email"
                            onBlur={(e) => validateEmail(e.target.value)} // Validate on blur
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        {checkingEmail && <p className="text-gray-500 text-sm">Checking email...</p>}
                        {emailValid === false && <p className="text-red-500 text-sm flex items-center gap-1"><FaXmark /> Invalid email address</p>}
                        {emailValid === true && <p className="text-green-500 text-sm flex items-center gap-1"><IoCheckmarkDoneSharp />Valid email address</p>}
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>
                    <div className="flex items-center space-x-2 p-4 bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500">
                        <AiOutlineWarning className="h-5 w-5" />
                        <span>Be careful when entering your email. Check spelling and make sure the email is correct.</span>
                    </div>

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "Password is required",
                                    ...passwordValidation
                                })}
                                className="w-full p-2 border rounded bg-white text-gray-800 pr-10"
                                placeholder="Enter your password"
                            />
                            <span
                                className="absolute top-3 right-3 text-gray-600 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                        {/* Password Criteria */}
                        {password && (
                            <ul className="text-sm text-gray-500 mt-2">
                                <li className={`${passwordCriteria.minLength ? 'text-green-500' : ''} flex items-center`}>
                                    • At least 6 characters
                                </li>
                                <li className={`${passwordCriteria.hasUpperCase ? 'text-green-500' : ''} flex items-center`}>
                                    • One uppercase letter
                                </li>
                                <li className={`${passwordCriteria.hasLowerCase ? 'text-green-500' : ''} flex items-center`}>
                                    • One lowercase letter
                                </li>
                                <li className={`${passwordCriteria.hasNumber ? 'text-green-500' : ''} flex items-center`}>
                                    • One number
                                </li>
                                <li className={`${passwordCriteria.hasSpecialChar ? 'text-green-500' : ''} flex items-center`}>
                                    • One special character (!@#$%^&*)
                                </li>
                            </ul>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: value => value === password || "Passwords don't match"
                                })}
                                className="w-full p-2 border rounded bg-white text-gray-800 pr-10"
                                placeholder="Confirm your password"
                            />
                            <span
                                className="absolute top-3 right-3 text-gray-600 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                    </div>

                    <button type="submit" className="w-full bg-[#11719b] text-white p-2 rounded">
                        Register
                    </button>

                    <p className="text-center text-gray-600 mt-2">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#11719b] font-semibold">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Registration;
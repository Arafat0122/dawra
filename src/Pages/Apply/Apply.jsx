import { useState } from "react";
import Swal from "sweetalert2";

const Apply = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // You can add Firebase or backend integration here

        Swal.fire({
            title: 'Application Submitted!',
            text: 'Thank you for applying. We’ll contact you soon.',
            icon: 'success',
            confirmButtonColor: '#facc15', // yellow-400
            confirmButtonText: 'Okay',
        });

        // Optionally clear the form
        setFormData({
            name: "",
            email: "",
            phone: "",
            gender: "",
            message: "",
        });
    };

    return (
        <div className="bg-gradient-to-b from-white via-sky-50 to-white py-20 px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-sky-900 mb-4">
                    Apply to Dawra Hadith Course
                </h1>
                <p className="text-lg md:text-xl text-sky-700 max-w-2xl mx-auto">
                    Begin your journey of sacred knowledge with Rahmah Institute.
                    Please fill in the application form below.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sky-800 font-medium mb-1">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-sky-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50 text-sky-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sky-800 font-medium mb-1">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-sky-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50 text-sky-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sky-800 font-medium mb-1">Phone Number</label>
                        <input
                            name="phone"
                            type="text"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-sky-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50 text-sky-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sky-800 font-medium mb-1">Gender</label>
                        <select
                            name="gender"
                            required
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-sky-100 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50 text-sky-600"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sky-800 font-medium mb-1">Why do you want to join?</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-sky-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50 text-sky-600"
                        placeholder="Write a few lines about your interest..."
                    />
                </div>

                <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-semibold text-lg px-8 py-3 rounded-full shadow-md transition duration-300"
                >
                    Submit Application
                </button>
            </form>
        </div>
    );
};

export default Apply;
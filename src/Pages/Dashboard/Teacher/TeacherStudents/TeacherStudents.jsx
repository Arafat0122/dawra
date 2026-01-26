import { useState } from "react";
import { FiEdit, FiXCircle, FiCheckCircle } from "react-icons/fi";

const dummyStudents = [
    {
        id: "stu001",
        name: "Ahmed Ali",
        email: "ahmed@example.com",
        profilePic: "https://i.pravatar.cc/150?img=3",
        subjects: [
            { name: "Tafsir", marks: 85 },
            { name: "Fiqh", marks: 90 },
            { name: "Hadith", marks: 78 },
        ],
        overall: 84,
        remark: "",
    },
    {
        id: "stu002",
        name: "Sara Rahman",
        email: "sara@example.com",
        profilePic: "https://i.pravatar.cc/150?img=5",
        subjects: [
            { name: "Tafsir", marks: 92 },
            { name: "Fiqh", marks: 88 },
            { name: "Hadith", marks: 95 },
        ],
        overall: 91,
        remark: "Excellent progress",
    },
    {
        id: "stu003",
        name: "Mohammed Farhan",
        email: "farhan@example.com",
        profilePic: "https://i.pravatar.cc/150?img=7",
        subjects: [
            { name: "Tafsir", marks: 72 },
            { name: "Fiqh", marks: 68 },
            { name: "Hadith", marks: 75 },
        ],
        overall: 71,
        remark: "",
    },
];

const TeacherStudents = () => {
    const [students, setStudents] = useState(dummyStudents);
    const [activeRemark, setActiveRemark] = useState(null);
    const [newRemark, setNewRemark] = useState("");

    const handleSaveRemark = () => {
        setStudents(prev =>
            prev.map(s => s.id === activeRemark.id ? { ...s, remark: newRemark } : s)
        );
        setActiveRemark(null);
        setNewRemark("");
        // TODO: Save remark to backend
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">

            <header className="mb-6">
                <h2 className="text-4xl font-black text-brand-navy">My Students</h2>
                <p className="text-gray-500 mt-2">View all students, check their marks, and give remarks.</p>
            </header>

            {/* Students Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-100 rounded-2xl">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">Student</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">Subjects / Marks</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">Overall</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">Remark</th>
                            <th className="px-6 py-3 text-left text-sm font-bold text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                                <td className="px-6 py-4 flex items-center gap-2">
                                    <img src={student.profilePic} alt={student.name} className="w-10 h-10 rounded-full" />
                                    <span className="font-medium">{student.name}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{student.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-700 space-y-1">
                                    {student.subjects.map((sub, i) => (
                                        <div key={i} className="flex justify-between w-32">
                                            <span>{sub.name}</span>
                                            <span className="font-bold">{sub.marks}</span>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4 font-bold">{student.overall}</td>
                                <td className="px-6 py-4 text-sm italic">{student.remark || "—"}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => { setActiveRemark(student); setNewRemark(student.remark || ""); }}
                                        className="flex items-center gap-1 px-3 py-2 bg-brand-blue text-white rounded-xl text-xs font-bold hover:bg-brand-navy transition-all"
                                    >
                                        <FiEdit /> Remark
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Remark Modal */}
            {activeRemark && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-md space-y-4">
                        <h3 className="text-xl font-black">Give Remark - {activeRemark.name}</h3>
                        <textarea
                            className="w-full p-3 border rounded-xl h-24"
                            value={newRemark}
                            onChange={(e) => setNewRemark(e.target.value)}
                        />
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setActiveRemark(null)}
                                className="flex-1 py-3 rounded-xl bg-gray-100 font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveRemark}
                                className="flex-1 py-3 rounded-xl bg-green-500 text-white font-bold"
                            >
                                <FiCheckCircle /> Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TeacherStudents;
import { useState } from "react";
import {
    FiPlus,
    FiUpload,
    FiFileText,
    FiClock,
    FiCheckCircle,
    FiXCircle,
} from "react-icons/fi";

const TeacherExamSystem = () => {
    const [exams, setExams] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newExam, setNewExam] = useState({
        title: "",
        subject: "",
        duration: "",
        marks: "",
        questionType: "text", // "text" or "pdf"
        questionsText: "",
        questionsFile: null,
        status: "Draft", // Draft, Live, Ended
    });

    // --- Create Exam ---
    const handleCreateExam = () => {
        const exam = {
            ...newExam,
            id: `exam_${Date.now()}`,
        };
        setExams((prev) => [...prev, exam]);
        setShowCreate(false);
        setNewExam({
            title: "",
            subject: "",
            duration: "",
            marks: "",
            questionType: "text",
            questionsText: "",
            questionsFile: null,
            status: "Draft",
        });
        // TODO: call backend API to save exam
    };

    // --- Start Exam ---
    const startExam = (id) => {
        setExams((prev) =>
            prev.map((e) => (e.id === id ? { ...e, status: "Live" } : e))
        );
        // TODO: call backend API to mark exam as live
    };

    // --- End Exam ---
    const endExam = (id) => {
        setExams((prev) =>
            prev.map((e) => (e.id === id ? { ...e, status: "Ended" } : e))
        );
        // TODO: call backend API to mark exam as ended
    };

    // --- Publish Results ---
    const publishResults = (id) => {
        // TODO: call backend API to publish results
        alert("Results published for exam ID: " + id);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-black text-brand-navy">
                        Exam Management
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Create exams, upload questions, manage active exams, and publish
                        results.
                    </p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-navy transition-all"
                >
                    <FiPlus /> Create Exam
                </button>
            </div>

            {/* Exams List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map((exam) => (
                    <div
                        key={exam.id}
                        className="bg-white p-6 rounded-[2.5rem] border shadow-sm flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-black bg-brand-light text-brand-blue px-3 py-1 rounded-lg">
                                {exam.subject}
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-[10px] font-bold ${exam.status === "Draft"
                                        ? "bg-gray-50 text-gray-500"
                                        : exam.status === "Live"
                                            ? "bg-blue-50 text-blue-700"
                                            : "bg-green-50 text-green-700"
                                    }`}
                            >
                                {exam.status}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-brand-navy mb-2 line-clamp-2">
                            {exam.title}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <FiClock /> Duration: {exam.duration} min | Marks: {exam.marks}
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-bold">Questions:</p>
                            {exam.questionType === "text" ? (
                                <p className="text-gray-600 text-sm italic">{exam.questionsText}</p>
                            ) : (
                                <a
                                    href={URL.createObjectURL(exam.questionsFile)}
                                    target="_blank"
                                    className="flex items-center gap-2 text-sm text-brand-blue"
                                >
                                    <FiFileText /> View PDF
                                </a>
                            )}
                        </div>

                        <div className="mt-auto space-y-2">
                            {exam.status === "Draft" && (
                                <button
                                    onClick={() => startExam(exam.id)}
                                    className="w-full py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-navy transition-all"
                                >
                                    <FiUpload /> Start Exam
                                </button>
                            )}
                            {exam.status === "Live" && (
                                <button
                                    onClick={() => endExam(exam.id)}
                                    className="w-full py-3 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all"
                                >
                                    End Exam
                                </button>
                            )}
                            {exam.status === "Ended" && (
                                <button
                                    onClick={() => publishResults(exam.id)}
                                    className="w-full py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-all"
                                >
                                    <FiCheckCircle /> Publish Results
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {exams.length === 0 && (
                    <div className="col-span-full py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
                        <p className="font-bold text-lg">No exams created yet</p>
                        <p className="text-sm mt-2">
                            Click "Create Exam" to start adding new exams.
                        </p>
                    </div>
                )}
            </div>

            {/* Create Exam Modal */}
            {showCreate && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-md space-y-4">
                        <h3 className="text-xl font-black">Create Exam</h3>

                        <input
                            type="text"
                            placeholder="Exam Title"
                            className="w-full p-3 border rounded-xl"
                            value={newExam.title}
                            onChange={(e) =>
                                setNewExam({ ...newExam, title: e.target.value })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full p-3 border rounded-xl"
                            value={newExam.subject}
                            onChange={(e) =>
                                setNewExam({ ...newExam, subject: e.target.value })
                            }
                        />
                        <div className="flex gap-3">
                            <input
                                type="number"
                                placeholder="Duration (minutes)"
                                className="flex-1 p-3 border rounded-xl"
                                value={newExam.duration}
                                onChange={(e) =>
                                    setNewExam({ ...newExam, duration: e.target.value })
                                }
                            />
                            <input
                                type="number"
                                placeholder="Marks"
                                className="flex-1 p-3 border rounded-xl"
                                value={newExam.marks}
                                onChange={(e) =>
                                    setNewExam({ ...newExam, marks: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="block font-bold mb-1">Question Type</label>
                            <select
                                className="w-full p-3 border rounded-xl"
                                value={newExam.questionType}
                                onChange={(e) =>
                                    setNewExam({ ...newExam, questionType: e.target.value })
                                }
                            >
                                <option value="text">Text</option>
                                <option value="pdf">PDF</option>
                            </select>
                        </div>

                        {newExam.questionType === "text" && (
                            <textarea
                                placeholder="Enter questions here..."
                                className="w-full p-3 border rounded-xl"
                                value={newExam.questionsText}
                                onChange={(e) =>
                                    setNewExam({ ...newExam, questionsText: e.target.value })
                                }
                            />
                        )}

                        {newExam.questionType === "pdf" && (
                            <input
                                type="file"
                                accept="application/pdf"
                                className="w-full p-3 border rounded-xl"
                                onChange={(e) =>
                                    setNewExam({ ...newExam, questionsFile: e.target.files[0] })
                                }
                            />
                        )}

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setShowCreate(false)}
                                className="flex-1 py-3 rounded-xl bg-gray-100 font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateExam}
                                className="flex-1 py-3 rounded-xl bg-brand-blue text-white font-bold"
                            >
                                Create Exam
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherExamSystem;
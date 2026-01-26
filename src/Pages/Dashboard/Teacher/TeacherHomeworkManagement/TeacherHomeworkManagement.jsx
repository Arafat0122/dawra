import { useState } from "react";
import { FiPlus, FiUpload, FiFileText, FiCheckCircle, FiXCircle } from "react-icons/fi";

const TeacherHomeworkManagement = () => {
    const [homeworks, setHomeworks] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newHomework, setNewHomework] = useState({
        title: "",
        subject: "",
        deadline: "",
        attachment: null,
        submissions: [], // each { studentName, file, marks, remark }
    });

    // --- Create Homework ---
    const handleCreateHomework = () => {
        const hw = {
            ...newHomework,
            id: `hw_${Date.now()}`,
        };
        setHomeworks(prev => [...prev, hw]);
        setShowCreate(false);
        setNewHomework({ title: "", subject: "", deadline: "", attachment: null, submissions: [] });
        // TODO: call backend API to save homework
    };

    // --- Give Marks / Remarks ---
    const handleMarkHomework = (hwId, studentIndex, marks, remark) => {
        setHomeworks(prev => prev.map(hw => {
            if (hw.id === hwId) {
                const submissions = [...hw.submissions];
                submissions[studentIndex] = { ...submissions[studentIndex], marks, remark };
                return { ...hw, submissions };
            }
            return hw;
        }));
        // TODO: call backend API to save marks/remarks
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-black text-brand-navy">Homework Management</h2>
                    <p className="text-gray-500 mt-2">
                        Create homework, view student submissions, and assign marks and remarks.
                    </p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-navy transition-all"
                >
                    <FiPlus /> Create Homework
                </button>
            </div>

            {/* Homework Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homeworks.length > 0 ? homeworks.map(hw => (
                    <div key={hw.id} className="bg-white p-6 rounded-[2.5rem] border shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-black bg-brand-light text-brand-blue px-3 py-1 rounded-lg">
                                {hw.subject}
                            </span>
                            <span className="text-xs font-bold text-gray-500">
                                Due: {hw.deadline}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-brand-navy mb-3 line-clamp-2">{hw.title}</h3>

                        {hw.attachment && (
                            <a
                                href={URL.createObjectURL(hw.attachment)}
                                target="_blank"
                                className="flex items-center gap-2 text-sm text-brand-blue mb-3"
                            >
                                <FiFileText /> View Attachment
                            </a>
                        )}

                        {/* Submissions */}
                        <div className="mt-auto space-y-2">
                            <h4 className="font-bold text-sm mb-2">Student Submissions</h4>
                            {hw.submissions.length === 0 && (
                                <p className="text-sm text-gray-400 italic">No submissions yet.</p>
                            )}
                            {hw.submissions.map((sub, idx) => (
                                <div key={idx} className="flex flex-col bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm">{sub.studentName}</span>
                                        <a
                                            href={URL.createObjectURL(sub.file)}
                                            target="_blank"
                                            className="flex items-center gap-1 text-xs text-brand-blue"
                                        >
                                            <FiFileText /> View
                                        </a>
                                    </div>

                                    <div className="flex gap-2 mt-2 items-center">
                                        <input
                                            type="number"
                                            placeholder="Marks"
                                            className="p-2 border rounded-xl w-20 text-sm"
                                            value={sub.marks || ""}
                                            onChange={(e) => handleMarkHomework(hw.id, idx, e.target.value, sub.remark || "")}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Remark"
                                            className="p-2 border rounded-xl flex-1 text-sm"
                                            value={sub.remark || ""}
                                            onChange={(e) => handleMarkHomework(hw.id, idx, sub.marks || "", e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleMarkHomework(hw.id, idx, sub.marks || 0, sub.remark || "")}
                                            className="p-2 bg-green-500 text-white rounded-xl text-xs"
                                        >
                                            <FiCheckCircle />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
                        <p className="font-bold text-lg">No homework created yet</p>
                        <p className="text-sm mt-2">
                            Click "Create Homework" to add a new assignment.
                        </p>
                    </div>
                )}
            </div>

            {/* Create Homework Modal */}
            {showCreate && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-md space-y-4">
                        <h3 className="text-xl font-black">Create Homework</h3>

                        <input
                            type="text"
                            placeholder="Homework Title"
                            className="w-full p-3 border rounded-xl"
                            value={newHomework.title}
                            onChange={(e) => setNewHomework({ ...newHomework, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full p-3 border rounded-xl"
                            value={newHomework.subject}
                            onChange={(e) => setNewHomework({ ...newHomework, subject: e.target.value })}
                        />
                        <input
                            type="date"
                            className="w-full p-3 border rounded-xl"
                            value={newHomework.deadline}
                            onChange={(e) => setNewHomework({ ...newHomework, deadline: e.target.value })}
                        />
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="w-full p-3 border rounded-xl"
                            onChange={(e) => setNewHomework({ ...newHomework, attachment: e.target.files[0] })}
                        />

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setShowCreate(false)}
                                className="flex-1 py-3 rounded-xl bg-gray-100 font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateHomework}
                                className="flex-1 py-3 rounded-xl bg-brand-blue text-white font-bold"
                            >
                                Create Homework
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherHomeworkManagement;
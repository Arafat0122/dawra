import { useState } from "react";
import { studentStudyMaterials } from "../../../../assets/devAuth";
import { FiDownload, FiBookOpen } from "react-icons/fi";

const StudentStudyMaterials = () => {
    const [expandedSubjects, setExpandedSubjects] = useState({});

    const toggleSubject = (subject) => {
        setExpandedSubjects((prev) => ({
            ...prev,
            [subject]: !prev[subject],
        }));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 animate-in fade-in duration-500">

            {/* Header */}
            <header className="mb-8">
                <h2 className="text-4xl font-black text-brand-navy">Study Materials</h2>
                <p className="text-gray-500 font-medium mt-2">
                    Access subject-wise PDFs, books, and resources uploaded by your teachers.
                </p>
            </header>

            {/* Subject Folders */}
            <div className="space-y-6">
                {studentStudyMaterials.map((subjectData) => (
                    <div key={subjectData.subject} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                        {/* Subject Header */}
                        <button
                            onClick={() => toggleSubject(subjectData.subject)}
                            className="w-full flex justify-between items-center px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-all font-bold text-brand-navy"
                        >
                            <span>{subjectData.subject}</span>
                            <span className="text-gray-400">{expandedSubjects[subjectData.subject] ? "-" : "+"}</span>
                        </button>

                        {/* Materials List */}
                        {expandedSubjects[subjectData.subject] && (
                            <div className="p-6 space-y-4">
                                {subjectData.materials.map((mat) => (
                                    <div key={mat.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-brand-navy">{mat.title}</span>
                                            <span className="text-xs text-gray-500">Uploaded by: {mat.uploadedBy}</span>
                                            <span className="text-xs text-gray-400">Date: {mat.uploadDate}</span>
                                        </div>

                                        <div className="flex gap-3">
                                            <a
                                                href={mat.file}
                                                target="_blank"
                                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold hover:bg-brand-blue hover:text-white transition-all"
                                            >
                                                <FiBookOpen /> View
                                            </a>
                                            <a
                                                href={mat.file}
                                                download
                                                className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-xl text-xs font-bold hover:bg-green-700 hover:text-white transition-all"
                                            >
                                                <FiDownload /> Download
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>

        </div>
    );
};

export default StudentStudyMaterials;
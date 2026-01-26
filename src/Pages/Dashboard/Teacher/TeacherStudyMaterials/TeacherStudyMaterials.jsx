import { useState } from "react";
import { teacherStudyMaterialsData } from "../../../../assets/devAuth";
import {
    FiUpload,
    FiFileText,
    FiTrash2,
    FiEdit,
    FiPlus,
} from "react-icons/fi";

const CURRENT_TEACHER_ID = "tch001"; // dummy auth

const TeacherStudyMaterials = () => {
    const [materials, setMaterials] = useState(teacherStudyMaterialsData);
    const [showUpload, setShowUpload] = useState(false);

    const [newMaterial, setNewMaterial] = useState({
        subject: "",
        title: "",
        file: null,
    });

    /* ---------------- Upload Material ---------------- */
    const handleUpload = () => {
        if (!newMaterial.subject || !newMaterial.title) return;

        const material = {
            id: `mat_${Date.now()}`,
            subject: newMaterial.subject,
            title: newMaterial.title,
            fileType: "PDF",
            fileUrl: "/materials/new-upload.pdf",
            uploadedBy: {
                id: CURRENT_TEACHER_ID,
                name: "Ustadh Ahmed",
            },
            uploadedAt: new Date().toISOString().split("T")[0],
        };

        setMaterials(prev => [material, ...prev]);
        setShowUpload(false);
        setNewMaterial({ subject: "", title: "", file: null });
    };

    /* ---------------- Delete Material ---------------- */
    const handleDelete = (id) => {
        setMaterials(prev => prev.filter(m => m.id !== id));
    };

    /* Group by subject */
    const grouped = materials.reduce((acc, item) => {
        acc[item.subject] = acc[item.subject] || [];
        acc[item.subject].push(item);
        return acc;
    }, {});

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-brand-navy">Study Materials</h2>
                    <p className="text-gray-500 font-medium mt-2">
                        Upload and manage subject-wise books & PDFs.
                    </p>
                </div>

                <button
                    onClick={() => setShowUpload(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-brand-navy transition-all"
                >
                    <FiPlus /> Upload Material
                </button>
            </div>

            {/* Materials */}
            <div className="space-y-10">
                {Object.keys(grouped).map(subject => (
                    <div key={subject}>
                        <h3 className="text-xl font-black text-brand-navy mb-4">
                            {subject}
                        </h3>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {grouped[subject].map(mat => {
                                const canEdit = mat.uploadedBy.id === CURRENT_TEACHER_ID;

                                return (
                                    <div
                                        key={mat.id}
                                        className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all flex flex-col"
                                    >
                                        <div className="flex justify-between items-start">
                                            <FiFileText className="text-brand-blue" size={22} />
                                            {canEdit && (
                                                <div className="flex gap-2">
                                                    <button className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100">
                                                        <FiEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(mat.id)}
                                                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <h4 className="text-lg font-bold text-brand-navy mt-4">
                                            {mat.title}
                                        </h4>

                                        <p className="text-xs text-gray-400 mt-1">
                                            Uploaded on {mat.uploadedAt}
                                        </p>

                                        <a
                                            href={mat.fileUrl}
                                            target="_blank"
                                            className="mt-auto flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 font-bold hover:bg-brand-light hover:text-brand-blue transition-all"
                                        >
                                            <FiFileText /> View / Download
                                        </a>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Modal */}
            {showUpload && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-3xl w-full max-w-md space-y-4">
                        <h3 className="text-xl font-black">Upload Study Material</h3>

                        <input
                            placeholder="Subject"
                            className="w-full p-3 border rounded-xl"
                            value={newMaterial.subject}
                            onChange={e => setNewMaterial({ ...newMaterial, subject: e.target.value })}
                        />

                        <input
                            placeholder="Material Title"
                            className="w-full p-3 border rounded-xl"
                            value={newMaterial.title}
                            onChange={e => setNewMaterial({ ...newMaterial, title: e.target.value })}
                        />

                        <input
                            type="file"
                            className="w-full p-3 border rounded-xl"
                        />

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setShowUpload(false)}
                                className="flex-1 py-3 rounded-xl bg-gray-100 font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                className="flex-1 py-3 rounded-xl bg-brand-blue text-white font-bold"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TeacherStudyMaterials;
import { useState, useMemo } from "react";
import { studentHomeworkData } from "../../../../assets/devAuth";
import {
    FiUpload, FiFileText, FiSearch, FiFilter,
    FiClock, FiCheckCircle, FiAlertCircle, FiChevronRight, FiX
} from "react-icons/fi";

const StudentHomework = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All");
    const [activeTab, setActiveTab] = useState("all"); // 'all', 'pending', 'submitted'
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    // Flatten and categorize all homework
    const allHomework = useMemo(() => [
        ...studentHomeworkData.today.map(h => ({ ...h, category: "Today" })),
        ...studentHomeworkData.pending.map(h => ({ ...h, category: "Pending" })),
        ...studentHomeworkData.previous.map(h => ({ ...h, category: "Previous" })),
    ], []);

    const subjects = ["All", ...new Set(allHomework.map(h => h.subject))];

    // --- Filtering Logic ---
    const filteredHomework = useMemo(() => {
        return allHomework.filter(h => {
            const matchesSearch = h.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                h.subject.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSubject = selectedSubject === "All" || h.subject === selectedSubject;
            const matchesTab =
                activeTab === "all" ? true :
                    activeTab === "pending" ? h.status === "Not Submitted" :
                        h.status === "Submitted" || h.status === "Reviewed";

            return matchesSearch && matchesSubject && matchesTab;
        });
    }, [allHomework, searchTerm, selectedSubject, activeTab]);

    // Separate today's homework
    const todaysHomework = filteredHomework.filter(h => h.category === "Today");
    const otherHomework = filteredHomework.filter(h => h.category !== "Today");

    const totalPages = Math.ceil(otherHomework.length / ITEMS_PER_PAGE);
    const paginatedData = otherHomework.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const getStatusStyles = status => {
        switch (status) {
            case "Reviewed": return "bg-green-50 text-green-700 border-green-100";
            case "Submitted": return "bg-blue-50 text-blue-700 border-blue-100";
            default: return "bg-amber-50 text-amber-700 border-amber-100";
        }
    };

    const renderHomeworkCard = h => (
        <div key={h.id} className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-brand-light text-brand-blue text-[10px] font-black uppercase tracking-widest rounded-lg">{h.subject}</span>
                <span className={`px-3 py-1 rounded-full text-[9px] font-bold border ${getStatusStyles(h.status)}`}>{h.status.toUpperCase()}</span>
            </div>

            <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors line-clamp-2 min-h-[3.5rem]">{h.title}</h3>

            <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4 border-b border-gray-50 pb-2">
                    <div className="flex items-center gap-2">
                        <FiClock className="text-brand-blue" size={14} />
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tight">Due {h.deadline}</span>
                    </div>
                    <span className="text-[10px] font-medium text-gray-300">ID: #{String(h.id).slice(-4)}</span>
                </div>

                {(h.remark || h.reviewBy) && (
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-3 border-r border-gray-200 pr-2 space-y-4">
                                <p className="text-[9px] font-black text-gray-400 uppercase leading-none">Remark</p>
                            </div>
                            <div className="col-span-9 pl-1 space-y-3">
                                <p className="text-xs text-brand-navy font-medium leading-relaxed italic">
                                    {h.remark ? `"${h.remark}"` : "No remarks provided."}
                                </p>
                                {h.reviewBy && (
                                    <div className="flex items-center gap-2 pt-1">
                                        <div className="w-5 h-5 rounded-full bg-brand-navy text-white flex items-center justify-center text-[8px] font-bold">{h.reviewBy.charAt(0)}</div>
                                        <span className="text-xs font-bold text-brand-blue">{h.reviewBy}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between gap-4">
                {h.status === "Not Submitted" ? (
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-navy text-white rounded-xl text-xs font-bold hover:bg-brand-blue transition-all shadow-lg shadow-brand-navy/10 active:scale-95">
                        <FiUpload /> Upload Work
                    </button>
                ) : (
                    <a href={h.submission} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-brand-navy rounded-xl text-xs font-bold hover:bg-brand-light hover:text-brand-blue transition-all active:scale-95">
                        <FiFileText /> View My Work
                    </a>
                )}
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors">
                    <FiChevronRight />
                </button>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 pb-20 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* --- HEADER --- */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-brand-blue rounded-full"></span>
                        <span className="text-brand-blue font-bold text-xs uppercase tracking-widest">Academic Tasks</span>
                    </div>
                    <h2 className="text-4xl font-black text-brand-navy">Homework Desk</h2>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-gray-100 p-1 rounded-2xl">
                    {['all', 'pending', 'submitted'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all capitalize ${activeTab === tab ? "bg-white text-brand-navy shadow-sm" : "text-gray-500 hover:text-brand-navy"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            {/* --- FILTER TOOLBAR --- */}
            <div className="bg-white p-4 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by topic or subject..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-blue/20 text-sm font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-1 rounded-2xl border border-transparent focus-within:border-brand-blue/20">
                        <FiFilter className="text-brand-blue" />
                        <select
                            className="bg-transparent border-none py-3 text-xs font-bold text-brand-navy focus:ring-0 outline-none cursor-pointer"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                        </select>
                    </div>

                    {(searchTerm || selectedSubject !== "All" || activeTab !== 'all') && (
                        <button
                            onClick={() => { setSearchTerm(""); setSelectedSubject("All"); setActiveTab("all"); }}
                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                        >
                            <FiX />
                        </button>
                    )}
                </div>
            </div>

            {/* --- Today's Homework --- */}
            {todaysHomework.length > 0 && (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-brand-navy">Today's Homework</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {todaysHomework.map(renderHomeworkCard)}
                    </div>
                </div>
            )}

            {/* --- Other Homework --- */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-brand-navy">{activeTab === 'all' ? "Other Homework" : "Filtered Homework"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedData.length > 0 ? paginatedData.map(renderHomeworkCard) : (
                        <div className="col-span-full py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400">
                            <FiAlertCircle size={48} className="mb-4 opacity-20" />
                            <p className="font-bold">No assignments found</p>
                            <p className="text-sm">Try changing your filters or checking other tabs.</p>
                        </div>
                    )}
                </div>

                {/* --- Pagination --- */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-10">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${currentPage === i + 1
                                    ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/20"
                                    : "bg-white border border-gray-100 text-gray-400 hover:text-brand-blue hover:border-brand-blue"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentHomework;
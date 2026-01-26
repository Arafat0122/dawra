import { useState, useMemo } from "react";
import { FiVideo, FiFileText, FiClock, FiPlayCircle, FiExternalLink, FiCalendar, FiChevronRight, FiSearch, FiFilter, FiChevronLeft, FiX, FiAlertCircle } from "react-icons/fi";
import { studentClassesData } from "../../../../assets/devAuth";

const StudentClasses = () => {
    const { today, previous } = studentClassesData;

    // --- State for Filtering & Pagination ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("All");
    const [selectedDate, setSelectedDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [dateError, setDateError] = useState(false);

    const TARGET_PER_PAGE = 8;

    // Extract unique dates from database for validation
    // Assuming cls.date is in a format your input can handle or compare
    const availableDates = useMemo(() => [...new Set(previous.map(cls => cls.date))], [previous]);

    // Helper to generate Rahmah Meet link
    const getMeetLink = (subject) => {
        const name = subject.replace(/\s+/g, '-').toLowerCase();
        return `https://meet.rahmahinstitute.com/${name}`;
    };

    // Handle Date Change with Validation
    const handleDateChange = (e) => {
        const val = e.target.value;
        if (!val) {
            setSelectedDate("");
            setDateError(false);
            return;
        }

        // Format validation: Check if the picked date exists in our 'availableDates' array
        // Note: You might need to format 'val' (YYYY-MM-DD) to match your data format (e.g., "12 Oct 2023")
        // For this example, we assume a direct match or simple conversion
        setSelectedDate(val);
        setCurrentPage(1);

        // Simple check to show a warning if no classes exist for that day
        const exists = previous.some(cls => cls.date.includes(val) || val.includes(cls.date));
        setDateError(!exists);
    };

    // --- Filter Logic ---
    const filteredPrevious = useMemo(() => {
        return previous.filter((cls) => {
            const matchesSearch =
                cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cls.className.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSubject = selectedSubject === "All" || cls.subject === selectedSubject;
            const matchesDate = !selectedDate || cls.date.includes(selectedDate) || selectedDate.includes(cls.date);
            return matchesSearch && matchesSubject && matchesDate;
        });
    }, [previous, searchTerm, selectedSubject, selectedDate]);

    // --- Pagination Logic (Group-Aware) ---
    const { paginatedGroups, totalPages } = useMemo(() => {
        const fullGroups = filteredPrevious.reduce((groups, cls) => {
            if (!groups[cls.date]) groups[cls.date] = [];
            groups[cls.date].push(cls);
            return groups;
        }, {});

        const dateKeys = Object.keys(fullGroups);
        const pages = [];
        let currentPageItems = {};
        let countInCurrentPage = 0;

        dateKeys.forEach((date) => {
            const itemsInDate = fullGroups[date];
            if (countInCurrentPage >= TARGET_PER_PAGE) {
                pages.push(currentPageItems);
                currentPageItems = {};
                countInCurrentPage = 0;
            }
            currentPageItems[date] = itemsInDate;
            countInCurrentPage += itemsInDate.length;
        });

        if (Object.keys(currentPageItems).length > 0) pages.push(currentPageItems);

        return {
            paginatedGroups: pages[currentPage - 1] || {},
            totalPages: pages.length
        };
    }, [filteredPrevious, currentPage]);

    const subjects = ["All", ...new Set(previous.map(cls => cls.subject))];

    return (
        <div className="max-w-7xl mx-auto space-y-16 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 px-4">

            {/* --- SECTION: TODAY'S LIVE --- */}
            <section>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-center md:text-left">
                    <div>
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <span className="w-10 h-1 bg-brand-blue rounded-full"></span>
                            <span className="text-brand-blue font-bold text-xs uppercase tracking-widest">Active Session</span>
                        </div>
                        <h2 className="text-4xl font-heading font-bold text-brand-navy">Today's Lectures</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {today.map((cls, idx) => (
                        <div key={idx} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col md:flex-row border-l-4 border-l-brand-blue">
                            <div className="p-8 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 bg-brand-light text-brand-blue rounded-lg text-[10px] font-bold uppercase tracking-wider">{cls.subject}</span>
                                        {cls.classType === "Live" && (
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-600 animate-pulse">
                                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span> LIVE
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold text-brand-navy mb-4 group-hover:text-brand-blue transition-colors leading-snug">{cls.className}</h3>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-center gap-2 text-sm text-gray-500"><FiClock className="text-brand-blue" /> <span className="font-semibold">{cls.time}</span></div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500"><div className="w-5 h-5 rounded-full bg-brand-navy/10 flex items-center justify-center text-[10px] font-bold text-brand-navy">T</div> <span className="font-bold">{cls.teacher}</span></div>
                                    </div>
                                </div>
                                <a href={cls.classType === "Live" ? getMeetLink(cls.subject) : "#"} target="_blank" className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold transition-all ${cls.classType === "Live" ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30 hover:bg-brand-navy" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
                                    {cls.classType === "Live" ? <><FiExternalLink /> Join Virtual Classroom</> : "Class Scheduled"}
                                </a>
                            </div>
                            <div className="relative w-full md:w-40 h-48 md:h-auto bg-gray-900 overflow-hidden">
                                <img src={`https://rahmahinstitute.com/ARABIC-01.jpg`} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="Preview" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- ARCHIVE TOOLBAR --- */}
            <section className="space-y-8">
                <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col xl:flex-row gap-4 items-center">
                    <div className="relative w-full xl:flex-1">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search lessons..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-blue/20 text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap items-center gap-3 w-full xl:w-auto">
                        {/* Subject Filter */}
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-1 rounded-2xl flex-1 md:flex-none">
                            <FiFilter className="text-brand-blue" />
                            <select
                                className="bg-transparent border-none py-3 text-xs font-bold text-brand-navy focus:ring-0 outline-none cursor-pointer"
                                value={selectedSubject}
                                onChange={(e) => { setSelectedSubject(e.target.value); setCurrentPage(1); }}
                            >
                                {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                        </div>

                        {/* Calendar Input Filter */}
                        <div className={`flex items-center gap-2 bg-gray-50 px-4 py-1 rounded-2xl flex-1 md:flex-none border-2 transition-colors ${dateError ? 'border-red-200 bg-red-50' : 'border-transparent'}`}>
                            <FiCalendar className={dateError ? 'text-red-500' : 'text-brand-blue'} />
                            <input
                                type="date"
                                className="bg-transparent border-none py-2 text-xs font-bold text-brand-navy focus:ring-0 outline-none cursor-pointer uppercase"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </div>

                        {/* Reset */}
                        {(searchTerm || selectedSubject !== "All" || selectedDate) && (
                            <button
                                onClick={() => { setSearchTerm(""); setSelectedSubject("All"); setSelectedDate(""); setCurrentPage(1); setDateError(false); }}
                                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                            >
                                <FiX />
                            </button>
                        )}
                    </div>
                </div>

                {/* Warning if date has no classes */}
                {dateError && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-2xl text-sm font-bold animate-pulse">
                        <FiAlertCircle /> No recordings found for this specific date. Showing closest matches if available.
                    </div>
                )}

                {/* --- ARCHIVE LIST --- */}
                <div className="space-y-16 min-h-[450px]">
                    {Object.keys(paginatedGroups).length > 0 ? (
                        Object.keys(paginatedGroups).map((date) => (
                            <div key={date} className="flex flex-col lg:flex-row gap-10">
                                {/* --- DATE SIDEBAR --- */}
                                <div className="lg:w-32 shrink-0">
                                    <div className="lg:sticky lg:top-24 flex lg:flex-col items-baseline lg:items-start gap-2 lg:gap-0">
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue/60">{date.split('-')[0]}</p>
                                        <p className="text-2xl font-black text-brand-navy leading-none">
                                            {new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                        </p>
                                        <div className="hidden lg:block h-1 w-8 bg-brand-blue mt-4 rounded-full"></div>
                                    </div>
                                </div>

                                {/* --- CLASSES GRID --- */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {paginatedGroups[date].map((cls, idx) => (
                                        <div key={idx} className="flex flex-col bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-300 group overflow-hidden">

                                            {/* Top Section: Header */}
                                            <div className="p-8 pb-4">
                                                <div className="flex justify-between items-start mb-6">
                                                    <span className="px-3 py-1 bg-brand-light text-brand-blue text-[10px] font-bold uppercase tracking-wider rounded-lg">
                                                        {cls.subject}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        {cls.books?.length > 0 && (
                                                            <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                                                                <FiFileText size={12} /> {cls.books.length}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <h4 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors mb-3 leading-tight min-h-[3.5rem]">
                                                    {cls.className}
                                                </h4>

                                                <div className="flex items-center gap-2 mb-6 text-sm">
                                                    <div className="w-6 h-6 rounded-full bg-brand-navy text-white flex items-center justify-center text-[10px] font-bold">
                                                        {cls.teacher.charAt(0)}
                                                    </div>
                                                    <span className="font-semibold text-brand-navy/70 uppercase text-[11px] tracking-wide">
                                                        {cls.teacher}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Middle Section: Notes (Better Readability) */}
                                            <div className="px-8 mb-6">
                                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100/50">
                                                    <p className="text-xs text-gray-500 italic leading-relaxed line-clamp-2">
                                                        <span className="font-bold text-gray-400 not-italic mr-1">Notes:</span>
                                                        {cls.notes || "No additional notes provided for this lesson."}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Bottom Section: Actions */}
                                            <div className="mt-auto p-6 pt-0 flex gap-3">
                                                <a
                                                    href={cls.video}
                                                    target="_blank"
                                                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-brand-navy text-white rounded-2xl text-xs font-bold hover:bg-brand-blue transition-all shadow-lg shadow-brand-navy/10 active:scale-95"
                                                >
                                                    <FiPlayCircle size={16} /> Watch Lesson
                                                </a>

                                                {cls.books?.length > 0 && (
                                                    <button
                                                        className="w-14 h-14 flex items-center justify-center bg-gray-100 text-gray-600 rounded-2xl hover:bg-brand-light hover:text-brand-blue transition-all active:scale-95"
                                                        title="Download Resources"
                                                    >
                                                        <FiFileText size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6">
                                <FiSearch size={32} className="text-gray-300" />
                            </div>
                            <p className="text-lg font-bold text-brand-navy">No Lectures Found</p>
                            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or date range.</p>
                        </div>
                    )}
                </div>

                {/* --- PAGINATION --- */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 pt-12 border-t border-gray-100">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 hover:bg-brand-blue hover:text-white disabled:opacity-20 transition-all shadow-sm"
                        >
                            <FiChevronLeft size={20} />
                        </button>

                        <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setCurrentPage(i + 1); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
                                    className={`w-12 h-12 rounded-2xl font-bold text-sm transition-all ${currentPage === i + 1 ? 'bg-brand-navy text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-400 hover:border-brand-blue/30 hover:text-brand-blue'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 500, behavior: 'smooth' }); }}
                            className="w-12 h-12 flex items-center justify-center rounded-2xl border border-gray-100 hover:bg-brand-blue hover:text-white disabled:opacity-20 transition-all shadow-sm"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default StudentClasses;
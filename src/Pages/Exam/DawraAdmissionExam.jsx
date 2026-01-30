import { useState, useEffect, useCallback } from "react";
import { FiClock, FiAlertCircle, FiCheckCircle, FiChevronRight, FiChevronLeft, FiSend } from "react-icons/fi";
import questions from "../../assets/questions";

const DawraAdmissionExam = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(questions.length * 60); // 1 minute per question
    const [isWarning, setIsWarning] = useState(false);

    // Auto-submit when time is up
    const handleSubmit = useCallback(() => {
        setSubmitted(true);
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, handleSubmit]);

    // Format time MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleSelect = (index) => {
        if (submitted) return;
        setAnswers({ ...answers, [currentQuestion]: index });
    };

    const calculateScore = () => {
        let score = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) score++;
        });
        return score;
    };

    if (submitted) {
        const score = calculateScore();
        const percentage = (score / questions.length) * 100;
        const isPassed = percentage >= 60;

        return (
            <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-12 px-6">
                <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-10 text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isPassed ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}>
                        {isPassed ? <FiCheckCircle size={40} /> : <FiAlertCircle size={40} />}
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">نتائج اختبار القبول</h2>
                    <p className="text-slate-500 mb-8 font-serif">Admission Results for Dawra-e-Hadith</p>

                    <div className="bg-slate-50 rounded-3xl p-8 mb-8 border border-slate-100">
                        <div className="text-5xl font-black text-slate-900 mb-2">{score} / {questions.length}</div>
                        <p className="text-sm uppercase tracking-widest font-bold text-slate-400">Final Score</p>
                    </div>

                    <div className={`text-lg font-bold mb-8 ${isPassed ? "text-emerald-600" : "text-rose-600"}`}>
                        {isPassed ? " ناجح مبدئيًا - Initial Acceptance Confirmed" : "❌ نعتذر، لم يتم القبول - Not Accepted"}
                    </div>

                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const q = questions[currentQuestion];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* --- EXAM HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="bg-sky-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-lg shadow-sky-200">
                            {currentQuestion + 1}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Dawra Admission Test</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Questions: {currentQuestion + 1} of {questions.length}</p>
                        </div>
                    </div>

                    <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-mono font-bold text-lg border-2 ${timeLeft < 60 ? "bg-rose-50 border-rose-200 text-rose-600 animate-pulse" : "bg-slate-50 border-slate-100 text-slate-700"}`}>
                        <FiClock /> {formatTime(timeLeft)}
                    </div>
                </div>

                {/* --- QUESTION CARD --- */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-100">
                        <div
                            className="h-full bg-sky-600 transition-all duration-500"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Question Text (RTL for Arabic) */}
                        <p className="text-2xl md:text-3xl font-serif text-slate-900 leading-relaxed mb-10 text-right dir-rtl">
                            {q.question}
                        </p>

                        {/* Options Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {q.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelect(index)}
                                    className={`p-6 rounded-2xl border-2 text-right font-serif text-lg transition-all duration-200 flex items-center justify-between group ${answers[currentQuestion] === index
                                            ? "border-sky-600 bg-sky-50/50 text-sky-900 shadow-md shadow-sky-100"
                                            : "border-slate-100 hover:border-sky-200 text-slate-600 hover:bg-slate-50"
                                        }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${answers[currentQuestion] === index ? "border-sky-600 bg-sky-600" : "border-slate-200"
                                        }`}>
                                        {answers[currentQuestion] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                    <span className="flex-1 pr-4">{option}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- NAVIGATION FOOTER --- */}
                    <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-between items-center">
                        <button
                            onClick={() => setCurrentQuestion(prev => prev - 1)}
                            disabled={currentQuestion === 0}
                            className="flex items-center gap-2 px-6 py-3 font-bold text-slate-400 hover:text-slate-900 disabled:opacity-0 transition-all uppercase text-xs tracking-widest"
                        >
                            <FiChevronLeft size={18} /> Previous
                        </button>

                        {currentQuestion === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                            >
                                <FiSend /> Finish Exam
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQuestion(prev => prev + 1)}
                                className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-sky-600 transition-all shadow-lg"
                            >
                                Next Question <FiChevronRight size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Warning Note */}
                <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                    <FiAlertCircle className="text-amber-500" /> Do not refresh or close this tab. Your progress will be lost.
                </div>
            </div>
        </div>
    );
};

export default DawraAdmissionExam;
import { useRef, useState } from "react";
import { studentFeeData } from "../../../../assets/devAuth";
import { FiDownload, FiCheckCircle, FiClock, FiCreditCard, FiPrinter, FiAlertCircle } from "react-icons/fi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import StudentPay from "./StudentPay";

const StudentPayments = () => {
    const { admission, monthly } = studentFeeData;
    const reportRef = useRef();
    const [payModal, setPayModal] = useState({ open: false, month: "", amount: 0 });

    const pendingCount = monthly.filter(m => m.status !== "Paid").length;
    const totalPending = monthly.filter(m => m.status !== "Paid").reduce((acc, curr) => acc + curr.amount, 0);

    const openPayModal = (month, amount) => setPayModal({ open: true, month, amount });
    const closePayModal = () => setPayModal({ open: false, month: "", amount: 0 });

    const downloadPDF = async () => {
        const element = reportRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Statement_${new Date().toLocaleDateString()}.pdf`);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Action Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-brand-navy">Finance Center</h2>
                    <p className="text-gray-500 text-sm font-medium">View history and settle outstanding dues</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button onClick={downloadPDF} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-50 text-brand-navy px-5 py-3 rounded-2xl font-bold border border-gray-200 hover:bg-gray-100 transition-all">
                        <FiPrinter /> Print
                    </button>
                    <button onClick={downloadPDF} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-brand-blue/20 hover:scale-105 transition-all">
                        <FiDownload /> Statement
                    </button>
                </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brand-navy p-6 rounded-[2rem] text-white">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-tighter">Total Pending</p>
                    <h3 className="text-3xl font-heading font-bold mt-1">{totalPending} BDT</h3>
                    <p className="text-brand-blue text-xs mt-2 font-medium flex items-center gap-1">
                        <FiAlertCircle /> {pendingCount} Months outstanding
                    </p>
                </div>
                {/* Add more summary cards if needed */}
            </div>

            {/* Report Content */}
            <div ref={reportRef} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 md:p-12 space-y-10">

                    {/* Admission Record */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Initial Enrollment</h3>
                        <div className="flex items-center justify-between p-6 bg-brand-light rounded-2xl border border-brand-blue/10">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white rounded-xl shadow-sm text-brand-blue">
                                    <FiCreditCard size={24} />
                                </div>
                                <div>
                                    <p className="text-brand-navy font-bold">Admission Fee</p>
                                    <p className="text-xs text-gray-500">{admission.paymentDate || 'Not yet paid'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-brand-navy">{admission.amount} BDT</p>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded ${admission.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {admission.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Monthly Ledger */}
                    <section>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Monthly Ledger</h3>
                        <div className="overflow-hidden border border-gray-50 rounded-2xl">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr className="text-gray-400 text-[11px] uppercase font-bold">
                                        <th className="px-6 py-4 tracking-tighter">Billing Cycle</th>
                                        <th className="px-6 py-4 tracking-tighter">Status</th>
                                        <th className="px-6 py-4 tracking-tighter">Amount</th>
                                        <th className="px-6 py-4 text-right tracking-tighter">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {monthly.map((m) => (
                                        <tr key={m.month} className="group hover:bg-brand-light/30 transition-colors">
                                            <td className="px-6 py-5">
                                                <p className="font-bold text-brand-navy">{m.month}</p>
                                                <p className="text-[10px] text-gray-400">{m.paymentDate || 'No record'}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${m.status === "Paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                                                    }`}>
                                                    {m.status === "Paid" ? <FiCheckCircle /> : <FiClock />}
                                                    {m.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 font-bold text-brand-navy">{m.amount} BDT</td>
                                            <td className="px-6 py-5 text-right">
                                                {m.status !== "Paid" && (
                                                    <button
                                                        onClick={() => openPayModal(m.month, m.amount)}
                                                        className="bg-brand-navy text-white text-xs px-4 py-2 rounded-lg font-bold hover:bg-brand-blue hover:shadow-lg transition-all"
                                                    >
                                                        Pay Now
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>

            {/* Modal Overlay */}
            {payModal.open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md" onClick={closePayModal}></div>
                    <StudentPay month={payModal.month} amount={payModal.amount} onClose={closePayModal} />
                </div>
            )}
        </div>
    );
};

export default StudentPayments;
import { FiBookOpen, FiClock, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiUsers, FiEdit3, FiDollarSign, FiLayers, FiUserCheck } from "react-icons/fi";
import { devAuth } from "../../../assets/devAuth";

// --- REUSABLE COMPONENTS ---

const StatCard = ({ icon: Icon, label, value, colorClass }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${colorClass}`}>
                <Icon size={24} />
            </div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active</span>
        </div>
        <h3 className="text-2xl font-heading font-bold text-brand-navy">{value}</h3>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
    </div>
);

const WelcomeHero = ({ name, role }) => (
    <div className="relative overflow-hidden bg-brand-navy rounded-[2rem] p-8 md:p-12 mb-8 text-white">
        <div className="relative z-10">
            <span className="bg-brand-blue/20 text-brand-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-blue/30">
                {role} Portal
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mt-4 mb-2">
                Marhaban, {name}!
            </h1>
            <p className="text-white/60 max-w-md leading-relaxed">
                Ready to continue your journey of knowledge? You have <span className="text-brand-blue font-bold">3 tasks</span> requiring your attention today.
            </p>
        </div>
        {/* Abstract Background Decoration */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-brand-blue/5 rounded-full blur-2xl"></div>
    </div>
);

// --- ROLE-BASED DASHBOARDS ---

const StudentDashboard = () => (
    <div className="animate-in fade-in duration-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={FiBookOpen} label="Enrolled Courses" value="01" colorClass="bg-blue-50 text-brand-blue" />
            <StatCard icon={FiClock} label="Attendance" value="92%" colorClass="bg-purple-50 text-purple-600" />
            <StatCard icon={FiCheckCircle} label="Completed Lessons" value="28" colorClass="bg-green-50 text-green-600" />
            <StatCard icon={FiAlertCircle} label="Pending Tasks" value="03" colorClass="bg-orange-50 text-orange-600" />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-4">Recent Progress</h3>
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl text-gray-400">
                    Progress Chart Component Goes Here
                </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-lg font-heading font-bold text-brand-navy mb-4">Quick Links</h3>
                <div className="space-y-3">
                    {['Class Schedule', 'Library Access', 'Support Desk'].map(link => (
                        <button key={link} className="w-full text-left p-3 rounded-xl hover:bg-brand-light text-brand-navy font-semibold text-sm transition-colors border border-transparent hover:border-brand-blue/20">
                            {link}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const TeacherDashboard = () => (
    <div className="animate-in fade-in duration-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={FiUsers} label="Total Students" value="156" colorClass="bg-blue-50 text-brand-blue" />
            <StatCard icon={FiBookOpen} label="Classes Today" value="03" colorClass="bg-brand-navy text-white" />
            <StatCard icon={FiTrendingUp} label="Avg. Grade" value="A-" colorClass="bg-green-50 text-green-600" />
            <StatCard icon={FiEdit3} label="Unmarked Exams" value="12" colorClass="bg-red-50 text-red-600" />
        </div>
    </div>
);

const AdminDashboard = () => (
    <div className="animate-in fade-in duration-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={FiUsers} label="Total Users" value="1,204" colorClass="bg-brand-navy text-white" />
            <StatCard icon={FiDollarSign} label="Monthly Revenue" value="45k BDT" colorClass="bg-green-50 text-green-600" />
            <StatCard icon={FiLayers} label="Active Batches" value="08" colorClass="bg-blue-50 text-brand-blue" />
            <StatCard icon={FiUserCheck} label="Teacher Requests" value="05" colorClass="bg-orange-50 text-orange-600" />
        </div>
    </div>
);

// --- MAIN HOME COMPONENT ---

const DashboardHome = () => {
    const { user } = devAuth;

    return (
        <div className="max-w-7xl mx-auto">
            <WelcomeHero name={user.name} role={user.role} />

            <section className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-heading font-bold text-brand-navy">Overview Statistics</h2>
                <button className="text-brand-blue text-sm font-bold hover:underline">Download Report</button>
            </section>

            {user.role === "student" && <StudentDashboard />}
            {user.role === "teacher" && <TeacherDashboard />}
            {user.role === "admin" && <AdminDashboard />}
        </div>
    );
};

export default DashboardHome;
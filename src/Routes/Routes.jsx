import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Layout from "../Layout/Layout";
import Error from "../Common/Error/Error";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import DawraStudentRegistration from "../Pages/DawraStudentRegistration/DawraStudentRegistration";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import StudentPayments from "../Pages/Dashboard/Student/StudentPayments/StudentPayments";
import StudentClasses from "../Pages/Dashboard/Student/StudentClasses/StudentClasses";
import StudentHomework from "../Pages/Dashboard/Student/StudentHomework/StudentHomework";
import StudentTeachers from "../Pages/Dashboard/Student/StudentTeachers/StudentTeachers";
import StudentExams from "../Pages/Dashboard/Student/StudentExams/StudentExams";
import StudentStudyMaterials from "../Pages/Dashboard/Student/StudentStudyMaterials/StudentStudyMaterials";
import TeacherClassManagement from "../Pages/Dashboard/Teacher/TeacherClassManagement/TeacherClassManagement";
import TeacherStudyMaterials from "../Pages/Dashboard/Teacher/TeacherStudyMaterials/TeacherStudyMaterials";
import TeacherExamSystem from "../Pages/Dashboard/Teacher/TeacherExamSystem/TeacherExamSystem";
import TeacherHomeworkManagement from "../Pages/Dashboard/Teacher/TeacherHomeworkManagement/TeacherHomeworkManagement";
import TeacherStudents from "../Pages/Dashboard/Teacher/TeacherStudents/TeacherStudents";
import TeachersPage from "../Pages/TeachersPage/TeachersPage";
import PrivateRoute from "./PrivateRoutes";
import Login from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration/Registration";
import VerifyEmail from "./VerifyEmail";
import DawraAdmin from "../Pages/Dashboard/Admin/DawraAdmin/DawraAdmin";
import EnrolledRoute from "./EnrolledRoute";
import BlockedUser from "../Common/BlockedUser/BlockedUser";
import DawraAdmissionExam from "../Pages/Exam/DawraAdmissionExam";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <ScrollToTop />
            <Layout />
        </>,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/teachers",
                element: <TeachersPage />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/apply",
                element: <PrivateRoute><DawraStudentRegistration /></PrivateRoute>
            },
            // Login

            {
                path: "/login",
                element: <Login />
            },

            // Register

            {
                path: "/register",
                element: <Registration />
            },
        ]
    },
    {
        path: "/verify-email",
        element: <VerifyEmail />
    },
    {
        path: "/block-user",
        element: <BlockedUser />
    },
    {
        path: "/exam",
        element: <DawraAdmissionExam />
    },
    {
        path: "/dashboard",
        element: <>
            <ScrollToTop />
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        </>,
        children: [
            {
                index: true, // default page
                element: <DashboardHome /> // role-based landing page
            },
            // Student Dashboard
            {
                path: "payments",
                element: <EnrolledRoute><StudentPayments /></EnrolledRoute>
            },
            {
                path: "classes",
                element: <StudentClasses />
            },
            {
                path: "homework",
                element: <StudentHomework />
            },
            {
                path: "my-teachers",
                element: <StudentTeachers />
            },
            {
                path: "exams",
                element: <StudentExams />
            },
            {
                path: "books",
                element: <StudentStudyMaterials />
            },

            // Teacher
            {
                path: "class-management",
                element: <TeacherClassManagement />
            },
            {
                path: "books-management",
                element: <TeacherStudyMaterials />
            },
            {
                path: "manage-exams",
                element: <TeacherExamSystem />
            },
            {
                path: "homework-management",
                element: <TeacherHomeworkManagement />
            },
            {
                path: "my-students",
                element: <TeacherStudents />
            },

            // Admin
            {
                path: "admin-enrollments",
                element: <DawraAdmin />
            },
        ]
    }
])
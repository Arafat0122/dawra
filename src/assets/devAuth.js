export const devAuth = {
    isLoggedIn: true,
    user: {
        name: "Arafat",
        email: "arafat@gmail.com",
        role: "student", // student | teacher | admin
    },
    dawra: {
        enrolled: true,
    },
};

// dummy data for student fees
export const studentFeeData = {
    admission: {
        amount: 1400,
        status: "Paid",
        paymentDate: "2026-01-10",
    },
    monthly: [
        { month: "January", amount: 1000, status: "Paid", paymentDate: "2026-01-05" },
        { month: "February", amount: 1000, status: "Unpaid", paymentDate: null },
        { month: "March", amount: 1000, status: "Unpaid", paymentDate: null },
    ],
};

// Class data Stu
export const studentClassesData = {
    today: [
        {
            subject: "Tafsir",
            className: "Surah Al-Baqarah 1-20",
            teacher: "Ustadh Ahmed",
            time: "10:00 AM - 11:00 AM",
            classType: "Live",
            notes: "Focus on meanings and Tafsir details",
            books: ["Tafsir Notes.pdf"],
            video: null,
        },
        {
            subject: "Fiqh",
            className: "Wudu & Salah",
            teacher: "Ustadh Salman",
            time: "02:00 PM - 03:00 PM",
            classType: "Recorded",
            notes: "Practical steps of Wudu and Salah",
            books: ["Fiqh Essentials.pdf"],
            video: "https://www.example.com/videos/fiqh-recorded.mp4",
        },
    ],

    previous: [
        { date: "2026-01-18", subject: "Aqeedah", className: "Tawheed Lesson", teacher: "Ustadh Farhan", notes: "Understanding the Oneness of Allah", books: ["Aqeedah Notes.pdf"], video: "https://www.example.com/videos/aqeedah1.mp4" },
        { date: "2026-01-18", subject: "Hadith", className: "Sahih Bukhari 1-10", teacher: "Ustadh Hassan", notes: "First 10 Hadith explanations", books: ["Hadith Notes.pdf"], video: "https://www.example.com/videos/hadith1.mp4" },
        { date: "2026-01-18", subject: "Seerah", className: "Life of Prophet ﷺ in Makkah", teacher: "Ustadh Khalid", notes: "Early life and Prophethood", books: ["Seerah Notes.pdf"], video: "https://www.example.com/videos/seerah1.mp4" },
        { date: "2026-01-18", subject: "Fiqh", className: "Fasting Rules", teacher: "Ustadh Salman", notes: "How to fast correctly", books: ["Fiqh Fasting.pdf"], video: "https://www.example.com/videos/fiqh2.mp4" },
        { date: "2026-01-17", subject: "Tafsir", className: "Surah Al-Imran 1-50", teacher: "Ustadh Ahmed", notes: "Verses 1-50 explained", books: ["Tafsir Notes.pdf"], video: "https://www.example.com/videos/tafsir2.mp4" },
        { date: "2026-01-17", subject: "Aqeedah", className: "Attributes of Allah", teacher: "Ustadh Farhan", notes: "Names and attributes explained", books: ["Aqeedah Notes.pdf"], video: "https://www.example.com/videos/aqeedah2.mp4" },
        { date: "2026-01-17", subject: "Hadith", className: "Sahih Muslim 1-10", teacher: "Ustadh Hassan", notes: "Understanding Hadith meanings", books: ["Hadith Notes.pdf"], video: "https://www.example.com/videos/hadith2.mp4" },
        { date: "2026-01-17", subject: "Seerah", className: "Migration to Madinah", teacher: "Ustadh Khalid", notes: "Hijrah and lessons", books: ["Seerah Notes.pdf"], video: "https://www.example.com/videos/seerah2.mp4" },
        { date: "2026-01-17", subject: "Fiqh", className: "Zakat Basics", teacher: "Ustadh Salman", notes: "Zakat calculation and rules", books: ["Fiqh Notes.pdf"], video: "https://www.example.com/videos/fiqh3.mp4" },
        { date: "2026-01-16", subject: "Tafsir", className: "Surah An-Nisa 1-25", teacher: "Ustadh Ahmed", notes: "Verses 1-25 explained", books: ["Tafsir Notes.pdf"], video: "https://www.example.com/videos/tafsir3.mp4" },
        { date: "2026-01-16", subject: "Aqeedah", className: "Rukyah and Belief", teacher: "Ustadh Farhan", notes: "Belief and spiritual protection", books: ["Aqeedah Notes.pdf"], video: "https://www.example.com/videos/aqeedah3.mp4" },
        { date: "2026-01-16", subject: "Hadith", className: "Riyad-us-Saliheen 1-10", teacher: "Ustadh Hassan", notes: "Hadith study and understanding", books: ["Hadith Notes.pdf"], video: "https://www.example.com/videos/hadith3.mp4" },
        { date: "2026-01-16", subject: "Seerah", className: "Battles of Badr & Uhud", teacher: "Ustadh Khalid", notes: "Military lessons and strategy", books: ["Seerah Notes.pdf"], video: "https://www.example.com/videos/seerah3.mp4" },
        { date: "2026-01-15", subject: "Fiqh", className: "Hajj Essentials", teacher: "Ustadh Salman", notes: "Pilgrimage rules and steps", books: ["Fiqh Hajj.pdf"], video: "https://www.example.com/videos/fiqh4.mp4" },
        { date: "2026-01-15", subject: "Tafsir", className: "Surah Al-Maidah 1-25", teacher: "Ustadh Ahmed", notes: "Verses 1-25 explained", books: ["Tafsir Notes.pdf"], video: "https://www.example.com/videos/tafsir4.mp4" },
        { date: "2026-01-15", subject: "Aqeedah", className: "Belief in Angels", teacher: "Ustadh Farhan", notes: "Importance of angels", books: ["Aqeedah Notes.pdf"], video: "https://www.example.com/videos/aqeedah4.mp4" },
        { date: "2026-01-15", subject: "Hadith", className: "Sahih Bukhari 11-20", teacher: "Ustadh Hassan", notes: "Next 10 Hadith explanation", books: ["Hadith Notes.pdf"], video: "https://www.example.com/videos/hadith4.mp4" },
        { date: "2026-01-14", subject: "Seerah", className: "Conquest of Makkah", teacher: "Ustadh Khalid", notes: "Events and lessons", books: ["Seerah Notes.pdf"], video: "https://www.example.com/videos/seerah4.mp4" },
        { date: "2025-01-14", subject: "Fiqh", className: "Marriage Rules", teacher: "Ustadh Salman", notes: "Nikah and related rulings", books: ["Fiqh Notes.pdf"], video: "https://www.example.com/videos/fiqh5.mp4" },
        { date: "2025-01-14", subject: "Tafsir", className: "Surah Al-An’am 1-25", teacher: "Ustadh Ahmed", notes: "Verses 1-25 explained", books: ["Tafsir Notes.pdf"], video: "https://www.example.com/videos/tafsir5.mp4" },
        { date: "2025-01-14", subject: "Aqeedah", className: "Prophethood", teacher: "Ustadh Farhan", notes: "Understanding Prophets", books: ["Aqeedah Notes.pdf"], video: "https://www.example.com/videos/aqeedah5.mp4" },
        { date: "2025-01-14", subject: "Hadith", className: "Sahih Muslim 11-20", teacher: "Ustadh Hassan", notes: "Hadith understanding", books: ["Hadith Notes.pdf"], video: "https://www.example.com/videos/hadith5.mp4" },
        { date: "2025-01-13", subject: "Seerah", className: "Life in Madinah", teacher: "Ustadh Khalid", notes: "Social life and lessons", books: ["Seerah Notes.pdf"], video: "https://www.example.com/videos/seerah5.mp4" },
        { date: "2025-01-13", subject: "Fiqh", className: "Inheritance Rules", teacher: "Ustadh Salman", notes: "Detailed rules of inheritance", books: ["Fiqh Notes.pdf"], video: "https://www.example.com/videos/fiqh6.mp4" },
        { date: "2025-01-13", subject: "Tafsir", className: "Surah Al-A’raf 1-25", teacher: "Ustadh Ahmed", notes: "Verses 1-25 explained", books: ["Tafsir Notes.pdf"], video: "https://www.example.com/videos/tafsir6.mp4" },
        { date: "2025-01-13", subject: "Aqeedah", className: "Day of Judgment", teacher: "Ustadh Farhan", notes: "Belief in Akhirah", books: ["Aqeedah Notes.pdf"], video: "https://www.example.com/videos/aqeedah6.mp4" },
        { date: "2025-01-13", subject: "Hadith", className: "Riyad-us-Saliheen 11-20", teacher: "Ustadh Hassan", notes: "Hadith explanations", books: ["Hadith Notes.pdf"], video: "https://www.example.com/videos/hadith6.mp4" },
        { date: "2025-01-12", subject: "Seerah", className: "Battle of Khandaq", teacher: "Ustadh Khalid", notes: "Historical context and lessons", books: ["Seerah Notes.pdf"], video: "https://www.example.com/videos/seerah6.mp4" },
        { date: "2025-01-12", subject: "Fiqh", className: "Business Transactions", teacher: "Ustadh Salman", notes: "Rules of trade in Islam", books: ["Fiqh Notes.pdf"], video: "https://www.example.com/videos/fiqh7.mp4" },
        { date: "2025-01-12", subject: "Tafsir", className: "Surah Yunus 1-25", teacher: "Ustadh Ahmed", notes: "Verses 1-25 explained", books: ["Tafsir Notes.pdf"], video: "https://www.example.com/videos/tafsir7.mp4" },
        { date: "2025-01-12", subject: "Aqeedah", className: "Faith & Belief", teacher: "Ustadh Farhan", notes: "Understanding iman", books: ["Aqeedah Notes.pdf"], video: "https://www.example.com/videos/aqeedah7.mp4" },
        { date: "2025-01-12", subject: "Hadith", className: "Sahih Bukhari 21-30", teacher: "Ustadh Hassan", notes: "Next 10 Hadith", books: ["Hadith Notes.pdf"], video: "https://www.example.com/videos/hadith7.mp4" },
        { date: "2025-01-11", subject: "Seerah", className: "Conquest of Khaybar", teacher: "Ustadh Khalid", notes: "Lessons from battle", books: ["Seerah Notes.pdf"], video: "https://www.example.com/videos/seerah7.mp4" },
        { date: "2025-01-11", subject: "Fiqh", className: "Halal & Haram", teacher: "Ustadh Salman", notes: "Understanding lawful actions", books: ["Fiqh Notes.pdf"], video: "https://www.example.com/videos/fiqh8.mp4" },
        { date: "2025-01-11", subject: "Tafsir", className: "Surah Hud 1-25", teacher: "Ustadh Ahmed", notes: "Verses 1-25 explained", books: ["Tafsir Notes.pdf"], video: "https://www.example.com/videos/tafsir8.mp4" },
        { date: "2025-01-11", subject: "Aqeedah", className: "Belief in Prophets", teacher: "Ustadh Farhan", notes: "Prophets’ roles", books: ["Aqeedah Notes.pdf"], video: "https://www.example.com/videos/aqeedah8.mp4" },
        { date: "2025-01-11", subject: "Hadith", className: "Sahih Muslim 21-30", teacher: "Ustadh Hassan", notes: "Hadith explanation", books: ["Hadith Notes.pdf"], video: "https://www.example.com/videos/hadith8.mp4" },
        { date: "2025-01-10", subject: "Seerah", className: "Life in Madinah 2", teacher: "Ustadh Khalid", notes: "Daily life lessons", books: ["Seerah Notes.pdf"], video: "https://www.example.com/videos/seerah8.mp4" },
        { date: "2025-01-10", subject: "Fiqh", className: "Contracts & Agreements", teacher: "Ustadh Salman", notes: "Business law in Islam", books: ["Fiqh Notes.pdf"], video: "https://www.example.com/videos/fiqh9.mp4" },
        { date: "2025-01-10", subject: "Tafsir", className: "Surah Yusuf 1-25", teacher: "Ustadh Ahmed", notes: "Verses 1-25 explained", books: ["Tafsir Notes.pdf"], video: "https://www.example.com/videos/tafsir9.mp4" },
        { date: "2025-01-10", subject: "Aqeedah", className: "Belief in Qadr", teacher: "Ustadh Farhan", notes: "Understanding Qadr", books: ["Aqeedah Notes.pdf"], video: "https://www.example.com/videos/aqeedah9.mp4" },
        { date: "2025-01-10", subject: "Hadith", className: "Riyad-us-Saliheen 21-30", teacher: "Ustadh Hassan", notes: "Hadith study", books: ["Hadith Notes.pdf"], video: "https://www.example.com/videos/hadith9.mp4" },
        { date: "2025-01-09", subject: "Seerah", className: "Treaty of Hudaybiyyah", teacher: "Ustadh Khalid", notes: "Peace and lessons", books: ["Seerah Notes.pdf"], video: "https://www.example.com/videos/seerah9.mp4" },
        { date: "2025-01-09", subject: "Fiqh", className: "Pen & Witness Rules", teacher: "Ustadh Salman", notes: "Legal rulings", books: ["Fiqh Notes.pdf"], video: "https://www.example.com/videos/fiqh10.mp4" },
    ],
};

// Class data Tea
export const teacherClassesFromStudentData = {
    today: studentClassesData.today.map((cls, index) => ({
        id: `cls_today_${index}`,
        ...cls,
        date: "2026-01-21",
        status: "Upcoming",
        uploads: {
            video: null,
            notes: null,
        },
        canUpload: true,
    })),

    previous: studentClassesData.previous.map((cls, index) => ({
        id: `cls_prev_${index}`,
        ...cls,
        status: "Completed",
        canUpload: false,
    })),
};

// Homework data
export const studentHomeworkData = {
    today: [
        {
            id: 1,
            subject: "Tafsir",
            title: "Surah Al-Baqarah 1-10 Tafsir Exercise",
            deadline: "2026-01-21",
            status: "Not Submitted",
            submission: null,
            remark: null,
            reviewBy: null,
        },
        {
            id: 2,
            subject: "Fiqh",
            title: "Wudu Stepwise Submission",
            deadline: "2026-01-21",
            status: "Submitted",
            submission: null,
            remark: null,
            reviewBy: null,
        },
        {
            id: 3,
            subject: "Hadith",
            title: "Sahih Bukhari 1-5 Explanation",
            deadline: "2026-01-21",
            status: "Reviewed",
            submission: "uploads/hadith_homework.docx",
            remark: "Excellent work",
            reviewBy: "Ustadh Hassan",
        },
    ],
    previous: [
        {
            id: 4,
            subject: "Seerah",
            title: "Migration to Madinah Notes",
            deadline: "2026-01-19",
            status: "Reviewed",
            submission: "uploads/seerah_migration.pdf",
            remark: "Well done",
            reviewBy: "Ustadh Ahmed",
        },
        {
            id: 5,
            subject: "Aqeedah",
            title: "Tawheed Assignment",
            deadline: "2026-01-18",
            status: "Submitted",
            submission: "uploads/tawheed.pdf",
            remark: null,
            reviewBy: null,
        },
        {
            id: 6,
            subject: "Fiqh",
            title: "Zakat Calculation Worksheet",
            deadline: "2026-01-17",
            status: "Not Submitted",
            submission: null,
            remark: null,
            reviewBy: null,
        },
        {
            id: 7,
            subject: "Hadith",
            title: "Riyad-us-Saliheen 1-10",
            deadline: "2026-01-16",
            status: "Reviewed",
            submission: "uploads/hadith_1-10.pdf",
            remark: "Good understanding",
            reviewBy: "Ustadh Hassan",
        },
    ],
    pending: [
        {
            id: 8,
            subject: "Tafsir",
            title: "Surah Al-Imran 1-10 Tafsir",
            deadline: "2026-01-22",
            status: "Not Submitted",
            submission: null,
            remark: null,
            reviewBy: null,
        },
        {
            id: 9,
            subject: "Seerah",
            title: "Battle of Badr Summary",
            deadline: "2026-01-23",
            status: "Not Submitted",
            submission: null,
            remark: null,
            reviewBy: null,
        },
        {
            id: 10,
            subject: "Fiqh",
            title: "Prayer Rules Exercise",
            deadline: "2026-01-23",
            status: "Not Submitted",
            submission: null,
            remark: null,
            reviewBy: null,
        },
    ],
};

// Teacher data
export const assignedTeachersData = [
    {
        _id: "640f1a2b3c4d5e6f7g8h9i0j", // MongoDB style ID
        userId: "stu123",
        name: "Ustadh Ahmed",
        subject: "Tafsir",
        designation: "Senior Instructor",
        image: "https://i.ibb.co/5PMQktx/IMG-20241216-WA0035.jpg",
        feedback: "Excellent guidance on Quranic interpretation.",
        email: "ahmed@rahmahinstitute.com",
        phone: "+880 1700 123456"
    },
    {
        _id: "640f1a2b3c4d5e6f7g8h9i1k",
        userId: "stu123",
        name: "Ustadh Salman",
        subject: "Fiqh",
        designation: "Instructor",
        image: "https://i.ibb.co/bgbJbJfp/Whats-App-Image-2025-03-11-at-21-51-59-0e8b93e4.jpg",
        feedback: "Very clear explanation of Islamic jurisprudence.",
        email: "salman@rahmahinstitute.com",
        phone: "+880 1700 654321"
    },
    {
        _id: "640f1a2b3c4d5e6f7g8h9i2l",
        userId: "stu123",
        name: "Ustadh Farhan",
        subject: "Aqeedah",
        designation: "Instructor",
        image: "https://i.ibb.co/NnQ9fxqy/ei-1749462859973-removebg-preview.png",
        feedback: "Strong focus on understanding Tawheed principles.",
        email: "farhan@rahmahinstitute.com",
        phone: "+880 1700 987654"
    },
    {
        _id: "640f1a2b3c4d5e6f7g8h9i3m",
        userId: "stu123",
        name: "Ustadh Hassan",
        subject: "Hadith",
        designation: "Senior Instructor",
        image: "https://i.ibb.co/Z6twSPQ7/inbound8495120911780935217.png",
        feedback: "Excellent explanation of Hadith books and principles.",
        email: "hassan@rahmahinstitute.com",
        phone: "+880 1700 112233"
    },
    {
        _id: "640f1a2b3c4d5e6f7g8h9i4n",
        userId: "stu123",
        name: "Ustadh Kamal",
        subject: "Seerah",
        designation: "Instructor",
        image: "https://i.ibb.co/ynLT5Xvq/inbound4864819156292845412.jpg",
        feedback: "Insightful historical references and storytelling.",
        email: "kamal@rahmahinstitute.com",
        phone: "+880 1700 445566"
    },
];

// Exam data
export const studentExamsData = {
    upcoming: [
        {
            id: "ex001",
            subject: "Tafsir",
            examName: "Surah Al-Baqarah Midterm",
            startTime: "2026-01-25 10:00",
            endTime: "2026-01-25 11:00",
            status: "Upcoming",
            marks: null,
            resultStatus: null,
            teacherRemark: null,
        },
        {
            id: "ex002",
            subject: "Fiqh",
            examName: "Wudu & Salah Quiz",
            startTime: "2026-01-26 14:00",
            endTime: "2026-01-26 15:00",
            status: "Upcoming",
            marks: null,
            resultStatus: null,
            teacherRemark: null,
        },
    ],
    active: [
        {
            id: "ex003",
            subject: "Hadith",
            examName: "Sahih Bukhari 1-10 Test",
            startTime: "2026-01-21 10:00",
            endTime: "2026-01-21 11:00",
            status: "Active",
            marks: null,
            resultStatus: null,
            teacherRemark: null,
        },
        {
            id: "ex004",
            subject: "Aqeedah",
            examName: "Tawheed Principles Quiz",
            startTime: "2026-01-21 14:00",
            endTime: "2026-01-21 15:00",
            status: "Active",
            marks: null,
            resultStatus: null,
            teacherRemark: null,
        },
    ],
    previous: [
        {
            id: "ex005",
            subject: "Seerah",
            examName: "Prophet’s Biography Midterm",
            startTime: "2026-01-18 10:00",
            endTime: "2026-01-18 11:00",
            status: "Completed",
            marks: 85,
            resultStatus: "Pass",
            teacherRemark: "Good understanding of key events",
        },
        {
            id: "ex006",
            subject: "Fiqh",
            examName: "Zakat & Fasting Test",
            startTime: "2026-01-17 14:00",
            endTime: "2026-01-17 15:00",
            status: "Completed",
            marks: 65,
            resultStatus: "Pass",
            teacherRemark: "Need to revise Wudu steps",
        },
        {
            id: "ex007",
            subject: "Tafsir",
            examName: "Surah Al-Imran Quiz",
            startTime: "2026-01-16 10:00",
            endTime: "2026-01-16 11:00",
            status: "Completed",
            marks: 45,
            resultStatus: "Fail",
            teacherRemark: "Review ayah meanings carefully",
        },
    ],
};

// Books
export const studentStudyMaterials = [
    {
        subject: "Tafsir",
        materials: [
            {
                id: "mat001",
                title: "Surah Al-Baqarah Notes",
                type: "PDF",
                file: "uploads/tafsir_baqarah.pdf",
                uploadedBy: "Ustadh Ahmed",
                uploadDate: "2026-01-15",
            },
            {
                id: "mat002",
                title: "Tafsir Workbook",
                type: "PDF",
                file: "uploads/tafsir_workbook.pdf",
                uploadedBy: "Ustadh Ahmed",
                uploadDate: "2026-01-18",
            },
        ],
    },
    {
        subject: "Fiqh",
        materials: [
            {
                id: "mat003",
                title: "Wudu Stepwise Guide",
                type: "PDF",
                file: "uploads/fiqh_wudu.pdf",
                uploadedBy: "Ustadh Salman",
                uploadDate: "2026-01-10",
            },
            {
                id: "mat004",
                title: "Salah Rules Handbook",
                type: "PDF",
                file: "uploads/fiqh_salah.pdf",
                uploadedBy: "Ustadh Salman",
                uploadDate: "2026-01-12",
            },
        ],
    },
    {
        subject: "Hadith",
        materials: [
            {
                id: "mat005",
                title: "Sahih Bukhari 1-10 Notes",
                type: "PDF",
                file: "uploads/hadith_1-10.pdf",
                uploadedBy: "Ustadh Hassan",
                uploadDate: "2026-01-08",
            },
            {
                id: "mat006",
                title: "Riyad-us-Saliheen Summary",
                type: "PDF",
                file: "uploads/riyad_saliheen.pdf",
                uploadedBy: "Ustadh Hassan",
                uploadDate: "2026-01-11",
            },
        ],
    },
];

export const teacherStudyMaterialsData = [
    {
        id: "mat001",
        subject: "Tafsir",
        title: "Surah Al-Baqarah Tafsir Notes",
        fileType: "PDF",
        fileUrl: "/materials/tafsir_baqarah.pdf",
        uploadedBy: {
            id: "tch001",
            name: "Ustadh Ahmed",
        },
        uploadedAt: "2026-01-15",
    },
    {
        id: "mat002",
        subject: "Fiqh",
        title: "Wudu & Salah Guide",
        fileType: "PDF",
        fileUrl: "/materials/fiqh_wudu.pdf",
        uploadedBy: {
            id: "tch001",
            name: "Ustadh Ahmed",
        },
        uploadedAt: "2026-01-16",
    },
    {
        id: "mat003",
        subject: "Aqeedah",
        title: "Tawheed Fundamentals",
        fileType: "PDF",
        fileUrl: "/materials/tawheed.pdf",
        uploadedBy: {
            id: "tch002",
            name: "Ustadh Farhan",
        },
        uploadedAt: "2026-01-14",
    },
];
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const avatarUrl = "https://static.vecteezy.com/system/resources/previews/046/656/564/non_2x/women-hijab-icon-beautiful-muslim-girl-avatar-free-vector.jpg";

const testimonials = [
    { name: "Aisha B.", text: "This course has transformed my life spiritually and intellectually!" },
    { name: "Fatima S.", text: "The teachers are amazing and the schedule is easy to follow from home." },
    { name: "Maryam K.", text: "I feel connected to my faith more than ever with Rahmah Institute." },
    { name: "Zainab L.", text: "The online format allows me to study while keeping my pardah intact." },
    { name: "Hafsa N.", text: "Support from teachers and parents is excellent throughout the course." },
    { name: "Khadijah R.", text: "The mock tests prepare me well for exams and boost my confidence." },
    { name: "Sumayya H.", text: "I love the access to PDFs and constant teacher support 24/7!" },
    { name: "Noor F.", text: "This institute has the best scholars from top Islamic universities." },
];

const TestimonialSection = () => {
    // Duplicate for infinite effect
    const firstRow = testimonials.slice(0, 4);
    const secondRow = testimonials.slice(4, 8);

    return (
        <section className="bg-white py-24 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-10 left-10 w-64 h-64 bg-sky-100 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-50 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
                        Voices of Our <span className="text-sky-600 font-serif italic">Sisters.</span>
                    </h2>
                    <p className="text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
                        Join a community of dedicated students who have found their spiritual 
                        home at Rahmah Institute.
                    </p>
                </div>

                {/* Marquee Container */}
                <div className="flex flex-col gap-6 mask-gradient">
                    {/* Row 1: Left to Right */}
                    <MarqueeRow items={firstRow} direction={-40} />
                    
                    {/* Row 2: Right to Left */}
                    <MarqueeRow items={secondRow} direction={40} reverse />
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-slate-200">
                        <FaStar className="text-yellow-400" />
                        <span>Trusted by 500+ Students Globally</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

const MarqueeRow = ({ items, direction, reverse = false }) => {
    return (
        <div className="flex overflow-hidden group">
            <motion.div 
                animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="flex gap-6 whitespace-nowrap"
            >
                {/* Double the items to make it seamless */}
                {[...items, ...items].map((item, idx) => (
                    <TestimonialCard key={idx} item={item} />
                ))}
            </motion.div>
        </div>
    );
};

const TestimonialCard = ({ item }) => (
    <div className="w-[350px] md:w-[450px] bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] flex flex-col justify-between shrink-0 hover:border-sky-200 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-sky-100/50">
        <div>
            <div className="flex gap-1 text-yellow-400 mb-4 text-xs">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="text-slate-700 font-medium italic leading-relaxed whitespace-normal mb-8">
                “{item.text}”
            </p>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="relative">
                <img 
                    src={avatarUrl} 
                    alt={item.name} 
                    className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover" 
                />
                <div className="absolute -top-1 -right-1 bg-sky-500 text-white p-1 rounded-full text-[8px]">
                    <FaQuoteLeft />
                </div>
            </div>
            <div>
                <h4 className="text-slate-900 font-black text-sm uppercase tracking-tight">{item.name}</h4>
                <p className="text-sky-600 text-[10px] font-bold uppercase tracking-widest">Verified Student</p>
            </div>
        </div>
    </div>
);

export default TestimonialSection;
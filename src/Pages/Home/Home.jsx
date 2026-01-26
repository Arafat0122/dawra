import WhatsappButton from "../../Common/WhatsappButton/WhatsappButton";
import CourseOverviewSection from "./CourseOverviewSection/CourseOverviewSection";
import DawraRoutineSection from "./DawraRoutineSection/DawraRoutineSection";
import GirlsStudySection from "./GirlsStudySection/GirlsStudySection";
import Hero from "./Hero/Hero";
import Teachers from "./Teachers/Teachers";
import TestimonialSlider from "./TestimonialSlider/TestimonialSlider";
import WhyUsSection from "./WhyUsSection/WhyUsSection";


const Home = () => {
    return (
        <div>
            <WhatsappButton />
            <Hero />
            <Teachers />
            <WhyUsSection />
            <GirlsStudySection />
            <CourseOverviewSection />
            <DawraRoutineSection />
            <TestimonialSlider />
        </div>
    );
};

export default Home;
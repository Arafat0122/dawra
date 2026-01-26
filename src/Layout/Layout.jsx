import { Outlet } from "react-router-dom";
import Navbar from "../Common/Navbar/Navbar";
import Footer from "../Common/Footer/Footer";


const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-12">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
// BlankLayout.jsx
import { Outlet } from "react-router-dom";

const BlankLayout = () => {
    return (
        <div className="relative min-h-screen">
            <Outlet />
        </div>
    );
};

export default BlankLayout;
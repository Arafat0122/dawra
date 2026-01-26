import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://www.redseareisen.com/fomibun/2022/01/the-mosque-madrasa-of-sultan-hassan-at-sunset-cairo-citadel-egypt.jpg)",
                }}
            >
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-[#cde6f0] text-center">
                    <div className="max-w-md">
                        <h1 className="text-9xl font-extrabold mb-4">404</h1>
                        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                        <p className="mb-6 text-lg">
                            The page you&apos;re looking for doesn&apos;t seem to exist. It might have been moved, or the URL might be incorrect.
                        </p>
                        <Link to="/">
                            <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
                                Return Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
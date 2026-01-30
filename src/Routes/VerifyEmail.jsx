import { useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { FiMail, FiRefreshCcw, FiSend } from 'react-icons/fi';
import { AuthContext } from '../Provider/AuthProvider';
import Loader from '../Common/Loader/Loader';

const VerifyEmail = () => {
    const { user, resendVerificationEmail } = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [checking, setChecking] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [initialCheckDone, setInitialCheckDone] = useState(false);
    const location = useLocation();

    // On mount, reload user and check verification status
    useEffect(() => {
        async function checkVerification() {
            if (user) {
                try {
                    await user.reload(); // refresh user data from Firebase
                    if (user.emailVerified) {
                        setRedirect(true); // redirect if verified
                    } else {
                        setInitialCheckDone(true); // allow rendering the verify UI
                    }
                } catch {
                    // Handle error if needed, but still show verify UI
                    setInitialCheckDone(true);
                }
            }
        }
        checkVerification();
    }, [user]);

    const handleResend = async () => {
        try {
            const result = await resendVerificationEmail();

            if (result?.success) {
                setMessage('✅ Verification email sent! Please check your inbox.');
            } else if (result?.error?.includes('too-many-requests')) {
                setMessage('⚠️ Too many attempts. Please wait a while and check your inbox. The email might have already been sent.');
            } else if (result?.error?.includes('network-request-failed')) {
                setMessage('❌ Network error. Please check your internet connection and try again.');
            } else {
                setMessage(result?.error || '❌ Failed to send verification email.');
            }

        } catch (err) {
            if (err.message.includes('too-many-requests')) {
                setMessage('⚠️ Too many attempts. Please wait and check your inbox.');
            } else if (err.message.includes('network-request-failed')) {
                setMessage('❌ Network error. Please check your connection.');
            } else {
                setMessage('❌ Something went wrong while sending the email.');
            }
        }
    };

    const handleCheckAgain = async () => {
        setChecking(true);
        await user.reload();
        if (user.emailVerified) {
            setRedirect(true);
        } else {
            setMessage('⚠️ Email not verified yet.');
        }
        setChecking(false);
    };

    const handleCheckAndRedirect = async () => {
        setChecking(true);
        await user.reload();
        if (user.emailVerified) {
            setRedirect(true);
        } else {
            setMessage('⚠️ Email not verified yet.');
        }
        setChecking(false);
    };

    // Wait for initial check before rendering UI
    if (!initialCheckDone) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-100 via-cyan-100 to-blue-100"><Loader /></div>
        );
    }

    if (redirect) {
        const redirectTo = location.state?.from?.pathname || "/";
        return <Navigate to={redirectTo} replace />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-cyan-100 to-blue-100 flex items-center justify-center px-6 py-12 text-gray-800">
            <div className="bg-white rounded-xl p-10 max-w-md w-full shadow-md border border-green-200">
                <div className="text-center mb-8">
                    <FiMail className="mx-auto text-5xl text-green-500 mb-4" />
                    <h1 className="text-3xl font-semibold tracking-wide mb-3 text-green-700 font-sans">
                        Verify Your Email
                    </h1>
                    <p className="text-green-600 text-base leading-relaxed max-w-xs mx-auto">
                        A verification link has been sent to{' '}
                        <span className="font-semibold underline decoration-green-400 decoration-2">
                            {user?.email}
                        </span>
                        . Please check your inbox and follow the instructions.
                    </p>

                    <p className="mt-6 max-w-xs mx-auto text-sm text-red-600 font-semibold">
                        If you don’t verify your email, some features will be restricted.
                    </p>
                    <p
                        className={`mt-1 max-w-xs mx-auto text-sm font-semibold cursor-pointer hover:underline ${checking ? 'text-gray-400 cursor-wait' : 'text-green-700'
                            }`}
                        onClick={() => !checking && handleCheckAndRedirect()}
                    >
                        After verifying, click here to go home.
                    </p>

                    {message && (
                        <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleResend}
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 rounded-md transition"
                    >
                        <FiSend className="text-xl" />
                        Resend Verification Email
                    </button>

                    <button
                        onClick={handleCheckAgain}
                        disabled={checking}
                        className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white font-semibold py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiRefreshCcw className={`text-xl ${checking ? 'animate-spin' : ''}`} />
                        {checking ? 'Checking...' : 'Check Again'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
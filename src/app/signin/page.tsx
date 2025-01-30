import React from 'react';
import SignInForm from "@/components/auth/SignInForm";

const SignIn = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Welcome Back
                </h2>
                <SignInForm/>
            </div>
        </div>
    );
};

export default SignIn;
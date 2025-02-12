import React from 'react';
import SignInForm from "@/components/auth/SignInForm";

const SignIn = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-secondary to-white">
            <div className="bg-primary p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-3xl font-bold text-center text-secondary mb-6">
                    Welcome Back
                </h2>
                <SignInForm/>
            </div>
        </div>
    );
};

export default SignIn;
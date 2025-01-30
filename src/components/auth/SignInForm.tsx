"use client";

import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {signIn} from "@/actions/auth/signIn";


const SignInForm = () => {

    const [authError, setAuthError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters long')
                .required('Password is required')

        }),
        onSubmit: async (values) => {
            const {email, password} = values;

            setAuthError(null);
            setLoading(true);

            const {error} = await signIn({email, password});

            if (error) {
                setLoading(false);
                setAuthError(error);
                return;
            }

            setLoading(false);
            router.push('/dashboard');
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                    Email Address
                </label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className="text-white"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
            </div>
            {
                formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm mb-4">
                        {formik.errors.email}
                    </div>
                ) : null
            }

            <div className="mb-5">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                >
                    Password
                </label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="text-white"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

            </div>

            {
                formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm mb-4">
                        {formik.errors.password}
                    </div>
                ) : null
            }

            {authError && (
                <div className="mb-4 text-red-500 text-center text-sm">
                    {authError}
                </div>
            )}

            <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-accent focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-center transition-colors"
                disabled={loading || formik.isSubmitting}
            >
                {
                    loading || formik.isSubmitting ? (
                            "Loading..."
                        ) :
                        "Login"
                }
            </Button>

        </form>
    );
};

export default SignInForm;
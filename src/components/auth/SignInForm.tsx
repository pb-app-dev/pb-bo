"use client";
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import OtpValidationInput from "@/components/auth/OTPValidationInput";
import useOtpRequest from "@/hooks/auth/useOtpRequest";
import useVerifyOtp from "@/hooks/auth/useVerifyOtp";
import {VerifyOtpResponse} from "@/types/auth/verifyOtpResponse";
import {setCookie} from "cookies-next";


const SignInForm = () => {

    const {isPending, mutateAsync} = useOtpRequest();
    const {isPending: loading, mutateAsync: mutateVerifyOtp} = useVerifyOtp();
    const [showOtp, setShowOtp] = useState<boolean>(false);
    const [authError, setAuthError] = useState<string | null>(null);
    const router = useRouter();


    const phoneFormik = useFormik({
        initialValues: {
            phone: ''
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .matches(/^\+\d{10,15}$/, "Enter a valid phone number with '+' prefix")
                .required("Phone number is required"),
        }),
        onSubmit: async (values) => {
            const {phone} = values;
            await mutateAsync(phone, {
                onSuccess: () => {
                    setShowOtp(true);
                },
                onError: () => {
                    setAuthError("Failed to send OTP");
                }
            })
        }
    })

    const otpFormik = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .matches(/^\d{6}$/, "Enter a valid OTP")
                .required("OTP is required"),
        }),
        onSubmit: async (values) => {
            const {otp} = values;

            await mutateVerifyOtp({
                phone: phoneFormik.values.phone,
                code: otp
            }, {
                onSuccess: (response: VerifyOtpResponse) => {
                    setCookie("token", response.token, {
                        secure: true,
                        sameSite: "strict",
                        maxAge: 60 * 60 * 24 * 7,
                    });
                    router.push("/dashboard");
                },
                onError: () => {
                    setAuthError("Invalid OTP");
                }
            })
        }
    });

    return (
        <>
            {
                !showOtp ?
                    <form
                        onSubmit={phoneFormik.handleSubmit}
                    >
                        <div className="mb-5">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-secondary mb-2"
                            >
                                Phone
                            </label>
                            <Input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="Enter your phone"
                                className="text-secondary"
                                value={phoneFormik.values.phone}
                                onChange={phoneFormik.handleChange}
                                onBlur={phoneFormik.handleBlur}
                            />

                            {
                                phoneFormik.touched.phone && phoneFormik.errors.phone ? (
                                    <div className="text-red-500 text-sm mb-4 mt-2">
                                        {phoneFormik.errors.phone}
                                    </div>
                                ) : null
                            }
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-secondary text-primary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary flex items-center justify-center transition-colors"
                            disabled={isPending}
                        >
                            {
                                isPending ? (
                                        "Loading..."
                                    ) :
                                    "Send OTP"
                            }
                        </Button>
                    </form> : null
            }

            {
                showOtp ?
                    <form onSubmit={otpFormik.handleSubmit}>

                        <div className="mb-5">
                            <label
                                htmlFor="otp"
                                className="block text-sm font-medium text-secondary mb-2"
                            >
                                Verification Code
                            </label>
                            <OtpValidationInput
                                name="otp"
                                value={otpFormik.values.otp}
                                onChange={(otp) => otpFormik.setFieldValue('otp', otp)}
                            />
                            {
                                otpFormik.touched.otp && otpFormik.errors.otp ? (
                                    <div className="text-red-500 text-sm mb-4 mt-2">
                                        {otpFormik.errors.otp}
                                    </div>
                                ) : null
                            }

                        </div>

                        {authError && (
                            <div className="mb-4 text-red-500 text-center text-sm">
                                {authError}
                            </div>
                        )}


                        <Button
                            type="submit"
                            className="w-full bg-secondary text-primary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary flex items-center justify-center transition-colors"
                            disabled={loading || otpFormik.isSubmitting}
                        >
                            {
                                loading || otpFormik.isSubmitting ? (
                                        "Loading..."
                                    ) :
                                    "Login"
                            }
                        </Button>
                    </form> : null
            }
        </>
    );
};

export default SignInForm;
import React from 'react';
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";


interface OtpValidationInputProps {
    name: string;
    value: string;
    onChange: (otp: string) => void;
}

const OtpValidationInput = ({name, value, onChange}: OtpValidationInputProps) => {
    return (
        <InputOTP
            id={name}
            name={name}
            maxLength={6}
            value={value}
            onChange={(value) => onChange(value)}
        >
            <InputOTPGroup className="w-full">
                <InputOTPSlot index={0} className="text-secondary w-full !ring-secondary"/>
                <InputOTPSlot index={1} className="text-secondary w-full !ring-secondary"/>
                <InputOTPSlot index={2} className="text-secondary w-full !ring-secondary"/>
            </InputOTPGroup>
            <InputOTPSeparator
                className="text-secondary"
            />
            <InputOTPGroup className="w-full">
                <InputOTPSlot index={3} className="text-secondary w-full !ring-secondary"/>
                <InputOTPSlot index={4} className="text-secondary w-full !ring-secondary"/>
                <InputOTPSlot index={5} className="text-secondary w-full !ring-secondary"/>
            </InputOTPGroup>
        </InputOTP>
    );
};

export default OtpValidationInput;
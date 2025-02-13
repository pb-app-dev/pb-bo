import React from 'react';
import Image from "next/image";
import {notificationBackgroundPatternDecorative, warningBackgroundPatternDecorative} from "../../public";

interface BackgroundPatternDecorativeProps {
    type?: "warning" | "notification";
}

const BackgroundPatternDecorative = ({
                                         type = "notification"
                                     }: BackgroundPatternDecorativeProps) => {
    return (
        <div className="absolute -top-[6.85rem] -left-[6.85rem] z-0">
            <Image
                src={type === "warning" ? warningBackgroundPatternDecorative : notificationBackgroundPatternDecorative}
                alt="background pattern decorative"
                className="object-center object-cover w-60"
            />
        </div>
    );
};

export default BackgroundPatternDecorative;
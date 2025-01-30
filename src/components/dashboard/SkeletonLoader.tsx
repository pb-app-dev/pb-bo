import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
    columns?: number;
}

const SkeletonLoader = ({columns = 6}: SkeletonLoaderProps) => {
    return (
        <div className="grid gap-2">
            {Array.from({length: 3}).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex gap-2 items-center justify-between"
                >
                    {Array.from({length: columns}).map((_, colIndex) => (
                        <Skeleton
                            key={colIndex}
                            className="h-10 w-full rounded bg-gray-200"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;

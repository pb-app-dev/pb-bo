import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: [
            "storage.googleapis.com",
            "firebasestorage.googleapis.com"
        ]
    }
};

export default nextConfig;

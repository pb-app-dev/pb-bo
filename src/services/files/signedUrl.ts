import axiosInstance from "@/services/axiosInstance";


interface SignedUrlResponse {
    url: string;
    filePath: string;
}

export interface SignedUrlPayload {
    mimeType: string;
    extension: string;
}

export const signedUrl = async (payload: SignedUrlPayload): Promise<SignedUrlResponse> => {
    try {
        const response = await axiosInstance.get<SignedUrlResponse>('/upload/signed-url', {
            params: {
                mime_type: payload.mimeType,
                extension: payload.extension,
            },
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
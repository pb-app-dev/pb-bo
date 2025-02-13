import axios from "axios";


export interface UploadFilePayload {
    file: File;
    url: string;
}

export const uploadFile = async (payload: UploadFilePayload): Promise<void> => {
    const {file, url} = payload;

    try {
        await axios.put(url, file, {
            headers: {
                "Content-Type": file.type || "application/octet-stream",
            },
        });
    } catch (error) {

        console.log("Error uploading file", error);

        return Promise.reject(error);
    }
}
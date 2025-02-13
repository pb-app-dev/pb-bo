import {useMutation} from "@tanstack/react-query";
import {uploadFile, UploadFilePayload} from "@/services/files/uploadFile";


const useUploadFile = () => {


    return useMutation({
        mutationKey: ["upload-file"],
        mutationFn: async (payload: UploadFilePayload) => await uploadFile(payload),
        retry: 0,
    })
}
export default useUploadFile
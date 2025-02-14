import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import BackgroundPatternDecorative from "@/components/BackgroundPatternDecorative";
import useDeclineUser from "@/hooks/user/useDeclineUser";


interface ValidateUserConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    revalidateState?: () => void;
}

const ValidateUserConfirmationDialog = ({
                                            isOpen,
                                            onClose,
                                            userId,
                                            revalidateState
                                        }: ValidateUserConfirmationDialogProps) => {
    const [validateError, setValidateError] = useState<string | null>(null);
    const {isPending, mutateAsync} = useDeclineUser();

    const handleDeclineCategory = async () => {
        if (!userId) return;
        await mutateAsync(userId)
            .then(async () => {
                if (revalidateState) {
                    revalidateState();
                }
                onClose();
            }).catch(error => {
                console.log("error", error);
                setValidateError("Failed to validate user");
            })
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="overflow-hidden">
                <DialogHeader className="relative">
                    <BackgroundPatternDecorative
                        type="notification"
                    />
                    <DialogTitle className="text-[#181D27] pt-10 z-10">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="text-[#535862] text-sm z-10">
                        This action will validate the user.
                    </DialogDescription>
                </DialogHeader>

                {
                    validateError ? (
                        <div className="text-red-500 text-sm mb-4">
                            {validateError}
                        </div>
                    ) : null
                }

                <div className="pt-8 flex gap-4">
                    <button
                        className="w-full rounded-lg border border-[#D5D7DA] py-2 px-3 bg-white text-sm text-[#414651] font-semibold h-max shadow shadow-[#0A0D120D]"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-full shadow-sm shadow-[#0A0D120D] bg-primary text-white py-2 px-3 rounded-lg text-sm disabled:opacity-50"
                        onClick={handleDeclineCategory}
                        disabled={isPending}
                    >
                        {
                            isPending ?
                                "Validating..." : "Validate"
                        }
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default ValidateUserConfirmationDialog;
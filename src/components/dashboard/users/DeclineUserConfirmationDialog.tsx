import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import BackgroundPatternDecorative from "@/components/BackgroundPatternDecorative";
import useDeclineUser from "@/hooks/user/useDeclineUser";


interface DeclineUserConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number | null;
    revalidateState?: () => void;
}

const DeclineUserConfirmationDialog = ({
                                           isOpen,
                                           onClose,
                                           userId,
                                           revalidateState
                                       }: DeclineUserConfirmationDialogProps) => {
    const [declineError, setDeclineError] = useState<string | null>(null);
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
                setDeclineError("Failed to decline user");
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
                        type="warning"
                    />
                    <DialogTitle className="text-[#181D27] pt-10 z-10">Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="text-[#535862] text-sm z-10">
                        This action will decline the user.
                    </DialogDescription>
                </DialogHeader>

                {
                    declineError ? (
                        <div className="text-red-500 text-sm mb-4">
                            {declineError}
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
                        className="w-full border border-red-500 shadow-sm shadow-[#0A0D120D] bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm disabled:opacity-50"
                        onClick={handleDeclineCategory}
                        disabled={isPending}
                    >
                        {
                            isPending ?
                                "Declining..." : "Decline"
                        }
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default DeclineUserConfirmationDialog;
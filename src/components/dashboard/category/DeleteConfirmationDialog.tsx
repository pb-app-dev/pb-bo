import React, {useState} from 'react';
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import BackgroundPatternDecorative from "@/components/BackgroundPatternDecorative";
import useDeleteCategory from "@/hooks/category/useDeleteCategory";
import {useQueryClient} from "@tanstack/react-query";


interface DeleteConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: number | null;
    currentPage: number;
}

const DeleteConfirmationDialog = ({isOpen, onClose, categoryId, currentPage}: DeleteConfirmationDialogProps) => {

    const queryClient = useQueryClient();
    const [deleteError, setDeleteError] = useState<string | null>(null);
    const {isPending, mutateAsync} = useDeleteCategory();


    const handleDeleteCategory = async () => {
        if (!categoryId) return;
        await mutateAsync(categoryId)
            .then(async () => {
                await queryClient.invalidateQueries({
                    queryKey: ['get-categories', currentPage],
                    type: 'all',
                    exact: true,
                });
                onClose();
            }).catch(error => {
                console.log("error", error);
                setDeleteError("Failed to delete category");
            })
    }

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
                        This action will delete the category permanently.
                    </DialogDescription>
                </DialogHeader>

                {
                    deleteError ? (
                        <div className="text-red-500 text-sm mb-4">
                            {deleteError}
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
                        onClick={handleDeleteCategory}
                        disabled={isPending}
                    >
                        {
                            isPending ?
                                "Deleting..." : "Delete"
                        }
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
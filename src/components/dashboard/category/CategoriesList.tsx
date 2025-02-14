"use client";

import React, {useState} from 'react';
import useGetCategories from "@/hooks/category/useGetCategories";
import Loader from "@/components/Loader";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import DeleteConfirmationDialog from "@/components/dashboard/category/DeleteConfirmationDialog";
import Image from "next/image";
import {Category} from "@/types/Category";
import UpdateCategoryDialog from "@/components/dashboard/category/UpdateCategoryDialog";

const CategoriesList = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const {isPending, data} = useGetCategories({
        page: currentPage
    });
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);


    const handleDeleteCategory = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        setIsDeleteDialogOpen(true);
    }

    const handleUpdateCategory = (category: Category) => {
        setSelectedCategory(category);
        setIsUpdateDialogOpen(true);
    }

    return (
        <>
            <DeleteConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                categoryId={selectedCategoryId}
            />

            <UpdateCategoryDialog
                isOpen={isUpdateDialogOpen}
                onClose={() => setIsUpdateDialogOpen(false)}
                category={selectedCategory}
            />

            <div className="h-full">
                {
                    isPending ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <Loader size="medium"/>
                            </div>
                        ) :
                        data && data.data.length > 0 ?
                            (
                                <div>

                                    <div className="rounded-md border overflow-x-auto">
                                        <Table className="w-full">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-1/4 text-start p-2.5">Name</TableHead>
                                                    <TableHead className="w-1/4 text-start p-2.5">Slug</TableHead>
                                                    <TableHead className="w-1/4 text-start p-2.5">Thumbnail</TableHead>
                                                    <TableHead className="w-1/4 text-start p-2.5">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {data.data.map((category, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="w-1/4 p-2.5">{category.name}</TableCell>
                                                        <TableCell className="w-1/4 p-2.5">{category.slug}</TableCell>
                                                        <TableCell
                                                            className="w-1/4 p-2.5">
                                                            {
                                                                category.thumbnail ? (
                                                                    <div
                                                                        className="rounded-lg border w-max overflow-hidden">
                                                                        <Image
                                                                            src={category.thumbnail}
                                                                            alt={category.name || "Category thumbnail"}
                                                                            width={200}
                                                                            height={200}
                                                                            className="object-cover object-center rounded-lg size-12"
                                                                        />
                                                                    </div>
                                                                ) : "-"
                                                            }
                                                        </TableCell>
                                                        <TableCell className="w-1/4 p-2.5">
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    className="bg-red-500 hover:bg-red-600"
                                                                    onClick={() => handleDeleteCategory(category.id)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button
                                                                    onClick={() => handleUpdateCategory(category)}
                                                                >
                                                                    Update
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="flex justify-end items-center gap-2 pt-6 pb-2.5">
                                        <Button
                                            className="disabled:opacity-50"
                                            disabled={data.meta.current_page === 1}
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            className="disabled:opacity-50"
                                            disabled={data.meta.current_page === data.meta.last_page}
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data.meta.last_page))}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full h-full flex justify-center items-center">
                                    <p>No services found</p>
                                </div>
                            )
                }
            </div>
        </>
    );
};

export default CategoriesList;
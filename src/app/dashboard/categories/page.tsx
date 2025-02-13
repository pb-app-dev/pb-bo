import React from 'react';
import Header from "@/components/dashboard/category/Header";
import CategoriesList from "@/components/dashboard/category/CategoriesList";

const Categories = () => {
    return (
        <div className="flex flex-col gap-6 h-full">
            <Header/>
            <hr/>
            <CategoriesList/>
        </div>
    );
};

export default Categories;
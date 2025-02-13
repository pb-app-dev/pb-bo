import React from 'react';

const Header = () => {
    return (
        <div className="flex flex-col gap-3 sticky top-0 bg-gray-100 z-10">
            <h1 className="font-medium text-lg">
                Users list
            </h1>
            <div className="flex gap-6">
                <label
                    htmlFor="isStore"
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <input
                        id="isStore"
                        name="isStore"
                        type="checkbox"
                        className="rounded-sm accent-primary"
                    />
                    Is store
                </label>

                <label
                    htmlFor="isCustomer"
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <input
                        id="isCustomer"
                        name="isCustomer"
                        type="checkbox"
                        className="rounded-sm accent-primary"
                    />
                    Is Customer
                </label>
            </div>
        </div>
    );
};

export default Header;
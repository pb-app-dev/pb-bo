import React, {Dispatch, SetStateAction} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {RiResetRightLine} from "react-icons/ri";


interface FiltersProps {
    isStore?: 0 | 1;
    setIsStore: Dispatch<SetStateAction<0 | 1 | undefined>>;
    isCustomer?: 0 | 1;
    setIsCustomer: Dispatch<SetStateAction<0 | 1 | undefined>>;
    status?: "pending" | "validated";
    setStatus: Dispatch<SetStateAction<"pending" | "validated" | undefined>>;
}

const Filters = ({isStore, setIsStore, setIsCustomer, isCustomer, status, setStatus}: FiltersProps) => {
    return (
        <div className="flex gap-6 pb-4 pt-1">
            <label
                htmlFor="isStore"
                className="flex items-center gap-2 cursor-pointer"
            >
                <input
                    id="isStore"
                    name="isStore"
                    type="checkbox"
                    className="rounded-sm accent-primary cursor-pointer"
                    checked={!!isStore}
                    value={isStore}
                    onChange={() => setIsStore(isStore === 1 ? 0 : 1)}
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
                    className="rounded-sm accent-primary cursor-pointer"
                    checked={!!isCustomer}
                    value={isCustomer}
                    onChange={() => setIsCustomer(isCustomer === 1 ? 0 : 1)}
                />
                Is Customer
            </label>

            <div className="w-max">
                <Select
                    name="status"
                    value={status ?? ""}
                    onValueChange={(value) => setStatus(value as "pending" | "validated" | undefined)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem
                                value="pending"
                            >
                                Pending
                            </SelectItem>
                            <SelectItem
                                value="validated"
                            >
                                Validated
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {
                (isStore !== undefined || isCustomer !== undefined || status !== undefined) &&
                <button
                    className="flex items-center gap-1 w-max text-red-500"
                    onClick={() => {
                        setIsStore(undefined);
                        setIsCustomer(undefined);
                        setStatus(undefined);
                    }}
                >
                    <RiResetRightLine/> Reset
                </button>
            }
        </div>
    );
};

export default Filters;
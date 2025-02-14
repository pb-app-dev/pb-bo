import React, {Dispatch, SetStateAction} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {RiResetRightLine} from "react-icons/ri";

interface FiltersProps {
    isStore?: 0 | 1;
    setIsStore: Dispatch<SetStateAction<0 | 1 | undefined>>;
    isCustomer?: 0 | 1;
    setIsCustomer: Dispatch<SetStateAction<0 | 1 | undefined>>;
    status?: "pending" | "validated";
    setStatus: Dispatch<SetStateAction<"pending" | "validated" | undefined>>;
    resetPage?: () => void;
}

const Filters = ({isStore, setIsStore, setIsCustomer, isCustomer, status, setStatus, resetPage}: FiltersProps) => {
    return (
        <div className="flex gap-6 pb-4 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="filter"
                    value="store"
                    className="accent-primary"
                    checked={isStore === 1}
                    onChange={() => {
                        setIsStore(1);
                        setIsCustomer(0);
                        setStatus("pending");
                        if (resetPage) {
                            resetPage();
                        }
                    }}
                />
                Is Store
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="filter"
                    value="customer"
                    className="accent-primary"
                    checked={isCustomer === 1}
                    onChange={() => {
                        setIsCustomer(1);
                        setIsStore(0);
                        if (resetPage) {
                            resetPage();
                        }
                    }}
                />
                Is Customer
            </label>

            <div className="w-max">
                <Select
                    name="status"
                    value={status ?? ""}
                    onValueChange={(value) => {
                        setStatus(value as "pending" | "validated" | undefined)
                        if (resetPage) {
                            resetPage();
                        }
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="validated">Validated</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {(isStore !== undefined || isCustomer !== undefined || status !== undefined) && (
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
            )}
        </div>
    );
};

export default Filters;
import { Status } from "@/types";

export const getStatusLabel = (status: Status) => {
    switch (status) {
    case Status.TO_BE_REVIEWED:
        return "Nog te reviewen";

    case Status.APPROVED:
        return "Goedgekeurd";

    case Status.REJECTED:
		    return "Afgekeurd";
    }
};

export const getStatusTagClasses = (status: Status) => {
    switch (status) {
    case Status.TO_BE_REVIEWED:
        return "text-gray-400 border-neutral-800 bg-gray-900";

    case Status.APPROVED:
        return "text-emerald-300 border-emerald-800 bg-emerald-950";

    case Status.REJECTED:
		    return "text-red-300 border-red-800 bg-red-950";

    default:
        return "text-gray-400 border-neutral-800 bg-gray-900";
    }
};

export const getStatusSelectClasses = (status: Status) => {
    switch (status) {
    case Status.TO_BE_REVIEWED:
        return "text-gray-400 border-neutral-800 bg-gray-900 hover:bg-gray-800 hover:text-gray-200";

    case Status.APPROVED:
        return "text-emerald-300 border-emerald-800 bg-emerald-950 hover:bg-emerald-900 hover:text-emerald-200";

    case Status.REJECTED:
		    return "text-red-300 border-red-800 bg-red-950 hover:bg-red-900 hover:text-red-200";

    default:
        return "text-gray-400 border-neutral-800 bg-gray-900 hover:bg-gray-800 hover:text-gray-200";
    }
};
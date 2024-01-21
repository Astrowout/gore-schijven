import clsx from "clsx";
import { memo } from "react";

import { TProposalCountProps } from "./ProposalCount.types";

export default memo(function ProposalCount ({
    className = "",
    count = 0,
    totalCount = 0,
}: TProposalCountProps) {
    return (
        <p className={clsx("lining-nums text-gray-500", className)}>
            <span className="text-sm text-gray-400">
                {count > totalCount ? totalCount : count}

                &nbsp;

                /

                &nbsp;

                {totalCount}
            </span>

            &nbsp;

            {totalCount === 1 ? "resultaat" : "resultaten"}
        </p>
    );
});
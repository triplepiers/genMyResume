import { SquarePlus } from "lucide-react";

export const SummaryHead = (props: { handleClick: any }) => {
    return (
        <div className="flex justify-between mb-5">
            <h2 className="text-xl font-bold">Summary</h2>
            <button onClick={props.handleClick} className="cursor-pointer text-[var(--blue)] hover:text-[var(--pink)] duration-200">
                <SquarePlus />
            </button>
        </div>
    )
}
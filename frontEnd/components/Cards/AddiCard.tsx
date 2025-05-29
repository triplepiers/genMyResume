import { Pencil, Trash2 } from "lucide-react"

export const AddiCard = (props: {
    uuid: string, data: string,
    handleEdit: any, handleDelete: any
}) => {
    const data = JSON.parse(props.data)

    return (
        <div data-id={props.uuid} className="border-1 rounded bg-[var(--background)] shadow-lg px-3 py-2
            w-60 reveal">
            <div className="font-bold text-lg leading-tight mb-1.5 flex flex-wrap gap-1">
                {data.title}
            </div>
            <div className="w-full px-1 pt-1 mt-1 border-t-1 flex flex-col truncate">
                {data.more}
            </div>
            <div className="mt-1 flex gap-2">
                <button className="bg-[var(--foreground)] text-[var(--background)] p-[3px] rounded cursor-pointer"
                    onClick={(e) => props.handleEdit(e, props.uuid)}>
                    <Pencil className="w-4 h-4" />
                </button>
                <button className="bg-[var(--pink)] text-[var(--background)] p-[3px] rounded cursor-pointer"
                    onClick={(e) => props.handleDelete(e, props.uuid)}>
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>

    )
}
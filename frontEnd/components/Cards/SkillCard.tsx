import { Pencil, Trash2 } from "lucide-react"

export const SkillCard = (props: { 
    idx: number, data: any,
    handleEdit: any, handleDelete: any
}) => {
    const data = props.data // JSON.parse(props.data)
    
    return (
        <div data-id={props.idx} className="border-1 rounded bg-[var(--background)] shadow-lg px-3 py-2
            w-60">
            {/* title wrap */}
            <div>
                <div className="leading-tight mb-1.5 flex flex-wrap justify-between items-center">
                    <div className="font-bold text-lg">{`${data.isLan?data.lan:data.title}`}</div>
                    {
                        data.isLan&&data.level.length>0?(
                            <div className="text-sm text-gray-500">{data.level}</div>
                        ):(<></>)
                    }
                </div>
                <div className="mt-1 flex gap-2 mt-1 pt-2 border-t-1">
                    <button className="bg-[var(--foreground)] text-[var(--background)] p-[3px] rounded cursor-pointer"
                    onClick={(e) => props.handleEdit(e, props.idx)}>
                        <Pencil className="w-4 h-4"/>
                    </button>
                    <button className="bg-[var(--pink)] text-[var(--background)] p-[3px] rounded cursor-pointer"
                    onClick={(e) => props.handleDelete(e, props.idx)}>
                        <Trash2 className="w-4 h-4"/>
                    </button>
                </div>
                
            </div>
        </div>
    )
}
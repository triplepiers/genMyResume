import { Pencil, Trash2 } from "lucide-react"
import { formDate } from "@/lib/utils"

export const WorkCard = (props: { 
    idx: number, data: string,
    handleEdit: any, handleDelete: any
}) => {
    const data = JSON.parse(props.data)
    const company = data.company.length>0 ? ` | ${data.company}` : ''
    const show_time = data.bg_month.length>0 || data.ed_month.length>0
    const sep_time  = data.bg_month.length>0 && data.ed_month.length>0
    const timeStr = `
        ${data.bg_month.length>0?`${formDate(data.bg_month, data.bg_year, false)}`:""}
        ${sep_time?' ~ ':''}
        ${data.ed_month.length>0?`${formDate(data.ed_month, data.ed_year, false)}`:""}
    `
    
    return (
        <div data-id={props.idx} className="border-1 rounded bg-[var(--background)] shadow-lg px-3 py-2
            w-60 reveal">
            {/* title wrap */}
            <div>
                <div className="font-bold text-lg leading-tight mb-1.5 flex flex-wrap gap-1">
                    <div>{data.title}</div>
                    <div>{company}</div>
                </div>
           {/*  */}
                <div className="w-full px-1 pt-1 mt-1 border-t-1 flex flex-col items-end">
                {
                    show_time?(
                        <div className="text-sm text-gray-500">{timeStr}</div>
                    ):(<></>)
                }
                {
                    data.location&&data.location.length>0?(
                        <div className="text-sm text-gray-500">@ {data.location}</div>
                    ):(<></>)
                }
                <div className="mt-1 flex gap-2">
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
        </div>
    )
}
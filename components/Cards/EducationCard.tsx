import { Pencil, Trash2 } from "lucide-react"

export const EducationCard = (props: { 
    idx: number, data: string,
    handleEdit: any, handleDelete: any
}) => {
    const data = JSON.parse(props.data)
    const degree = data.degree==='Enter your own' ?
                    `${data.neodegree} - ` :
                    `${data.degree}${data.degree.length===0?"":" - "}`

    const show_time = data.bg_month.length>0 || data.ed_month.length>0
    const sep_time  = data.bg_month.length>0 && data.ed_month.length>0
    const timeStr = `
        ${data.bg_month.length>0?`${data.bg_month} ${data.bg_year}`:""}
        ${sep_time?' ~ ':''}
        ${data.ed_month.length>0?`${data.bg_month} ${data.ed_year}`:""}
    `
    
    return (
        <div data-id={props.idx} className="border-1 rounded bg-[var(--background)] shadow-lg px-3 py-2
            w-60">
            {/* title wrap */}
            <div>
                <div className="font-bold text-lg leading-none mb-1.5">{`${degree}${data.institution}`}</div>
                {
                    data.field.length===0?(<></>):
                    (<div className="pl-1"><b>Field:</b> {data.field}</div>)
                }
                <div className="w-full px-1 pt-1 mt-1 border-t-1 flex flex-col items-end">
                {
                    show_time?(
                        <div className="text-sm text-gray-500">{timeStr}</div>
                    ):(<></>)
                }
                {
                    data.location.length>0?(
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
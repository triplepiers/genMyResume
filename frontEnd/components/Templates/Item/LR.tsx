import { formDate } from "@/lib/utils"

function genDateBlock(
    inline: boolean, showDate: boolean,
    bg_month: string, bg_year: string, ed_month: string, ed_year: string,
    divDate: boolean, mFirst: boolean = false, showNum?: boolean
) {
    return (
        <div className={`text-xs font-mono pt-2 w-${inline ? '36' : '20'}`}>
            {
                showDate ? (<>
                    {formDate(bg_month, bg_year, mFirst)}{divDate ? ' - ' : ''}{formDate(ed_month, ed_year, mFirst)}
                </>) : (<></>)
            }
        </div>)
}

export const LRItem = (props: {
    inlineTime: boolean,
    showDate: boolean, divDate: boolean, mFirst: boolean,
    bg_month: string, bg_year: string, ed_month: string, ed_year: string,
    title: string, subTitle: string,
    showDetail: boolean, details: any
}) => {
    const { 
        inlineTime,
        showDate, divDate, bg_month, bg_year, ed_month, ed_year, mFirst,
        title, subTitle,
        showDetail, details
    } = props;
    return (
        <div className='flex'>
            <>
                {genDateBlock(
                    inlineTime, showDate,
                    bg_month, bg_year, ed_month, ed_year,
                    divDate
                )}
            </>
            <div className='flex flex-col'>
                <div className='w-full text-lg font-bold'>
                    {title}
                </div>
                <div className='text-sm my-1'>
                    <i>{subTitle}</i>
                </div>
                {
                    showDetail ? (<div className='text-sm'>{details}</div>) : (<></>)
                }
            </div>
        </div>

    )
}
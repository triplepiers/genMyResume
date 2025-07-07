/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

export const NoIconContact = (props: {
    inline: boolean,
    phone: string, email: string,
    ftClr?: string,
    vertical?: boolean, gapY?: string
}) => {
    const { inline, phone, email } = props;
    const ftClr = props.ftClr?props.ftClr:'#FFF';
    const vertical = props.vertical?true:false;
    const gapY = props.gapY?props.gapY:'';
    return (
        <div className={`${gapY} w-full text-sm flex ${inline?'':'flex-col gap-1'} ${vertical?'flex-col gap-1':''}`}
        style={{ color: ftClr }}>
        {
            phone && phone.length>0?(
                <div className={`flex grow-1 ${inline?'gap-3':'flex-col gap-0.8'}`}>
                    <div><b>Phone</b></div>
                    <div className={`${inline?'':'text-xs'}`}><a href={`tel:${phone}`}>{phone}</a></div>
                </div>
            ):(<></>)
        }
        {
            email && email.length>0?(
                <div className={`flex grow-1 ${inline?'gap-3':'flex-col gap-0.8'}`}>
                    <div><b>Email</b></div>
                    <div className={`${inline?'':'text-xs'}`}><a href={`mailto:${email}`}>{email}</a></div>
                </div>)
            :(<></>)
        }            
        </div>
    )
}
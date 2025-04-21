export const NoIconContact = (props: {
    inline: boolean,
    phone: string, email: string,
    ftClr?: string
}) => {
    const { inline, phone, email } = props;
    const ftClr = props.ftClr?props.ftClr:'#FFF';
    return (
        <div className={`w-full text-sm flex ${inline?'':'flex-col gap-1'}`}
        style={{ color: ftClr }}>
        {
            phone.length>0?(
                <div className={`flex grow-1 ${inline?'gap-3':'flex-col gap-0.8'}`}>
                    <div><b>Phone</b></div>
                    <div className={`${inline?'':'text-xs'}`}><a href={`tel:${phone}`}>{phone}</a></div>
                </div>
            ):(<></>)
        }
        {
            email.length>0?(
                <div className={`flex grow-1 ${inline?'gap-3':'flex-col gap-0.8'}`}>
                    <div><b>Email</b></div>
                    <div className={`${inline?'':'text-xs'}`}><a href={`mailto:${email}`}>{email}</a></div>
                </div>)
            :(<></>)
        }            
        </div>
    )
}
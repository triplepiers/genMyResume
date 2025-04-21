export const NoIconContact = (props: {
    inline: boolean,
    phone: string, email: string
}) => {
    const { inline, phone, email } = props;
    return (
        <div className={`w-full text-white text-sm flex my-2 ${inline?'':'flex-col gap-1'}`}>
        {
            phone.length>0?(
                <div className={`flex grow-1 ${inline?'gap-3':'flex-col gap-0.8'}`}>
                    <div><b>Phone</b></div>
                    <div className={`${inline?'':'text-sm'}`}><a href={`tel:${phone}`}>{phone}</a></div>
                </div>
            ):(<></>)
        }
        {
            email.length>0?(
                <div className={`flex grow-1 ${inline?'gap-3':'flex-col gap-0.8'}`}>
                    <div><b>Email</b></div>
                    <div className={`${inline?'':'text-sm'}`}><a href={`mailto:${email}`}>{email}</a></div>
                </div>)
            :(<></>)
        }            
        </div>
    )
}
export const NoIconContact = (props: {
    inline: boolean,
    phone: string, email: string
}) => {
    const { inline, phone, email } = props;
    return (
        <div className='w-full text-white text-sm flex my-2'>
            {
                inline ? (<>
                {
                    phone.length>0?(
                        <div className='flex gap-3 grow-1'>
                            <div><b>Phone</b></div>
                            <div><a href={`tel:${phone}`}>{phone}</a></div>
                        </div>
                    ):(<></>)
                }
                {
                    email.length>0?(
                        <div className='flex gap-3 grow-1'>
                            <div><b>Email</b></div>
                            <div><a href={`mailto:${email}`}>{email}</a></div>
                        </div>)
                    :(<></>)
                }
                </>):(<></>)
            }
        </div>
    )
}
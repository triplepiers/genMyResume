import { MailIcon, PhoneIcon } from 'lucide-react';

export const IconContact = (props: {
    vertical?: boolean,
    phone: string, email: string,
    iconFtClr?: string, iconBgClr?: string,
    ftClr?: string
}) => {
    const { phone, email } = props;
    const vertical = props.vertical?true:false;
    const ftClr = props.ftClr?props.ftClr:'#FFF';
    const iconFtClr = props.iconFtClr?props.iconFtClr:'#FFF';
    const iconBgClr = props.iconBgClr?props.iconBgClr:'var(--foreground)';
    return (
        <div className={`w-full text-[var(--foreground)] flex ${vertical?'flex-col gap-2':''}`} 
            style={{ color: ftClr }}>
        {
            phone && phone.length>0?(
            <div className='flex-1 flex items-center text-sm gap-2'>
                <div className='rounded-full flex justify-center items-center w-[1.2rem] h-[1.2rem]'
                style={{ backgroundColor: iconBgClr }}>
                    < PhoneIcon className='w-[65%] h-[65%]' style={{ color: iconFtClr }}/>
                </div>
                <div><a href={`tel:${phone}`}>{phone}</a></div>
            </div>):(<></>)
        }
        {
            email && email.length>0?(
                <div className='flex-1 flex items-center text-sm gap-2'>
                    <div className='rounded-full flex justify-center items-center w-[1.2rem] h-[1.2rem]'
                    style={{ backgroundColor: iconBgClr }}>
                        < MailIcon className='w-[65%] h-[65%]' style={{ color: iconFtClr }}/>
                    </div>
                    <div><a href={`mailto:${email}`}>{email}</a></div>
                </div>):(<></>)
        }
    </div>)
}
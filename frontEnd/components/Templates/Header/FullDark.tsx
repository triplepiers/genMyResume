import { IconContact } from "../Contact/Icon";
import { NoIconContact } from "../Contact/NoIcon";

export const FullDarkHeader = (props: {
    ftClr: string, bgClr: string,
    subClr?: string,
    headPF: any,
    showContactBlock?: boolean, inlineContact?: boolean,
    classList?: string,
    // show Icon
    contactIcon?: boolean, 
    contactIconBgClr?: string, contactIconFtClr?: string,
    contactClr?: string,
}) => {
    const { ftClr, bgClr, headPF } = props;
    const subClr = props.subClr?props.subClr: ftClr;

    const showContactBlock = props.showContactBlock !== undefined?props.showContactBlock:true;
    const inlineContact = props.inlineContact !== undefined?props.inlineContact:true;
    const contactIcon = props.contactIcon?true:false;
    const contactIconBgClr = props.contactIconBgClr?props.contactIconBgClr:'var(--foreground)';
    const contactIconFtClr = props.contactIconFtClr?props.contactIconFtClr:'#FFF';
    const contactClr = props.contactClr?props.contactClr:'var(--foreground)';

    const classList = props.classList?props.classList:'px-[40px] pt-[30px] pb-[10px]';
    return (
        <div className={`${classList} w-full flex flex-col`}
            style={{ backgroundColor: bgClr, color: ftClr  }}>
            <div className='text-3xl font-extrabold'>
                {headPF.name} {headPF.surname}
            </div>
            {
                headPF.showProf ? (
                    <div style={{ color: subClr }}>
                        {headPF.profession}
                    </div>
                ) : (<></>)
            }
            {
                showContactBlock&&headPF.showContact ? (
                    contactIcon ? (<>
                        <IconContact
                            phone={headPF.phone} email={headPF.email}
                            iconFtClr={contactIconFtClr} iconBgClr={contactIconBgClr}
                            ftClr={contactClr}
                        />
                    </>):(<>
                        <NoIconContact 
                            inline={inlineContact}
                            phone={headPF.phone} email={headPF.email} 
                        />
                    </>)
                ):(<></>)
            }
        </div>
    )
}
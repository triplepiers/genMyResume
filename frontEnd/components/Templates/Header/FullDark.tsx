import { NoIconContact } from "../Contact/NoIcon";

export const FullDarkHeader = (props: {
    ftClr: string, bgClr: string,
    headPF: any,
    showContactBlock?: boolean, inlineContact?: boolean,
    classList?: string
}) => {
    const { ftClr, bgClr, headPF } = props;
    const showContactBlock = props.showContactBlock !== undefined?props.showContactBlock:true;
    const inlineContact = props.inlineContact !== undefined?props.inlineContact:true;
    const classList = props.classList?props.classList:'px-[40px] pt-[30px]';
    return (
        <div className={`${classList} w-full flex flex-col pb-[10px]`}
            style={{ backgroundColor: bgClr, color: ftClr  }}>
            <div className='text-3xl font-extrabold'>
                {headPF.name} {headPF.surname}
            </div>
            {
                headPF.showProf ? (
                    <div>
                        {headPF.profession}
                    </div>
                ) : (<></>)
            }
            {
                showContactBlock&&headPF.showContact ? (<>
                    <NoIconContact 
                        inline={inlineContact}
                        phone={headPF.phone} email={headPF.email} 
                    />
                </>):(<></>)
            }
        </div>
    )
}
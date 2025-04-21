import { NoIconContact } from "../Contact/NoIcon";

export const FullDarkHeader = (props: {
    ftClr: string, bgClr: string,
    headPF: any,
    inlineContact: boolean
}) => {
    const { ftClr, bgClr, headPF, inlineContact } = props;
    return (
        <div className='w-full flex flex-col px-[40px] pt-[30px] pb-[10px]'
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
                headPF.showContact ? (<>
                    <NoIconContact 
                        inline={inlineContact}
                        phone={headPF.phone} email={headPF.email} 
                    />
                </>):(<></>)
            }
        </div>
    )
}
/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import { IconContact } from "../Contact/Icon";
import { NoIconContact } from "../Contact/NoIcon";
import { isDarkColor } from "@/lib/utils";

export const FullDarkHeader = (props: {
    titleFont?: string,
    ftClr: string, bgClr: string,
    subClr?: string,
    headPF: any,
    showContactBlock?: boolean, inlineContact?: boolean,
    classList?: string,
    inclineSubTitle?: boolean,
    // show Icon
    contactIcon?: boolean, verticalContact?: boolean,
    contactIconBgClr?: string, contactIconFtClr?: string,
    contactClr?: string, contactGapY?: string
}) => {
    const { titleFont, ftClr, bgClr, headPF } = props;
    const subClr = props.subClr?props.subClr: ftClr;

    const inclineSubTitle = props.inclineSubTitle?true:false;

    const showContactBlock = props.showContactBlock !== undefined?props.showContactBlock:true;
    const inlineContact = props.inlineContact !== undefined?props.inlineContact:true;
    const contactIcon = props.contactIcon?true:false;
    const contactIconBgClr = props.contactIconBgClr?props.contactIconBgClr:'var(--foreground)';
    const contactIconFtClr = props.contactIconFtClr?props.contactIconFtClr:'#FFF';
    const contactClr = props.contactClr?props.contactClr:'var(--foreground)';
    const verticalContact = props.verticalContact?true:false;
    const contactGapY = props.contactGapY?props.contactGapY:'';

    const classList = props.classList?props.classList:'px-[40px] pt-[30px] pb-[10px]';
    
    
    return (
        <div className={`${classList} w-full flex flex-col`}
            style={{ backgroundColor: bgClr, color: ftClr  }}>
            <div className='text-3xl font-extrabold'
                style={{ fontFamily: titleFont?titleFont:'' }}>
                {headPF.name} {headPF.surname}
            </div>
            {
                headPF.showProf ? (
                    <div style={{ color: subClr }}>
                        {
                            inclineSubTitle?(<i>{headPF.profession}</i>):(<>{headPF.profession}</>)
                        }
                        
                    </div>
                ) : (<></>)
            }
            {
                showContactBlock&&headPF.showContact ? (
                    contactIcon ? (<>
                        <IconContact
                            phone={headPF.phone} email={headPF.email}
                            iconFtClr={contactIconFtClr}
                            iconBgClr={contactIconBgClr}
                            ftClr={isDarkColor(bgClr)?'white':contactClr}
                        />
                    </>):(<>
                        <NoIconContact 
                            inline={inlineContact} vertical={verticalContact}
                            phone={headPF.phone} email={headPF.email}
                            ftClr={isDarkColor(bgClr)?'white':contactClr} gapY={contactGapY}
                        />
                    </>)
                ):(<></>)
            }
        </div>
    )
}
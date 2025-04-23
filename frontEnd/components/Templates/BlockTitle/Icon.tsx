export const IconTitle = (props: {
    icon: any, rounded: boolean, rotate?: boolean,
    underLine: boolean, topLine: boolean,
    fontSize?: string,
    ftClr: string, bgClr: string, iconClr: string,
    title: string, upperCase: boolean,
    classList?: string
}) => {
    const {
        icon, rounded,
        underLine, topLine, 
        ftClr, bgClr, iconClr,
        title, upperCase
    } = props;
    const fontSize = props.fontSize?props.fontSize:'xl';
    const classList = props.classList?props.classList:'pb-1';
    const rotate = props.rotate?true:false;
    return (
        <div className={`w-full flex items-center gap-${rounded?'3':'2'} ${underLine?'border-b-1':''} ${topLine?'border-t-1':''} ${classList}`}>
            <div className={`shrink-0 ${rounded?'rounded-full':''}  
                w-[2rem] h-[2rem] flex items-center justify-center text-white`}
                style={{ color: iconClr, backgroundColor: ftClr, transform: rotate?'rotate(45deg)':'' }}>
                <div style={{ transform: rotate?'rotate(-45deg)':'' }}>{icon}</div>
            </div>
            <div className={`font-black text-${fontSize}`}
                style={{ color: ftClr}}>
                {upperCase?title.toUpperCase():title}
            </div>
        </div>
    )
}
export const IconTitle = (props: {
    icon: any, rounded: boolean,
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
        title, upperCase, classList } = props;
    const fontSize = props.fontSize?props.fontSize:'xl'
    return (
        <div className={`w-full flex items-center gap-4 pb-1 ${underLine?'border-b-1':''} ${topLine?'border-t-1':''}`}>
            <div className={`${rounded?'rounded-full':''} w-[2rem] h-[2rem] 
            flex items-center justify-center text-white`}
                style={{ color: iconClr, backgroundColor: ftClr }}>
                {icon}
            </div>
            <div className={`font-black text-${fontSize}`}
                style={{ color: ftClr }}>
                {upperCase?title.toUpperCase():title}
            </div>
        </div>
    )
}
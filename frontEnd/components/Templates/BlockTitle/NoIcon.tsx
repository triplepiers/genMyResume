export const NoIconTitle = (props: {
    underLine: boolean, topLine: boolean,
    alignCenter: boolean, fontSize?: string,
    ftClr: string, bgClr: string,
    title: string, upperCase: boolean,
    classList: string
}) => {
    const { 
        underLine, topLine, 
        alignCenter,
        ftClr, bgClr, 
        title, upperCase, classList } = props;
    const fontSize = props.fontSize?props.fontSize:'xl'
    return (
    <div 
        className={
            `text-${fontSize} font-black py-1 mb-1 ${alignCenter?'text-center':''} ${underLine?'border-b-1':''} ${topLine?'border-t-1':''} ${classList}`
        }
        style={{ color: ftClr, backgroundColor: bgClr }}>
        {upperCase ? title.toUpperCase() : title}
    </div>)
}
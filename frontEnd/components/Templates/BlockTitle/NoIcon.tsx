export const NoIconTitle = (props: {
    underLine: boolean, topLine: boolean,
    alignCenter: boolean, fontSize?: string,
    ftClr: string, bgClr: string,
    title: string, upperCase: boolean,
    dot?: boolean,
    classList?: string
}) => {
    const { 
        underLine, topLine, 
        alignCenter,
        ftClr, bgClr, 
        title, upperCase, classList } = props;
    const fontSize = props.fontSize?props.fontSize:'xl';
    const dot = props.dot?true:false;
    return (
    <div 
        className={ `
            ${dot?'flex gap-2 items-center':''}
            text-${fontSize} font-black py-1 mb-1 ${alignCenter?'text-center':''}
            ${underLine?'border-b-1':''} ${topLine?'border-t-1':''} 
            ${classList}`
        }
        style={{ color: ftClr, backgroundColor: bgClr }}>
        {
            dot?(
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ftClr }}></div>)
            :(<></>)
        }
        <div>{upperCase ? title.toUpperCase() : title}</div>
    </div>)
}
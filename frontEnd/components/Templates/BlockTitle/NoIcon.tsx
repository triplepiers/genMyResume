export const NoIconTitle = (props: {
    underLine: boolean, topLine: boolean,
    clr: string, 
    title: string, upperCase: boolean
}) => {
    const { underLine, topLine, clr, title, upperCase } = props;
    return (
    <div className={`font-black text-xl ${underLine?'border-b-1 pb-1':''} ${topLine?'border-t-1 pt-1':''}`}
        style={{ color: clr }}>
        {upperCase ? title.toUpperCase() : title}
    </div>)
}
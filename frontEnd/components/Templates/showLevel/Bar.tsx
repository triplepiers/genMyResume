function levelToIdx(level: string) {
    switch (level) {
        case 'Elementary':
            return '20%'
        case 'Limited':
            return '40%'
        case 'Professional':
            return '60%'
        case 'Full Professional':
            return '80%'
        case 'Native':
            return '100%'
    }
}

export const LevelBar = (props: {
    level: string,
    ftClr: string, bgClr: string,
    inline: boolean
}) => {
    const { level, ftClr, bgClr, inline } = props;
    return (
        <div className={`pt-1 w-full flex gap-1 items-end ${inline?'':'flex-col'}`}>
            <div className='w-full h-[8px] relative'>
                <div className='w-full h-full'
                    style={{ backgroundColor: bgClr }}></div>
                <div className='h-full absolute left-0 top-0'
                    style={{ backgroundColor: ftClr, width: levelToIdx(level)}}></div>
            </div>
            <div>{level}</div>
        </div>
    )
}
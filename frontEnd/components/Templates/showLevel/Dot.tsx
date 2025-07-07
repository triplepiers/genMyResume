/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

function levelToIdx(level: string) {
    switch(level) {
        case 'Elementary':
            return 1
        case 'Limited':
            return 2
        case 'Professional':
            return 3
        case 'Full Professional':
            return 4
        case 'Native':
            return 5
    }
}

export const LevelDot = (props: {
    level: string, rotate?: boolean,
    rounded: boolean, outlined: boolean,
    ftClr: string, bgClr: string,
    descClr?: string
}) => {
    const {
        level,
        rounded, outlined,
        ftClr, bgClr
    } = props;
    const rotate = props.rotate?true:false;
    const descClr = props.descClr?props.descClr:ftClr;
    return (
    <div className='pt-1 w-full flex flex-col items-end gap-1'>
        <div className={`flex gap-${rotate?'2':'1'}`}>
            {
                [1,2,3,4,5].map((idx: number) => {
                    return (<div className={`${rounded?'rounded-full':''} w-${rotate?'2.5':'3'} h-${rotate?'2.5':'3'} border-1`}
                    style={{ 
                        backgroundColor: levelToIdx(level)>idx?ftClr:outlined?'transparent':bgClr,
                        borderColor:  outlined?ftClr:levelToIdx(level)>idx?ftClr:bgClr,
                        transform: rotate?'rotate(45deg)':''
                     }}></div>
                    )})
            }
        </div>
        <div className='text-xs whitespace-nowrap' style={{ color: descClr }}>{level}</div>
    </div>
    )
}
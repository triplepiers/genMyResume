/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

export const PaletteBtn = (props: {
    bgClr: string, idx: number, onBtnClick: Function, selected: boolean
}) => {
    const { bgClr, idx, selected } = props;
    const emitClrIdx = () => { props.onBtnClick(idx); }
    return (
        <div 
        className="w-6 h-6 rounded-full cursor-pointer
         brightness-100 hover:brightness-120 duration-200"
        style={{ backgroundColor: bgClr, borderRadius: selected ? 3 : 50}}
        onClick={emitClrIdx}>
        </div>
    )
}
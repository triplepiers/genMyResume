/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import { useState } from "react";
import { PaletteBtn } from "@/components/Editor/PaletteBtn";
import { ColorPicker } from "@/components/Editor/ColorPicker";

const default_clr_list: string[][] = [
    ['#7D7D7D', '#34383D', '#E4E2DE', '#333333'],
    ['#102A73', '#394D6C', '#A3B8DE', '#25A7FF'],
    ['#7D47B2', '#9987FF', '#F3C2F9', '#E360CA'],
    ['#2C98DE', '#074D73', '#8AC3F4', '#25CEE4'],
    ['#00BCA3', '#016B5D', '#B4E8E2', '#AAED5C'],
    ['#065700', '#B7D1AD', '#779C30', '#AAED5C'],
    ['#9B3016', '#E37829', '#C46531', '#FF640B'],
    ['#F98C79', '#8C3D4B', '#F7BFB5', '#F3323E'],
    ['#FBDC6D', '#CD8B02', '#C4B08F', '#FFF025']
];
const N_DEFAULT: number = default_clr_list.length * default_clr_list[0].length;

export const Palette = (props: {
    updateThemeClr: Function,
    defaultClr: string
}) => {
    const { updateThemeClr, defaultClr } = props;
    const [custom_clr_list, setCustomClrList] = useState<string[]>([]);
    const [clrId, setClrId] = useState(3);
    const idx2Clr = (clrId: number) => {
        if (clrId < N_DEFAULT) { // default
            return default_clr_list[Math.floor(clrId/4)][clrId%4];
        } else {                 // customized
            return custom_clr_list[clrId-N_DEFAULT];
        }
    }
    const handleBtnClick = (neoClrId: number) => {
        if (neoClrId !== clrId) { 
            setClrId(neoClrId); 
            updateThemeClr(idx2Clr(neoClrId));
        }
    }
    const handleCustomClr = (neoCustomClr: string) => {
        let l = custom_clr_list.length;
        // 不考虑新增色存在于预设中的情况
        let idx = custom_clr_list.indexOf(neoCustomClr);
        if (idx === -1) { // 不在的话: append -> 选中新的
            setClrId(N_DEFAULT + l);
            setCustomClrList(prev => [...prev, neoCustomClr]);
        } else {          // 在的话:   移到最后 -> 选中新的
            setClrId(N_DEFAULT + l - 1);
            setCustomClrList(prev => [...prev.slice(0, idx), ...prev.slice(idx+1), neoCustomClr]);
        }
        updateThemeClr(neoCustomClr);
    }

    return (
        <div className="flex flex-col w-66 relative">
            <div className="flex gap-3">
                {default_clr_list.map((col, c_idx) => (
                    <div key={c_idx} className="flex flex-col gap-3">
                        {col.map((item, idx) => {
                            let key = c_idx*4 + idx;
                            return (
                            <PaletteBtn 
                                key={c_idx*4 + idx} bgClr={item} idx={c_idx*4 + idx}
                                selected={key === clrId}
                                onBtnClick={handleBtnClick}
                            />)
                        })}
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-3 my-3">
                {custom_clr_list.map((clr, idx) => {
                    let key = N_DEFAULT+idx;
                    return (
                    <PaletteBtn
                        key={N_DEFAULT+idx} bgClr={clr} idx={N_DEFAULT+idx}
                        selected={key === clrId}
                        onBtnClick={handleBtnClick}
                    />)
                })}
            </div>

            <ColorPicker onAddClr={handleCustomClr}/>
        </div>
        
    )
}
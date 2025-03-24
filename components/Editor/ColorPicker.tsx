import { useState } from "react";
import { SliderPicker } from "react-color";

export const ColorPicker = (props: { onAddClr: Function }) => {
    const [clr, setClr] = useState('');
    const onChangeClr = (clrObj: any) => {
        setClr(clrObj.hex)
    }
    const emitCustomClr = () => {
        props.onAddClr(clr);
    }
    return (
        <div className="flex flex-col gap-5 items-end 
        absolute bottom-0 left-66
        w-fit h-fit bg-white p-3 rounded shadow">
            <SliderPicker color={clr} onChange={onChangeClr}
                className="w-60" />
            <button 
             className="bg-[var(--hilight)] w-fit
             px-[.8rem] py-[0.1rem] rounded-4xl text-xs
             cursor-pointer"
             style={{ backgroundColor: clr.length === 0 ? 'grey' : 'var(--hilight)' }}
             disabled={clr.length === 0}
             onClick={emitCustomClr}>
                OK
            </button>
        </div>
    )
}
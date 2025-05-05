import { useState, useEffect } from "react";

import { FaFileLines } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import Singles from "@/templates/Single";
import Duals from "@/templates/Dual";
const singles = Object.keys(Singles)
const duals = Object.keys(Duals)

export const TemplateSelector = (props:{
    updateTid: Function
}) => {
    const [selectedTid, setSelectedTid] = useState('S01');
    const [showSingle, setShowSinlge] = useState(true);
    const [showDouble, setShowDouble] = useState(true);
    const {updateTid} = props;

    useEffect(() => {
        const tid = localStorage.getItem('tid');
        if (tid) { setSelectedTid(tid! as string) }
        else { setSelectedTid('S01') }
    }, [])

    const updateSelectedTid = (neoTid: string) => {
        if (neoTid !== selectedTid) {
            localStorage.setItem('tid', neoTid);
            setSelectedTid(neoTid);
            updateTid(neoTid);
        }
    }

    return (
        <Drawer direction='left'>
            <DrawerTrigger asChild>
                <div className="custom-option-set" >
                    <FaFileLines className="custom-option-icon" />
                    Templates
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Template List</DrawerTitle>
                    <DrawerDescription>Select your favourite template.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 my-2 text-sm flex gap-2">
                    <div>Show:</div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="languages"
                            checked={showSingle}
                            onCheckedChange={(checked) => { setShowSinlge(checked as boolean) }}
                        />
                        <label
                            htmlFor="languages"
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Single Col
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="customs"
                            checked={showDouble}
                            onCheckedChange={(checked) => { setShowDouble(checked as boolean) }}
                        />
                        <label
                            htmlFor="customs"
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Double Cols
                        </label>
                    </div>
                </div>
                <div className="p-4 grow-1 overflow-y-scroll flex flex-col items-center gap-y-4">
                    {
                        showSingle ? singles.map((imgName: string) => (
                            <div className="w-[80%] flex flex-col items-center cursor-pointer"
                                onClick={() => updateSelectedTid(imgName)}>
                                <img src={`./imgs/${imgName}.png`} className="border-1 rounded-md"
                                    style={{ borderColor: selectedTid === imgName ? 'var(--blue)' : '' }} />
                                <div style={{ color: selectedTid === imgName ? 'var(--blue)' : '' }}>
                                    {imgName}
                                </div>
                            </div>
                        )) : <></>
                    }
                    {
                        showDouble ? duals.map((imgName: string) => (
                            <div className="w-[80%] flex flex-col items-center cursor-pointer"
                                onClick={() => updateSelectedTid(imgName)}>
                                <img src={`./imgs/${imgName}.png`} className="border-1 rounded-md"
                                    style={{ borderColor: selectedTid === imgName ? 'var(--blue)' : '' }} />
                                <div style={{ color: selectedTid === imgName ? 'var(--blue)' : '' }}>
                                    {imgName}
                                </div>
                            </div>
                        )) : <></>
                    }
                </div>
            </DrawerContent>
        </Drawer>
    )
}
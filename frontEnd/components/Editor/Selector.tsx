'use client'

/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import { useEffect, useState, useRef } from "react";

import { Palette } from "@/components/Editor/Palette";
import { FaPaintRoller } from "react-icons/fa6";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

import FontPicker from '@/lib/fontpicker.min.js';

const useFonts = [
    "Hanken Grotesk",
    'Arial', 'Blinker', 'Bodoni MT', 'Century Gothic', 'Courier New',
    'Fira Sans', 'Georgia', 'PT Sans', 'PT Sans Caption', 'PT Sans Linotype',
    'Saira', 'Source Sans Pro', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'
];

export const Selector = (props: {
    updateThemeClr: Function,
    updateFont: Function,
    defaultClr: string,
}) => {
    const [unfold, setUnfold] = useState(false);
    const [cnt, setCnt] = useState(0);
    const { updateThemeClr, defaultClr, updateFont } = props;
    // 字体相关
    const fontPickerRef = useRef(null);
    const [font, setFont] = useState<string>();
    // init font
    useEffect(() => {
        const histFont = localStorage.getItem('font');
        if (histFont) {
            setFont(histFont);
        } else {
            setFont('"Hanken Grotesk", sans-serif');
        }
    }, [])
    useEffect(() => {
        setTimeout(() => {
            // 一开始就允许点击遮罩退出
            const closeDrawer = () => { setUnfold(false) }
            const block = document.querySelector('[data-vaul-overlay]');
            if (block) {
                block.addEventListener('click', closeDrawer)
            }
            if (fontPickerRef.current) {
                // 保留历史选项
                const useFont = font ? font.match(/"(.*?)"/)!.map(m => m.replace(/"/g, ''))[0] : "Hanken Grotesk";
                const picker = new FontPicker('#picker', {
                    Language: 'en',
                    variants: false,        // pick only fonts (no weight)
                    font: useFont, // default
                    defaultSubsets: 'latin',
                    showCancelButton: false,
                    googleFonts: useFonts
                })
                picker.on('pick', (fontInfo: any) => {
                    const neoFont = `"${fontInfo.family.name}", ${fontInfo.family.category}`;
                    if (neoFont !== font) {
                        setFont(neoFont);
                        localStorage.setItem('font', neoFont);
                        updateFont(neoFont);
                    }
                })
                // 避免选字体把遮罩创飞
                picker.on('close', () => {
                    const block = document.querySelector('[data-vaul-overlay]');
                    if (block) {
                        block.addEventListener('click', closeDrawer)
                    }
                })

                fontPickerRef.current.addEventListener('click', () => {
                    // 不显示 filter 栏目
                    document.querySelector('#fp__modal .fpb__accordion')!.style.display = 'none';

                    const block = document.querySelector('[data-vaul-overlay]');
                    if (block) {
                        block.removeEventListener('click', closeDrawer)
                    }
                })
            }
        }, 100)
    }, [cnt])
    return (
        <Drawer direction='left' open={unfold}>
            <div className="custom-option-set" onClick={() => {
                setCnt(cnt => cnt + 1);
                setUnfold(true);
            }}>
                <FaPaintRoller className="custom-option-icon" />
                Design
            </div>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Theme Color Selector</DrawerTitle>
                    <DrawerDescription>Choose your favourite color.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 mb-10">
                    <Palette updateThemeClr={updateThemeClr} defaultClr={defaultClr} />
                </div>
                <DrawerHeader>
                    <DrawerTitle>Font Selector</DrawerTitle>
                    <DrawerDescription>Choose font for both titles and main texts.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 flex gap-2">
                    <div className="flex items-center">Chosen Font:</div>
                    <button id="picker" ref={fontPickerRef}></button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
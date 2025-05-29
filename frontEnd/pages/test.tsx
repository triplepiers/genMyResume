'use client'
import { useEffect, useState } from 'react';
import FontPicker from '@/lib/fontpicker.min.js';
export default function Test(props: any[]) {
  const [ font, setFont ] = useState<string>('"Hanken Grotesk", sans-serif');
  useEffect(() => {
    const picker = new FontPicker('#picker', {
      Language: 'en',
      variants: false,        // pick only fonts (no weight)
      font: 'Hanken Grotesk', // default
      defaultSubsets: 'latin',
      showCancelButton: false,
      previewText: 'This font is used for body text'
    })
    picker.on('pick', (fontInfo: any) => {
      const neoFont = `"${fontInfo.family.name}", ${fontInfo.family.category}`;
      if (neoFont !== font) {
        setFont(neoFont)
      }
    })
  }, [])
  return (
    <div className="flex flex-col items-center justify-center gap-y-[2rem]
      w-screen h-[calc(100vh-var(--header-height))] p-20"
      style={{ fontFamily: font}}>
      <div>Hey, you should NOT be here!!! use Font: {font}</div>
      <button id="picker"></button>
    </div>
  )
}
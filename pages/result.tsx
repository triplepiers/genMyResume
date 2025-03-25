import { PdfGenerator } from "@/components/PdfGenerator";
import { Palette } from "@/components/Editor/Palette";
import { FaFileLines, FaPaintRoller, FaCirclePlus, FaDownload } from "react-icons/fa6";

import '@/styles/customTailWind.css';

export default function Result(props: any[]) {
    return (
        <>
            {/* body */}
            <div className="w-screen min-h-[calc(100vh-var(--header-height))] 
            px-10 py-5 pb-10 relative">
                <h2 className="font-medium text-xl mb-2">
                    Resume Preview
                </h2>
                <PdfGenerator />
                {/* <Palette /> */}
            </div >
            {/* options */}
            <div className="flex flex-col gap-5 shrink-0
                bg-white/[0.2] backdrop-blur-sm shadow-lg
                fixed top-[50vh] right-0 -translate-y-[50%]
                rounded-lg
                font-light text-[.7rem] px-3 py-5">
                <div className="custom-option-set">
                    <FaFileLines className="custom-option-icon" />
                    Templates
                </div>
                <div className="custom-option-set">
                    <FaPaintRoller className="custom-option-icon" />
                    Design
                </div>
                <div className="custom-option-set">
                    <FaCirclePlus className="custom-option-icon" />
                    New Section
                </div>
                <div className="custom-option-set">
                    <FaDownload className="custom-option-icon" />
                    Download
                </div>
            </div>
        </>
    );
}

export function getStaticProps() {
    return {
        props: {
            pageName: "Result",
            // privateFooter: true
        },
    };
}
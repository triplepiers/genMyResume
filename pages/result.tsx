import { PdfGenerator } from "@/components/PdfGenerator";
import { Palette } from "@/components/Editor/Palette";

export default function Result(props: any[]) {
    return (
        < div className="w-screen h-[calc(100vh-var(--header-height))]
        flex" >
            {/* options */}
            <div className="flex flex-col gap-5 shrink-0
                border-r-1 border-solid border-[var(--foreground)]
                font-light text-[.7rem]
                h-100% px-5 py-7">
                <div className="flex flex-col gap-3 items-center cursor-pointer">
                    <div className="w-6 h-6 bg-[var(--hilight)]"></div>
                    Templates
                </div>
                <div className="flex flex-col gap-3 items-center cursor-pointer">
                    <div className="w-6 h-6 bg-[var(--hilight)]"></div>
                    Design
                </div>
                <div className="flex flex-col gap-3 items-center cursor-pointer">
                    <div className="w-6 h-6 bg-[var(--hilight)]"></div>
                    Add Section
                </div>
                {/* <div className="flex flex-col gap-3 items-center cursor-pointer">
                    <div className="w-6 h-6 bg-[var(--hilight)]"></div>
                    Download
                </div> */}
            </div>
            {/* body */}
            <div className="h-100% grow-1 overflow-scroll">
                <Palette />
                {/* <PdfGenerator /> */}
            </div>
        </div >
    );
}

export function getStaticProps() {
    return {
        props: {
            pageName: "Result",
            privateFooter: true
        },
    };
}
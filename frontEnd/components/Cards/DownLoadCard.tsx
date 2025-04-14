import axios from "@/lib/axios";
import { Plus, FileDown, ImageDown } from "lucide-react";

export const DownloadCard = (props: {
    updateShow: Function, 
    tid: string
}) => {    
    // 退出：销毁组件
    const handleExt = () => {
        props.updateShow(false);
    }
    const downPNG = () => {
        document.getElementById('PNG')!.click();
        finishDown()
    }
    const downPDF = () => {
        document.getElementById('PDF')!.click();
        finishDown()
    }
    const finishDown = () => {
        axios.post('/tp/down', {
            tid: props.tid
        });
        props.updateShow(false);
    }

    return (
        <div className="custom-hover-page-middle custom-card-base w-70">
            <div className="w-full flex justify-between">
                <h2 className="font-bold text-xl text-[var(--foreground)]">
                    Free for first time
                </h2>
                <button className="cursor-pointer" onClick={handleExt}>
                    <Plus className="rotate-45 hover:rotate-90 duration-100
                    text-[var(--pink)]"/>
                </button>
            </div>
            <p className="mb-2">
                Choose download format.
            </p>
            <div className="w-full flex justify-center gap-8">
                <div className="flex flex-col items-center cursor-pointer hover:text-[var(--blue)] duration-200"
                onClick={downPNG}>
                    <div><ImageDown className="w-10 h-10 " /></div>
                    <div className="text-xs">PNG</div>
                </div>
                <div className="flex flex-col items-center cursor-pointer hover:text-[var(--blue)] duration-200"
                onClick={downPDF}>
                    <div><FileDown className="w-10 h-10" /></div>
                    <div className="text-xs">PDF</div>
                </div>
            </div>
        </div>
    )
}
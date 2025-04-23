import { useState, useEffect } from "react";

import { PdfGenerator } from "@/components/PdfGenerator";
import { Palette } from "@/components/Editor/Palette";
import { PurchaseCard } from "@/components/Cards/PurchaseCard";
import { DownloadCard } from "@/components/Cards/DownLoadCard";
import { FaFileLines, FaPaintRoller, FaCirclePlus, FaDownload } from "react-icons/fa6";

import axios from '@/lib/axios';

export default function Result(props: any[]) {
    // 下载按钮相关内容
    const [showOPT, setShowOPT] = useState(false);
    const [showDown, setShowDown] = useState(false);
    const [tid, setTid] = useState('D10');

    useEffect(() => {
        // const tid = localStorage.getItem('tid');
        // if (tid) { setTid(tid) }
    }, [])

    const handleDownload = {
        download: () => {
            // check purchased
            axios.get('/tp/down',{
                params: {tid: 'tid'}
            }).then((res) => {
                let canDown = res.data.canDown
                if (canDown) {
                    setShowDown(true)
                } else {
                    setShowOPT(true);
                }
            })
        },

        // 关闭 Purchase Card
        handleUpdateShowOPT: (neoShowOPT: boolean) => {
            setShowOPT(neoShowOPT);
        }
    }
    const handleUpdateShowDown = (neoShowDown: boolean) => {
        setShowDown(neoShowDown);
    }
    // 切换模版
    const switchTemplate = () => {
        if (tid === 'D01') {
            localStorage.setItem('tid', 'S01')
            setTid('S01')
        } else {
            localStorage.setItem('tid', 'D01')
            setTid('D01')
        }
    }

    return (
        <div className="relative">
            {/* body */}
            <div className="min-w-screen max-w-screen min-h-[calc(100vh-var(--header-height))]
            overflow-x-hidden pt-10 relative flex flex-col gap-2 items-center">
                <h2 className="font-medium text-xl mb-2">
                    Result Preview
                </h2>
                <div className="px-10 pb-20 w-fit max-w-screen overflow-x-scroll">
                    <PdfGenerator tid={tid}/>
                </div>
                {/* <Palette /> */}
            </div >
            {/* options */}
            <div className="flex flex-col gap-5 shrink-0
                bg-white/[0.2] backdrop-blur-sm shadow-lg
                fixed top-[50vh] right-0 -translate-y-[50%]
                rounded-lg
                font-light text-[.7rem] px-3 py-5">
                <div className="custom-option-set" onClick={switchTemplate}>
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
                <div className="custom-option-set" onClick={handleDownload.download}>
                    <FaDownload className="custom-option-icon" />
                    Download
                </div>
            </div>
            {/* 购买提示 */}
            
            {
                showOPT ? 
                (<PurchaseCard 
                    // todo: TID 需要传入真实值
                    tid={tid} title="Oops! You haven't bought this template yet"
                    updateShow={handleDownload.handleUpdateShowOPT}
                />) : (<></>)
            }
            {
                showDown ? (
                    <DownloadCard tid={tid} updateShow={handleUpdateShowDown}/>
                ):(<></>)
            }
        </div>
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
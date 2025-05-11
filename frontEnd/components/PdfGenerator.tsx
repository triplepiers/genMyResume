/*
    Ref:
    https://www.oryoy.com/news/shi-yong-react-he-jspdf-shi-xian-dom-zhuan-pdf-de-xiang-xi-bu-zhou-yu-dai-ma-shi-li.html
*/
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/pdf.module.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from '@/lib/axios';

import { message } from 'antd';
import { handleProfile } from '@/lib/utils';
import templates from '@/templates';

export const PdfGenerator = (props:{ 
    tid: string,
    themeClr: string
}) => {
    const { themeClr } = props;
    const router = useRouter();
    const [result, setResult] = useState<any>();
    const [messageApi, contextHolder] = message.useMessage();

    const loadTemplate = (tid: string, profile: any) => {
        if(tid.length===0) return
        let { head, edus, works, skill, award, ss } = profile;
        let renderer = templates[tid] as Function;
        setResult(renderer(head, edus, works, award, skill, ss, themeClr))
    }
    
    useEffect(() => {
        axios.get('/tp/profile').then((res) => {
            if (res.status === 200) { 
                return res.data.profile
            } else if (res.status === 204) {
                return false
            }
        }).then((profile) => {
            if (!profile) {
                messageApi.open({
                    type: 'error',
                    content: 'Please complete your information first',
                });
                setTimeout(() => router.replace('/checkout'), 2000);
                return;
            }
            loadTemplate(props.tid, handleProfile(profile))
        })
    }, [props.tid, props.themeClr])

    const generate = (isPDF: boolean) => {
        const input = document.getElementById("pdf") as HTMLElement;
        // 写死，解决扩展屏上导出比例异常问题
        input.ownerDocument.defaultView!.devicePixelRatio = 2;
        html2canvas(input, {
            width: input.getBoundingClientRect().width,
            height: input.getBoundingClientRect().height,
            scale: 3 // 分辨率
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png", 1);
            if (isPDF) {
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save("resume.pdf");
            } else {
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'resume.png';
                link.click();
            }
        });
    }

    return (
        <>
        {contextHolder}
        <div id="pdf" className={`${styles.pdf} gap-1`}>
            {result}
        </div>
        <button id='PDF' onClick={() => generate(true)} className='w-0 h-0 hidden'>PDF</button>
        <button id='PNG' onClick={() => generate(false)} className='w-0 h-0 hidden'>PNG</button>
        </>
    )
};


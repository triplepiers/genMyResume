/*
    Ref:
    https://www.oryoy.com/news/shi-yong-react-he-jspdf-shi-xian-dom-zhuan-pdf-de-xiang-xi-bu-zhou-yu-dai-ma-shi-li.html
*/
import { useEffect, useState } from 'react';
import styles from '@/styles/pdf.module.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from '@/lib/axios';

import genTemplate from '@/templates/Single/01';
import { handleProfile } from '@/lib/utils';

export const PdfGenerator = (props:{}) => {
    const [headPF, setHeadPF] = useState({})
    const [eduPF, setEduPF] = useState([])
    const [wkPF, setWkPF] = useState([])
    const [awardPF, setAwardPF] = useState('')
    const [skillPF, setSkillPF] = useState({lans: [] as any[], customs: [] as any[]})
    const [ssPF, setSSPF] = useState('')

    useEffect(() => {
        axios.get('/tp/profile').then((res) => {
            if (res.status === 200) { return res.data.profile}
        }).then((tmp) => {
            let { head, edus, works, skill, award, ss } = handleProfile(tmp)
            setHeadPF(head)
            setEduPF(edus)
            setWkPF(works)
            setAwardPF(award)
            setSkillPF(skill)
            setSSPF(ss)
        })
    }, [])

    const quality = 3.3; // 必须和央视表对应
    const generate = (isPDF: boolean) => {
        const input = document.getElementById("pdf") as HTMLElement;
        html2canvas(input, {
            width: 210 * quality,
            height: 297 * quality
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
        <div id="pdf" className={`${styles.pdf} gap-1`}>
            {genTemplate(headPF, eduPF, wkPF, awardPF, skillPF, ssPF)}
        </div>
        <button id='PDF' onClick={() => generate(true)} className='w-0 h-0 hidden'>PDF</button>
        <button id='PNG' onClick={() => generate(false)} className='w-0 h-0 hidden'>PNG</button>
        </>
    )
};


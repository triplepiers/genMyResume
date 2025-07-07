/*
    
*/
'use client'

/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 * 
 * Credit to:
 *  https://www.oryoy.com/news/shi-yong-react-he-jspdf-shi-xian-dom-zhuan-pdf-de-xiang-xi-bu-zhou-yu-dai-ma-shi-li.html
 */

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/pdf.module.css';

import domtoimage from 'dom-to-image';
import { jsPDF } from 'jspdf';

import axios from '@/lib/axios';

import { message } from 'antd/lib';
import { handleProfile } from '@/lib/utils';
import templates from '@/templates';

import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { EditIcon } from 'lucide-react';

export const PdfGenerator = (props: {
    tid: string,
    themeClr: string,
    font: string
}) => {
    const { themeClr, font } = props;
    const router = useRouter();
    const [result, setResult] = useState<any>();
    const [messageApi, contextHolder] = message.useMessage();

    const loadTemplate = (tid: string, profile: any) => {
        if (tid.length === 0) return
        let { head, edus, works, skill, award, ss, adds } = profile;
        let renderer = templates[tid] as Function;
        setResult(renderer(head, edus, works, award, skill, ss, adds, themeClr))
    }

    useEffect(() => {
        const account = localStorage.getItem('account');
        if (!account) router.push('/login')
        else {
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
                    setTimeout(() => router.replace('/select'), 2000);
                    return;
                }
                loadTemplate(props.tid, handleProfile(profile))
            })
        }
    }, [props.tid, props.themeClr, props.font])

    const [ query, setQuery ] = useState("");
    const items: MenuProps['items'] = [
        {
            label: (
                <a href={`/checkout?${query}`} className='flex gap-2 align-center'>
                    <EditIcon className='w-[1rem] h-[1rem]' /> <div className='leading-none'>Edit</div>
                </a>
            ),
            key: '1',
        },
    ];

    const goEdit = (e: any) => {
        if (e.button === 2) { // 右键单击
            let secStr = e.currentTarget.dataset.section;
            let q = '';
            switch (secStr) {
                case 'head':
                    q = 'step=0';
                    break;
                case 'edu':
                    q = 'step=1';
                    break;
                case 'work':
                    q = 'step=2';
                    break;
                case 'award':
                    q = 'step=3';
                    break;
                case 'lan':
                    q = 'step=3&mode=lan';
                    break;
                case 'skill':
                    q = 'step=3&mode=else';
                    break;
                case 'ss':
                    q = 'step=5';
                    break;
                default:
                    q = `step=4&uuid=${secStr}`
                    break;
            }
            setQuery(q);
        }
    }
    useEffect(() => {
        const secList = document.querySelectorAll('[data-section]');
        secList.forEach((el: any) => {
            el.addEventListener('contextmenu', (e: any) => {
                e.preventDefault(); // 阻止默认菜单
            });
            el.addEventListener('mousedown', goEdit)
        })
        return () => {
            secList.forEach((el: any) => {
                el.removeEventListener('mousedown', goEdit);
                el.removeEventListener('contextmenu', (e: any) => {
                    e.preventDefault(); // 阻止默认菜单
                });
            })
        }
    }, [result])

    const generate = (isPDF: boolean) => {
        const input = document.getElementById("pdf") as HTMLElement;
        // 写死，解决扩展屏上导出比例异常问题
        input.ownerDocument.defaultView!.devicePixelRatio = 2;

        domtoimage.toJpeg(input)
            .then(function (dataUrl) {
                if (isPDF) {
                    const doc = new jsPDF();
                    // load image
                    doc.addImage(dataUrl, 'JPEG', 0, 0, 210, 297);
                    doc.save('resume.pdf');
                } else {
                    const link = document.createElement('a');
                    link.download = 'resume.jpeg';
                    link.href = dataUrl;
                    link.click();
                }
            })
    }

    return (
        <>
            {contextHolder}
            <Dropdown menu={{ items }} trigger={['contextMenu']}>
                <div id="pdf" className={`${styles.pdf} gap-1 bg-white`}
                    style={{ fontFamily: font }}>
                    {result}
                </div>
            </Dropdown>
            <button id='PDF' onClick={() => generate(true)} className='w-0 h-0 hidden'>PDF</button>
            <button id='PNG' onClick={() => generate(false)} className='w-0 h-0 hidden'>PNG</button>
        </>
    )
};


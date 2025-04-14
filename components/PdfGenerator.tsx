/*
    Ref:
    https://www.oryoy.com/news/shi-yong-react-he-jspdf-shi-xian-dom-zhuan-pdf-de-xiang-xi-bu-zhou-yu-dai-ma-shi-li.html
*/
import { useEffect, useState } from 'react';
import styles from '@/styles/pdf.module.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from '@/lib/axios';

export const PdfGenerator = (props:{}) => {
    const [headPF, setHeadPF] = useState({})
    const [eduPF, setEduPF] = useState([])
    const [wkPF, setWkPF] = useState([])
    const [awardPF, setAwardPF] = useState('')
    const [skillPF, setSkillPF] = useState({lans: [] as any[], customs: [] as any[]})
    const [ssPF, setSSPF] = useState('')
    const upperTitle = true;
    const capitalized = (s: string) => {return s.charAt(0).toUpperCase() + s.slice(1)}
    const formDate = (month: string, year: string, mFirst: boolean=true, showNum: boolean=true) => {
        if (month.length===0) return ''
        let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if (showNum) {
            let monNum = monthList.indexOf(month) + 1
            if (monNum < 10) { month = `0${monNum}`}
            else { month = monNum.toString() }
        }
        return mFirst ? `${month}.${year}` : `${year}.${month}`;
    }
    const blocks = [
        {title: 'Education', content: eduPF.map((edu: any) => {
            return (
                <div className='flex flex-col gap-1'>
                    <div className='flex justify-between font-bold'>
                        <div>
                            {edu.institution}{edu.degree ? ` (${edu.degree === 'Enter your own' ? edu.neodegree : edu.degree})` : ''}
                        </div>
                        <div>
                            {edu.location}
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='underline'>
                            {capitalized(edu.field)}
                        </div>
                        {
                            edu.showDate ? (<div>
                                {formDate(edu.bg_month, edu.bg_year)}{edu.divDate ? ' - ' : ''}{formDate(edu.ed_month, edu.ed_year)}
                            </div>) : (<></>)
                        }
                    </div>
                    {
                        edu.showMore ? (<div>{edu.more}</div>) : (<></>)
                    }
                </div>
            )})
        },
        {title: 'Work Experience', content: wkPF.map((work:any) => {
            return (
                <div className='flex flex-col gap-1'>
                    {
                        work.showComp?(
                        <div className='flex justify-between font-bold'>
                            <div>{work.company}</div>
                            <div>{work.location}</div>
                        </div>):(<></>)
                    }
                    <div className='flex justify-between'>
                        <div className='underline grow-1'>{work.title}</div>
                        {
                            work.showDate?(<div>
                                {formDate(work.bg_month, work.bg_year)}{work.divDate ? ' - ' : ''}{formDate(work.ed_month, work.ed_year)}
                            </div>):(<></>)
                        }
                        {
                            work.showMore?(<div>{work.more}</div>) : (<></>)
                        }
                    </div>
                </div>
            )
        })},
        {title: 'Awards & Certifications', content: (<div>{awardPF}</div>)},
        {title: 'Additional Information', content: (
            <div>
                {
                    skillPF.lans.length>0?(<div className='pl-1'>
                        <b>Languages: </b> {
                            skillPF.lans.map((lan:any, idx) => {
                                return (<span key={idx}>
                                    {lan.lan}{lan.level.length>0?` (${lan.level})`:''}{idx<skillPF.lans.length-1?', ':''}
                                </span>)
                            })
                        }
                    </div>):(<></>)
                }
                {
                    skillPF.customs.length>0?(<div className='pl-1'>
                        <b>Skills: </b> {
                            skillPF.customs.map((cst:any, idx) => {
                                return (<span key={idx}>
                                    {cst.title}{cst.desc.length>0?` (${cst.level})`:''}{idx<skillPF.customs.length-1?', ':''}
                                </span>)
                            })
                        }
                    </div>):(<></>)
                }
            </div>
        )},
        {title: 'Self-Statement', content: (<div className='text-justify indent-4'>{ssPF}</div>)},
    ]
    useEffect(() => {
        axios.get('/tp/profile').then((res) => {
            if (res.status === 200) { return res.data.profile}
        }).then((tmp) => {
            let head = JSON.parse(tmp.head)
            head.showProf = head.profession && head.profession.length > 0
            head.showContact = (head.phone&&head.phone.length>0) || (head.email&&head.email.length>0)
            head.divContact = (head.phone&&head.phone.length>0) && (head.email&&head.email.length>0)
            setHeadPF(head)

            let edus = tmp.edus.map((eduInfo: string) => { 
                let edu = JSON.parse(eduInfo)
                edu.divDate = (edu.bg_month&&edu.bg_month.length>0) && (edu.ed_month&&edu.ed_month.length>0)
                edu.showDate = (edu.bg_month&&edu.bg_month.length>0) || (edu.ed_month&&edu.ed_month.length>0)
                edu.showMore = edu.more&&edu.more.length>0
                return edu
            })
            setEduPF(edus)

            let works = tmp.works.map((workInfo: string) => { 
                let work = JSON.parse(workInfo)
                work.divDate = (work.bg_month&&work.bg_month.length>0) && (work.ed_month&&work.ed_month.length>0)
                work.showComp = (work.company&&work.company.length>0) || (work.location&&work.location.length>0)
                work.showDate = (work.bg_month&&work.bg_month.length>0) || (work.ed_month&&work.ed_month.length>0)
                work.showMore = work.more&&work.more.length>0
                return work
            })
            setWkPF(works)
            setAwardPF(tmp.award)

            let skill = {lans: [], customs: []}
            tmp.skills
            .map((skill: string) => { return JSON.parse(skill)})
            .forEach((item:any) => {
                if(item.isLan) { skill.lans.push(item) } 
                else { skill.customs.push(item)}
            })
            console.log(skill.lans)
            setSkillPF(skill)

            setSSPF(tmp.ss)
        })
    }, [])

    const quality = 2; // 必须和央视表对应
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
        <div id="pdf" className={`${styles.pdf} gap-1`}>
            {/* head wrap */}
            <div className='w-full flex flex-col items-center'>
                {/* name wrap */}
                <div className='text-3xl font-bold'>
                    {headPF.name} {headPF.surname}
                </div>
                {
                    headPF.showProf ?(
                        <div>
                            {headPF.profession}
                        </div>
                    ):(<></>)
                }
                {
                    headPF.showContact ? (
                        <div className='flex gap-2'>
                            <div>
                                <b>Tel:</b> {headPF.phone}
                            </div>
                            {
                                headPF.divContact ? (<div>|</div>) : (<></>)
                            }
                            <div>
                                <b>Email:</b> {headPF.email}
                            </div>
                        </div>
                    ):(<></>)
                }
            </div>
            {/* body wrap */}
            <div className='w-full flex flex-col gap-2'>
                {
                    blocks.map((block) => {
                        return (
                            <div key={block.title} className='w-full flex flex-col justify-begin'>
                                <h2 className='text-[var(--foreground)] font-bold text-xl pb-1 border-b-[0.5px] border-black'>
                                    {upperTitle ? block.title.toUpperCase() : block.title}
                                </h2>
                                <div className='px-3 py-1 flex flex-col gap-1'>
                                    {block.content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* <button onClick={() => generate(true)} className={styles.btn}>Generate PDF</button> */}
            {/* <button onClick={() => generate(false)} className={styles.btn}>Generate PNG</button> */}
        </div>


    )
};


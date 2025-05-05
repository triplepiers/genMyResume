import { formDate, darkenColor, genItemTitle } from '@/lib/utils';
import { 
    BriefcaseBusinessIcon, GraduationCapIcon, SpeechIcon, ShapesIcon, TrophyIcon
} from 'lucide-react';

import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { IconTitle } from '@/components/Templates/BlockTitle/Icon';
import { LevelDot } from '@/components/Templates/showLevel/Dot';

const upperTitle = false
const mFirst = false
const rounded = true
const outlined = false

function genEdu(eduPF: any, theme_clr: string) {
    const genTitle = genItemTitle.EDU.Title;
    const genSubTitle = genItemTitle.EDU.SubTitle;
    return {
        icon: (<><GraduationCapIcon /></>),
        title: 'Education',
        content: eduPF.map((edu: any) => {
            return (
                <div className='flex flex-col pl-[3rem] mt-2'>
                    <div className='relative'>
                        <div className='absolute top-[50%] -translate-y-[50%] left-[-2.35rem] 
                        w-3 h-3 rounded-full' 
                        style={{ backgroundColor: theme_clr }}></div>
                        { edu.showDate ? (
                        <div className='text-white text-xs
                        absolute top-[50%] -translate-y-[50%] left-[-12rem] '>
                            {formDate(edu.bg_month, edu.bg_year, mFirst)}{edu.divDate ? ' - ' : ''}{formDate(edu.ed_month, edu.ed_year, mFirst)}
                        </div>) : (<></>)
                        }
                        <div className='w-full text-lg font-bold'>
                            { edu.degree ? genTitle(edu.degree, edu.neodegree, edu.institution): '' }
                        </div>
                    </div>
                    <div className='text-sm my-1'>
                        <i>{ genSubTitle(edu.field, edu.location) }</i>
                    </div>                
                    {
                        edu.showMore ? (<div className='text-sm'>{edu.more}</div>) : (<></>)
                    }
                </div>
            )
        })
    }
}
function genWork(wkPF: any ,theme_clr: string) {
    const genSubTitle = genItemTitle.WORK.SubTitle;
    return {
        icon: (<><BriefcaseBusinessIcon /></>),
        title: 'Work Experience', content: wkPF.map((work: any) => {
            return (
                <div className='flex flex-col pl-[3rem] mt-2'>
                    <div className='relative'>
                        <div className='absolute top-[50%] -translate-y-[50%] left-[-2.35rem] 
                        w-3 h-3 rounded-full' 
                        style={{ backgroundColor: theme_clr }}></div>
                        { work.showDate ? (
                        <div className='text-white text-xs
                        absolute top-[50%] -translate-y-[50%] left-[-12rem] '>
                            {formDate(work.bg_month, work.bg_year, mFirst)}{work.divDate ? ' - ' : ''}{formDate(work.ed_month, work.ed_year, mFirst)}
                        </div>) : (<></>)
                        }
                        <div className='w-full text-lg font-bold'>
                            {work.title}
                        </div>
                    </div>
                    {
                        work.showComp ? (
                            <div className='text-sm my-1'>
                                <i>{ genSubTitle(work.company, work.location) }</i>
                            </div>
                        ):(<></>)
                    }
                    {
                        work.showMore ? (<div className='text-sm'>{work.more}</div>) : (<></>)
                    }
                </div>
            )
        })
    }
}
function genAward(awardPF: any, theme_clr: string) {
    return {
        icon: (<><TrophyIcon /></>),
        title: 'Awards', 
        content: (<div className='pl-[3rem] mt-2 w-full text-sm'>
           <div className='relative'>
                <div className='absolute top-[50%] -translate-y-[50%] left-[-2.35rem] 
                        w-3 h-3 rounded-full' style={{ backgroundColor: theme_clr }}></div>
                <div>{awardPF}</div>
           </div>
        </div>)
    }
}
function genSkill(skillPF: any, theme_clr: string) {
    return [
        {
            icon: (<><SpeechIcon /></>),
            title: 'Languages', 
            content: (<>{
                skillPF.lans.length > 0 ? (<>{
                    skillPF.lans.map((lan: any, idx: number) => {
                        return (
                        <div key={idx} className='pl-[3rem] mt-2 w-full text-sm flex justify-between'>
                            <div className='relative h-fit'>
                                <div><b>{lan.lan}</b></div>
                                <div className='absolute top-[50%] -translate-y-[50%] left-[-2.35rem] 
                                w-3 h-3 rounded-full' style={{ backgroundColor: theme_clr }}></div>
                            </div>
                            {
                                lan.level.length > 0? (
                                    <LevelDot 
                                        level={lan.level}
                                        rounded={rounded} outlined={outlined}
                                        ftClr={theme_clr} bgClr='#D1d5db'
                                    />
                                ):(<></>)
                            }
                        </div>)
                        })
                }</>) : (<></>)                
            }</>)
        }, {
            icon: (<><ShapesIcon /></>),
            title: 'Skills',
            content: (<>{
                skillPF.customs.length>0?(<>{
                    skillPF.customs.map((cst:any, idx: number) => {
                        return (
                        <div key={idx} className='pl-[3rem] mt-2 w-full text-sm flex justify-between'>
                            <div className='relative h-fit'>
                                <div><b>{cst.title}</b></div>
                                <div className='absolute top-[50%] -translate-y-[50%] left-[-2.35rem] 
                                w-3 h-3 rounded-full' style={{ backgroundColor: theme_clr }}></div>
                            </div>
                            {
                                cst.desc.length > 0? (<div>{cst.desc}</div>):(<></>)
                            }
                        </div>)                       
                    })
                }</>):(<></>)
            }</>)
        }
    ]
}
function genSS(ssPF: any, theme_clr: string) {
    return (
        <div className='w-full pl-[20px] pr-[60px] text-justify text-sm my-2'>
            <div className='font-bold'
            style={{ color: theme_clr }}>Self Statement</div>
            <div className='indent-4 leading-tight'>{ssPF}</div>
        </div>
    ) 
}
function genSections(headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string) {
    let blocks = [
        genWork(wkPF, theme_clr),
        genEdu(eduPF, theme_clr),
        ...genSkill(skillPF, theme_clr),
        genAward(awardPF, theme_clr),
    ]
    return blocks;
}

const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#003D75') => {
    let blocks = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex'
            style={{ fontFamily: 'sans-serif' }}>
            <div className='w-[22%] shrink-0 h-auto text-white'
                style={{ backgroundColor: darkenColor(theme_clr, 0.4)}}>
            </div>
            <div className='grow-1 h-full'>
                <div className='pb-[20px]'>
                    <FullDarkHeader 
                        ftClr={darkenColor(theme_clr, 0.4)} bgClr='transparent'
                        subClr={theme_clr}
                        headPF={headPF} inlineContact={true} 
                        classList='px-[20px] pt-[20px]'
                        contactIcon={true} contactIconBgClr={theme_clr} contactIconFtClr='#FFF'
                        contactClr='var(--foreground)' 
                    />
                    <>{genSS(ssPF, theme_clr)}</>
                </div>
                <div className='pb-[20px]'>
                {
                    blocks.map((block: any, idx: number) => {
                        return (
                        <div className='px-[20px]'>
                            <IconTitle
                                icon={block.icon} rounded={rounded}
                                underLine={false} topLine={false}
                                ftClr={theme_clr} bgClr='transparent' iconClr='#FFF'
                                title={block.title} upperCase={upperTitle}
                                classList='pb-0'
                            />
                            <div className='w-full relative pb-[20px]'>
                                <div className='h-[calc(100%)] w-1 border-l-1
                                absolute left-[1rem] top-0'></div>
                                <div className='w-full flex flex-col gap-1'>{block.content}</div>
                            </div>
                        </div>)
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default genTemplate

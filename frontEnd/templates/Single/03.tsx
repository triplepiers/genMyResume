import { capitalized, formDate, genItemTitle } from '@/lib/utils';
import {
    BriefcaseBusinessIcon, GraduationCapIcon, SpeechIcon, ShapesIcon, TrophyIcon
} from 'lucide-react';

import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { IconTitle } from '@/components/Templates/BlockTitle/Icon';
import { LevelDot } from '@/components/Templates/showLevel/Dot';

const upperTitle = false
const mFirst = false
const rounded = false
const rotate = true
const inlineTime = false
const outlined = false

function genEdu(eduPF: any, theme_clr: string) {
    const genTitle = genItemTitle.EDU.Title;
    const genSubTitle = genItemTitle.EDU.SubTitle;
    return {
        icon: (<><GraduationCapIcon /></>),
        title: 'Education',
        content: eduPF.map((edu: any) => {
            return (
                <div className='flex pl-[3rem] mt-2'>
                    <div className='text-xs font-mono w-20 pt-1'>
                        {
                            edu.showDate ? (<>
                                {formDate(edu.bg_month, edu.bg_year)}{edu.divDate ? ' - ' : ''}{formDate(edu.ed_month, edu.ed_year)}
                            </>) : (<></>)
                        }
                    </div>
                    <div className='flex flex-col'>
                        <div className='w-full text-lg font-bold relative'>
                            { edu.degree ? genTitle(edu.degree, edu.neodegree, edu.institution): '' }
                            <div className='absolute top-[50%] -translate-y-[50%] left-[-7.25rem] 
                            w-2.5 h-2.5 z-2' 
                            style={{ backgroundColor: theme_clr, transform: 'rotate(45deg)' }}>
                            </div>
                        </div>
                        <div className='text-sm my-1'>
                            <i>{ genSubTitle(edu.field, edu.location) }</i>
                        </div>
                        {
                            edu.showMore ? (<div className='text-sm'>{edu.more}</div>) : (<></>)
                        }
                    </div>
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
                <div className='flex pl-[3rem] mt-2'>
                    <div className='text-xs font-mono w-20 pt-2'>{
                        work.showDate ? (<>
                            {formDate(work.bg_month, work.bg_year)}{work.divDate ? ' - ' : ''}{formDate(work.ed_month, work.ed_year)}
                        </>) : (<></>)
                    }
                    </div>
                    <div className='flex flex-col'>
                        <div className='w-full text-lg font-bold relative'>
                            {work.title}
                            <div className='absolute top-[50%] -translate-y-[50%] left-[-7.25rem] 
                            w-2.5 h-2.5 z-2' 
                            style={{ backgroundColor: theme_clr, transform: 'rotate(45deg)' }}>
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
                </div>
            )
        })
    }
}
function genAward(awardPF: any, theme_clr: string) {
    return {
        icon: (<><TrophyIcon /></>),
        title: 'Awards', 
        content: (
            <div className='flex pl-[3rem] mt-2 w-full text-sm'>
                <div className={`text-xs font-mono pt-1 w-${inlineTime?'36':'20'}`}></div>
                <div className='relative mt-1'>
                    <div className='absolute top-[50%] -translate-y-[50%] left-[-7.25rem] 
                        w-2.5 h-2.5 z-2' 
                        style={{ backgroundColor: theme_clr, transform: 'rotate(45deg)'}}></div>
                    <div>{awardPF}</div>
                </div>
            </div>
        )
    }
}
function genSkill(skillPF: any, theme_clr: string) {
    function levelToIdx(level: string) {
        switch(level) {
            case 'Elementary':
                return 1
            case 'Limited':
                return 2
            case 'Professional':
                return 3
            case 'Full Professional':
                return 4
            case 'Native':
                return 5
        }
    }
    return [
        {
            icon: (<><SpeechIcon /></>),
            title: 'Languages', 
            content: (<>{
                skillPF.lans.length > 0 ? (<>{
                    skillPF.lans.map((lan: any, idx: number) => {
                        return (
                        <div key={idx} className='pl-[3rem] mt-2 w-full text-sm flex justify-between'>
                            <div className='relative h-fit mt-1'>
                                <div><b>{lan.lan}</b></div>
                                <div className='absolute top-[50%] -translate-y-[50%] left-[-2.25rem] 
                                w-2.5 h-2.5 z-2' 
                                style={{ backgroundColor: theme_clr, transform: 'rotate(45deg)' }}>
                            </div>
                            </div>
                            {
                                lan.level.length > 0? (<div className='pt-1 w-full flex flex-col gap-1 items-end'>
                                    <LevelDot 
                                        level={lan.level} rotate={rotate}
                                        rounded={rounded} outlined={outlined}
                                        ftClr={theme_clr} bgClr='#D1d5db'
                                    />
                                </div>):(<></>)
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
                            <div className='relative h-fit mt-1'>
                                <div className='absolute top-[50%] -translate-y-[50%] left-[-2.25rem] 
                                    w-2.5 h-2.5 z-2' 
                                    style={{ backgroundColor: theme_clr, transform: 'rotate(45deg)' }}></div>
                                <div>
                                    <span><b>{cst.title}</b></span>
                                    {
                                        cst.desc.length > 0? (<> - {cst.desc}</>):(<></>)
                                    }
                                </div>
                            </div>
                            
                        </div>)                       
                    })
                }</>):(<></>)
            }</>)
        }
    ]
}
function genSS(ssPF: any, theme_clr: string) {
    return (
        <div className='w-full text-justify text-sm mb-4'>
            <div className='font-bold pb-1'
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


const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#333333') => {
    let blocks = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex flex-col'
            style={{ fontFamily: 'sans-serif' }}>
            <FullDarkHeader 
                ftClr='#fff' bgClr={theme_clr} 
                headPF={headPF} inlineContact={true} 
                classList='px-[40px] pt-[30px] pb-[20px]'
            />
            <div className='px-[40px] pt-[20px] pb-[30px] flex flex-col'>
                <>{genSS(ssPF, theme_clr)}</>
            {
                blocks.map((block: any, idx: number) => {
                    return (
                    <div>
                        <IconTitle
                            icon={block.icon} rounded={rounded} rotate={rotate}
                            underLine={false} topLine={false}
                            ftClr={theme_clr} bgClr='transparent' iconClr='#FFF'
                            title={block.title} upperCase={upperTitle}
                            classList='pb-0 z-3'
                        />
                        <div className='w-full relative pb-[20px]'>
                            <div className='h-[calc(100%)] w-1 border-l-1
                            absolute z-1 left-[1rem] top-0'></div>
                            <div className='w-full flex flex-col gap-1'>{block.content}</div>
                        </div>
                    </div>)
                })
            }
            </div>
        </div>
    )
}

export default genTemplate

import { genItemTitle } from '@/lib/utils';
import { 
    BriefcaseBusinessIcon, GraduationCapIcon, SpeechIcon, ShapesIcon, TrophyIcon, UserIcon
} from 'lucide-react';

import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { IconTitle } from '@/components/Templates/BlockTitle/Icon';
import { LevelDot } from '@/components/Templates/showLevel/Dot';
import { LRItem } from '@/components/Templates/Item/LR';

const upperTitle = false
const mFirst = false
const rounded = false
const outlined = false
const inlineTime = true

function genEdu(eduPF: any, theme_clr: string) {
    const genTitle = genItemTitle.EDU.Title;
    const genSubTitle = genItemTitle.EDU.SubTitle;
    return {
        section: 'edu',
        icon: (<><GraduationCapIcon /></>),
        title: 'Education',
        content: eduPF.map((edu: any) => {
            return (
                <LRItem
                    inlineTime={inlineTime}
                    showDate={edu.showDate} divDate={edu.divDate} mFirst={mFirst}
                    bg_month={edu.bg_month} bg_year={edu.bg_year} ed_month={edu.ed_month} ed_year={edu.ed_year}
                    title={ edu.degree ? genTitle(edu.degree, edu.neodegree, edu.institution): '' }
                    subTitle={ genSubTitle(edu.field, edu.location) }
                    showDetail={edu.showMore}
                    details={edu.more}
                />
            )
        })
    }
}
function genWork(wkPF: any ,theme_clr: string) {
    const genSubTitle = genItemTitle.WORK.SubTitle;
    return {
        section: 'work',
        icon: (<><BriefcaseBusinessIcon /></>),
        title: 'Work Experience', 
        content: wkPF.map((work: any) => {
            return (
                <LRItem
                    inlineTime={inlineTime}
                    showDate={work.showDate} divDate={work.divDate} mFirst={mFirst}
                    bg_month={work.bg_month} bg_year={work.bg_year} ed_month={work.ed_month} ed_year={work.ed_year}
                    title={ work.title } 
                    subTitle={ genSubTitle(work.company, work.location) }
                    showDetail={work.showMore}
                    details={work.more}
                />
            )
        })
    }
}
function genAward(awardPF: any, theme_clr: string) {
    return {
        section: 'award',
        icon: (<><TrophyIcon /></>),
        title: 'Awards', 
        content: (
            <div className='flex'>
                <div className='text-xs font-mono w-36 pt-1'></div>
                <div className='flex flex-col'>{awardPF}</div>
            </div>
        )
    }
}
function genSkill(skillPF: any, theme_clr: string) {
    return [
        {
            section: 'lan',
            icon: (<><SpeechIcon /></>),
            title: 'Languages', 
            content: (<>{
                skillPF.lans.length > 0 ? (<>{
                    skillPF.lans.map((lan: any, idx: number) => {
                        return (
                        <div key={idx} className='w-full text-sm flex justify-between'>
                           <div className={`w-${inlineTime?'36':'20'}`}></div>
                           <div className='grow-1 flex items-start'>
                                <div><b>{lan.lan}</b></div>
                                {
                                    lan.level.length > 0? (<div className='w-full flex flex-col gap-1 items-end'>
                                        <LevelDot 
                                            level={lan.level}
                                            rounded={rounded} outlined={outlined}
                                            ftClr={theme_clr} bgClr='#BBB'
                                        />
                                    </div>):(<></>)
                                }
                           </div>
                        </div>)
                        })
                }</>) : (<></>)                
            }</>)
        }, {
            section: 'skill',
            icon: (<><ShapesIcon /></>),
            title: 'Skills',
            content: (<>{
                skillPF.customs.length>0?(<>{
                    skillPF.customs.map((cst:any, idx: number) => {
                        return (
                        <div key={idx} className='w-full text-sm flex justify-between'>
                            <div className={`w-${inlineTime?'36':'20'}`}></div>
                            <div className='grow-1'>
                                <div>
                                    <b>{cst.title}</b>
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
        <div className='w-full text-justify text-sm my-2 px-[40px]' data-section='ss'>
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
        <div className='w-full h-full flex flex-col '
            style={{ fontFamily: 'sans-serif' }}>
                <div className='pb-[20px]'>
                    <div data-section='head'>
                        <FullDarkHeader 
                            ftClr={theme_clr} bgClr='transparent'
                            subClr={theme_clr}
                            headPF={headPF} inlineContact={true} 
                            contactIcon={true} contactIconBgClr={theme_clr} contactIconFtClr='#FFF'
                            contactClr='var(--foreground)' 
                        />
                    </div>
                    <>{genSS(ssPF, theme_clr)}</>
                </div>
                <div className='px-[40px] pb-[40px]'>
                {
                    blocks.map((block: any, idx: number) => {
                        return (
                            <div className='mb-4' data-section={block.section}>
                                <IconTitle
                                    icon={block.icon} rounded={rounded}
                                    underLine={true} topLine={false}
                                    ftClr='var(--foreground)' bgClr='transparent' iconClr='#FFF'
                                    title={block.title} upperCase={upperTitle}
                                />
                                <div className='w-full flex flex-col gap-1 pt-4'>{block.content}</div>
                            </div>)
                    })
                }
                </div>
        </div>
    )
}

export default genTemplate

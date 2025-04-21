import { genItemTitle } from '@/lib/utils';
import { 
    BriefcaseBusinessIcon, GraduationCapIcon, SpeechIcon, ShapesIcon, TrophyIcon, UserIcon
} from 'lucide-react';

import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { IconTitle } from '@/components/Templates/BlockTitle/Icon';
import { NoIconContact } from '@/components/Templates/Contact/NoIcon';
import { LRItem } from '@/components/Templates/Item/LR';
import { LevelDot } from '@/components/Templates/showLevel/Dot';

const upperTitle = false
const inlineTime = false
const mFirst = true
const rounded = true
const outlined = true

function genPersonalInfo(headPF: any, theme_clr: string) {
    return {
        icon: (<><UserIcon /></>),
        title: 'Personal Info',
        content: (<>
            <NoIconContact
                inline={false} ftClr={theme_clr}
                phone={headPF.phone}
                email={headPF.email}
            />
        </>)
    }
}
function genEdu(eduPF: any) {
    const genTitle = genItemTitle.EDU.Title;
    const genSubTitle = genItemTitle.EDU.SubTitle;
    return {
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
function genWork(wkPF: any) {
    const genSubTitle = genItemTitle.WORK.SubTitle;
    return {
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
function genAward(awardPF: any) {
    return {
        icon: (<><TrophyIcon /></>),
        title: 'Awards', 
        content: (
            <div className='flex'>
                <div className={`text-xs font-mono pt-1 w-${inlineTime?'36':'20'}`}></div>
                <div className='flex flex-col'>{awardPF}</div>
            </div>
        )
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
                        <div key={idx} className='w-full text-sm flex justify-between mt-3'>
                            <div><b>{lan.lan}</b></div>
                            {
                                lan.level.length > 0? (
                                    <LevelDot 
                                        level={lan.level}
                                        rounded={rounded} outlined={outlined}
                                        ftClr={theme_clr} bgClr='transparent'
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
                        <div key={idx} className='w-full text-sm flex justify-between'>
                            <div><b>{cst.title}</b></div>
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
        <div className='w-full text-justify text-sm my-2'>
            <div className='font-bold'
            style={{ color: theme_clr }}>Self Statement</div>
            <div className='indent-4 leading-tight'>{ssPF}</div>
        </div>
    ) 
}
function genSections(headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string) {
    let leftBlocks = [
        genPersonalInfo(headPF, theme_clr),
        ...genSkill(skillPF, theme_clr),
    ]
    let rightBlocks = [
        genWork(wkPF),
        genEdu(eduPF),
        genAward(awardPF),
    ]
    return { leftBlocks, rightBlocks };
}


const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#333333') => {
    let {leftBlocks, rightBlocks} = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex flex-col px-[40px] pt-[40px]'
            style={{ fontFamily: 'sans-serif' }}>
                <div className='pb-[20px]'>
                    <FullDarkHeader 
                        ftClr='var(--foreground)'
                        bgClr='transparent'
                        headPF={headPF}
                        showContactBlock={false}
                        classList='px-0 py-0'
                    />
                    <>{genSS(ssPF, theme_clr)}</>
                </div>
            <div className='flex gap-6'>
                <div className='w-[30%]'>
                    {
                        leftBlocks.map((block: any, idx: number) => {
                            return (
                                <div className='mb-4'>
                                    <IconTitle
                                        icon={block.icon} rounded={rounded}
                                        underLine={true} topLine={false}
                                        ftClr='var(--foreground)' bgClr='transparent' iconClr='#FFF'
                                        title={block.title} upperCase={upperTitle}
                                    />
                                    <div className='w-full flex flex-col gap-1 pl-2 pt-2'>{block.content}</div>
                                </div>)
                        })
                    }
                </div>
                <div className='grow-1'>
                    {
                        rightBlocks.map((block: any, idx: number) => {
                            return (
                                <div className='mb-4'>
                                    <IconTitle
                                        icon={block.icon} rounded={rounded}
                                        underLine={true} topLine={false}
                                        ftClr='var(--foreground)' bgClr='transparent' iconClr='#FFF'
                                        title={block.title} upperCase={upperTitle}
                                    />
                                    <div className='w-full flex flex-col gap-1 pl-2 pt-2'>{block.content}</div>
                                </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default genTemplate

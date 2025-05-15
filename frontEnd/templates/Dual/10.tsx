import { genItemTitle, formDate } from '@/lib/utils';
import {
    BriefcaseBusinessIcon, GraduationCapIcon, SpeechIcon, ShapesIcon, TrophyIcon, UserIcon,
} from 'lucide-react';
import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { IconTitle } from '@/components/Templates/BlockTitle/Icon';
import { NoIconContact } from '@/components/Templates/Contact/NoIcon';
import { LevelDot } from '@/components/Templates/showLevel/Dot';

const inlineTime = false;
const mFirst = false;
const rounded = true;
const outlined = false;

function genScript(name: string, surname: string) {
    return `${name.length > 0 ? name[0] : ''}${surname.length > 0 ? surname[0] : ''}`.toLowerCase()
}

function genPersonalInfo(headPF: any, theme_clr: string) {
    return {
        icon: (<><UserIcon /></>),
        title: 'Personal Information',
        content: (<>
            <NoIconContact
                inline={false}
                vertical={true}
                phone={headPF.phone}
                email={headPF.email}
                ftClr='var(--foreground)'
                gapY='gap-2'
            />
        </>)
    }
}
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
                        {edu.showDate ? (
                            <div className='text-xs w-20 font-mono
                            absolute top-[50%] -translate-y-[9px] left-[-7rem] '>
                                {formDate(edu.bg_month, edu.bg_year, mFirst)}{edu.divDate ? ' - ' : ''}{formDate(edu.ed_month, edu.ed_year, mFirst)}
                            </div>) : (<></>)
                        }
                        <div className='w-full text-lg font-bold'>
                            {edu.degree ? genTitle(edu.degree, edu.neodegree, edu.institution) : ''}
                        </div>
                    </div>
                    <div className='text-sm my-1'>
                        <i>{genSubTitle(edu.field, edu.location)}</i>
                    </div>
                    {
                        edu.showMore ? (<div className='text-sm'>{edu.more}</div>) : (<></>)
                    }
                </div>
            )
        })
    }
}
function genWork(wkPF: any, theme_clr: string) {
    const genSubTitle = genItemTitle.WORK.SubTitle;
    return {
        icon: (<><BriefcaseBusinessIcon /></>),
        title: 'Work Experience',
        content: wkPF.map((work: any) => {
            return (
                <div className='flex flex-col pl-[3rem] mt-2'>
                    <div className='relative'>
                        <div className='absolute top-[50%] -translate-y-[50%] left-[-2.35rem] 
                        w-3 h-3 rounded-full'
                            style={{ backgroundColor: theme_clr }}></div>
                        {work.showDate ? (
                            <div className='text-xs w-20 font-mono
                        absolute top-[50%] -translate-y-[9px] left-[-7rem] '>
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
                                <i>{genSubTitle(work.company, work.location)}</i>
                            </div>
                        ) : (<></>)
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
        content: (
            <div className='pl-[3rem] mt-2 w-full text-sm'>
                <div className='relative'>
                    <div className='absolute top-[50%] -translate-y-[50%] left-[-2.35rem] 
                        w-3 h-3 rounded-full' style={{ backgroundColor: theme_clr }}></div>
                    <div>{awardPF}</div>
                </div>
            </div>
        )
    }
}
function genSkill(skillPF: any, theme_clr: string) {
    return [
        {
            icon: (<><SpeechIcon /></>),
            title: 'Languages', content: (<>{
                skillPF.lans.length > 0 ? (<>{
                    skillPF.lans.map((lan: any, idx: number) => {
                        return (
                            <div key={idx} className='text-xs flex flex-col items-start'>
                                <div><b>{lan.lan}</b></div>
                                {
                                    lan.level.length > 0 ? (
                                        <div className='w-full flex justify-end'>
                                            <LevelDot
                                                level={lan.level}
                                                rounded={rounded} outlined={outlined}
                                                ftClr={theme_clr} bgClr='#BBB'
                                                descClr='var(--foreground)'
                                            />
                                        </div>
                                    ) : (<></>)
                                }
                            </div>)
                    })
                }</>) : (<></>)
            }</>)
        }, {
            icon: (<><ShapesIcon /></>),
            title: 'Skills',
            content: (<>{
                skillPF.customs.length > 0 ? (<>{
                    skillPF.customs.map((cst: any, idx: number) => {
                        return (
                            <div key={idx} className='text-xs flex flex-col'>
                                <div><b>{cst.title}</b></div>
                                {
                                    cst.desc.length > 0 ? (<div>{cst.desc}</div>) : (<></>)
                                }
                            </div>)
                    })
                }</>) : (<></>)
            }</>)
        }
    ]
}
function genSS(ssPF: any, theme_clr: string) {
    return (
        <div className='text-justify text-sm my-[20px]'>
            <div className='indent-4 leading-tight'>{ssPF}</div>
        </div>
    )
}

function genSections(headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string) {
    let rightBlocks = [
        ...genSkill(skillPF, theme_clr),
    ]
    if (headPF.showContact) {
        rightBlocks = [genPersonalInfo(headPF, theme_clr), ...rightBlocks]
    }

    let leftBlocks = [
        genEdu(eduPF, theme_clr),
        genWork(wkPF, theme_clr),
        genAward(awardPF, theme_clr),
    ]
    return { leftBlocks, rightBlocks }
}

const upperTitle = false
const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string = '#333333') => {
    let { leftBlocks, rightBlocks } = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex gap-[40px] px-[30px] py-[30px]'
            style={{ fontFamily: 'sans-serif' }}>
            <div className='grow-1 flex flex-col h-full'>
                <div className='gap-5 flex items-center h-fit'>
                    <div className='rounded-full w-18 h-18 shrink-0 relative'
                        style={{ backgroundColor: theme_clr, color: '#FFF', fontFamily: '"Satisfy", sans-serif' }}>
                        <div className='absolute bottom-2 right-4 text-2xl'>{genScript(headPF.name, headPF.surname)}</div>
                    </div>
                    <FullDarkHeader
                        ftClr={theme_clr} bgClr='transparent'
                        headPF={headPF}
                        showContactBlock={false}
                        classList='px-[0] py-[0]'
                    />
                </div>
                <>{genSS(ssPF, theme_clr)}</>
                <div className='pl-[50px]'>
                    {
                        leftBlocks.map((block: any, idx: number) => {
                            return (
                                <div key={idx}>
                                    <IconTitle
                                        icon={block.icon} iconClr='#FFF'
                                        underLine={false} topLine={false}
                                        rounded={rounded}
                                        ftClr={theme_clr} bgClr='transparent'
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
            <div className='w-[37%] shrink-0'>{
                rightBlocks.map((block: any, idx: number) => {
                    return (
                        <div className='pt-[20px]'>
                            <IconTitle
                                icon={block.icon} iconClr='#FFF'
                                rounded={rounded}
                                underLine={false} topLine={false}
                                fontSize='md'
                                ftClr={theme_clr} bgClr='transparent'
                                title={block.title} upperCase={upperTitle}
                                classList=''
                            />
                            <div className='w-full pt-2 flex flex-col gap-1'>
                                {block.content}
                            </div>
                        </div>)
                })
            }</div>

        </div>
    )
}

export default genTemplate

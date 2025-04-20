import { capitalized, formDate, darkenColor } from '@/lib/utils';
import { 
    MailIcon, PhoneIcon,
    BriefcaseBusinessIcon, GraduationCapIcon, SpeechIcon, ShapesIcon, TrophyIcon
} from 'lucide-react';

function genHead(headPF: any, theme_clr: string) {
    return (
        <div className='w-full flex flex-col items-start gap-1 px-[20px] pt-[20px]'
            style={{ color: theme_clr }}>
            <div className='text-3xl font-extrabold'
                style={{ color: darkenColor(theme_clr, 0.4)}}>
                {headPF.name} {headPF.surname}
            </div>
            {
                headPF.showProf ? (
                    <div>
                        {headPF.profession}
                    </div>
                ) : (<></>)
            }
            {
                headPF.showContact ? (
                <div className='w-full text-[var(--foreground)] flex my-2'>
                    {
                        headPF.phone.length>0?(
                        <div className='flex-1 flex items-center text-sm gap-2'>
                            <div className='rounded-full flex justify-center items-center w-[1.2rem] h-[1.2rem]'
                            style={{ backgroundColor: theme_clr }}>
                                < PhoneIcon className='text-white w-[65%] h-[65%]' />
                            </div>
                            <div><a href={`tel:${headPF.phone}`}>{headPF.phone}</a></div>
                        </div>):(<></>)
                    }
                    {
                        headPF.email.length>0?(
                            <div className='flex-1 flex items-center text-sm gap-2'>
                                <div className='rounded-full flex justify-center items-center w-[1.2rem] h-[1.2rem]'
                                style={{ backgroundColor: theme_clr }}>
                                    < MailIcon className='text-white w-[65%] h-[65%]' />
                                </div>
                                <div><a href={`mailto:${headPF.email}`}>{headPF.email}</a></div>
                            </div>):(<></>)
                    }
                </div>):(<></>)
            }
        </div>
    )
}
function genEdu(eduPF: any, theme_clr: string) {
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
                            {edu.degree ? ` ${edu.degree === 'Enter your own' ? edu.neodegree : edu.degree}` : ''}{
                                edu.degree.length>0 ? ', ': ''
                            }{edu.institution}
                        </div>
                    </div>
                    <div className='text-sm my-1'>
                        <i>{capitalized(edu.field)}{edu.location}</i>
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
                                <i>{capitalized(work.company)}{
                                    work.company.length>0&&work.location.length>0?', ':''
                                }{work.location}</i>
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
                            <div className='relative h-fit'>
                                <div><b>{lan.lan}</b></div>
                                <div className='absolute top-[50%] -translate-y-[50%] left-[-2.35rem] 
                                w-3 h-3 rounded-full' style={{ backgroundColor: theme_clr }}></div>
                            </div>
                            {
                                lan.level.length > 0? (<div className='pt-1 w-full flex flex-col gap-1 items-end'>
                                    <div className='flex gap-1'>
                                        {
                                            [1,2,3,4,5].map((idx: number) => {
                                                return (<div className='rounded-full w-3 h-3'
                                                style={{ backgroundColor: levelToIdx(lan.level)>idx?theme_clr:'#D1d5db' }}></div> // bg-gray-300
                                                )})
                                        }
                                    </div>
                                    <div className='text-xs'>{lan.level}</div>
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
                            <div className='relative h-fit'>
                                <div><b>{cst.title}</b></div>
                                <div className='absolute top-[50%] -translate-y-[50%] left-[-2.35rem] 
                                w-3 h-3 rounded-full' style={{ backgroundColor: theme_clr }}></div>
                            </div>
                            {
                                cst.desc.length > 0? (<div className='pt-1'>{cst.desc}</div>):(<></>)
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

const upperTitle = false
const mFirst = false
const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#003D75') => {
    let blocks = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex'
            style={{ fontFamily: 'sans-serif' }}>
            <div className='w-[18%] shrink-0 h-full text-white'
                style={{ backgroundColor: darkenColor(theme_clr, 0.4)}}>
            </div>
            <div className='grow-1'>
                <div className='pb-[20px]'>
                <>{genHead(headPF, theme_clr)}</>
                <>{genSS(ssPF, theme_clr)}</>
                </div>
                <div>
                {
                    blocks.map((block: any, idx: number) => {
                        return (
                        <div className='px-[20px]'>
                            <div className='w-full flex items-center gap-4'>
                                <div className='rounded-full w-[2rem] h-[2rem] 
                                flex items-center justify-center text-white'
                                style={{ backgroundColor: theme_clr }}>
                                    {block.icon}
                                </div>
                                <div className={`font-black text-xl`}
                                    style={{ color: theme_clr}}>
                                    {upperTitle ? block.title.toUpperCase() : block.title}
                                </div>
                            </div>
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

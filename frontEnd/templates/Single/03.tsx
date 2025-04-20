import { capitalized, formDate, darkenColor } from '@/lib/utils';
import { 
    MailIcon, PhoneIcon,
    BriefcaseBusinessIcon, GraduationCapIcon, SpeechIcon, ShapesIcon, TrophyIcon
} from 'lucide-react';

function genHead(headPF: any, theme_clr: string) {
    return (
        <div className='w-full flex flex-col items-start gap-1 px-[40px] py-[20px] text-white'
            style={{ backgroundColor: theme_clr }}>
            <div className='text-3xl font-extrabold' >
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
                <div className='w-full text-white text-sm flex mt-2'>
                    {
                        headPF.phone.length>0?(
                            <div className='flex gap-3 grow-1'>
                                <div><b>Phone</b></div>
                                <div><a href={`tel:${headPF.phone}`}>{headPF.phone}</a></div>
                            </div>
                        ):(<></>)
                    }
                    {
                        headPF.email.length>0?(
                            <div className='flex gap-3 grow-1'>
                                <div><b>Email</b></div>
                                <div><a href={`mailto:${headPF.email}`}>{headPF.email}</a></div>
                            </div>)
                        :(<></>)
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
                            {edu.degree ? ` ${edu.degree === 'Enter your own' ? edu.neodegree : edu.degree}` : ''}{
                                edu.degree.length>0 ? ', ': ''
                            }{edu.institution}
                            <div className='absolute top-[50%] -translate-y-[50%] left-[-7.25rem] 
                            w-2.5 h-2.5 z-2' 
                            style={{ backgroundColor: theme_clr, transform: 'rotate(45deg)' }}>
                            </div>
                        </div>
                        <div className='text-sm my-1'>
                            <i>{capitalized(edu.field)}{edu.location}</i>
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
                <div className='text-xs font-mono w-20 pt-1'></div>
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
                                    <div className='flex gap-2'>
                                        {
                                            [1,2,3,4,5].map((idx: number) => {
                                                return (
                                                <div className='w-2.5 h-2.5'
                                                    style={{ backgroundColor: levelToIdx(lan.level)>idx?theme_clr:'#D1d5db', transform: 'rotate(45deg)' }}>
                                                </div> // bg-gray-300
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

const upperTitle = false
const mFirst = false
const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#333333') => {
    let blocks = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex flex-col'
            style={{ fontFamily: 'sans-serif' }}>
            <>{genHead(headPF, theme_clr)}</>
            <div className='px-[40px] pt-[20px] pb-[30px] flex flex-col'>
                <>{genSS(ssPF, theme_clr)}</>
            {
                blocks.map((block: any, idx: number) => {
                    return (
                    <div>
                        <div className='w-full flex items-center gap-4'>
                            <div className='w-[2rem] h-[2rem]
                            flex items-center justify-center text-white z-3'
                            style={{ backgroundColor: theme_clr, transform: 'rotate(45deg)' }}>
                                <div style={{ transform: 'rotate(-45deg)' }}>{block.icon}</div>
                            </div>
                            <div className={`font-black text-xl`}
                                style={{ color: theme_clr}}>
                                {upperTitle ? block.title.toUpperCase() : block.title}
                            </div>
                        </div>
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

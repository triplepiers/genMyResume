import { capitalized, formDate } from '@/lib/utils';
import { 
    MailIcon, PhoneIcon,
    BriefcaseBusinessIcon, GraduationCapIcon, SpeechIcon, ShapesIcon, TrophyIcon, UserIcon
} from 'lucide-react';

function genHead(headPF: any, theme_clr: string) {
    return (
        <div className='w-full flex flex-col items-start gap-1'
            style={{ color: theme_clr }}>
            <div className='text-3xl font-extrabold brightness-60'>
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
function genPersonalInfo(headPF: any, theme_clr: string) {
    return {
        icon: (<><UserIcon /></>),
        title: 'Personal Info',
        content: (<>
            <div className='text-sm flex flex-col gap-0.8'>
                <h3 style={{ color: theme_clr }}><b>Phone</b></h3>
                <div className='text-xs'><a href={`tel:${headPF.phone}`}>{headPF.phone}</a></div>
            </div>
            <div className='text-sm flex flex-col gap-0.8'>
                <h3 style={{ color: theme_clr }}><b>E-mail</b></h3>
                <div className='text-xs'><a href={`mailto:${headPF.email}`}>{headPF.email}</a></div>
            </div>
        </>)
    }
}
function genEdu(eduPF: any, theme_clr: string) {
    return {
        icon: (<><GraduationCapIcon /></>),
        title: 'Education',
        content: eduPF.map((edu: any) => {
            return (
                <div className='flex'>
                    <div className='text-xs font-mono w-20 pt-2'>{
                        edu.showDate ? (<>
                            {formDate(edu.bg_month, edu.bg_year)}{edu.divDate ? ' - ' : ''}{formDate(edu.ed_month, edu.ed_year)}
                        </>) : (<></>)
                    }
                    </div>
                    <div className='flex flex-col'>
                        <div className='w-full text-lg font-bold'>
                            {edu.degree ? ` ${edu.degree === 'Enter your own' ? edu.neodegree : edu.degree}` : ''}{
                                edu.degree.length>0 ? ', ': ''
                            }{edu.institution}
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
        title: 'Work Experience', 
        content: wkPF.map((work: any) => {
            return (
                <div className='flex'>
                    <div className='text-xs font-mono w-20 pt-2'>{
                        work.showDate ? (<>
                            {formDate(work.bg_month, work.bg_year)}{work.divDate ? ' - ' : ''}{formDate(work.ed_month, work.ed_year)}
                        </>) : (<></>)
                    }
                    </div>
                    <div className='flex flex-col'>
                        <div className='w-full text-lg font-bold'>
                            {work.title}
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
            <div className='flex'>
                <div className='text-xs font-mono w-20 pt-1'></div>
                <div className='flex flex-col'>{awardPF}</div>
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
                        <div key={idx} className='w-full text-sm flex justify-between'>
                            <div><b>{lan.lan}</b></div>
                            {
                                lan.level.length > 0? (<div className='pt-1 w-full flex flex-col gap-1 items-end'>
                                    <div className='flex gap-1'>
                                        {
                                            [1,2,3,4,5].map((idx: number) => {
                                                return (<div className='rounded-full w-3 h-3 border-1'
                                                style={{ 
                                                    backgroundColor: levelToIdx(lan.level)>idx?theme_clr:'transparent',
                                                    borderColor: theme_clr   
                                                 }}></div> // bg-gray-300
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
        genWork(wkPF, theme_clr),
        genEdu(eduPF, theme_clr),
        
        genAward(awardPF, theme_clr),
    ]
    return { leftBlocks, rightBlocks };
}

const upperTitle = false
const mFirst = false
const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#333333') => {
    let {leftBlocks, rightBlocks} = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex flex-col px-[40px] pt-[40px]'
            style={{ fontFamily: 'sans-serif' }}>

                <div className='pb-[20px]'>
                <>{genHead(headPF, theme_clr)}</>
                <>{genSS(ssPF, theme_clr)}</>
                </div>
            <div className='flex gap-6'>
                <div className='w-[30%]'>
                    {
                        leftBlocks.map((block: any, idx: number) => {
                            return (
                                <div className='mb-4'>
                                    <div className='w-full flex items-center gap-4 pb-1.5 border-b-1'>
                                        <div className='rounded-full w-[2rem] h-[2rem] 
                                        flex items-center justify-center text-white'
                                            style={{ backgroundColor: theme_clr }}>
                                            {block.icon}
                                        </div>
                                        <div className={`font-black text-xl`}
                                            style={{ color: theme_clr }}>
                                            {upperTitle ? block.title.toUpperCase() : block.title}
                                        </div>
                                    </div>
                                    <div className='w-full flex flex-col gap-1 pl-2 pt-4'>{block.content}</div>
                                </div>)
                        })
                    }
                </div>
                <div className='grow-1'>
                    {
                        rightBlocks.map((block: any, idx: number) => {
                            return (
                                <div className='mb-4'>
                                    <div className='w-full flex items-center gap-4 pb-1.5 border-b-1'>
                                        <div className='rounded-full w-[2rem] h-[2rem] 
                                        flex items-center justify-center text-white'
                                            style={{ backgroundColor: theme_clr }}>
                                            {block.icon}
                                        </div>
                                        <div className={`font-black text-xl`}
                                            style={{ color: theme_clr }}>
                                            {upperTitle ? block.title.toUpperCase() : block.title}
                                        </div>
                                    </div>
                                    <div className='w-full flex flex-col gap-1 pl-2 pt-4'>{block.content}</div>
                                </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default genTemplate

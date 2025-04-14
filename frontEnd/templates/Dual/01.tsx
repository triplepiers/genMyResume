import { capitalized, formDate } from '@/lib/utils';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { title } from 'process';
import { string } from 'zod';

function genHead(headPF: any) {
    return (
        <div className='w-full flex flex-col items-start gap-1 px-[20px] py-[20px]'>
            <div className='text-3xl font-bold'>
                {headPF.name} {headPF.surname}
            </div>
            {
                headPF.showProf ? (
                    <div>
                        {headPF.profession}
                    </div>
                ) : (<></>)
            }
        </div>
    )
}
function genPersonalInfo(headPF: any) {
    return {
        title: 'Personal Information',
        content: (<>
            <div className='text-sm flex flex-col gap-0.8'>
                <h3 className='text-white'><b>Phone</b></h3>
                <div className='text-xs'>{headPF.phone}</div>
            </div>
            <div className='text-sm flex flex-col gap-0.8'>
                <h3 className='text-white'><b>E-mail</b></h3>
                <div className='text-xs'>{headPF.email}</div>
            </div>
        </>)
    }
}
function genEdu(eduPF: any) {
    return {
        title: 'Education',
        content: eduPF.map((edu: any) => {
            return (
                <div className='flex'>
                    <div className='text-xs font-mono w-20 pt-1'>{
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
function genWork(wkPF: any) {
    return {
        title: 'Work Experience', content: wkPF.map((work: any) => {
            return (
                <div className='flex'>
                    <div className='text-xs font-mono w-20 pt-1'>{
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
function genAward(awardPF: any) {
    return {
        title: 'Awards', 
        content: (<div className='text-xs'>{awardPF}</div>)
    }
}
function genSkill(skillPF: any, theme_clr: string) {
    function levelToIdx(level: string) {
        switch(level) {
            case 'Elementary':
                return '20%'
            case 'Limited':
                return '40%'
            case 'Professional':
                return '60%'
            case 'Full Professional':
                return '80%'
            case 'Native':
                return '100%'
        }
    }
    return [
        {
            title: 'Languages', content: (<>{
                skillPF.lans.length > 0 ? (<>{
                    skillPF.lans.map((lan: any, idx: number) => {
                        return (
                        <div key={idx} className='text-xs'>
                            <div><b>{lan.lan}</b></div>
                            {
                                lan.level.length > 0? (<div className='pt-1 w-full flex flex-col gap-1 items-end'>
                                    <div className='w-full h-[8px] relative'>
                                        <div className='w-full h-full brightness-60'
                                        style={{ backgroundColor: theme_clr }}></div>
                                        <div className={`h-full bg-white absolute left-0 top-0 w-[${levelToIdx(lan.level)}]`}></div>
                                    </div>
                                    <div>{lan.level}</div>
                                </div>):(<></>)
                            }
                        </div>)
                        })
                }</>) : (<></>)                
            }</>)
        }, {
            title: 'Skills',
            content: (<>{
                skillPF.customs.length>0?(<>{
                    skillPF.customs.map((cst:any, idx: number) => {
                        return (
                        <div key={idx} className='text-xs'>
                            <div><b>{cst.title}</b></div>
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
function genSS(ssPF: any) {
    return {
        title: 'Self-Statement', 
        content: (<div className='text-justify indent-4 text-sm mt-1'>{ssPF}</div>)
    }
}
function genSections(headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string) {
    let leftBlocks = [
        genAward(awardPF),
        ...genSkill(skillPF, theme_clr),
    ]
    if (headPF.showContact) {
        leftBlocks = [genPersonalInfo(headPF), ...leftBlocks]
    }

    let rightBlocks = [
        genEdu(eduPF),
        genWork(wkPF),
        genSS(ssPF)
    ]
    return {leftBlocks, rightBlocks}
}

const upperTitle = false
const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#003D75') => {
    let {leftBlocks, rightBlocks} = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex'
            style={{ fontFamily: 'sans-serif' }}>
            <div className={`w-[30%] shrink-0 h-full text-white`}
                style={{ backgroundColor: theme_clr }}>
                <>{genHead(headPF)}</>
                {
                    leftBlocks.map((block: any, idx: number) => {
                        return (
                        <div key={idx}>
                            <div className='relative'>
                                <div className='w-full h-[2.5rem]  brightness-60'
                                style={{ backgroundColor: theme_clr }}></div>
                                <div className='absolute top-[50%] -translate-y-[50%] px-[20px] font-bold text-lg'>
                                    {upperTitle ? block.title.toUpperCase() : block.title}
                                </div>
                            </div>
                            <div className='flex flex-col gap-1 w-full px-[20px] py-2'>
                                {block.content}
                            </div>
                        </div>)
                    })
                }
            </div>
            <div className='grow-1'>{
                rightBlocks.map((block: any, idx: number) => {
                    return (<div className='px-[20px] py-[20px]'>
                        <div className={`font-black text-xl w-full h-[2.5rem] flex items-center 
                            border-t-1 border-b-1 boreder-[${theme_clr}]`}
                            style={{ color: theme_clr}}>
                            {upperTitle ? block.title.toUpperCase() : block.title}
                        </div>
                        <div className='w-full pt-1 flex flex-col gap-1'>
                            {block.content}
                        </div>
                    </div>)
                })
            }</div>
        </div>
    )
}

export default genTemplate

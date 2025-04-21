import { capitalized, formDate } from '@/lib/utils';
import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { NoIconTitle } from '@/components/Templates/BlockTitle/NoIcon';
import { LRItem } from '@/components/Templates/Item/LR';
import { LevelBar } from '@/components/Templates/showLevel/Bar';

const upperTitle = false;
const mFirst = false;
const inlineTime = true;
const inlineLevel = false;

function genDateBlock(
    showDate: boolean,
    bg_month: string, bg_year: string, ed_month: string, ed_year: string,
    divDate: boolean, mFirst: boolean=false, showNum?: boolean
) {
    return (
    <div className={`text-xs font-mono pt-2 w-${inlineTime?'36':'20'}`}>
        {
            showDate ? (<>
            {formDate(bg_month, bg_year, mFirst)}{divDate ? ' - ' : ''}{formDate(ed_month, ed_year, mFirst)}
            </>):(<></>)
        }
    </div>)
}

function genEdu(eduPF: any, theme_clr: string) {
    const genTitle = (degree: string, neodegree: string, institution: string) =>  {
        return `${degree==='Enter your own'?neodegree:degree}${degree.length>0 ? ', ': ''}${institution}`
    }
    const genSubTitle = (field: string, location: string) => {
        const showGap = field.length>0 && location.length>0
        return `${capitalized(field)}${showGap?', ': ''}${location}`
    }
    return {
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
    const genSubTitle = (company: string, location: string) => {
        const showGap = company.length>0&&location.length>0
        return `${capitalized(company)}${showGap?', ':''}${location}`
    }
    return {
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
            title: 'Languages', 
            content: (<>{
                skillPF.lans.length > 0 ? (<>{
                    skillPF.lans.map((lan: any, idx: number) => {
                        return (
                        <div key={idx} className='w-full text-sm flex justify-between'>
                           <div className={`w-${inlineTime?'36':'20'}`}></div>
                           <div className='grow-1 flex items-start justify-between'>
                                <div><b>{lan.lan}</b></div>
                                {
                                    lan.level.length > 0? (
                                        <div className='w-[30%]'>
                                            <LevelBar 
                                                level={lan.level}
                                                ftClr={theme_clr} bgClr='#DDD'
                                                inline={inlineLevel}
                                            />
                                        </div>
                                    ):(<></>)
                                }
                           </div>
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
        <div className='w-full text-justify text-sm my-2 pb-[10px]'>
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


const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#003D75') => {
    let blocks = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex flex-col'
            style={{ fontFamily: 'sans-serif' }}>
                <FullDarkHeader 
                    ftClr='#fff' bgClr={theme_clr} 
                    headPF={headPF} inlineContact={true} 
                />
                <div className='px-[40px] pt-[10px] pb-[30px]'>
                    <>{genSS(ssPF, 'var(--foreground)')}</>
                    {
                        blocks.map((block: any, idx: number) => {
                            return (
                                <div className='mb-4'>
                                    <NoIconTitle 
                                        underLine={true} topLine={false}
                                        clr='var(--foreground)'
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

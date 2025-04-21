import { genItemTitle } from '@/lib/utils';
import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { NoIconTitle } from '@/components/Templates/BlockTitle/NoIcon';
import { NoIconContact } from '@/components/Templates/Contact/NoIcon';
import { LRItem } from '@/components/Templates/Item/LR';
import { LevelDot } from '@/components/Templates/showLevel/Dot';

const upperTitle = false
const mFirst = false
const inlineTime = false
const rounded = true
const outlined = true

function genPersonalInfo(headPF: any, theme_clr: string) {
    return {
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
        <div className='w-full text-justify text-sm'>
            <div className='font-bold mb-1'
            style={{ color: theme_clr }}>Self Statement</div>
            <div className='indent-4 leading-tight'>{ssPF}</div>
        </div>
    ) 
}
function genSections(headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string) {
    let leftBlocks = [
        genWork(wkPF, theme_clr),
        genEdu(eduPF, theme_clr),
        genAward(awardPF, theme_clr),
        
    ]
    let rightBlocks = [
        genPersonalInfo(headPF, theme_clr),
        ...genSkill(skillPF, theme_clr),
    ]
    return { leftBlocks, rightBlocks };
}


const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#333333') => {
    let {leftBlocks, rightBlocks} = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-full flex flex-col'
         style={{ fontFamily: 'sans-serif' }}>
            <FullDarkHeader
                ftClr='#FFF' bgClr={theme_clr}
                headPF={headPF}
                showContactBlock={false}
                classList='px-[40px] py-[30px] pb-[20px]'
            />
            <div className='flex grow-1'>
                <div className='grow-1 pl-[40px] pr-[30px] py-[20px] flex flex-col gap-4'>
                <>{genSS(ssPF, theme_clr)}</>
                {
                    leftBlocks.map((block: any, idx: number) => {
                        return (
                            <div className='mb-4'>
                                <NoIconTitle 
                                    underLine={true} topLine={false}
                                    alignCenter={false}
                                    ftClr={theme_clr} bgClr='transparent'
                                    title={block.title} upperCase={upperTitle}
                                    classList=''
                                />
                            <div className='w-full flex flex-col gap-1 pl-2 pt-4'>{block.content}</div>
                            </div>)
                    })
                }
                </div>
                <div className='bg-[#F4F4F4] w-[30%] shrink-0 pl-[30px] pr-[40px] py-[20px]'>
                {
                    rightBlocks.map((block: any, idx: number) => {
                        return (
                            <div className='mb-4'>
                                <NoIconTitle 
                                    underLine={true} topLine={false}
                                    alignCenter={false}
                                    ftClr={theme_clr} bgClr='transparent'
                                    title={block.title} upperCase={upperTitle}
                                    classList=''
                                />
                                <div className='w-full flex flex-col gap-1 pt-4'>{block.content}</div>
                            </div>)
                    })
                }
                </div>
            </div>
        </div>
    )
}

export default genTemplate

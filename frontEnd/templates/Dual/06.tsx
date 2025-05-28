import { darkenColor, genItemTitle } from '@/lib/utils';
import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { NoIconTitle } from '@/components/Templates/BlockTitle/NoIcon';
import { NoIconContact } from '@/components/Templates/Contact/NoIcon';
import { LRItem } from '@/components/Templates/Item/LR';
import { LevelDot } from '@/components/Templates/showLevel/Dot';

const inlineTime = false;
const mFirst = true;
const rounded = false;
const outlined = false;

function genPersonalInfo(headPF: any, theme_clr: string) {
    return {
        section: 'head',
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
function genEdu(eduPF: any) {
    const genTitle = genItemTitle.EDU.Title;
    const genSubTitle = genItemTitle.EDU.SubTitle;
    return {
        section: 'edu',
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
        section: 'work',
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
        section: 'award',
        title: 'Awards', 
        content: (
            <div className='w-full flex'>
                <div className={`w-${inlineTime?'36':'20'} shrink-0`}></div>
                <div className='grow-1'>{awardPF}</div>
            </div>
        )
    }
}
function genSkill(skillPF: any, theme_clr: string) {
    return [
        {
            section: 'lan',
            title: 'Languages', content: (<>{
                skillPF.lans.length > 0 ? (<>{
                    skillPF.lans.map((lan: any, idx: number) => {
                        return (
                        <div key={idx} className='text-xs flex items-start'>
                            <div><b>{lan.lan}</b></div>
                            {
                                lan.level.length > 0? (
                                    <LevelDot 
                                        level={lan.level}
                                        rounded={rounded} outlined={outlined}
                                        ftClr={theme_clr} bgClr='#BBB'
                                        descClr='var(--foreground)'
                                    />
                                ):(<></>)
                            }
                        </div>)
                        })
                }</>) : (<></>)                
            }</>)
        }, {
            section: 'skill',
            title: 'Skills',
            content: (<>{
                skillPF.customs.length>0?(<>{
                    skillPF.customs.map((cst:any, idx: number) => {
                        return (
                        <div key={idx} className='text-xs'>
                            <b>{cst.title}</b>
                            {
                                cst.desc.length > 0? (<> - {cst.desc}</>):(<></>)
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
        <div className='text-justify text-xs' data-section='ss'>
            {/* <div className='font-bold mb-1'
            style={{ color: theme_clr }}>Self Statement</div> */}
            <div className='leading-tight'>{ssPF}</div>
        </div>
    ) 
}
function genSections(headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string) {
    let leftBlocks = [
        
        ...genSkill(skillPF, theme_clr),
    ]
    if (headPF.showContact) {
        leftBlocks = [genPersonalInfo(headPF, theme_clr), ...leftBlocks]
    }

    let rightBlocks = [
        genEdu(eduPF),
        genWork(wkPF),
        genAward(awardPF),
    ]
    return {leftBlocks, rightBlocks}
}

const upperTitle = false
const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, theme_clr: string='#003D75') => {
    let {leftBlocks, rightBlocks} = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, theme_clr)
    return (
        <div className='w-full h-auto flex flex-col'
            style={{ fontFamily: 'sans-serif' }}>
            <div className='w-full flex'>
                <div className='w-[50%] h-[50px] relative'
                    style={{ backgroundColor: theme_clr }}>
                    <div className='w-[15px] h-[9px] absolute left-[30px] -bottom-[9px]'
                        style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)', backgroundColor: theme_clr}}></div>
                    <div className='text-white absolute left-[32px] bottom-[4px] text-xs font-bold'>Resume</div>
                </div>
            </div>
            <div className='w-full flex py-[20px] px-[30px]'>
                <div className='w-[50%] shrink-0' data-section='head'>
                    <FullDarkHeader 
                        ftClr={theme_clr} bgClr='transparent'
                        headPF={headPF} 
                        inclineSubTitle={true}
                        showContactBlock={false}
                        classList='px-[0] py-[0]'
                    />
                </div>
                <div className='w-[50%] shrink-0'>
                    <>{genSS(ssPF, theme_clr)}</>
                </div>
            </div>
            <div className='flex grow-1 px-[30px]'>
                <div className='w-[40%] shrink-0 flex flex-col gap-4'>{
                    leftBlocks.map((block: any, idx: number) => {
                        return (
                        <div className='mr-[40px]' data-section={block.section}>
                            <NoIconTitle 
                                underLine={true} topLine={false}
                                alignCenter={false}
                                fontSize='lg'
                                ftClr={theme_clr} bgClr='transparent'
                                title={block.title} upperCase={upperTitle}
                                classList='mb-3'
                            />
                            <div className='w-full pt-1 flex flex-col gap-1'>
                                {block.content}
                            </div>
                        </div>)
                    })
                }</div>
                <div className='grow-1 flex flex-col h-full pr-[40px] border-l-1'>
                    {
                        rightBlocks.map((block: any, idx: number) => {
                            return (
                            <div key={idx} className='pl-[40px]' data-section={block.section}>
                                <div className='relative'>
                                    <NoIconTitle 
                                        underLine={true} topLine={false}
                                        alignCenter={false}
                                        ftClr={theme_clr} bgClr='transparent'
                                        title={block.title} upperCase={upperTitle}
                                        fontSize='lg'
                                    />
                                    <div className='absolute top-[2px] -left-[53px]'>
                                        <div className='w-[30px] h-[30px]' style={{ backgroundColor: theme_clr}}></div>
                                        <div className='w-[15px] h-[30px] absolute -right-[14px] top-0' 
                                            style={{ backgroundColor: theme_clr, clipPath: 'polygon(0 0, 0% 100%, 100% 50%)'}}></div>
                                        <div className='absolute left-0 w-3 h-3'
                                            style={{ backgroundColor: darkenColor(theme_clr, 0.4), clipPath: 'polygon(0 0, 100% 100%, 100% 0)'}}></div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1 w-full py-2'>
                                    {block.content}
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
            <div className='w-full flex justify-end mt-[20px]'>
                <div className='w-[50%] h-[50px] relative'
                    style={{ backgroundColor: theme_clr}}>
                        <div className='w-[15px] h-[9px] absolute right-[30px] -top-[9px]'
                        style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)', backgroundColor: theme_clr}}></div>
                </div>
            </div>
        </div>
    )
}

export default genTemplate

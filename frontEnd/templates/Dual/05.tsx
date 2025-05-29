import { genItemTitle } from '@/lib/utils';
import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { NoIconTitle } from '@/components/Templates/BlockTitle/NoIcon';
import { IconContact } from '@/components/Templates/Contact/Icon';
import { LRItem } from '@/components/Templates/Item/LR';
import { LevelDot } from '@/components/Templates/showLevel/Dot';

const inlineTime = false;
const mFirst = true;
const rounded = true;
const outlined = false;

function genScript(name: string, surname: string) {
    return `${name.length>0?name[0]:''}${surname.length>0?surname[0]:''}`.toLowerCase()
}

function genPersonalInfo(headPF: any, theme_clr: string) {
    return {
        section: 'head',
        title: 'Personal Information',
        content: (<>
            <IconContact
                vertical={true}
                phone={headPF.phone}
                email={headPF.email}
                ftClr='var(--foreground)'
                iconFtClr='#FFF' iconBgClr={theme_clr}
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
        <div className='text-justify text-sm mb-[20px]' data-section='ss'>
            <div className='font-bold mb-1'
            style={{ color: theme_clr }}>Self Statement</div>
            <div className='indent-4 leading-tight'>{ssPF}</div>
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
        <div className='w-full h-full flex'>
            <div className='w-[35%] shrink-0'>{
                leftBlocks.map((block: any, idx: number) => {
                    return (
                    <div className='px-[20px] mt-[20px]' data-section={block.section}>
                        <NoIconTitle 
                            underLine={false} topLine={false} dot={true}
                            alignCenter={false}
                            fontSize='md'
                            ftClr={theme_clr} bgClr='transparent'
                            title={block.title} upperCase={upperTitle}
                            classList=''
                        />
                        <div className='w-full pt-1 flex flex-col gap-1'>
                            {block.content}
                        </div>
                    </div>)
                })
            }</div>
            <div className='grow-1 flex flex-col h-full pl-[20px] pr-[40px] '>
                <div className='gap-5 flex items-center h-fit pt-[30px] pb-[20px]' data-section='head'>
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
                {
                    rightBlocks.map((block: any, idx: number) => {
                        return (
                        <div key={idx} data-section={block.section}>
                            <NoIconTitle 
                                dot={true}
                                underLine={false} topLine={false}
                                alignCenter={false}
                                ftClr={theme_clr} bgClr='transparent'
                                title={block.title} upperCase={upperTitle}
                                fontSize='lg'
                            />
                            <div className='flex flex-col gap-1 w-full py-2'>
                                {block.content}
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default genTemplate

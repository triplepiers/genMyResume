import { darkenColor, genItemTitle } from '@/lib/utils';
import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { NoIconTitle } from '@/components/Templates/BlockTitle/NoIcon';
import { NoIconContact } from '@/components/Templates/Contact/NoIcon';
import { LRItem } from '@/components/Templates/Item/LR';
import { LevelBar } from '@/components/Templates/showLevel/Bar';

const inlineTime = false;
const mFirst = true;

function genPersonalInfo(headPF: any) {
    return {
        title: 'Personal Information',
        content: (<>
            <NoIconContact
                inline={false}
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
        content: (<div className='text-xs'>{awardPF}</div>)
    }
}
function genSkill(skillPF: any, theme_clr: string) {
    return [
        {
            title: 'Languages', content: (<>{
                skillPF.lans.length > 0 ? (<>{
                    skillPF.lans.map((lan: any, idx: number) => {
                        return (
                        <div key={idx} className='text-xs'>
                            <div><b>{lan.lan}</b></div>
                            {
                                lan.level.length > 0? (
                                    <LevelBar 
                                        level={lan.level}
                                        ftClr='#FFF' bgClr={darkenColor(theme_clr, 0.4)}
                                        inline={false}
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
                <FullDarkHeader 
                    ftClr='#fff' bgClr={theme_clr} 
                    headPF={headPF} 
                    showContactBlock={false}
                    classList='px-[20px] py-[20px]'
                />
                {
                    leftBlocks.map((block: any, idx: number) => {
                        return (
                        <div key={idx}>
                            <NoIconTitle 
                                underLine={false} topLine={false}
                                alignCenter={false}
                                ftClr='#FFF' bgClr={darkenColor(theme_clr, 0.4)}
                                title={block.title} upperCase={upperTitle}
                                fontSize='lg'
                                classList='px-[20px]'
                            />
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
                        <NoIconTitle 
                            underLine={true} topLine={true}
                            alignCenter={false}
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
        </div>
    )
}

export default genTemplate

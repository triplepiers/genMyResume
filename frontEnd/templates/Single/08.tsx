import { darkenColor, genItemTitle } from '@/lib/utils';
import { 
    BriefcaseBusinessIcon, GraduationCapIcon, SpeechIcon, ShapesIcon, TrophyIcon, PinIcon
} from 'lucide-react';
import { FullDarkHeader } from '@/components/Templates/Header/FullDark';
import { IconTitle } from '@/components/Templates/BlockTitle/Icon';
import { LRItem } from '@/components/Templates/Item/LR';
import { LevelBar } from '@/components/Templates/showLevel/Bar';

const upperTitle = false;
const mFirst = false;
const inlineTime = false;
const inlineLevel = false;
const outlined = false;
const rounded = false

function genEdu(eduPF: any, theme_clr: string) {
    const genTitle = genItemTitle.EDU.Title;
    const genSubTitle = genItemTitle.EDU.SubTitle;
    return {
        section: 'edu',
        icon: (<><GraduationCapIcon /></>),
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
    const genSubTitle = genItemTitle.WORK.SubTitle;
    return {
        section: 'work',
        icon: (<><BriefcaseBusinessIcon /></>),
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
        section: 'award',
        icon: (<><TrophyIcon /></>),
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
            section: 'lan',
            icon: (<><SpeechIcon /></>),
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
                                                ftClr={theme_clr} bgClr='#CCC'
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
            section: 'skill',
            icon: (<><ShapesIcon /></>),
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
        <div className='w-full text-justify text-sm my-2 pb-[10px]' data-section='ss'>
            <div className='font-bold pb-1'
            style={{ color: theme_clr }}>Self Statement</div>
            <div className='indent-4 leading-tight'>{ssPF}</div>
        </div>
    ) 
}
function genAdds(addsPF: any) {
    return addsPF.map((add: any) => {
        let { title, more } = JSON.parse(add.data)
        return {
            section: add.uuid,
            icon: (<><PinIcon /></>),
            title: title,
            content: (
                <div className='flex'>
                    <div className={`text-xs font-mono pt-1 w-${inlineTime?'36':'20'}`}></div>
                    <div className='flex flex-col'>{more}</div>
                </div>
            )
        }
    })
}
function genSections(
    headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, addsPF: any,
    theme_clr: string
) {
    let blocks = [
        genWork(wkPF, theme_clr),
        genEdu(eduPF, theme_clr),
        ...genSkill(skillPF, theme_clr),
        genAward(awardPF, theme_clr),
        ...genAdds(addsPF)
    ]
    return blocks;
}


const genTemplate = (
    headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any, addsPF: any,
    theme_clr: string='#003D75'
) => {
    let blocks = genSections(headPF, eduPF, wkPF, awardPF, skillPF, ssPF, addsPF, theme_clr)
    return (
        <div className='w-full h-full flex flex-col'>
                <div data-section='head'>
                    <FullDarkHeader 
                        ftClr={darkenColor(theme_clr, 0.4)} bgClr='transparent'
                        subClr={theme_clr}
                        headPF={headPF} 
                        inlineContact={true} contactClr='#000'
                        contactGapY='my-3'
                    />
                </div>
                <div className='px-[40px] pb-[30px]'>
                    <>{genSS(ssPF, theme_clr)}</>
                    {
                        blocks.map((block: any, idx: number) => {
                            return (
                                <div className='mb-4' data-section={block.section}>
                                    <IconTitle 
                                        icon={block.icon} iconClr='#fff'
                                        rounded={rounded}
                                        underLine={false} topLine={false}
                                        ftClr={theme_clr} bgClr='transparent'
                                        title={block.title} upperCase={upperTitle}
                                        classList=''
                                    />
                                    <div className='w-full flex flex-col gap-1 pt-2'>{block.content}</div>
                                </div>)
                        })
                    }
                </div>
        </div>
    )
}

export default genTemplate

import { capitalized, formDate } from '@/lib/utils';

function genHead(headPF: any) {
    return (
        <div className='w-full flex flex-col items-center'>
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
            {
                headPF.showContact ? (
                    <div className='flex gap-2'>
                        <div>
                            <b>Tel:</b> <a href={`tel:${headPF.phone}`}>{headPF.phone}</a>
                        </div>
                        {
                            headPF.divContact ? (<div>|</div>) : (<></>)
                        }
                        <div>
                            <b>Email:</b> <a href={`mailto:${headPF.email}`}>{headPF.email}</a>
                        </div>
                    </div>
                ) : (<></>)
            }
        </div>
    )
} 
function genEdu(eduPF: any) {
    return {
        title: 'Education',
        content: eduPF.map((edu: any) => {
            return (
                <div className='flex flex-col gap-1'>
                    <div className='flex justify-between font-bold'>
                        <div>
                            {edu.institution}{edu.degree ? ` (${edu.degree === 'Enter your own' ? edu.neodegree : edu.degree})` : ''}
                        </div>
                        <div>
                            {edu.location}
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='underline'>
                            {capitalized(edu.field)}
                        </div>
                        {
                            edu.showDate ? (<div>
                                {formDate(edu.bg_month, edu.bg_year)}{edu.divDate ? ' - ' : ''}{formDate(edu.ed_month, edu.ed_year)}
                            </div>) : (<></>)
                        }
                    </div>
                    {
                        edu.showMore ? (<div>{edu.more}</div>) : (<></>)
                    }
                </div>
            )
        })
    }
}
function genWork(wkPF: any) {
    return {
        title: 'Work Experience', content: wkPF.map((work: any) => {
            return (
                <div className='flex flex-col gap-1'>
                    {
                        work.showComp ? (
                            <div className='flex justify-between font-bold'>
                                <div>{work.company}</div>
                                <div>{work.location}</div>
                            </div>) : (<></>)
                    }
                    <div className='flex justify-between'>
                        <div className='underline grow-1'>{work.title}</div>
                        {
                            work.showDate ? (<div>
                                {formDate(work.bg_month, work.bg_year)}{work.divDate ? ' - ' : ''}{formDate(work.ed_month, work.ed_year)}
                            </div>) : (<></>)
                        }
                        {
                            work.showMore ? (<div>{work.more}</div>) : (<></>)
                        }
                    </div>
                </div>
            )
        })
    }
}
function genAward(awardPF: any) {
    return {
        title: 'Awards & Certifications', 
        content: (<div>{awardPF}</div>)
    }
}
function genSkill(skillPF: any) {
    return {
        title: 'Additional Information', content: (
        <div>
            {
                skillPF.lans.length>0?(<div className='pl-1'>
                    <b>Languages: </b> {
                        skillPF.lans.map((lan:any, idx: number) => {
                            return (<span key={idx}>
                                {lan.lan}{lan.level.length>0?` (${lan.level})`:''}{idx<skillPF.lans.length-1?', ':''}
                            </span>)
                        })
                    }
                </div>):(<></>)
            }
            {
                skillPF.customs.length>0?(<div className='pl-1'>
                    <b>Skills: </b> {
                        skillPF.customs.map((cst:any, idx: number) => {
                            return (<span key={idx}>
                                {cst.title}{cst.desc.length>0?` (${cst.desc})`:''}{idx<skillPF.customs.length-1?', ':''}
                            </span>)
                        })
                    }
                </div>):(<></>)
            }
        </div>
    )}
}
function genSS(ssPF: any) {
    return {
        title: 'Self-Statement', 
        content: (<div className='text-justify indent-4'>{ssPF}</div>)
    }
}
function genSections(eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any) {
    return [
        genEdu(eduPF),
        genWork(wkPF),
        genAward(awardPF),
        genSkill(skillPF),
        genSS(ssPF)
    ]
}

const upperTitle = true
const genTemplate = (headPF: any, eduPF: any, wkPF: any, awardPF: any, skillPF: any, ssPF: any) => {
    let blocks = genSections(eduPF, wkPF, awardPF, skillPF, ssPF)
    return (
        <div className='w-full h-full px-[30px] py-[55px] flex flex-col justify-start items-center'
            style={{ fontFamily: 'Times New Roman, Times, serif' }}>
            <>{genHead(headPF)}</>
            <div className='w-full flex flex-col gap-2'>
                {
                    blocks.map((block) => {
                        return (
                            <div key={block.title} className='w-full flex flex-col justify-begin'>
                                <h2 className='text-[var(--foreground)] font-bold text-xl pb-1 border-b-[0.5px] border-black'>
                                    {upperTitle ? block.title.toUpperCase() : block.title}
                                </h2>
                                <div className='px-3 py-1 flex flex-col gap-1'>
                                    {block.content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default genTemplate

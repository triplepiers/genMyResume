import { useEffect } from "react";
import { useState } from "react";
import { Work } from "./Work";

import { SummaryHead } from "@/components/ui/SummaryHead";
import { WorkCard } from "@/components/Cards/WorkCard";

import axios from "@/lib/axios";

export const WorkWrap = (props: { updateFormMeta: Function }) => {
    const [ wkList, setwkList ] = useState([])
    const [ editIdx, setEditIdx ] = useState(-1) // add
    useEffect(() => {
        props.updateFormMeta({
            title: 'Work Experience',
            desc: 'Start with your most recent experience and work backward.',
        })
    }, [])

    useEffect(() => {
        updateFormStatus()
    }, [])

    const updateFormStatus = () => {
        // setwkList([])
        axios.get('/work/all').then((res) => {
            if(res.status === 200) {
                setwkList(res.data.work)
            }
        })
    }
    const changewkInfo = (e: any, idx: number) => {
        // setEditIdx(parseInt(e.target.dataset.id))
        setEditIdx(idx)
    }
    const removewkInfo = (e: any, idx: number) => {
        axios.post('/work/delete', {idx})
        setTimeout(()=>{
            setEditIdx(-1)
            updateFormStatus()
        }, 500)
    }
    const swtichToAdd = () => {
        setEditIdx(-1)
    }

    return (
        <div className="form-wrap-container">
            <div className="form-wrap-left-col overflow-hidden">
                <SummaryHead handleClick={swtichToAdd} />
                <div className="flex flex-col gap-2">
                    {
                        wkList.map((item, idx) => (
                            <WorkCard idx={idx} data={item} 
                                handleEdit={(e:any, idx:number)=>changewkInfo(e, idx)}
                                handleDelete={(e:any, idx:number)=>removewkInfo(e, idx)}
                                key={idx} />
                        ))
                    }
                    {wkList.length === 0 ? 'Oho, nothing here ...' : ''}
                </div>
            </div>
            <div className="px-5">
                <h2 className="text-xl font-bold mb-5">Edit Work Experience</h2>
                <Work edit={editIdx} updateFormStatus={updateFormStatus} />
            </div>
        </div>
    )
}
import { useEffect } from "react";
import { useState } from "react";

import { Education } from "@/components/Form/Education";
import { SummaryHead } from "@/components/ui/SummaryHead";
import { EducationCard } from "@/components/Cards/EducationCard";

import axios from "@/lib/axios";

export const EducationWrap = (props: { updateFormMeta: Function }) => {
    const [ eduList, setEduList ] = useState([])
    const [ editIdx, setEditIdx ] = useState(-1) // add
    useEffect(() => {
        props.updateFormMeta({
            title: 'Education Experience',
            desc: 'Tell us about it, even if you are still studying or have not graduated yet.',
        })
    }, [])

    useEffect(() => {
        updateFormStatus()
    }, [])

    const updateFormStatus = () => {
        // setEduList([])
        axios.get('/edu/all').then((res) => {
            if(res.status === 200) {
                setEduList(res.data.edu)
            }
        })
    }
    const changeEduInfo = (e: any, idx:number) => {
        // setEditIdx(parseInt(e.target.dataset.id))
        setEditIdx(idx)
    }
    const removeEduInfo = (e: any, idx:number) => {
        // del
        axios.post('/edu/delete', {idx})
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
                <div className="flex flex-col gap-2 min-w-60">
                {
                    eduList.map((item, idx) => 
                        (<EducationCard idx={idx} data={item} 
                            handleEdit={(e:any, idx:number)=>changeEduInfo(e, idx)}
                            handleDelete={(e:any, idx:number)=>removeEduInfo(e, idx)}
                            key={idx} />)
                    )
                }
                {eduList.length===0?'Oho, nothing here ...': ''}
                </div>
            </div>
            <div className="px-5">
                <h2 className="text-xl font-bold mb-5">Edit Education Experience</h2>
                <Education edit={editIdx} updateFormStatus={updateFormStatus}/>
            </div>
        </div>
    )
}
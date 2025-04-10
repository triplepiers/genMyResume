import { useEffect } from "react";
import { useState } from "react";
import { Education } from "./Education";

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
        setEduList([])
        axios.get('/edu/all', {
            params: { phone: localStorage.getItem('account') }
          }).then((res) => {
            if(res.status === 200) {
                setEduList(res.data.edu)
            }
        })
    }
    const changeEduInfo = (e: any) => {
        setEditIdx(parseInt(e.target.dataset.id))
    }
    const swtichToAdd = () => {
        setEditIdx(-1)
    }

    return (
        <div className="flex w-full justify-center flex-col md:flex-row">
            <div className="px-5 border-r-1
            max-w-80 overflow-hidden">
                <h2 className="text-xl font-bold mb-5">Summary</h2>
                <button onClick={swtichToAdd}>请点这里：Add a New One?</button>
                <div>这边列表渲染还没写</div>
                {
                    eduList.map((item, idx) => 
                        (<li key={idx} data-id={`${idx}`} onClick={(e)=>changeEduInfo(e)}>{item}</li>)
                    )
                }
            </div>
            <div className="px-5">
                <h2 className="text-xl font-bold mb-5">Edit Education Experience</h2>
                <Education edit={editIdx} updateFormStatus={updateFormStatus}/>
            </div>
        </div>
    )
}
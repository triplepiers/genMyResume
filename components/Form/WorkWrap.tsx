import { useEffect } from "react";
import { useState } from "react";
import { Work } from "./Work";

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
        setwkList([])
        axios.get('/work/all', {
            params: { phone: localStorage.getItem('account') }
          }).then((res) => {
            if(res.status === 200) {
                setwkList(res.data.work)
            }
        })
    }
    const changewkInfo = (e: any) => {
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
                    wkList.map((item, idx) => 
                        (<li key={idx} data-id={`${idx}`} onClick={(e)=>changewkInfo(e)}>{item}</li>)
                    )
                }
            </div>
            <div className="px-5">
                <h2 className="text-xl font-bold mb-5">Edit Work Experience</h2>
                <Work edit={editIdx} updateFormStatus={updateFormStatus}/>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SummaryHead } from "@/components/ui/SummaryHead";
import { AddiCard } from "../Cards/AddiCard";
import { Additional } from "./Additional";

import axios from "@/lib/axios";

export const AdditionalWrap = (props: { updateFormMeta: Function }) => {
    const router = useRouter();
    const [ editIdx, setEditIdx ] = useState('') // add
    const parseLabel = (labelStr: any) => {
        if (labelStr) {
            setEditIdx(labelStr)
        }
    }
    useEffect(() => {
        props.updateFormMeta({
            title: 'Additional Sections',
            desc: 'Add anything you like',
        })
        const { uuid } = router.query;
        parseLabel(uuid);
    }, [])
    const [ secList, setsecList ] = useState([])

    useEffect(() => {
        updateFormStatus()
    }, [])

    const updateFormStatus = () => {
        axios.get('/addi/all').then((res) => {
            if(res.status === 200) {
                setsecList(res.data.sec)
            }
        })
    }
    const changeSecInfo = (e: any, uuid: string) => {
        setEditIdx(uuid)
    }
    const removeAddi = (e: any, uuid: string) => {
        axios.post('/addi/delete', {uuid})
        .then(res => res.status)
        .then(status => {
            if (status === 200) {
                setEditIdx('')
                updateFormStatus()
            }
        })
    }
    const swtichToAdd = () => {
        setEditIdx('')
    }

    return (
        <div className="form-wrap-container">
            <div className="form-wrap-left-col overflow-hidden">
                <SummaryHead handleClick={swtichToAdd} />
                <div className="flex flex-col gap-2 min-w-60">
                    {
                        secList.map((item, idx) => (
                            <AddiCard idx={item.uuid} data={item.data}
                                handleEdit={(e: any) => changeSecInfo(e, item.uuid)}
                                handleDelete={(e: any) => removeAddi(e,  item.uuid)}
                                key={idx} />
                        ))
                    }
                    {secList.length === 0 ? 'Oho, nothing here ...' : ''}
                </div>
            </div>
            <div className="px-5">
                <h2 className="text-xl font-bold mb-5">Edit Block</h2>
                <Additional uuid={editIdx} updateFormStatus={updateFormStatus} />
            </div>
        </div>
    )
}
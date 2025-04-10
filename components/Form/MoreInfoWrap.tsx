import { useEffect } from "react";
import { useState } from "react";

import { Awards } from "@/components/Form/Awards";
import { Language } from "@/components/Form/Language";
import { Customize } from "@/components/Form/CustomSkill";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import axios from "@/lib/axios";

export const MoreInfoWrap = (props: { updateFormMeta: Function }) => {
    const [ skillList, setSkillList ] = useState([])
    const [ editIdx, setEditIdx ] = useState(-1) // add
    const [ mode, setMode ] = useState("else")
    useEffect(() => {
        props.updateFormMeta({
            title: 'More Informations',
            desc: 'Add some awards & skills.',
        })
    }, [])

    useEffect(() => {
        updateFormStatus()
    }, [])

    const updateFormStatus = () => {
        setSkillList([])
        axios.get('/more/skill/all').then((res) => {
            if(res.status === 200) {
                // 后端处理不了，前端自己 parse
                console.log(res.data.skill.map((item:string)=>JSON.parse(item)))
                setSkillList(res.data.skill.map((item:string)=>JSON.parse(item)))
            }
        })
    }
    const changeSkillInfo = (e: any) => {
        setEditIdx(parseInt(e.target.dataset.id))
    }
    const swtichToAdd = () => {
        setEditIdx(-1)
    }

    return (
        <div className="flex w-full items-center flex-col items-center">
            <div className="w-full max-w-150 shrink-0">
                <h2 className="text-xl font-bold mb-2">
                    Awards & Certificates
                </h2>
                <Awards updateFormStatus={updateFormStatus}/>
            </div>
            <div className="flex w-full max-w-150 flex-col border-t-1 h-fit">
                <h2 className="text-xl font-bold  my-2">
                    Other Skills
                </h2>
                <div className="flex w-full justify-center flex-col md:flex-row gap-5 md:gap-0 items-center md:items-start">
                    <div className="border-b-1 pb-5 border-r-0 md:border-r-1 md:px-5 md:border-b-0 md:pb-0
                    max-w-80 overflow-hidden w-fit">
                        <h3 className="text-xl font-bold mb-2">Summary</h3>
                        <button onClick={swtichToAdd}>请点这里：Add a New One?</button>
                        <div>这边列表渲染还没写</div>
                        {
                            skillList.map((item, idx) => 
                                (<li key={idx} data-id={`${idx}`} onClick={(e)=>{setMode(item.isLan?"lan":"else");changeSkillInfo(e)}}>
                                    {item.isLan ? `Lan: ${item.lan}, ${item.level}` : `Cstm: ${item.title}, ${item.desc}`}
                                </li>)
                            )
                        }
                    </div>
                    <div className="px-5 w-fit">
                        <h3 className="text-xl font-bold mb-2">Edit Your Skills</h3>
                        <Tabs defaultValue={mode} value={mode} className="w-50%">
                            <TabsList className="mb-2">
                                <TabsTrigger value="lan" onClick={() => {setEditIdx(-1); setMode("lan")}}>Language</TabsTrigger>
                                <TabsTrigger value="else" onClick={() => {setEditIdx(-1);setMode("else")}}>Customize</TabsTrigger>
                            </TabsList>
                            <TabsContent value="lan" className="px-5">
                                <Language isLan={mode==="lan"} edit={editIdx} updateFormStatus={updateFormStatus}/>
                            </TabsContent>
                            <TabsContent value="else" className="px-5">
                                <Customize isLan={mode==="lan"} edit={editIdx} updateFormStatus={updateFormStatus}/>
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>
        </div>
    </div>
    )
}
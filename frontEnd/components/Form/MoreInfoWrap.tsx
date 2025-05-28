import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Awards } from "@/components/Form/Awards";
import { Language } from "@/components/Form/Language";
import { Customize } from "@/components/Form/CustomSkill";

import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SquarePlus } from "lucide-react";
import { SkillCard } from "@/components/Cards/SkillCard";

import axios from "@/lib/axios";

export const MoreInfoWrap = (props: { updateFormMeta: Function }) => {
    const router = useRouter();

    const [showLan, setShowLan] = useState(true)
    const [showCus, setShowCus] = useState(true)
    const [skillList, setSkillList] = useState([])
    const [editIdx, setEditIdx] = useState(-1) // add
    const [mode, setMode] = useState<string>();
    const parseLabel = (labelStr: any) => {
        if (labelStr) {
            if (labelStr === 'lan' && mode !== 'lan') {
                setMode('lan');
            } else if (labelStr === 'else' && mode !== 'else') {
                setMode('else');
            }
        } else if (mode != 'lan') {
            setMode('lan');
        }
    }
    useEffect(() => {
        props.updateFormMeta({
            title: 'More Informations',
            desc: 'Add some awards & skills.',
        })
        const { mode } = router.query;
        parseLabel(mode);
    }, [])

    useEffect(() => {
        updateFormStatus()
    }, [])

    const updateFormStatus = () => {
        setSkillList([])
        axios.get('/more/skill/all').then((res) => {
            if (res.status === 200) {
                // 后端处理不了，前端自己 parse
                // setSkillList(res.data.skill)
                setSkillList(res.data.skill.map((item: string) => JSON.parse(item)))
            }
        })
    }
    const filterShowList = () => {
        let ca = 0;
        if (showLan) { ca += 1 }
        if (showCus) { ca += 2 }
        switch (ca) {
            case 0:
                return []
            case 1:// show only Lan
                return skillList.filter((item: any) => item.isLan === true)
            case 2:
                return skillList.filter((item: any) => item.isLan === false)
            case 3:
                return skillList
        }
    }
    const changeSkillInfo = (e: any, idx: number) => {
        // setEditIdx(parseInt(e.target.dataset.id))
        setMode((skillList[idx] as any).isLan ? "lan" : "else")
        setEditIdx(idx)
    }
    const removeSkillInfo = (e: any, idx: number) => {
        axios.post('/more/skill/delete', { idx })
        setTimeout(() => {
            setEditIdx(-1)
            updateFormStatus()
        }, 500)
    }
    const swtichToAdd = () => {
        setEditIdx(-1)
    }

    return (
        <div className="flex w-full items-center flex-col items-center">
            <div className="w-full shrink-0">
                <h2 className="text-xl font-bold mb-2">
                    Awards & Certificates
                </h2>
                <Awards updateFormStatus={updateFormStatus} />
            </div>
            <div className="flex w-full flex-col border-t-1 h-fit">
                <h2 className="text-xl font-bold  my-2">
                    Other Skills
                </h2>
                <div className="form-wrap-container">
                    <div className="form-wrap-left-col overflow-hidden w-70">
                        {/* Summary Head */}
                        <div className="flex justify-between mb-1">
                            <h3 className="text-xl font-bold">Summary</h3>
                            <button onClick={swtichToAdd} className="cursor-pointer text-[var(--pink)] hover:text-[var(--blue)] duration-200">
                                <SquarePlus />
                            </button>
                        </div>
                        <div className="flex justify-between mb-1 text-sm text-gray-500 font-normal">
                            <div>Show:</div>
                            <div className="flex gap-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="languages"
                                        checked={showLan}
                                        onCheckedChange={(checked) => { setShowLan(checked as boolean) }}
                                    />
                                    <label
                                        htmlFor="languages"
                                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Languages
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="customs"
                                        checked={showCus}
                                        onCheckedChange={(checked) => { setShowCus(checked as boolean) }}
                                    />
                                    <label
                                        htmlFor="customs"
                                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Customs
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">{
                            filterShowList()!.map((item, idx) => (
                                <SkillCard idx={idx} data={item}
                                    handleEdit={(e: any, idx: number) => changeSkillInfo(e, idx)}
                                    handleDelete={(e: any, idx: number) => removeSkillInfo(e, idx)}
                                    key={idx} />)
                            )
                        }</div>
                    </div>
                    <div className="pl-5 w-90">
                        <h3 className="text-xl font-bold mb-2">Edit Your Skills</h3>
                        <Tabs defaultValue={mode} value={mode} className="w-50%">
                            <TabsList className="mb-2">
                                <TabsTrigger value="lan" className="cursor-pointer"
                                    onClick={() => { setEditIdx(-1); setMode("lan") }}>Language</TabsTrigger>
                                <TabsTrigger value="else" className="cursor-pointer"
                                    onClick={() => { setEditIdx(-1); setMode("else") }}>Customize</TabsTrigger>
                            </TabsList>
                            <TabsContent value="lan" className="px-5">
                                <Language isLan={mode === "lan"} edit={editIdx} updateFormStatus={updateFormStatus} />
                            </TabsContent>
                            <TabsContent value="else" className="px-5">
                                <Customize isLan={mode === "lan"} edit={editIdx} updateFormStatus={updateFormStatus} />
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>
            </div>
        </div>
    )
}
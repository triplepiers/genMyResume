import { useEffect } from "react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import axios from "@/lib/axios";

const levelList = [ // low => high
    'Elementary',
    'Limited',
    'Professional',
    'Full Professional',
    'Native'
]

const str_spc = z.string()//.regex(/^[A-Za-z\s]+$/, { message: "Contains ONLY characters", });
const formSchema = z.object({
    lan:   str_spc,
    level: str_spc.optional(),
})
type formKey = "lan" | "level";

export const Language = (props: { edit: number, updateFormStatus: Function }) => {
    const [selectVal, setSelectVal] = useState("")
    useEffect(() => {
        Clear()
        if (props.edit !== -1)  {
            console.log(props.edit)
            axios.get('/more/skill', {
                params: { 
                    idx:   props.edit
                }
            }).then((res) => {
                if(res.status === 200) {
                    let data = JSON.parse(res.data.skill)
                    form.setValue("lan", data.lan)
                    setSelectVal(data.level)
  
                }
            })
        }
    }, [props.edit])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        return
        if (props.edit === -1) {
            axios.post('/work/add', {
                data:  JSON.stringify(values)
            })
            // clear input
            Clear();
        } else {
            axios.post('/work/update', {
                data:  JSON.stringify(values),
                idx:   props.edit
            })
        }
        props.updateFormStatus();                                // go next
    }

    const Clear = () => {
        form.setValue("lan", "")
        setSelectVal("")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full max-w-140 gap-3">
                <div className="w-full"><FormField
                    control={form.control}
                    name="lan"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-3">
                            <FormLabel className="shrink-0 w-20">Language*:</FormLabel>
                                <div className="grow-1 w-full">
                                    <FormControl>
                                        <Input placeholder="e.g. English" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                /></div>
                <div className="w-full"><FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-3">
                                <FormLabel className="shrink-0 w-20">Level:</FormLabel>
                                <div className="grow-1 w-full">
                                    <Select onValueChange={(val) => setSelectVal(val)} defaultValue={selectVal} value={selectVal}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a degree" />
                                            </SelectTrigger>
                                        </FormControl> 
                                        <SelectContent>{levelList.map((level, index) => (
                                            // 总之列表渲染
                                            <SelectItem key={index} value={level}>{level}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                /></div>
                <button type="submit" id='GO' 
                    className={`cursor-pointer rounded-md font-medium 
                        bg-[var(--${props.edit===-1?"green":"pink"})]
                        text-[var(--${props.edit===-1?"fore":"back"}ground)]
                        block px-4 py-[0.2rem] min-w-[6rem]`}>
                    <>{props.edit===-1?"Add":"Update"}</>
                </button>
            </form>
        </Form>
    )
}
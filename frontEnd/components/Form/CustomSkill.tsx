import { useEffect } from "react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import axios from "@/lib/axios";
import { title } from "process";


const str_spc = z.string()//.regex(/^[A-Za-z\s]+$/, { message: "Contains ONLY characters", });
const formSchema = z.object({
    title:   str_spc.min(1),
    desc: str_spc.optional(),
})
type formKey = "title" | "desc";

export const Customize = (props: { edit: number, updateFormStatus: Function }) => {
    const [ selectVal, setSelectVal ] = useState("")
    useEffect(() => {    
        if (props.edit !== -1)  {
            axios.get('/more/skill', {
                params: { 
                    idx:   props.edit
                }
            }).then((res) => {
                if(res.status === 200) {
                    let data = JSON.parse(res.data.skill)
                    form.setValue("title", data.title)
                    form.setValue("desc", data.desc)
                    form.clearErrors()
                }
            })
        } else {
            Clear()
        }
    }, [props.edit])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        let vals = {
            isLan: false,
            title: values.title,
            desc: values.desc,
        }
        if (props.edit === -1) {
            axios.post('/more/skill/add', {
                data:  JSON.stringify(vals)
            })
            // clear input
            Clear();
        } else {
            axios.post('/more/skill/update', {
                data:  JSON.stringify(vals),
                idx:   props.edit
            })
        }
        // go next
        setTimeout(() => {
            props.updateFormStatus();  
        }, 500)                
    }

    const Clear = () => {
        form.setValue("title", "")
        form.setValue("desc", "")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-5">
                <div className="w-full"><FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-3">
                            <FormLabel className="shrink-0 w-20">Type*:</FormLabel>
                                <div className="grow-1 w-full">
                                    <FormControl>
                                        <Input placeholder="e.g. Sleeping" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                /></div>
                <div className="w-full"><FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-3 items-start">
                                <FormLabel className="shrink-0 w-20">Descrition:</FormLabel>
                                <div className="grow-1 w-full">
                                    <FormControl>
                                        <Textarea
                                        placeholder="It would be better to write sth here."
                                        className="resize-none min-h-20 max-h-20"
                                        {...field}
                                        />
                                    </FormControl>
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
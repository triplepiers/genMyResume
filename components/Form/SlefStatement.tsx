import { useEffect } from "react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

import axios from "@/lib/axios";

const formSchema = z.object({

})
type formKey = "institution" | "location" | "degree" | "neodegree" | "field" | "bg_month" | "bg_year" | "ed_month" | "ed_year";

export const SelfStatement = (props: { updateFormMeta: Function }) => {
    const [ canGen, setCanGen ] = useState(false)
    const [ SS, setSS ] = useState("")
    useEffect(() => {
        props.updateFormMeta({
            title: 'Self Statement',
            desc: 'A brief summary of your skills, experience, and career goals.',
        })
    }, [])
    useEffect(() => {
        // init self statement
        axios.get('/ss')
            .then((res) => {
                if (res.status === 200) {
                    setSS(res.data.ss)
                }
            })
        axios.get('/ss/gen')
        .then((res) => {
            if (res.status === 200) {
                setCanGen(res.data.canGen)
            }
        })
    }, [])
    // gen完之后也要reset canGen

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
                                 
    }

    const Clear = () => {

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4">
                <div className="border-1">
                    {SS}
                </div>
                <button type="submit" id='GO' 
                    className={`cursor-pointer rounded-md font-medium 
                        bg-[var(--pink})]
                        text-[var(--back}ground)]
                        block px-4 py-[0.2rem] min-w-[6rem]`}>
                    Save
                </button>
                {/* TODO: check VIP & 使用次数 */}
                <div>AutoGen {canGen.toString()}</div>
            </form>
        </Form>
    )
}
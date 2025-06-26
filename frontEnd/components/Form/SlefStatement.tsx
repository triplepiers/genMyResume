import { useEffect } from "react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import axios from "@/lib/axios";

enum BtnType {
    norm, wait
};

const formSchema = z.object({
    selfStatement: z.string()
})

export const SelfStatement = (props: { updateFormMeta: Function }) => {
    const [canGen, setCanGen] = useState(false)
    const [btnType, setBtnType]  = useState(BtnType.norm);
    useEffect(() => {
        props.updateFormMeta({
            title: 'Self Statement',
            desc: 'A brief summary of your skills, experience, and career goals.',
        })
    }, [])

    useEffect(() => {
        axios.get('/ss').then((res) => {
            if (res.status === 200) {
                form.setValue('selfStatement', res.data.ss)
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
        axios.post('/ss', { data: values.selfStatement }) // save
    }

    const genSS = () => {
        if (!canGen) return;
        setBtnType(BtnType.wait)
        axios.post('/ss/gen')
        .then((res) => {
            if (res.status === 200) {
                form.setValue('selfStatement', res.data.ss)
                setBtnType(BtnType.norm)
                axios.get('/ss/gen').then((res) => {
                    if (res.status === 200) {
                        setCanGen(res.data.canGen)
                    }
                })
            }
        })
    }

    return (
        <div className="flex flex-col gap-2 w-full items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-120">
                    <FormField
                        control={form.control}
                        name="selfStatement"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Your self-statement."
                                        className="resize-none min-h-40 max-h-40"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <button id='GO'></button>
                </form>
            </Form>
            <div className="flex gap-5 justify-center">
                <Button disabled={btnType===BtnType.wait||!canGen} 
                 className={`cursor-pointer rounded-md font-medium 
                        text-[var(--background)]
                        block px-4 py-[0.2rem] min-w-[6rem] flex gap-1 justify-center items-center`}
                style={{ backgroundColor: canGen ? 'var(--green)' : 'gray' }}
                 onClick={genSS}>
                    {
                        (btnType===BtnType.wait) ? (<>
                            <Loader2 className="animate-spin" />
                            Wait
                        </>):(<>Generate</>)
                    }
                </Button>
                <button 
                    onClick={() => {
                        document.getElementById('GO')?.click()
                    }}
                    className="cursor-pointer rounded-md font-medium 
                        bg-[var(--pink)]
                        text-[var(--background)]
                        block px-4 py-[0.2rem] min-w-[6rem]">
                    Save
                </button>
            </div>
        </div>
    )
}
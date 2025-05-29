import { useEffect } from "react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import axios from "@/lib/axios";

const formSchema = z.object({
    title: z.string().min(1, { message: 'Can not be empty' }),
    more:  z.string().min(1, { message: 'Can not be empty' })
})
type formKey = "title";

export const Additional = (props: { uuid: string, updateFormStatus: Function }) => {
    useEffect(() => {
        if (props.uuid && props.uuid.length !== 0) {
            axios.get('/addi', {
                params: {
                    uuid: props.uuid
                }
            }).then((res) => {
                if (res.status === 200) {
                    for (let [key, val] of Object.entries(JSON.parse(res.data.sec.item.data))) {
                        form.setValue(key as formKey, val as string)
                    }
                    form.clearErrors()
                }
            })
        } else {
            Clear()
        }
    }, [props.uuid])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        if (props.uuid.length === 0) {
            axios.post('/addi/add', {
                data: JSON.stringify(values)
            })
            // clear input
            Clear();
        } else {
            axios.post('/addi/update', {
                data: JSON.stringify(values),
                uuid: props.uuid
            })
        }
        // go next
        setTimeout(() => {
            props.updateFormStatus();
        }, 500)
    }

    const Clear = () => {
        form.clearErrors()
        form.setValue("title", "")
        form.setValue('more', "")
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-5 space-y-0 w-110">
                <div className="col-span-2 grid grid-cols-2 gap-5">
                    <div className="col-span-2 sm:col-span-1"><FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Section Title*</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Interests, Affiliations ..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /></div>
                </div>
                <div className="col-span-2"><FormField
                    control={form.control}
                    name="more"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>More Details*</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us more about it"
                                    className="resize-none min-h-50"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /></div>
                <button type="submit" id='GO'
                    className={`cursor-pointer rounded-md font-medium 
                        bg-[var(--${props.uuid.length===0 ? "green" : "pink"})]
                        text-[var(--${props.uuid.length===0 ? "fore" : "back"}ground)]
                        block px-4 py-[0.2rem] min-w-[6rem]`}>
                    <>{props.uuid.length===0 ? "Add" : "Update"}</>
                </button>
            </form>
        </Form>
    )
}
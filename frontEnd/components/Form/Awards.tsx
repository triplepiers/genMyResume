import { useState } from "react";
import { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormItem, FormField, FormControl, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

import axios from "@/lib/axios";

const formSchema = z.object({
    awards:    z.string().optional()
})

export const Awards = (props: { updateFormStatus: Function }) => {
    const [awardsInfo, setAwardsInfo] = useState("");
    useEffect(() => {
        axios.get('/more/award').then((res) => {
            if (res.status === 200) {
                setAwardsInfo(res.data.award)
                form.setValue('awards', res.data.award)
            }
        })
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.awards !== awardsInfo) {
            axios.post('/more/award', {
                data:  values.awards
            }) // 这边默认成功更新，就不在 then 里更新客户端内容了
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5"
            onBlur={form.handleSubmit(onSubmit)}>
                <FormField
                control={form.control}
                name="awards"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Textarea
                        placeholder="It would be better to write sth here."
                        className="resize-none min-h-40 max-h-40"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </form>
        </Form>
    )
}
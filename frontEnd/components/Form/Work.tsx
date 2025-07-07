/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import axios from "@/lib/axios";

const monthList = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]
// 到今年为止
let minYear = 1990;
let curYear = new Date().getFullYear();
var yearList: string[] = [];
for (let i = curYear ; i >= minYear; i--) { yearList.push(i.toString()) }

const str_spc = z.string()//.regex(/^[A-Za-z\s]+$/, { message: "Contains ONLY characters", });
const formSchema = z.object({
    company: str_spc.optional(),
    location: str_spc.optional(),
    title: str_spc.min(1, { message: 'Not Null'}),
    bg_month: z.string().optional(),
    bg_year: z.string().optional(),
    ed_month: z.string().optional(),
    ed_year: z.string().optional(),
    more:    z.string().optional()
})
type formKey = "company" | "location" | "title" | "bg_month" | "bg_year" | "ed_month" | "ed_year";

export const Work = (props: { edit: number, updateFormStatus: Function }) => {
    const [bgMonth, setbgMonth] = useState("")
    const [bgYear,  setbgYear]  = useState("")
    const [edMonth, setedMonth] = useState("")
    const [edYear,  setedYear]  = useState("")
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        
        if (props.edit !== -1)  {
            axios.get('/work', {
                params: { 
                    idx:   props.edit
                }
            }).then((res) => {
                if(res.status === 200) {
                    for (let [key, val] of Object.entries(JSON.parse(res.data.work))) {
                        if (key === 'bg_month') { setbgMonth(val as string) }
                        else if (key === 'bg_year')  { setbgYear(val as string) }
                        else if (key === 'ed_month') { setedMonth(val as string) }
                        else if (key === 'ed_year')  { setedYear(val as string) }
                        else { form.setValue(key as formKey, val as string) }
                    }
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

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // 做一些级联检查
        if (values.bg_month && !values.bg_year) {
            form.setError('bg_year', { message: 'Select a year' });
            return;
        }
        if (values.bg_year && !values.bg_month) {
            form.setError('bg_month', { message: 'Select a month' });
            return;
        }
        if (values.ed_month && !values.ed_year) {
            form.setError('ed_year', { message: 'Select a year' });
            return;
        }
        if (values.ed_year && !values.ed_month) {
            form.setError('ed_month', { message: 'Select a month' });
            return;
        }
        let vals = {
            company:    values.company,
            location:   values.location,
            title:      values.title,
            bg_month:   bgMonth,
            bg_year:    bgYear,
            ed_month:   edMonth,
            ed_year:    edYear,
            more:       values.more
        }

        setIsLoading(true);
        if (props.edit === -1) {
            axios.post('/work/add', {
                data:  JSON.stringify(vals)
            }).then(res => res.status)
            .then(status => {
                if (status === 200) {
                    Clear();
                    setIsLoading(false);
                    props.updateFormStatus(); 
                }
            })
        } else {
            axios.post('/work/update', {
                data:  JSON.stringify(vals),
                idx:   props.edit
            }).then(res => res.status)
            .then(status => {
                if (status === 200) {
                    setIsLoading(false);
                    props.updateFormStatus(); 
                }
            })
        }
    }

    const Clear = () => {
        // console.log('clr')
        form.clearErrors()
        form.setValue("company", "")
        form.setValue("location", "")
        form.setValue("title", "")
        setbgMonth("")
        setbgYear("")
        setedMonth("")
        setedYear("")
        form.setValue('more', "")
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-5 space-y-0 w-80 md:w-110">
                <div className="col-span-2 grid grid-cols-2 gap-5">
                    <div className="col-span-2 sm:col-span-1"><FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Title*</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. HR Intern" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /></div>
                </div>
                <div className="col-span-2 sm:col-span-1"><FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company or Organization</FormLabel>
                            <FormControl>
                                <Input placeholder="Company, organization .." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /></div>
                <div className="col-span-2 sm:col-span-1"><FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. HongKong" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /></div>
                <div className="col-span-2 sm:col-span-1">
                    <FormLabel>Start Date</FormLabel>
                    <div className="grid grid-cols-2 gap-5 mt-2">
                        <FormField
                            control={form.control}
                            name="bg_month"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={(val) => setbgMonth(val)} defaultValue={bgMonth} value={bgMonth}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>{monthList.map((month, index) => (
                                            // 总之列表渲染
                                            <SelectItem key={index} value={month}>{month}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="bg_year"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={(val) => setbgYear(val)} defaultValue={bgYear} value={bgYear}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>{yearList.map((year, index) => (
                                            // 总之列表渲染
                                            <SelectItem key={index} value={year}>{year}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <FormLabel>End Date</FormLabel>
                    <div className="grid grid-cols-2 gap-5 mt-2">
                        <FormField
                            control={form.control}
                            name="ed_month"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={(val) => setedMonth(val)} defaultValue={edMonth} value={edMonth}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>{monthList.map((month, index) => (
                                            <SelectItem key={index} value={month}>{month}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="ed_year"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={(val) => setedYear(val)} defaultValue={edYear} value={edYear}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>{yearList.map((year, index) => (
                                            <SelectItem key={index} value={year}>{year}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-2"><FormField
                        control={form.control}
                        name="more"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>More Details</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Tell us more about it"
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                /></div>
                <button type="submit" id='GO' disabled={isLoading}
                    className={`cursor-pointer rounded-md font-medium duration-1000
                        bg-[var(--${props.edit===-1?"green":"pink"})]
                        text-[var(--${props.edit===-1?"fore":"back"}ground)]
                        block px-4 py-[0.2rem] min-w-[6rem]`}>
                    <>{isLoading ? 'Loading' : props.edit===-1?"Add":"Update"}</>
                </button>
            </form>
        </Form>
    )
}
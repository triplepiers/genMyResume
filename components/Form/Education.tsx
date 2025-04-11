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

// 这个是 Degree 的选择列表
const degreeList = [
    'Associate of Arts',
    'Associate of Science',
    'Associate of Applied Science',
    'Bachelor of Arts',
    'Bachelor of Science',
    'BBA',
    'Master of Arts',
    'Master of Science',
    'MBA',
    'J.D.',
    'M.D.',
    'Ph.D.',
    'Enter your own',
]
const monthList = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]
// 从今年往后 5 年
let minYear = 1990;
let curYear = new Date().getFullYear();
var yearList: string[] = [];
for (let i = curYear + 5; i >= minYear; i--) { yearList.push(i.toString()) }

const str_spc = z.string()//.regex(/^[A-Za-z\s]+$/, { message: "Contains ONLY characters", });
const formSchema = z.object({
    institution: str_spc.min(1, { message: 'Not Null'}),
    location: str_spc.optional(),
    degree: str_spc.optional(),
    neodegree: str_spc.optional(),
    field: str_spc.optional(),
    bg_month: z.string().optional(),
    bg_year: z.string().optional(),
    ed_month: z.string().optional(),
    ed_year: z.string().optional(),
    more:    z.string().optional()
})
type formKey = "institution" | "location" | "degree" | "neodegree" | "field" | "bg_month" | "bg_year" | "ed_month" | "ed_year";

export const Education = (props: { edit: number, updateFormStatus: Function }) => {
    const [degree, setDegree] = useState("")
    const [bgMonth, setbgMonth] = useState("")
    const [bgYear,  setbgYear]  = useState("")
    const [edMonth, setedMonth] = useState("")
    const [edYear,  setedYear]  = useState("")
    useEffect(() => {
        Clear()
        if (props.edit !== -1)  {
            axios.get('/edu', {
                params: {
                    idx:   props.edit
                }
            }).then((res) => {
                if(res.status === 200) {
                    for (let [key, val] of Object.entries(JSON.parse(res.data.edu))) {
                        if (key === 'degree') { setDegree(val as string) } 
                        else if (key === 'bg_month') { setbgMonth(val as string) }
                        else if (key === 'bg_year')  { setbgYear(val as string) }
                        else if (key === 'ed_month') { setedMonth(val as string) }
                        else if (key === 'ed_year')  { setedYear(val as string) }
                        else { form.setValue(key as formKey, val as string) }
                    }
                }
            })
        }
    }, [props.edit])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // 做一些级联检查
        if (degree === 'Enter your own' && !values.neodegree) {
            form.setError('neodegree', { message: 'Please enter a new degree' });
            return;
        }
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
            institution: values.institution,
            location:    values.location,
            degree:      degree,
            neodegree:   values.neodegree,
            field:       values.field,
            bg_month:    bgMonth,
            bg_year:     bgYear,
            ed_month:    edMonth,
            ed_year:     edYear,
            more:        values.more
        }

        if (props.edit === -1) {
            axios.post('/edu/add', {
                data:  JSON.stringify(vals)
            })
            // clear input
            Clear();
        } else {
            axios.post('/edu/update', {
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
        // console.log('clr')
        form.clearErrors()
        form.setValue("institution", "")
        form.setValue("location", "")
        setDegree("")
        form.setValue("neodegree", "")
        form.setValue("field", "")
        setbgMonth("")
        setbgYear("")
        setedMonth("")
        setedYear("")
        form.setValue('more', "")
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-5 space-y-0 w-110">
                <div className="col-span-2 sm:col-span-1"><FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Institution*</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. The University of Hong Kong" {...field} />
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
                                <Input placeholder="e.g. HonKong" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /></div>
                <div className="col-span-2 grid grid-cols-2 gap-5">
                    {/* 看了下 zety 是直接搞了个 row */}
                    <div className="col-span-2 sm:col-span-1"><FormField
                        control={form.control}
                        name="degree"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Degree</FormLabel>
                                <Select onValueChange={(val) => setDegree(val)} defaultValue={degree} value={degree}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a degree" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>{degreeList.map((degree, index) => (
                                        // 总之列表渲染
                                        <SelectItem key={index} value={degree}>{degree}</SelectItem>
                                    ))}</SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    /></div>
                    {degree === 'Enter your own' && ( // 要用 watch，否则没法实时监听
                        <div className="col-span-2 sm:col-span-1"><FormField
                            control={form.control}
                            name="neodegree"
                            render={({ field }) => (
                                <FormItem>
                                    <span className="text-[var(--blue)]"><FormLabel>Enter a New Degree*</FormLabel></span>
                                    <FormControl>
                                        <Input placeholder="e.g. Bachelor's" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /></div>
                    )}
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-5">
                    <div className="col-span-2 sm:col-span-1"><FormField
                        control={form.control}
                        name="field"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Field of Study</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Business" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /></div>
                </div>
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
                    <FormLabel>Graduation Date (expected)</FormLabel>
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
                            <FormLabel>More Information</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
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
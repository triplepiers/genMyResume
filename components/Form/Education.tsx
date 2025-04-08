import { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormItem, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

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

const str_spc = z.string().min(2, { message: "Name must be at least 2 characters.", }).regex(/^[A-Za-z\s]+$/, { message: "Contains ONLY characters", });
const formSchema = z.object({
    institution: str_spc,
    location: str_spc.optional(),
    degree: str_spc.optional(),
    neodegree: str_spc.optional(),
    field: str_spc.optional(),
    bg_month: z.string().optional(),
    bg_year: z.string().optional(),
    ed_month: z.string().optional(),
    ed_year: z.string().optional(),
})
type formKey = "institution" | "location" | "degree" | "neodegree" | "field" | "bg_month" | "bg_year" | "ed_month" | "ed_year";

export const Education = (props: { updateFormMeta: Function, updateFormStatus: Function }) => {
    useEffect(() => {
        props.updateFormMeta({
            title: 'Education Experience',
            desc: 'Tell us about it, even if you are still studying or have not graduated yet.',
        })
    })

    useEffect(() => {
        let data = localStorage.getItem('2');
        if (data) {
            for (let [key, val] of Object.entries(JSON.parse(data))) {
                form.setValue(key as formKey, val as string)
            }
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // 做一些级联检查
        if (values.degree === 'Enter your own' && !values.neodegree) {
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

        await localStorage.setItem('2', JSON.stringify(values)); // 存在 localStorage
        props.updateFormStatus();                                // go next
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-5 space-y-0 w-full max-w-140">
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    {form.watch('degree') === 'Enter your own' && ( // 要用 watch，否则没法实时监听
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <button type="submit" id='GO' className="w-0 h-0"></button>
            </form>
        </Form>
    )
}
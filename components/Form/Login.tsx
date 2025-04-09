import { set, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormItem, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

import axios from "@/lib/axios";

enum BtnType {
    normal,
    wait,
    success,
    error
};

const formSchema = z.object({
    phone:      z.string().length(11).regex(/^[0-9]+$/, { message: "Invalid Character", }),
    password:   z.string().min(5, { message: "Too short", }).max(10, { message: "Too long"})
});

export const LoginForm = () => {
    const router = useRouter();
    const [btnType, setBtnType]  = useState(BtnType.normal)
    const [errMsg,  setErrMsg]   = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {

        setBtnType(BtnType.wait);

        await axios.post('/usr', {
            phone:    values.phone,
            pwd:      values.password
        }).then((res) => {
            if (res.status === 200) {
                // 存 localStorage
                localStorage.setItem('account', res.data.account);
                localStorage.setItem('isVIP',   res.data.isVIP);
                // 返回之前的页面
                setBtnType(BtnType.success);
                setTimeout(() => {
                    router.back();
                }, 2000);
            } else {
                setBtnType(BtnType.error);
                if (res.status===204) {
                    setErrMsg('Phone Exists')
                } else if (res.status===203) {
                    setErrMsg('Wrong Info')
                }
            }
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                onChange={()=> {if(btnType===BtnType.error){setBtnType(BtnType.normal)}}}
                className="flex flex-col justify-center h-full gap-3">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number*</FormLabel>
                            <FormControl>
                                <Input placeholder="Should be Unique" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password*</FormLabel>
                            <FormControl>
                                <Input placeholder="Not your birthday" {...field} type="password"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                 type="submit"
                 disabled={btnType===BtnType.wait||btnType===BtnType.success} 
                 variant={btnType===BtnType.error?"destructive":"default"}
                 className={`mt-4 ${btnType===BtnType.success?"bg-[var(--green)]":""}`}>
                    {
                        (btnType===BtnType.wait) ? (<>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </>):(<></>)
                    }
                    {
                        (btnType===BtnType.error) ? (
                            <>{errMsg}</>
                        ):(<></>)
                    }
                    {
                        (btnType===BtnType.success) ? (
                            <>Success!</>
                        ):(<></>)
                    }
                    {
                        (btnType===BtnType.normal)?(
                            <>Start</>
                        ):(<></>)
                    }
                </Button>
            </form>
        </Form>
    )
}
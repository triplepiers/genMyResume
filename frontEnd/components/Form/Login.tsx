import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormItem, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, PhoneInput } from "../ui/input";

import { handlePhone } from "@/lib/utils";
import axios from "@/lib/axios";

enum BtnType {
    normal,
    wait,
    success,
    error
};

const formSchema = z.object({
    phone:      z.string(),
    password:   z.string().min(5, { message: "Too short", }).max(15, { message: "Too long"})
});

export const LoginForm = () => {
    const router = useRouter();
    const [btnType, setBtnType]  = useState(BtnType.normal)
    const [errMsg,  setErrMsg]   = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // 检查用户名
        let phone = values.phone;
        if (phone.length === 0) {
            form.setError('phone', { message: 'Required'})
            return
        } else if (phone.length < 9) {
            form.setError('phone', { message: 'Incomplete'})
            return
        } else {
            values.phone = `${phone.slice(0,4)}${phone.slice(5)}`
        }
        setBtnType(BtnType.wait);
        axios.post('/usr', {
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
                if (res.status===202) {
                    setErrMsg('Account doesn\'t exists')
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
                className="flex flex-col justify-center h-full gap-3 w-70">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number*</FormLabel>
                            <FormControl>
                                <PhoneInput placeholder="eg. 1234 5678" 
                                    {...field} onChange={(e) => handlePhone(e, form, 'phone')}/>
                            </FormControl>
                            <FormDescription>
                                8-bit HongKong Phone Number as your account
                            </FormDescription>
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
                            <FormDescription className="pl-2">
                                <span>5~15 bit</span><br/>
                                <span>Contains Numbers, Letters, Special Symbols (@#$%&*+) at the same time</span>
                            </FormDescription>
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
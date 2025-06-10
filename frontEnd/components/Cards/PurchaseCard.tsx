import axios from "@/lib/axios";
import { useState, useEffect } from "react";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";


enum BtnType {
    tooShort,
    fineLen,
    wait,
    success,
    error
};

export const PurchaseCard = (props: {
    updateShow: Function, 
    tid: string, title: string
}) => {
    var tid = props.tid;
    useEffect(() => {
        // buy CDK: 没用，只是在后台把 CDK 打出来
        axios.post('/cdk', { tid }) // TODO：这个需要放出来
    }, [])
    
    const [OTPVal,  setOTPVal]   = useState("");
    const [btnType, setBtnType]  = useState(BtnType.tooShort);
 
    // var cdk: string = '072076D953E9';     // TODO：这个需要删掉

    const handleChange = (newVal: string) => {
        setOTPVal(newVal.toUpperCase()) // 统一为大写

        if (newVal.length === 12) {
            setBtnType(BtnType.fineLen)
        } else {
            setBtnType(BtnType.tooShort)
        }
    }

    const validate = async () => {
        setBtnType(BtnType.wait);

        // // TODO：这一块需要删掉
        // await setTimeout(() => {
        //     if (OTPVal === cdk) {
        //         setBtnType(BtnType.success)
        //     } else {
        //         setBtnType(BtnType.error)
        //     }
        // }, 2000)
        // return 

        await axios.post('/cdk/check', {
            cdk: OTPVal, 
            tid
        }).then(res => {
            if (res.status === 200) {
                if (res.data) {
                    setBtnType(BtnType.success)
                    if (tid==='vip') {
                        axios.post('/usr/vip/add')
                    }
                    setTimeout(() => {
                        if (tid==='vip') {
                            props.updateShow(false, true);
                        } else {
                            handleExt();
                        }
                    }, 2000);
                } else {
                    setBtnType(BtnType.error)
                }
            }
        })
    }

    // 退出：销毁组件
    const handleExt = () => {
        props.updateShow(false);
    }

    return (
        <div className="custom-hover-page-middle custom-card-base">
            <div className="w-full flex justify-between">
                <h2 className="font-bold text-xl mb-1 text-[var(--foreground)]">
                    {props.title}
                </h2>
                <button className="cursor-pointer" onClick={handleExt}>
                    <Plus className="rotate-45 hover:rotate-90 duration-100
                    text-[var(--pink)]"/>
                </button>
            </div>
            <p className="mb-5">
                Please enter the code key you received.
            </p>
            <InputOTP disabled={btnType === BtnType.wait}
            maxLength={12} pattern="^[a-zA-Z0-9]+$" onChange={handleChange} value={OTPVal}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={8} />
                    <InputOTPSlot index={9} />
                    <InputOTPSlot index={10} />
                    <InputOTPSlot index={11} />
                </InputOTPGroup>
            </InputOTP>
            <div className="w-full flex justify-center mt-5">
                <Button disabled={btnType!==BtnType.fineLen && btnType!==BtnType.error} 
                 variant={btnType===BtnType.error?"destructive":"default"}
                 className={btnType===BtnType.success?"bg-[var(--green)]":""}
                 onClick={validate}>
                    {
                        (btnType===BtnType.wait) ? (<>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </>):(<></>)
                    }
                    {
                        (btnType===BtnType.error) ? (
                            <>Wrong CDK</>
                        ):(<></>)
                    }
                    {
                        (btnType===BtnType.success) ? (
                            <>Success!</>
                        ):(<></>)
                    }
                    {
                        (btnType!==BtnType.error && btnType!==BtnType.success && btnType!==BtnType.wait)?(
                            <>Validate</>
                        ):(<></>)
                    }
                </Button>
            </div>
        </div>
    )
}
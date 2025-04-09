import axios from "axios";
import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

axios.defaults.baseURL = 'http://localhost:8080';

var uid = 'uid';
var tid = 'tid';

export const PurchaseCard = () => {
    const [OTPVal, setOTPVal] = useState("");
    var cdk: string = '072076D953E9';
    var validated: boolean = false;

    const handleChange = (newVal: string) => {
        setOTPVal(newVal.toUpperCase()) // 统一为大写
    }

    const buyCDK = () => {
        return;
        axios.post('/cdk', {
            uid, tid
        }).then(res => {
            if (res.status === 200) {
                cdk = res.data
            }
        })
    }

    const validate = () => {
        let res: boolean = (OTPVal === cdk);
        console.log(res)
        if (res) {
            setOTPVal(""); // clear
            // show success，关闭
        } else {
            // show error
        }
        return res;

        axios.post('/cdk/check', {
            cdk, uid, tid
        }).then(res => {
            if (res.status === 200) {
                validated = res.data;
            }
        })
    }

    return (
        <div>
            <InputOTP maxLength={12} pattern="^[a-zA-Z0-9]+$" onChange={handleChange} value={OTPVal}>
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
            <button onClick={validate}>验证</button>
        </div>
    )
}
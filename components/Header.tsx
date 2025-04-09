import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import { Flame } from "lucide-react";

export const Header = () => {
    const [account, setAccount] = useState("");
    const [isVIP,   setIsVIP]   = useState(false)

    useEffect(() => {
        localStorage.setItem('account', 'sss777')
        localStorage.setItem('isVIP', 'true')
        if (localStorage.getItem('account')) {
            setAccount(localStorage.getItem('account') as string);
        }
        if (localStorage.getItem('isVIP')) {
            setIsVIP(localStorage.getItem('isVIP') !== 'false');
        }
    })

    // 登出
    const logout = () => {
        localStorage.removeItem('account');
        localStorage.removeItem('isVIP');
        // 触发重新渲染
        setAccount("");
        setIsVIP(false);
    }

    // TODO：购买会员
    const beVIP = () => {
        if (!isVIP) {
            console.log('buy!')
        }
    }

    return (
        <header className="bg-black/[0.8] backdrop-blur-sm shadow-xl text-white
        w-screen h-[var(--header-height)] sticky top-0 z-999
        flex items-center justify-between px-5">
            <Link href={'/'}><div>Logo</div></Link>
            
            <div className="flex gap-[1rem] items-center">
                <div>Options</div>
                {
                    account.length > 0 ? (
                        <div className="underline cursor-pointer flex items-center gap-[0.3rem]">
                            <div onClick={logout}>
                                Hi,&nbsp;
                                <span className="text-[var(--blue)]">
                                    {account.slice(0,2)}*{account.slice(-4,-1)}
                                </span>
                            </div>
                            <Flame className={`
                                w-[1.5rem] h-[1.5rem] p-[0.2rem] border-1 border-transparent rounded duration-200
                                ${isVIP?"text-[var(--blue)] hover:border-[var(--blue)]":"hover:border-[var(--background)]"}`}
                                onClick={beVIP}
                            />
                        </div>
                    ):(
                        <Link href={'/login'}><button className="bg-[var(--pink)] font-bold
                        px-[1.25rem] py-[0.25rem] rounded-2xl
                        cursor-pointer">
                            Log In
                        </button></Link>
                    )
                }
            </div>
        </header>
    )
};
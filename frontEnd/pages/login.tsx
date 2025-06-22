import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoginCard } from "@/components/Cards/LoginCard";
import { SigninCard } from "@/components/Cards/SigninCard";

export default function Login(props: any[]) {
    const router = useRouter();
    const [ useHK, setUseHK ] = useState<boolean>();
    // 登录拦截器
    useEffect(() => {
        if (localStorage.getItem('account')) router.push('/');
        if (localStorage.getItem("useHK") === null) {
            localStorage.setItem("useHK", "true");
            setUseHK(true);
        } else {
            setUseHK(localStorage.getItem("useHK") === "true");
        }
    }, []);
    const switchFormat = () => {
        if (useHK) {
            localStorage.setItem("useHK", "false");
            setUseHK(false);
        } else {
            localStorage.setItem("useHK", "true");
            setUseHK(true);
        }
    }
    return (
        <div className="flex flex-col flex-wrap items-center justify-center gap-y-[2rem]
             w-screen min-h-[calc(100vh-var(--header-height))] p-20 scroll">
                <div  className="flex flex-col items-center justify-center gap-1">
                    <h1 className="text-3xl font-bold">Please Log In to continue</h1>
                    <p className="color">Do not have a {useHK?'HongKong':'mainland'} phone numer?&nbsp; 
                        <span 
                            onClick={switchFormat}
                            className="text-[var(--pink)] cursor-pointer">
                            Use <b>{useHK?'mainland':'HongKong'}</b> format
                        </span>
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-[2rem]">
                    <LoginCard/>
                    <SigninCard/>
                </div>
        </div>
    )
}

export function getStaticProps() {
    return {
        props: {
            pageName: "Result",
            // privateFooter: true
        },
    };
}
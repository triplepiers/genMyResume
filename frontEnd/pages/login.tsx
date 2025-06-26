import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoginCard } from "@/components/Cards/LoginCard";
import { SigninCard } from "@/components/Cards/SigninCard";

export default function Login(props: any[]) {
    const router = useRouter();
    const [showLogIn, setShowLogIn] = useState(true);
    // 登录拦截器
    useEffect(() => {
        if (localStorage.getItem('account')) router.push('/');
    }, []);

    return (
        <div className="flex flex-col flex-wrap items-center justify-center gap-y-[2rem]
             w-screen min-h-[calc(100vh-var(--header-height))] p-20 scroll">
                <div  className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-3xl font-bold">Please Log In to continue</h1>
                    <p className="color">{
                        showLogIn ? <>
                            Do not have a account?&nbsp;
                            <span onClick={() => setShowLogIn(false)}
                                className="text-[var(--blue)] cursor-pointer underline">
                                <b>Register an account</b>
                            </span>
                        </>:<>
                            Already have a account?&nbsp;
                            <span onClick={() => setShowLogIn(true)}
                                className="text-[var(--pink)] cursor-pointer underline">
                                <b>Go back to log in</b>
                            </span>
                        </>
                    }</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-[2rem]">
                    {
                        showLogIn ? <LoginCard/> : <SigninCard/>
                    }
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
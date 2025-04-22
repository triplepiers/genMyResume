import { LoginCard } from "@/components/Cards/LoginCard";
import { SigninCard } from "@/components/Cards/SigninCard";

export default function Login(props: any[]) {
    return (
        <div className="flex flex-col flex-wrap items-center justify-center gap-y-[2rem]
             w-screen min-h-[calc(100vh-var(--header-height))] p-20 scroll">
                <h1 className="text-3xl font-bold">Please Log In to continue</h1>
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
import Link from "next/link";

export const Header = () => {
    return (
        <header className="bg-black/[0.8] backdrop-blur-sm shadow-xl text-white
        w-screen h-[var(--header-height)] sticky top-0 z-999
        flex items-center justify-between px-5">
            <Link href={'/'}><div>Logo</div></Link>
            <div className="flex gap-[1rem] items-center">
                <div>Options</div>
                <Link href={'/login'}><button className="bg-[var(--pink)] font-bold
                px-[1.25rem] py-[0.25rem] rounded-2xl
                cursor-pointer">
                    Log In
                </button></Link>
            </div>
        </header>
    )
};
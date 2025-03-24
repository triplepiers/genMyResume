import Link from "next/link";
export const Header = () => {
    return (
        <header className="bg-slate-800 text-white
        w-screen h-[var(--header-height)] sticky top-0
        flex items-center justify-between px-5">
            <Link href={'/'}><div>Logo</div></Link>
            <div className="flex gap-[1rem] items-center">
                <div>Options</div>
                <button className="bg-[var(--hilight)] text-[var(--foreground)] font-bold
                px-[1.25rem] py-[0.25rem] rounded-2xl
                cursor-pointer">
                    Log In
                </button>
            </div>
        </header>
    )
};
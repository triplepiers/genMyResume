import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PurchaseCard } from "@/components/Cards/PurchaseCard";

export default function VIP(props: any[]) {
    const router = useRouter();
    const [showCard, setShowCard] = useState(false);
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        // 登录拦截器
        const account = localStorage.getItem('account');
        if (!account) router.push('/login');
        // VIP 拦截
        const isVIP = localStorage.getItem('isVIP');
        if (isVIP === 'true') router.back(); // 是 VIP 就给我会去
    }, []);

    const handleUpdateShowCard = (neoShowCard: boolean, charged: boolean) => {
        setShowCard(neoShowCard);
        if (charged) {
            localStorage.setItem('isVIP', 'true');
            router.back();
        }
    }

    return (
        <>
            <div className="min-w-screen max-w-screen min-h-[calc(100vh-var(--header-height))] pt-10 px-30 flex flex-col gap-y-10 items-center">
                <h1 className="text-3xl font-black">Become Our VIP</h1>
                <div className="w-full flex flex-wrap gap-x-5">
                    <div className="flex-1 flex flex-col items-center cursor-pointer
                        border-2 rounded duration-500"
                        onClick={() => setSelected(1)}
                        style={{ borderColor: `${selected===1?'var(--green)':'#ccc'}`}}>
                        月度会员
                    </div>
                    <div className="flex-1 flex flex-col items-center cursor-pointer
                        border-2 rounded duration-500"
                        onClick={() => setSelected(2)}
                        style={{ borderColor: `${selected===2?'var(--green)':'#ccc'}`}}>
                        年度会员
                    </div>
                </div>
                <button className="font-medium duration-500
                    px-[2rem] py-[0.5rem] rounded-md
                    cursor-pointer"
                    style={{ backgroundColor: `${selected>0?'var(--green)':'#aaa'}`}}
                    disabled={selected===0}
                    onClick={() => setShowCard(true)}>
                    Join Us Now
                </button>
            </div>
            {
                showCard ?
                    (<PurchaseCard
                        tid="vip" title={`Become a ${selected===1?'Monthly':'Permanent'} VIP`}
                        updateShow={handleUpdateShowCard}
                    />) : (<></>)
            }
        </>
    )
}

export function getStaticProps() {
    return {
        props: {
            pageName: "Pricing",
        },
    };
}
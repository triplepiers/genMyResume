import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PurchaseCard } from "@/components/Cards/PurchaseCard";

import axios from "@/lib/axios";

export default function VIP(props: any[]) {
    const router = useRouter();
    const [showCard, setShowCard] = useState(false);
    const [selected, setSelected] = useState(0);
    const [expire, setExpire] = useState<any>();

    useEffect(() => {
        // 登录拦截器
        const account = localStorage.getItem('account');
        if (!account) router.push('/login');
        // 请求过期时间
        updateVIPinfo();
    }, []);

    const updateVIPinfo = () => {
        axios.get('/usr/vip')
        .then(res => {
            if (res.status === 200) {
                localStorage.setItem('isVIP', res.data.isVIP)
                setExpire(res.data.expire)
            }
        })
    }

    const handleUpdateShowCard = (neoShowCard: boolean, charged: boolean) => {
        setShowCard(neoShowCard);
        if (charged) updateVIPinfo();
    }

    const format = (dstr: any) => {
        if(!dstr) return '';
        if(dstr<0) return 'Never';
        const date = new Date(dstr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
        const day = String(date.getDate()).padStart(2, '0'); // 补零
        return `${year}-${month}-${day}`;
    }
    return (
        <>
        <div>Exipre @{format(expire)}</div>
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
                        tid={`${selected}vip`} title={`Become a ${selected===1?'Monthly':'Permanent'} VIP`}
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
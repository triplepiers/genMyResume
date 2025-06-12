import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PurchaseCard } from "@/components/Cards/PurchaseCard";

import axios from "@/lib/axios";

const Plans = [
    {
        id: 0,
        name: 'Ordinary',
        price: <div className="text-3xl font-bold my-2">Free</div>,
        resume: <>
            <div> <span className="text-[0.6em]">(For each template)</span></div>
            <div className="pl-[1em]">
                Free for the 1<sup>st</sup> time,<br />
                then a 2 <span className="text-[0.6em]">HKD</span> One-Time Payment
            </div>
        </>,
        ss: <div className="pl-[1em]">
            Free for the 1<sup>st</sup> time,<br /> then 2 <span className="text-[0.6em]">HKD</span> / Time
        </div>,
        job: <div className="pl-[1em]">
            5 <span className="text-[0.6em]">HKD</span> / 10 Recommended Results
        </div>,
        path: <div className="pl-[1em]">
            5 <span className="text-[0.6em]">HKD</span> / Time
        </div>
    }, {
        id: 1,
        name: 'Monthly',
        price: <div className="font-bold my-2"><span className="text-3xl">30</span> HKD / 30Days</div>,
        resume: <div>✅</div>,
        ss: <div>✅</div>,
        job: <div className="pl-[1em]">30 Recommended Results / Day</div>,
        path: <div className="pl-[1em]">30 Times / Month</div>
    }, {
        id: 2,
        name: 'Permanent',
        price: <div className="font-bold my-2"><span className="text-3xl">128</span> HKD</div>,
        resume: <div>✅</div>,
        ss: <div>✅</div>,
        job: <div>✅</div>,
        path: <div>✅</div>
    }
]

export default function VIP(props: any[]) {
    const router = useRouter();
    const [showCard, setShowCard] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [expire, setExpire] = useState<any>();

    useEffect(() => { // 允许未登录查看
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

    const canShowCard = () => {
        const account = localStorage.getItem('account');
        if (!account) router.push('/login'); // 登录拦截器
        else setShowCard(true);
    }

    const handleUpdateShowCard = (neoShowCard: boolean, charged: boolean) => {
        setShowCard(neoShowCard);
        if (charged) updateVIPinfo();
    }

    const format = (dstr: any) => {
        if (!dstr) return '';
        if (dstr < 0) return 'Never';
        const date = new Date(dstr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
        const day = String(date.getDate()).padStart(2, '0'); // 补零
        return `${year}-${month}-${day}`;
    }

    const expire_to_planID = (expire: any) => {
        if (!expire) return 0;
        else if (expire < 0) return 2;
        else return 1;
    }

    return (
        <>
            <div className="min-w-screen max-w-screen min-h-[calc(100vh-var(--header-height))] py-10 px-30 flex flex-col gap-y-10 items-center">
                <div className="flex flex-col items-center gap-y-3">
                    <h1 className="text-3xl font-black">Become Our VIP</h1>
                    <div className="text-[var(--pink)]"><b>Offer:</b> Free upgrade to <b>Monthly Plan</b> for the first 50 registrations !</div>
                </div>
                <div className="w-full flex flex-wrap gap-5 justify-center ">
                    {
                        Plans.map((plan) => {
                            return (
                                <div className="flex flex-col items-center cursor-pointer shadow-lg
                                border-2 rounded duration-500 px-10 py-5 min-w-86 max-w-86" key={plan.id}
                                    onClick={() => { if (plan.id > 0) setSelected(plan.id); }}
                                    style={{ borderColor: `${selected === plan.id ? 'var(--green)' : '#eee'}` }}>
                                    <div className="text-xl font-bold">{plan.name} {plan.id === expire_to_planID(expire) ? <span className="text-[0.6em] text-[var(--pink)]">(Current Plan)</span> : <></>}</div>
                                    {plan.id === 1 && expire ? <div className="text-[0.8rem] text-[var(--pink)]">Expire @{format(expire)}</div> : <></>}
                                    {plan.price}
                                    <div className="w-full flex flex-col h-full gap-y-2 mt-3 text-[#666]">
                                        <div className="w-full flex flex-wrap justify-between">
                                            <div><b>Resume Template: </b></div>
                                            {plan.resume}
                                        </div>
                                        <div className="w-full flex flex-wrap justify-between">
                                            <div><b>Self-Statement Generation: </b></div>
                                            {plan.ss}
                                        </div>
                                        <div className="w-full flex flex-wrap justify-between">
                                            <div><b>Job Recommendation: </b></div>
                                            {plan.job}
                                        </div>
                                        <div className="w-full flex flex-wrap justify-between">
                                            <div><b>Career Path Simulation: </b></div>
                                            {plan.path}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <button className="font-medium duration-500
                    px-[2rem] py-[0.5rem] rounded-md
                    cursor-pointer"
                    style={{ backgroundColor: `${selected > 0 ? 'var(--green)' : '#aaa'}` }}
                    disabled={selected <= 0}
                    onClick={canShowCard}>
                    Upgrade Now
                </button>
            </div>
            {
                showCard ?
                    (<PurchaseCard
                        tid={`${selected}vip`} title={`Become a ${selected === 1 ? 'Monthly' : 'Permanent'} VIP`}
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
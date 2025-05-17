import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flame } from "lucide-react";
import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space } from "antd";

import { PurchaseCard } from "@/components/Cards/PurchaseCard";

const subPages = [
    {
        url: '/checkout',
        title: 'Resume Design'
    },
    {
        url: '/jobs',
        title: 'Job Search'
    }, 
    {
        url: '/path',
        title: 'Career Path Simulator'
    }
]

export const Header = () => {
    const logoURL = './Logo.png';
    const router = useRouter();
    const [windowWidth, setWindowWidth] = useState<number>();
    const [account, setAccount] = useState("");
    const [isVIP, setIsVIP] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const handleUpdateShowCard =  (neoShowCard: boolean) => {
        setShowCard(neoShowCard);
    }
    useEffect(() => {
        if (localStorage.getItem('account')) {
            setAccount(localStorage.getItem('account') as string);
        }
        if (localStorage.getItem('isVIP')) {
            setIsVIP(localStorage.getItem('isVIP') !== 'false');
        }
    }, [router.pathname]);
    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    // 登出
    const logout = () => {
        localStorage.removeItem('account');
        localStorage.removeItem('isVIP');
        // 触发重新渲染
        setAccount("");
        setIsVIP(false);
        router.push('/')
    }

    const beVIP = () => {
        if (!isVIP) {
            setShowCard(true);
        }
    }

    return (
        <>
            <header className="bg-black/[0.8] backdrop-blur-sm shadow-xl text-white
        w-screen h-[var(--header-height)] sticky top-0 z-999
        flex items-center justify-between px-5">
                <Link href={'/'}>
                    <div className="flex items-end">
                        <img src={logoURL} alt="logo" className="w-8"/>
                        <span className="font-bold">Resume Edge</span>
                    </div>
                </Link>

                <div className="flex gap-[1rem] items-center h-full">
                    {
                        !windowWidth || windowWidth > 720 ?
                            subPages.map(itemInfo => (
                                <div key={itemInfo.url} 
                                    onClick={() => {if (account.length>0) router.push(itemInfo.url)}}
                                    className="h-full flex items-center px-2 border-[var(--blue)]
                            hover:text-[var(--blue)] hover:border-b-[6px] duration-200 cursor-pointer">
                                    {itemInfo.title}
                                </div>
                            )) : (<Dropdown placement="bottom"
                                menu={{
                                    selectable: true,
                                    defaultSelectedKeys: [router.pathname],
                                    items: subPages.map(itemInfo => {
                                        return {
                                            key: itemInfo.url,
                                            label: (
                                                <div onClick={() => {if(account.length > 0) router.push(itemInfo.url);}}
                                                    className="h-full flex items-center px-2 text-md cursor-pointer">
                                                    {itemInfo.title}
                                                </div>
                                            )
                                        }
                                    })
                                }}>
                                <a onClick={(e) => e.preventDefault()} className="group">
                                    <Space>
                                        Menu
                                        <MenuOutlined />
                                    </Space>
                                </a>
                            </Dropdown>)
                    }
                    {
                        account.length > 0 ? (
                            <div className="underline cursor-pointer flex items-center gap-[0.3rem]">
                                <div onClick={logout}>
                                    Hi,&nbsp;
                                    <span className="text-[var(--blue)]">
                                        {account.slice(0, 2)}*{account.slice(-4, -1)}
                                    </span>
                                </div>
                                <Flame className={`
                                w-[1.5rem] h-[1.5rem] p-[0.2rem] border-1 border-transparent rounded duration-200
                                ${isVIP ? "text-[var(--blue)] hover:border-[var(--blue)]" : "hover:border-[var(--background)]"}`}
                                    onClick={beVIP}
                                />
                            </div>
                        ) : (
                            <Link href={'/login'}><button className="bg-[var(--pink)] font-bold
                        px-[1.25rem] py-[0.25rem] rounded-2xl
                        cursor-pointer">
                                Log In
                            </button></Link>
                        )
                    }
                </div>
            </header>
            {
                showCard ?
                    (<PurchaseCard
                        tid="vip" title="Oops! You are not VIP now"
                        updateShow={handleUpdateShowCard}
                    />) : (<></>)
            }
            </>
    )
};
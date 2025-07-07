'use client'

/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import lzStr from 'lz-string';
import { Table, Descriptions, message, Button, Select, Space, Tag } from 'antd';
import { PurchaseCard } from '@/components/Cards/PurchaseCard';

import axios from '@/lib/axios';

const cols = [
    {
        title: 'Job Title',
        dataIndex: 'title',
        key: 'title',

    },
    {
        title: 'Prefer',
        key: 'match',
        dataIndex: 'match',
        render: (match: boolean) => (
            <>{
                match ? (<Tag color='green'>Match</Tag>) : (<Tag>Dismatch</Tag>)
            }</>
        ),
    },
    {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
    },
    {
        title: 'Apply',
        dataIndex: 'jid',
        key: 'jid',
        render: (jid: string) => (
            <Link href={`https://hk.jobsdb.com/job/${jid}/apply`} target="_blank">
                Go
            </Link>
        )
    },
]

export default function Jobs(props: any[]) {
    const router = useRouter();

    const [canGen, setCanGen] = useState(false);
    const [showPurchase, setShowPurchase] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();
    const [isVIP, setIsVIP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [jobTitles, setJobTitles] = useState([]);
    const [preferred, setPreferred] = useState('');

    const resetPreferred = (neoVal: string) => {
        if (neoVal === undefined) return;
        if (neoVal !== preferred) setPreferred(neoVal);
    }

    // 判断是否需要充值
  const isNeedCharge = () => {
    if (!canGen) setShowPurchase(true);
  }

  const handlePurchase = (show: boolean, charged: boolean) => {
    setShowPurchase(show);
    if (charged) {
      setCanGen(true);
      localStorage.removeItem('hadGenRec'); // 充值后可以重新生成
    }
  }

    const SearchJobs = () => {
        setLoading(true)
        messageApi.open({
            type: 'loading',
            content: 'Searching the most suitable job for you ...',
            duration: 0,
        });
        axios.get('/job', {
            params: {
                preferred
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.data.details
            } else {
                if (res.status === 205) {
                    return []
                }
                return false
            }
        }).then((details) => {
            messageApi.destroy(); // clear loading message
            if (!details) {
                messageApi.open({
                    type: 'error',
                    content: 'Please complete your information first',
                });
                setTimeout(() => router.replace('/select'), 2000);
                return;
            }
            if (details.length === 0) {
                messageApi.open({
                    type: 'warning',
                    content: 'Searching ... Please refresh the page shortly after.',
                });
                return; // working for it ...
            }
            setData(details.map((item: any) => {
                return {
                    ...item,
                    desc: lzStr.decompress(item.desc)
                }
            }))
            setLoading(false);
            localStorage.setItem('hadGenRec', 'true'); // 标记已经生成过了
            // setCanGen(false); // 生成后不能再生成了
        })
    }

    useEffect(() => {
        // 登录拦截器
        const account = localStorage.getItem('account');
        if (!account) router.push('/login');
        else {
            // 看看之前有没有生成过
            const isVIP = localStorage.getItem('isVIP') === 'true';
            const hadGen = localStorage.getItem('hadGenRec') === 'true';
            setIsVIP(isVIP);
            setCanGen(true); // 默认可以生成
            // if (isVIP || !hadGen) setCanGen(true);
            // 获取职位列表
            axios.get('/job/titles').then(res => {
                if (res.status === 200) {
                    return res.data.titles
                } else {
                    return false
                }
            }).then(compressed => {
                if (!compressed) {
                    messageApi.open({
                        type: 'error',
                        content: 'Please complete your information first',
                    });
                    setTimeout(() => router.replace('/select'), 2000);
                    return;
                } else {
                    // 字母序排序
                    let titles = JSON.parse(lzStr.decompress(compressed)).sort()
                        .map((jTitle: string) => {
                            return {
                                value: jTitle, labbel: jTitle
                            }
                        })
                    setJobTitles(titles);
                }
            })
        }
    }, [])
    return (
        <>
            {contextHolder}
            <div className="min-w-screen max-w-screen min-h-[calc(100vh-var(--header-height))]">
                <div className="w-full flex justify-center pt-10 px-10">
                    <div className="text-lg max-w-[90vw]">
                        <h1 className="text-3xl font-black pb-3">Job Search</h1>
                        <p>According to your resume, we found some jobs that suits you the most.</p>
                        {!isVIP ? <p><b>Become our VIP to see more ...</b></p> : <></>}
                        <Space.Compact style={{ width: '100%', marginTop: '15px'}} onClick={isNeedCharge}>
                            {/* <Input defaultValue="" placeholder="Your preferred job position"
                                disabled={loading} ref={iptRef} /> */}
                            <Select
                                disabled={loading}
                                allowClear
                                className={`pointer-events-${canGen ? 'auto' : 'none'}`}
                                style={{ width: '100%', maxWidth: 'calc(100vw - 150px)' }}
                                showSearch
                                placeholder="Select Job Title"
                                onChange={resetPreferred}
                                onClear={() => resetPreferred("")}
                                options={jobTitles}
                            />
                            <Button type="primary" 
                                style={{ backgroundColor: 'var(--blue)' }} className={`pointer-events-${canGen ? 'auto' : 'none'}`}
                                onClick={SearchJobs} disabled={loading}>
                                Search
                            </Button>
                        </Space.Compact>
                    </div>
                </div>
                <div className="w-full p-10">
                    <Table
                        rowKey={(record: any) => record.jid}
                        // pagination={{ pageSize: 40 }}
                        pagination={false} // 去掉分页器
                        dataSource={data} columns={cols}
                        style={{ width: '100%' }}
                        expandable={{
                            columnTitle: 'Details',
                            expandedRowRender: (record) => (
                                <div className="pl-20 pr-10"><Descriptions
                                    column={2} layout="vertical"
                                    items={
                                        [{
                                            key: 'location',
                                            label: 'Location',
                                            children: record.location
                                        },
                                        {
                                            key: 'classification',
                                            label: 'Classification',
                                            children: record.classification
                                        },
                                        {
                                            key: 'description',
                                            label: 'Job Requirements',
                                            children: <div
                                                className="flex flex-col gap-1.5 list-disc"
                                                dangerouslySetInnerHTML={{ __html: record.desc }} />,
                                            span: 2
                                        }]
                                    } /></div>
                            )
                        }}
                    />
                </div>
            </div>
            {
                showPurchase ? <PurchaseCard tid='rec' title='Exceeded the free usage limit' updateShow={handlePurchase} /> : <></>
            }
        </>
    );
}

export function getStaticProps() {
    return {
        props: {
            pageName: "Job Search",
        },
    };
}
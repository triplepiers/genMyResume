'use client'
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import lzStr from 'lz-string';
import { Table, Descriptions, message, Button, Input, Space, Tag } from 'antd';

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
                match?(<Tag color='green'>Match</Tag>):(<Tag>Dismatch</Tag>)
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
    const iptRef = useRef(null);
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [isVIP, setIsVIP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const SearchJobs = () => {
        let preferred = iptRef.current!.input.value;
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
                setTimeout(() => router.replace('/checkout'), 2000);
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
        })
    }

    useEffect(() => {
        // 登录拦截器
        const account = localStorage.getItem('account');
        if (!account) router.push('/login');
        else {
            if (localStorage.getItem('isVIP')) {
                setIsVIP(localStorage.getItem('isVIP') !== 'false');
            }
        }
    }, [])
    return (
        <>
            {contextHolder}
            <div className="min-w-screen max-w-screen min-h-[calc(100vh-var(--header-height))]">
                <div className="w-full flex justify-center pt-10 px-10">
                    <div className="text-lg">
                        <h1 className="text-3xl font-black pb-3">Job Search</h1>
                        <p>According to your resume, we found some jobs that suits you the most.</p>
                        {!isVIP ? <p><b>Become our VIP to see more ...</b></p> : <></>}
                        <Space.Compact style={{ width: '100%', marginTop: '15px' }}>
                            <Input defaultValue="" placeholder="Your preferred job position"
                                disabled={loading} ref={iptRef} />
                            <Button type="primary" style={{ backgroundColor: 'var(--blue)' }}
                                onClick={SearchJobs} disabled={loading}>Search</Button>
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
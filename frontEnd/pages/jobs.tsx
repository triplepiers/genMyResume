'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Table, Descriptions, message } from 'antd';
import Link from "next/link";
import axios from '@/lib/axios';

const data = [
    {
        jid: '84137566',
        title: "Sales Admin/Coordinator/Support (MNC | 1-year contract | $25K)",
        company: "Morgan Half International (Hong Kong) Limited",
        location: "Hong Kong SAR",
        classification: "Client & Sales Administration (Administration & Office Support)"
    }
]

const cols = [
    {
        title: 'Job Title',
        dataIndex: 'title',
        key: 'title',
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
    const [messageApi, contextHolder] = message.useMessage();
    const [isVIP, setIsVIP] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('isVIP')) {
            setIsVIP(localStorage.getItem('isVIP') !== 'false');
            console.log(localStorage.getItem('isVIP'))
        }
        axios.get('/job').then((res) => {
            if (res.status === 200) {
                return res.data.details
            } else if (res.status === 204) {
                return false
            }
        }).then((details) => {
            if (!details) {
                messageApi.open({
                    type: 'error',
                    content: 'Please complete your information first',
                });
                setTimeout(() => router.replace('/checkout'), 2000);
                return;
            }
            setData(details);
        })
    }, [])
    return (
        <>
            {contextHolder}
            <div className="min-w-screen max-w-screen min-h-[calc(100vh-var(--header-height))]">
                <div className="w-full flex justify-center pt-10">
                    <div className="text-lg">
                        <h1 className="text-3xl font-black pb-3">Job Search</h1>
                        <p>According to your resume, we found some jobs that suits you the most.</p>
                        {!isVIP ? <p><b>Become our VIP to see more ...</b></p> : <></>}
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
                                <div className="pl-20"><Descriptions items={
                                    [{
                                        key: 'location',
                                        label: 'Location',
                                        children: record.location
                                    },
                                    {
                                        key: 'classification',
                                        label: 'classification',
                                        children: record.classification
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
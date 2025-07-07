'use client'

/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

import { Select, message } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import * as echarts from 'echarts'; // 全量引入
import axios from '@/lib/axios';
import lzStr from 'lz-string';

import { genEchartConfig } from '@/lib/configs';
import { PurchaseCard } from '@/components/Cards/PurchaseCard';

export default function PathSimulator(props: any[]) {
  const [messageApi, contextHolder] = message.useMessage();
  const [canGen, setCanGen] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);

  const [isLoadA, setIsLoadA] = useState(false);
  const [compA, setCompA] = useState<string>();
  const [sal_A, setSalA] = useState<number[]>([]);
  const [jg_idx_A, setJgIdxA] = useState<number[]>([]);

  const [isLoadB, setIsLoadB] = useState(false);
  const [compB, setCompB] = useState<string>();
  const [sal_B, setSalB] = useState<number[]>([]);
  const [jg_idx_B, setJgIdxB] = useState<number[]>([]);

  const [compList, setCompList] = useState<string[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);
  // 路由相关
  const router = useRouter();

  // 判断是否需要充值
  const isNeedCharge = () => {
    // 因为 Chrome 116 之后禁用了 disabled 组件冒泡，所以只能设 pointer-events: none + 父组件监听
    if (!canGen) setShowPurchase(true);
  }

  const handlePurchase = (show: boolean, charged: boolean) => {
    setShowPurchase(show);
    if (charged) {
      setCanGen(true);
      localStorage.removeItem('hadGenPath'); // 充值后可以重新生成
    }
  }

  // load Status
  useEffect(() => {
    if ((isLoadA&&!isLoadB) || (!isLoadA&&isLoadB)) {
      messageApi.open({
        type: 'loading',
        content: 'Loading...',
        duration: 0,
      });
    } else if (!isLoadA && !isLoadB) {
      messageApi.destroy();
    }
  }, [isLoadA, isLoadB]);

  // load CompNameList
  useEffect(() => {
    // 登录拦截器
    const account = localStorage.getItem('account');
    if (!account) router.push('/login');
    else {
      // 看看之前有没有生成过
      const isVIP = localStorage.getItem('isVIP') === 'true';
      const hadGen = localStorage.getItem('hadGenPath') === 'true';
      if (isVIP || !hadGen) setCanGen(true);
      // 获取公司列表
      axios.get('/path')
        .then(res => {
          if (res.status === 200) {
            return res.data.compList
          } else {
            return false
          }
        })
        .then((compressed) => {
          if (!compressed) {
            messageApi.open({
              type: 'error',
              content: 'Please complete your information first',
            });
            setTimeout(() => router.replace('/select'), 2000);
            return;
          } else {
            setCompList(
              JSON.parse(lzStr.decompress(compressed)).map((compName: string) => {
                return { value: compName, label: compName }
              })
            )
          }
        })
    }
  }, []);
  // handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const chartInstance = echarts.getInstanceByDom(chartRef.current);
        if (chartInstance) {
          chartInstance.resize();
        }
      }
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Render
  useEffect(() => {
    if (!compA || !compB) return;
    let chartInstance = echarts.init(chartRef.current);
    chartInstance.clear();
    chartInstance.setOption(genEchartConfig(
      compA, compB, sal_A, sal_B, jg_idx_A, jg_idx_B
    ));
    localStorage.setItem('hadGenPath', 'true'); // 标记已经生成过了
    setCanGen(false); // 生成后不能再生成了
  }, [sal_A, sal_B]);

  const handleSelectA = (neoVal: string) => {
    if (neoVal !== compA) {
      setCompA(neoVal);
      setIsLoadA(true);
      axios.get('/path/comp', { params: { compName: neoVal } })
        .then(res => res.data)
        .then(data => {
          let {salary, jobGrade} = data;
          setSalA(salary);
          setJgIdxA(jobGrade);
          setIsLoadA(false);
        })
    };
  }
  const handleSelectB = (neoVal: string) => {
    if (neoVal !== compB) {
      setCompB(neoVal);
      setIsLoadB(true);
      axios.get('/path/comp', { params: { compName: neoVal } })
        .then(res => res.data)
        .then(data => {
          let {salary, jobGrade} = data;
          setSalB(salary);
          setJgIdxB(jobGrade);
          setIsLoadB(false);
        })
    }
  }

  const genCompList = (exclusion: any) => {
    if (!compList) return [];
    return compList.map((item: any) => {
      return {
        value: item.value,
        label: item.label,
        disabled: item.value === exclusion
      }
    })
  }

  return (
    <>
      {contextHolder}
      <div className="flex flex-col items-center
      w-screen min-h-[calc(100vh-var(--header-height))] pt-5 pb-20 px-10">
        <div className="w-full flex justify-center pt-10 px-10 mb-[2rem]">
          <div className="text-lg">
            <h1 className="text-3xl font-black pb-3">Career Path Simulator</h1>
            <p>Choose different companies, and view the difference.</p>
          </div>
        </div>
        <div className='w-full flex flex-wrap justify-center md:flex-row gap-x-10 gap-y-2 mb-[1rem]'>
          <div className='flex items-center gap-x-2' onClick={isNeedCharge}>
            <div className='text-[var(--blue)] font-bold text-nowrap'>Company 1: </div>
            <Select
              disabled={isLoadA}
              className={`pointer-events-${canGen ? 'auto' : 'none'}`}
              showSearch
              placeholder="Select Company"
              style={{ width: 280 }}
              onChange={handleSelectA}
              options={genCompList(compB)}
            />
          </div>
          <div className='flex items-center gap-2' onClick={isNeedCharge}>
            <div className='text-[var(--pink)] font-bold text-nowrap'>Company 2: </div>
            <Select
              disabled={isLoadB}
              className={`pointer-events-${canGen ? 'auto' : 'none'}`}
              showSearch
              placeholder="Select Company"
              style={{ width: 280 }}
              onChange={handleSelectB}
              options={genCompList(compA)}
            />
          </div>
        </div>
        <div className='w-full overflow-x-scroll rounded-lg shadow-xl border-1 min-h-120
      flex justify-center items-center'>
          {
            !compA || !compB ? (
              <div className='text-xl text-gray-300 font-bold'>
                Please select 2 companies to compare
              </div>
            ) : <div ref={chartRef} className='w-full min-w-[700] h-full min-h-110'></div>
          }
        </div>
      </div>
      {
        showPurchase ? <PurchaseCard tid='path' title='Exceeded the free usage limit' updateShow={handlePurchase} /> : <></>
      }
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      pageName: "Career Path Simulator",
    },
  };
}
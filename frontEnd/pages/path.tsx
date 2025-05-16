'use client'
import { Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
import * as echarts from 'echarts'; // 全量引入

import { genEchartConfig } from '@/lib/configs';

const sal_A = [120, 200, 180];
const sal_B = [250, 100, 350];
const jg_idx_A = [0,0,1];
const jg_idx_B = [0,1,2];

export default function PathSimulator(props: any[]) {
  const [compA, setCompA] = useState<string>();
  const [compB, setCompB] = useState<string>();
  const chartRef = useRef<HTMLDivElement>(null);
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
    chartInstance.setOption(genEchartConfig(
      compA, compB, sal_A, sal_B, jg_idx_A, jg_idx_B
    ));
  }, [compA, compB]);

  const handleSelectA = (neoVal: string) => {
    if (neoVal !== compA) setCompA(neoVal);
  }
  const handleSelectB = (neoVal: string) => {
    if (neoVal !== compB) setCompB(neoVal);
  }

  const companyList = [
    { value: 'Jack', label: 'Jack' },
    { value: 'Lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'Yiminghe' },
  ]

  const genCompListA = () => {
    return companyList.map((item) => {
      return {
        value: item.value,
        label: item.label,
        disabled: item.value === compB
      }
    })
  }

  const genCompListB = () => {
    return companyList.map((item) => {
      return {
        value: item.value,
        label: item.label,
        disabled: item.value === compA
      }
    })
  }
  return (
    <div className="flex flex-col items-center
      w-screen min-h-[calc(100vh-var(--header-height))] pt-5 pb-20 px-10">
      <div className="w-full flex justify-center pt-10 px-10 mb-[2rem]">
        <div className="text-lg">
          <h1 className="text-3xl font-black pb-3">Career Path Simulator</h1>
          <p>Choose different companies, and view the difference.</p>
        </div>
      </div>
      <div className='w-full flex gap-10 mb-[1rem]'>
        <div className='flex items-center gap-2'>
          <div className='text-[var(--blue)] font-bold'>Company A: </div>
          <Select
          showSearch
          placeholder="Select Company"
          style={{ width: 200 }}
          onChange={handleSelectA}
          options={genCompListA()}
        />
        </div>
        <div className='flex items-center gap-2'>
          <div className='text-[var(--pink)] font-bold'>Company B: </div>
          <Select
          showSearch
          placeholder="Select Company"
          style={{ width: 200 }}
          onChange={handleSelectB}
          options={genCompListB()}
        />
        </div>
      </div>
      <div className='w-full overflow-x-scroll rounded-lg shadow-xl border-1 min-h-120
      flex justify-center items-center'>
        {
          !compA || !compB ? (
            <div className='text-xl'>
              Please select 2 companies
            </div>
          ):<div ref={chartRef} className='w-full min-w-[700] h-full min-h-110'></div>
        }
      </div>
    </div>
  )
}

export function getStaticProps() {
  return {
    props: {
      pageName: "Career Path Simulator",
    },
  };
}
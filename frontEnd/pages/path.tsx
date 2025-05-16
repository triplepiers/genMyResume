'use client'
import { useEffect, useRef } from 'react';
import * as echarts from 'echarts'; // 全量引入

import { genEchartConfig } from '@/lib/configs';

const company_A = 'AAA';
const company_B = 'Company B';
const sal_A = [120, 200, 180];
const sal_B = [250, 100, 350];
const jg_idx_A = [0,0,1];
const jg_idx_B = [0,1,2];

export default function PathSimulator(props: any[]) {
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
    let chartInstance = echarts.init(chartRef.current);
    chartInstance.setOption(genEchartConfig(
      company_A, company_B, sal_A, sal_B, jg_idx_A, jg_idx_B
    ));
  }, []);

  return (
    <div className="flex flex-col items-center gap-y-[2rem]
      w-screen h-[calc(100vh-var(--header-height))] pt-5 pb-20 px-10">
      <div className="w-full flex justify-center pt-10 px-10">
        <div className="text-lg">
          <h1 className="text-3xl font-black pb-3">Career Path Simulator</h1>
          <p>Choose different companies, and view the difference.</p>
        </div>
      </div>
      <div className='w-full overflow-x-scroll rounded-lg shadow-xl border-1'>
        <div ref={chartRef} className='w-full min-w-[700] h-full min-h-110'></div>
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
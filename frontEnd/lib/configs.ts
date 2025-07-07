/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

const jobGrades = ['Entry-Level', 'Mid-Level', 'Senior-Level', 'Management-Level'];
const EchartBasicOption = {
    legend: {
      show: true
    },
    grid: {
        left: '8%',
        right: '15%',
        top: '10%',
        bottom: '10%'
      },
      xAxis: {
        type: 'category',
        name: 'Time (year)',
        data: ['1', '2', '3'],
      },
      yAxis: [
        {
          type: 'value',
          name: 'Salary (HKD)',
          axisLine: {
            show: true,  // 显示坐标线
          },
        },
        {
          type: 'category',
          data: jobGrades,
          name: 'Job Grade',
          axisLine: {
            show: true,  // 显示坐标线
          },
        }
      ],
}

function idx2jobGrade(jg_idxs: Array<number>) {
  return jg_idxs.map(jg_idx => jobGrades[jg_idx])
}

export function genEchartConfig(
    compNameA: string,       compNameB: string,
    salListA: Array<number>, salListB: Array<number>,
    jgListA:  Array<number>, jgListB:  Array<number>
) {
    return {
        ...EchartBasicOption,
        series: [
        {
          name: compNameA,
          data: salListA,
          type: 'line',
          itemStyle: { // pink
            normal: {
              color: '#E92E4C',
              lineStyle: {
                color: '#E92E4C'
              }
            }
          }
        },
        {
          name: compNameB,
          data: salListB,
          type: 'line',
          itemStyle: {
            normal: { // blue
              color: '#37BBCC',
              lineStyle: {
                color: '#37BBCC'
              }
            }
          }
        },
        // 使用右侧 Y 轴
        {
          yAxisIndex: 1,
          name: compNameA,
          data: idx2jobGrade(jgListA),
          type: 'line',
          itemStyle: { // pink
            normal: {
              color: '#E92E4C',
              lineStyle: {
                color: '#E92E4C',
                type: 'dotted'
              }
            }
          }
        },
        {
          yAxisIndex: 1,
          name: compNameB,
          data: idx2jobGrade(jgListB),
          type: 'line',
          itemStyle: {
            normal: { // blue
              color: '#37BBCC',
              lineStyle: {
                color: '#37BBCC',
                type: 'dotted'
              }
            }
          }
        },
      ],
      tooltip: {
        trigger: 'axis',
        // 自定义 hover 提示
        formatter: '<b>Time:</b> {b} Year<br><b>Salary & Job Grade:</b><br> - {a0}: <span style="color:#E92E4C;">{c0}, {c2}</span><br> - {a1}: <span style="color:#37BBCC;">{c1}, {c3}</span>'
      }
    }
}
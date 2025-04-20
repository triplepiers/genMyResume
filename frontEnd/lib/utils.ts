import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalized(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function formDate(month: string, year: string, mFirst: boolean=true, showNum: boolean=true) {
    if (month.length===0) return ''
    let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (showNum) {
        let monNum = monthList.indexOf(month) + 1
        if (monNum < 10) { month = `0${monNum}`}
        else { month = monNum.toString() }
    }
    return mFirst ? `${month}.${year}` : `${year}.${month}`;
}

export function darkenColor(hex: string, percent: number) {
  // 去除#号（如果存在）
  hex = hex.replace(/^#/, '');
  
  // 解析为r, g, b
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // 计算加深后的值
  const darkenedR = Math.floor(r * (1 - percent));
  const darkenedG = Math.floor(g * (1 - percent));
  const darkenedB = Math.floor(b * (1 - percent));
  
  // 转换回16进制
  const toHex = (c: any) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(darkenedR)}${toHex(darkenedG)}${toHex(darkenedB)}`;
}

// 使用示例
const originalColor = '#3366FF';
const darkenedColor = darkenColor(originalColor, 0.2); // 加深20%
console.log(darkenedColor);

export function handleProfile(pfObj: any) {
  let head = JSON.parse(pfObj.head)
  head.showProf = head.profession && head.profession.length > 0
  head.showContact = (head.phone&&head.phone.length>0) || (head.email&&head.email.length>0)
  head.divContact = (head.phone&&head.phone.length>0) && (head.email&&head.email.length>0)

  let edus = pfObj.edus.map((eduInfo: string) => { 
      let edu = JSON.parse(eduInfo)
      edu.divDate = (edu.bg_month&&edu.bg_month.length>0) && (edu.ed_month&&edu.ed_month.length>0)
      edu.showDate = (edu.bg_month&&edu.bg_month.length>0) || (edu.ed_month&&edu.ed_month.length>0)
      edu.showMore = edu.more&&edu.more.length>0
      return edu
  })

  let works = pfObj.works.map((workInfo: string) => { 
      let work = JSON.parse(workInfo)
      work.divDate = (work.bg_month&&work.bg_month.length>0) && (work.ed_month&&work.ed_month.length>0)
      work.showComp = (work.company&&work.company.length>0) || (work.location&&work.location.length>0)
      work.showDate = (work.bg_month&&work.bg_month.length>0) || (work.ed_month&&work.ed_month.length>0)
      work.showMore = work.more&&work.more.length>0
      return work
  })

  let skill = {lans: [], customs: []}
  pfObj.skills
  .map((skill: string) => { return JSON.parse(skill)})
  .forEach((item:any) => {
      if(item.isLan) { skill.lans.push(item) } 
      else { skill.customs.push(item)}
  })

  return {
    head,
    edus,
    works,
    skill,
    award: pfObj.award,
    ss:    pfObj.ss
  }
}
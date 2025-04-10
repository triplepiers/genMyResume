import { PurchaseCard } from "@/components/Cards/PurchaseCard";
import { useState } from "react";

import axios from "@/lib/axios";

export default function Test(props: any[]) {
  const [showOPT, setShowOPT] = useState(false);
  const download = () => {
    // axios.get('/', {})
    // .then((res:any) => {console.log(res)})
    axios.post('/head', {

        phone:    '00',
        data:      'trtt'

    }).then((res) => {
      console.log(res)
      
  })
    // if (checkPurcahased()) {
    //   // down
    // } else {
    //   setShowOPT(true);
    // }
  }
  // 检查是否已经购买
  const checkPurcahased = () => {
    return false;
  }
  // 关闭 Purchase Card
  const handleUpdateShowOPT = (neoShowOPT:boolean) => {
    setShowOPT(neoShowOPT);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-[2rem]
      w-screen h-[calc(100vh-var(--header-height))] p-20">
      <button onClick={download}>发请求</button>
      {
        showOPT ? (< PurchaseCard updateShow={handleUpdateShowOPT}/>) : (<></>)
      }
    </div>
  )
}
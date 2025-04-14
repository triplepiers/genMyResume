import { PurchaseCard } from "@/components/Cards/PurchaseCard";
import { useState } from "react";

import axios from "@/lib/axios";

export default function Test(props: any[]) {
  const [showOPT, setShowOPT] = useState(false);
  const download = () => {
    // axios.get('/', {})
    // .then((res:any) => {console.log(res)})
    axios.get('/head').then((res) => {
      console.log(res)
      // if(res.status === 200) {
      //   console.log(res.data)
      // }
    }) 
    // if (checkPurcahased()) {
    //   // down
    // } else {
    //   setShowOPT(true);
    // }
  }


  return (
    <div className="flex flex-col items-center justify-center gap-y-[2rem]
      w-screen h-[calc(100vh-var(--header-height))] p-20">
      <button onClick={download}>登录</button>
    </div>
  )
}
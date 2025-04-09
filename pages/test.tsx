import { PurchaseCard } from "@/components/Cards/PurchaseCard";

export default function Test(props: any[]) {
  const download = () => {
    if (checkPurcahased()) {
      // down
    } else {
      buyCDK();
    }
  }
  const checkPurcahased = () => {
    // axios.get()
    return false;
  }
  const buyCDK = () => {
    return;
    // shouw card
  }
  return (
    <div className="flex flex-col items-center justify-center gap-y-[2rem]
      w-screen h-[calc(100vh-var(--header-height))] p-20">
      <button onClick={download}>发请求</button>
      < PurchaseCard />
    </div>
  )
}
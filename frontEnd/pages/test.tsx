'use client'

export default function Test(props: any[]) {

  return (
    <div className="flex flex-col items-center justify-center gap-y-[2rem]
      w-screen h-[calc(100vh-var(--header-height))] p-20">
        Hey, you should NOT be here!!!
    </div>
  )
}
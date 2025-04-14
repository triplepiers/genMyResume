import { useRouter } from "next/router";

export default function Home(props: any[]) {
  const router = useRouter();

  const Jump = () => {
    // 这里缺一个登录验证
    router.push('/checkout')
  }
  
  return (
    <div className="flex flex-col items-center justify-center gap-y-[2rem]
      w-screen h-[calc(100vh-var(--header-height))] p-20">
      <div className="flex flex-col items-center justify-center gap-y-[1rem]">
        <h1 className="font-semibold text-5xl text-center">
          Professional Resume Tools For E-commerce Jobs
        </h1>
        <p className="font-thin text-base text-center">
          Create a job-winning resume in minutes with our easy-to-use builder
        </p>
      </div>
      <button className="bg-[var(--green)] font-medium
        px-[2rem] py-[0.5rem] rounded-4xl
        cursor-pointer"
        onClick={() => Jump()}>
        Create Now
      </button>
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {
      pageName: "Home",
    },
  };
}
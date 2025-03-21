import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home(props: any[]) {
  const Jump = () => {
    console.log('aha')
  }
  return (
    <>
      <Header />
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
        <button className="bg-[var(--hilight)]
        px-[2rem] py-[0.5rem] rounded-4xl
        cursor-pointer"
        onClick={() => Jump()}>
          Create Now
        </button>
      </div>
      <Footer />
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      pageName: "Home",
    },
  };
}
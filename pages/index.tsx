import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PdfGenerator } from "@/components/PdfGenerator";

export default function Home(props: any[]) {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-[32px] items-center">
        <h1>Hello Future</h1>
        <PdfGenerator />
      </main>
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
import { Geist, Geist_Mono } from "next/font/google";
import { PdfGenerator } from "@/components/PdfGenerator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home(props: any[]) {
  return (
    <div>
      <main className="flex flex-col gap-[32px] items-center">
        <h1>Hello Future</h1>
        <PdfGenerator />
      </main>
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
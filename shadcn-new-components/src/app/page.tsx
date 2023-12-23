import Image from "next/image";
import CarouselDemo from "@/components/carousel-demo";
import DrawerDemo from "@/components/drawer-demo";
import PaginationDemo from "@/components/pagination-demo";
import ResizableDemo from "@/components/resizable-demo";
import SonnerDemo from "@/components/sonner-demo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between space-y-10 px-6 md:p-24 bg-gray-100">
      <CarouselDemo />
      <DrawerDemo />
      <PaginationDemo />
      <ResizableDemo />
      <SonnerDemo />
    </main>
  );
}

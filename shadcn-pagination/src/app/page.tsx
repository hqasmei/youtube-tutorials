import Image from "next/image";
import ClientPagination from "@/components/client-pagination";

export default function Home() {
  return (
    <main className="p-4 flex flex-col items-center justify-center w-full">
      <span className="text-4xl font-bold">Gallery</span>
      <ClientPagination />
    </main>
  );
}

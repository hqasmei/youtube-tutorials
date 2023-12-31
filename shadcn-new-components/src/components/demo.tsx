"use client";
import React, { useState } from "react";
import CarouselDemo from "@/components/carousel-demo";
import DrawerDemo from "@/components/drawer-demo";
import PaginationDemo from "@/components/pagination-demo";
import ResizableDemo from "@/components/resizable-demo";
import SonnerDemo from "@/components/sonner-demo";

const filter = ["Carousel", "Drawer", "Pagination", "Resizable", "Sonner"];

export default function Demo() {
  const [activeFilter, setActiveFilter] = useState("Carousel");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex flex-col space-y-10 justify-center  pt-10 md:p-20 items-center">
      <div className="overflow-x-auto no-scrollbar flex w-full items-center sm:justify-center">
        <div className="flex flex-row space-x-2 px-4">
          {filter.map((item, idx) => {
            return (
              <span
                key={idx}
                onClick={() => handleFilterClick(item)}
                className={`rounded-full px-3 py-1  border hover:bg-blue-500 hover:text-white duration-200 ${
                  activeFilter === item
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>

      {activeFilter === "Carousel" && <CarouselDemo />}
      {activeFilter === "Drawer" && <DrawerDemo />}
      {activeFilter === "Pagination" && <PaginationDemo />}
      {activeFilter === "Resizable" && <ResizableDemo />}
      {activeFilter === "Sonner" && <SonnerDemo />}
    </div>
  );
}

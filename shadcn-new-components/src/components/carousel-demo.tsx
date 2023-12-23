"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function CarouselDemo() {
  return (
    <>
      <span className="font-bold text-4xl items-start flex mb-6">Carousel</span>
      <div className="flex flex-col items-center w-full border rounded p-20 bg-white  mb-10">
        {/* Horizontal */}
        <Carousel
          opts={{
            align: "start",
            loop: "true",
          }}
          className="w-full md:max-w-sm"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="flex flex-col items-center w-full border rounded p-20 bg-white  ">
        {" "}
        {/* Vertical */}
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full md:max-w-xs"
        >
          <CarouselContent className="-mt-1   h-[200px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="pt-1 basis-1/3 md:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

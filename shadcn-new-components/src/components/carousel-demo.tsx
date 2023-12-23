"use client";
import { faker } from "@faker-js/faker";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
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
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => {
              const randomImage = faker.image.urlLoremFlickr({
                category: "nature",
              });
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="flex flex-col space-y-2 text-left overflow-hidden border rounded">
                    <div className="relative overflow-hidden pb-60">
                      <Image
                        src={randomImage}
                        alt=""
                        fill
                        className="rounded-t object-cover object-left-top"
                      />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="flex flex-col items-center w-full border rounded p-20 bg-white  ">
        {/* Vertical */}
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full md:max-w-xl"
        >
          <CarouselContent className="-mt-1   h-[500px]">
            {Array.from({ length: 5 }).map((_, index) => {
              const randomImage = faker.image.urlLoremFlickr({
                category: "nature",
              });
              return (
                <CarouselItem
                  key={index}
                  className="pt-1 basis-1/3 md:basis-1/2"
                >
                  <div className="flex flex-col space-y-2 text-left overflow-hidden border rounded">
                    <div className="relative overflow-hidden pb-60">
                      <Image
                        src={randomImage}
                        alt=""
                        fill
                        className="rounded-t object-cover object-left-top"
                      />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

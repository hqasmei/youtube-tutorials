"use client";
import React from "react";
import { faker } from "@faker-js/faker";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Image from "next/image";
export default function ResizableDemo() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span className="font-bold text-4xl items-start flex mb-6">
        Resizable
      </span>
      <div className="flex flex-col items-center w-full border rounded p-20 bg-white  mb-10">
        <ResizableSetupDemo1 />
      </div>
      <div className="flex flex-col items-center w-full border rounded p-20 bg-white  mb-10">
        <ResizableSetupDemo2 />
      </div>
      <div className="flex flex-col items-center w-full border rounded p-20 bg-white  mb-10">
        <ResizableSetupDemo3 />
      </div>
    </div>
  );
}

function ResizableSetupDemo1() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function ResizableSetupDemo2() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function ResizableSetupDemo3() {
  const randomImage1 = faker.image.urlLoremFlickr({
    category: "nature",
  });
  const randomImage2 = faker.image.urlLoremFlickr({
    category: "nature",
  });
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex flex-col space-y-2 text-left overflow-hidden border rounded">
          <div className="relative overflow-hidden pb-60">
            <Image
              src={randomImage1}
              alt=""
              fill
              className="rounded-t object-cover object-left-top"
            />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <div className="flex flex-col space-y-2 text-left overflow-hidden border rounded">
          <div className="relative overflow-hidden pb-60">
            <Image
              src={randomImage2}
              alt=""
              fill
              className="rounded-t object-cover object-left-top"
            />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

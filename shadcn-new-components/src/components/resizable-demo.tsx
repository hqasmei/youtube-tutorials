"use client";
import React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function ResizableDemo() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span className="font-bold text-4xl items-start flex mb-6">
        Resizable
      </span>
      <div className="flex flex-col items-center w-full border rounded p-20 bg-white  mb-10">
        <ResizableSetupDemo />
      </div>
    </div>
  );
}

function ResizableSetupDemo() {
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

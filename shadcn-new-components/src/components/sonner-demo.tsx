"use client";

import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SonnerDemo() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span className="font-bold text-4xl items-start flex mb-6">Sonner</span>
      <div className="flex flex-col items-center w-full border rounded p-20 bg-white  mb-10">
        <Button
          variant="outline"
          onClick={() =>
            toast.success("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
            })
          }
        >
          Show Toast
        </Button>
      </div>
    </div>
  );
}

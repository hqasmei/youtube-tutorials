import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";
const Domains = () => {
  const numberOfDivs = 3;

  const divElements = [];
  for (let i = 0; i < numberOfDivs; i++) {
    divElements.push(
      <div
        key={i}
        className="h-20 w-full bg-zinc-950 rounded-lg  border border-zinc-800 mt-8"
      ></div>
    );
  }

  return (
    <div className="flex flex-col">
      <MaxWidthWrapper>
        <span className="text-4xl px-4 md:px-8">Domains</span>
      </MaxWidthWrapper>

      <div className="border-t border-zinc-800 mt-10">
        <MaxWidthWrapper>{divElements}</MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Domains;

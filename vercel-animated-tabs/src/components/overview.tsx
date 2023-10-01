import React from "react";
import MaxWidthWrapper from "./max-width-wrapper";

const Overview = () => {
  const numberOfDivs = 9;

  const divElements = [];
  for (let i = 0; i < numberOfDivs; i++) {
    divElements.push(
      <div
        key={i}
        className="p-4 h-64 border rounded border-zinc-800 bg-zinc-950"
      ></div>
    );
  }
  return (
    <MaxWidthWrapper>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {divElements}
      </div>
    </MaxWidthWrapper>
  );
};

export default Overview;

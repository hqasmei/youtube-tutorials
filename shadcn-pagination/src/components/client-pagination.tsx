"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";

import { faker } from "@faker-js/faker";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";

export default function ClientPagination() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<{ image: string }[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const generateFakeData = useCallback((): any => {
    const newImage = faker.image.urlPicsumPhotos();

    // Check if the image is already in the data array
    const isDuplicate = data.some((user) => user.image === newImage);

    if (!isDuplicate) {
      // If not a duplicate, add the new user to the data array
      setData((prevData) => {
        const newItem = { image: newImage };
        const newData = [...prevData, newItem];

        // Update localStorage with the latest data
        localStorage.setItem("fakeUserData", JSON.stringify(newData));

        return newData;
      });

      return { image: newImage };
    } else {
      // If a duplicate, generate a new user recursively
      return generateFakeData();
    }
  }, [data]);

  const resetLocalStorage = () => {
    localStorage.removeItem("fakeUserData");
    setData([]); // Reset the data state in the component
  };

  useEffect(() => {
    // Check if data is already present in localStorage
    const storedData = localStorage.getItem("fakeUserData");

    if (storedData) {
      setData(JSON.parse(storedData));
      setIsClient(true);
    } else {
      // If data is not present, generate new data and store it in localStorage
      const newData = Array.from({ length: 50 }, generateFakeData);
      setData(newData);
      localStorage.setItem("fakeUserData", JSON.stringify(newData));
      setIsClient(true);
    }
  }, [generateFakeData]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {/* <button onClick={resetLocalStorage}>Reset Local Storage</button> */}
      {isClient ? (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 w-full px-20 py-6">
            {currentPosts.map((data, idx) => {
              return (
                <Card
                  key={idx}
                  className="items-start flex overflow-hidden text-black"
                >
                  <div className="group flex transform flex-col overflow-hidden transition-all duration-200">
                    <div className="overflow-hidden rounded-sm">
                      <Image
                        src={data.image}
                        alt=""
                        width={640}
                        height={480}
                        className="h-full w-full transform object-cover transition-all duration-200 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <PaginationSection
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 w-full p-10"></div>
      )}
    </>
  );
}
function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalPosts: any;
  postsPerPage: any;
  currentPage: any;
  setCurrentPage: any;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}
      >
        <PaginationLink onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

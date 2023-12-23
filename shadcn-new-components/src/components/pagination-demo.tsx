"use client";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { faker } from "@faker-js/faker";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const generateFakeUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  zodiacSign: faker.person.zodiacSign(),
});

export default function PaginationDemo() {
  const [data, setData] = useState(
    Array.from({ length: 15 }, generateFakeUser)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <span className="font-bold text-4xl items-start flex mb-6">
        Pagination
      </span>

      <div className="flex flex-col items-center w-full border rounded p-20 bg-white  mb-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 w-full pb-10">
          {currentPosts.map((post, idx) => {
            return (
              <Card key={idx} className="items-start flex overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col  items-start">
                    <span className="font-medium">
                      {post.firstName} {post.firstName}
                    </span>
                    <span className="text-neutral-600 text-sm">
                      @{post.username}
                    </span>
                  </div>

                  <span className="">{post.email}</span>
                  <span className="">{post.zodiacSign}</span>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            );
          })}
        </div>
        <PaginationSetupDemo
          totalPosts={data.length}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

function PaginationSetupDemo({
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
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePrevPage()} />
          </PaginationItem>
          {pages.map((page, idx) => (
            <PaginationItem
              key={idx}
              className={
                currentPage === page ? "bg-neutral-100 rounded-md" : ""
              }
            >
              <PaginationLink onClick={() => setCurrentPage(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={() => handleNextPage()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

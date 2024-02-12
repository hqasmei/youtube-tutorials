'use client';

import React from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { reformatDate } from '@/lib/utils';

export default function Posts({ allPosts }: { allPosts: any }) {
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag');

  const filteredPosts = tag
    ? allPosts.filter((post: any) => post.metadata.tag.includes(tag))
    : allPosts;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 lg:px-20 pt-4 md:pt-10">
      <div className="grid grid-cols-1 gap-10 pb-10">
        <div className="flex flex-col">
          <span className="text-4xl font-bold md:px-6 mb-6 md:mb-4">
          My Blog
          </span>

          <div>
            <div className="grid grid-cols-1 gap-6 md:gap-1 md:px-2">
              {filteredPosts
                .sort((a: any, b: any) => {
                  if (
                    new Date(a.metadata.publishedAt) >
                    new Date(b.metadata.publishedAt)
                  ) {
                    return -1;
                  }
                  return 1;
                })
                .map((post: any) => {
                  return (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="flex flex-row justify-between items-center duration-300 md:hover:bg-hoverBackground md:p-4 rounded-lg cursor-pointer"
                    >
                      <div className="flex flex-col space-y-2">
                        <span className="text-secondaryDark">
                          {post.metadata.title}
                        </span>

                        <div className="flex flex-row space-x-2 items-center text-secondaryDarker">
                          <span>{reformatDate(post.metadata.publishedAt)}</span>
                        </div>
                      </div>

                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-secondaryDarker"
                      >
                        <path
                          d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

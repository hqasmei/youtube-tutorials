import React from 'react';

import { getPosts } from '@/lib/posts';

import Posts from './posts';

export const metadata = {
  title: 'Posts',
  description: '',
};

export default async function PostsPage() {
  let allPosts = await  getPosts();
  if (!allPosts || allPosts.length === 0) {
    return <div>No posts available</div>;
  }
  return <Posts allPosts={allPosts} />;
}

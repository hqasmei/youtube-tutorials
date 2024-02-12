import React from 'react';

import { getPosts } from '@/lib/posts';

import Posts from './posts';

export const metadata = {
  title: 'Posts',
  description: '',
};

export default async function PostsPage() {
  let allPosts = getPosts();

  return <Posts allPosts={allPosts} />;
}

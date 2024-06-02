import React from 'react';

import Post from '@/components/home/post';

export const dynamic = 'force-dynamic';

async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const ForYouPage = async () => {
  const users = await getUsers();
  const posts = await getPosts();
  const combinedData = posts.map((post: any) => {
    const user = users.find((user: any) => user.id === post.userId);
    return { ...post, user };
  });

  return (
    <div className="w-full mx-auto">
      {combinedData.map((data: any, idx: any) => {
        return (
          <Post
            key={idx}
            name={data.user.name}
            username={data.user.username}
            body={data.body}
          />
        );
      })}
    </div>
  );
};

export default ForYouPage;

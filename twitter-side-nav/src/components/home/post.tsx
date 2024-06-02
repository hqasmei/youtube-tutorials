import React from 'react';

const Post = ({
  name,
  username,
  body,
}: {
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <div className="p-4 border-b border-zinc-700">
      <div className="flex space-x-4">
        <span className="h-12 w-12 bg-zinc-300 rounded-full"></span>
        <div className="flex-1">
          <div className="mb-2">
            <span className="font-bold">{name}</span>
            <span className="text-gray-500"> @{username}</span>
          </div>
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

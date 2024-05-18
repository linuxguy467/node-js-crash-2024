const posts = [
  { id: 1, title: 'Post One', description: 'This is my first post' },
  { id: 2, title: 'Post Two', description: 'This is my second post' },
];

const getPosts = () => posts;

export const getPostsLength = () => posts.length;
export default getPosts;

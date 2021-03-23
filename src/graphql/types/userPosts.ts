export type UserPostData = {
  id: string;
  title: string;
};

export type UserPostsData = {
  data: UserPostData[];
};

export type UserPosts = {
  id: string;
  name: string;
  posts: UserPostsData;
};

export type UserPostsQuery = {
  user: UserPosts;
};

export type UserPostsVariables = {
  id: string;
};

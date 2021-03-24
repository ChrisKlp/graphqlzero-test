/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userPosts
// ====================================================

export interface userPosts_user_posts_data {
  __typename: "Post";
  id: string | null;
  title: string | null;
}

export interface userPosts_user_posts {
  __typename: "PostsPage";
  data: (userPosts_user_posts_data | null)[] | null;
}

export interface userPosts_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  posts: userPosts_user_posts | null;
}

export interface userPosts {
  user: userPosts_user | null;
}

export interface userPostsVariables {
  id: string;
}

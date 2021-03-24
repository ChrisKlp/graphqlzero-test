/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: post
// ====================================================

export interface post_post_user {
  __typename: "User";
  name: string | null;
}

export interface post_post_comments_data {
  __typename: "Comment";
  id: string | null;
  name: string | null;
  email: string | null;
  body: string | null;
}

export interface post_post_comments {
  __typename: "CommentsPage";
  data: (post_post_comments_data | null)[] | null;
}

export interface post_post {
  __typename: "Post";
  id: string | null;
  title: string | null;
  body: string | null;
  user: post_post_user | null;
  comments: post_post_comments | null;
}

export interface post {
  post: post_post | null;
}

export interface postVariables {
  id: string;
}

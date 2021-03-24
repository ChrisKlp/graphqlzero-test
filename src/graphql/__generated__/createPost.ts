/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePostInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: createPost
// ====================================================

export interface createPost_createPost {
  __typename: 'Post';
  id: string | null;
  title: string | null;
  body: string | null;
}

export interface createPost {
  __typename: 'Mutation';
  createPost: createPost_createPost | null;
}

export interface createPostVariables {
  input: CreatePostInput;
}

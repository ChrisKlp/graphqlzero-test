/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCommentInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment {
  __typename: 'Comment';
  id: string | null;
  name: string | null;
  email: string | null;
  body: string | null;
}

export interface createComment {
  __typename: 'Mutation';
  createComment: createComment_createComment | null;
}

export interface createCommentVariables {
  input: CreateCommentInput;
}

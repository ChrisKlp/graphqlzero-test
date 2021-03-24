/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users_data_company {
  __typename: "Company";
  name: string | null;
  catchPhrase: string | null;
  bs: string | null;
}

export interface users_users_data {
  __typename: "User";
  id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  company: users_users_data_company | null;
}

export interface users_users {
  __typename: "UsersPage";
  data: (users_users_data | null)[] | null;
}

export interface users {
  users: users_users | null;
}

import { gql } from '@apollo/client';

export const USERS = gql`
  query users {
    users {
      data {
        id
        name
        email
        phone
        website
        company {
          name
          catchPhrase
          bs
        }
      }
    }
  }
`;

export const USER_POSTS = gql`
  query userPosts($id: ID!) {
    user(id: $id) {
      id
      name
      posts {
        data {
          id
          title
        }
      }
    }
  }
`;

export const POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
      body
      user {
        name
      }
      comments {
        data {
          id
          name
          email
          body
        }
      }
    }
  }
`;

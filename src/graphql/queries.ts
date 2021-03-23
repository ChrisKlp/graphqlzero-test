import { gql } from '@apollo/client';

export const USERS = gql`
  query Users {
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

import { gql } from "graphql-tag";

export const QUERY_USER_DETAILS = gql`
  query QueryUserDetails {
    me {
      id
      name
      email
    }
  }
`;

export const QUERY_INVESTIGATIONS = gql`
  query QueryInvestigations {
    investigations {
      id
      title
      type {
        id
        title
      }
    }
  }
`;

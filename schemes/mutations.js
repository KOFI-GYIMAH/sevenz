import { gql } from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation {
    login(email: "tester@kompletecare.com", password: "password")
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation LogOutMutation {
    logOut
  }
`;

export const CREATE_INVESTIGATIONS_MUTATION = gql`
  mutation add_medical_record($investigations: [ID!]!) {
    add_medical_record(
      investigations: $investigations
      ctscan: "Scan needed in the left cerebral hemisphere"
      mri: "Full body MRI"
      developer: "Samuel Kofi Gyimah"
    ) {
      id
      patient {
        id
        name
        email
      }
      investigations {
        id
        title
        type {
          id
          title
        }
      }
      ctscan
      mri
      created_at
    }
  }
`;

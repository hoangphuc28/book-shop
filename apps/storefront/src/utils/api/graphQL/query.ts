import gql from "graphql-tag";

export const getInformation = gql`
query Information {
  information {
      fullName
      address
      phone
      email
      avatar
  }
}`;


export const updateInformation = gql`
  mutation SaveAccount($fullName: String!, $phone: String!, $address: String!) {
    saveAccount(fullName: $fullName, phone: $phone, address: $address) {
      fullName
      phone
      address
    }
  }
`;

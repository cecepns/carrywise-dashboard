import { gql } from '@apollo/client';

export const GET_SENDERLIST = gql`
  query GetSenderList {
    senderList {
      firstname
      email
      country
      phone
      gender
      address {
        location
      }
    }
  }
`;

export const GET_CARRIERLIST = gql`
  query GetCarrierList {
    carrierList {
      firstname
      email
      country
      phone
      gender
      fleetType
    }
  }
`;

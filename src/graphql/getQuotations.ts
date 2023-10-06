import { gql } from '@apollo/client';

export const GET_QUOTATIONS = gql`
  query GetQuotations($filter: QuotationsFilter) {
    quotations(filter: $filter) {
      id
      code
      date
      time
      offerDate
      offerTime
      carrierFee
      pickupAddress {
        location
      }
      destinationAddress {
        location
      }
      carrier {
        firstname
        lastname
        fleetType
        phone
        url {
          image
        }
      }
      sender {
        firstname
        lastname
        phone
        url {
          image
        }
      }
    }
  }
`;

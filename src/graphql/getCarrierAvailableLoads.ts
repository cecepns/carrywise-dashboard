import { gql } from '@apollo/client';

export const GET_CARRIER_AVAILABLE_LOADS = gql`
  query GetCarrierAvailableLoads($filter: TransactionsFilter) {
    transactions(filter: $filter) {
      id
      date
      time
      flexible
      pickupAddress {
        location
      }
      destinationAddress {
        location
      }
      sender {
        ratings {
          value
        }
        ratingAverage
      }
      packages {
        image
      }
    }
  }
`;

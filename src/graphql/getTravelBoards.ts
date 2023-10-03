import { gql } from '@apollo/client';

export const GET_TRAVEL_BOARDS = gql`
  query GetTravelBoards($filter: TransactionsFilter) {
    transactions(filter: $filter) {
      id
      firstname
      lastname
      date
      time
      fleetVolume
      pickupAddress {
        location
      }
      destinationAddress {
        location
      }
    }
  }
`;
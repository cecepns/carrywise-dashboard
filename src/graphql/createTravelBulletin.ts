import { gql } from '@apollo/client';

export const CREATE_CARRIER_TRANSACTION = gql`
  mutation CreateTravelBoard($input: CreateTravelBoardInput) {
    createTravelBoard(input: $input) {
      status
    }
  }
`;

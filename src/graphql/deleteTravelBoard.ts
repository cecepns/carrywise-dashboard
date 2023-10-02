import { gql } from '@apollo/client';

export const DELETE_TRAVEL_BOARD = gql`
  mutation DeleteTravelBoard($input: DeleteTravelBoardInput) {
    deleteTravelBoard(input: $input) {
      status
    }
  }
`;

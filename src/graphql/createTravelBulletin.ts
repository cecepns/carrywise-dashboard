import { gql } from '@apollo/client';

export const CREATE_CARRIER_TRANSACTION = gql`
  mutation CreateCarrierTransaction($input: CreateCarrierTransactionInput) {
    createCarrierTransaction(input: $input) {
      status
    }
  }
`;

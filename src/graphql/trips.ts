import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query MyTransactions($filter: TransactionsFilter) {
    transactions(filter: $filter) {
      id
      code
      date
      time
      carrierFee
      fleetType
      paymentId
      platformOriginFee
      isSenderRated
      isCarrierRated
      pickupAddress {
        location
        coordinate
        duration
      }
      destinationAddress {
        location
        coordinate
        duration
      }
      stopoverAddresses {
        location
        coordinate
        duration
      }
      packages {
        image
        category
        volumeValue
        weightValue
        comment
      }
      status {
        name
      }
      carrier {
        firstname
        lastname
        phone
        url {
          image
        }
        ratings {
          value
        }
        ratingAverage
      }
      sender {
        firstname
        lastname
        phone
        url {
          image
        }
        ratings {
          value
        }
        ratingAverage
      }
      promo {
        code
      }
      carrierFee
      platformFee
      total
    }
  }
`;

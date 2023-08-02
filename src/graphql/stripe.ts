import { gql } from '@apollo/client';

export const GET_STRIPE_CHARGERLIST = gql`
  query StripeChargetList($filter: StripeChargeListInput) {
    stripeChargeList(filter: $filter) {
      id
      status
      amount
      currency
      refunded
      receipt_url
      billing_details {
        email
        name
        phone
        address {
          city
          country
          line1
          line2
          postal_code
        }
      }
    }
  }
`;

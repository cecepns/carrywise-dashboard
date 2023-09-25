import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($input: SignInInput) {
    signIn(input: $input) {
      token {
        session
      }
      isAdmin
    }
  }
`;

export const GET_SESSION = gql`
  query Session {
    session {
      id
      isAdmin
      authType
      email
      firstname
      lastname
      gender
      country
      phone
      referenceCode
      url {
        image
        idCard
        transportLicense
      }
      # user only
      birthdate
      address {
        location
        coordinate
      }
      # carrier only
      company {
        name
        address {
          location
          coordinate
        }
      }
      fleetType
      vat
    }
  }
`;


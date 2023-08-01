/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// THIS IS A GENERATED FILE, use `yarn codegen` to regenerate
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type AcceptOrderInput = {
  carrierId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  isSendInvoice?: InputMaybe<Scalars['Boolean']['input']>;
  language: LangEnum;
  payment?: InputMaybe<Scalars['JSONObject']['input']>;
  promoCode?: InputMaybe<Scalars['String']['input']>;
};

export type Address = {
  __typename?: 'Address';
  coordinate?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  duration?: Maybe<Scalars['Float']['output']>;
  location?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  coordinate?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
};

export enum AuthEnum {
  Carrier = 'carrier',
  Sender = 'sender'
}

export type Carrier = {
  __typename?: 'Carrier';
  authType?: Maybe<AuthEnum>;
  company?: Maybe<SessionCompany>;
  country?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  fleetType?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<GenderEnum>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  ratingAverage?: Maybe<Scalars['Int']['output']>;
  ratings?: Maybe<Array<Maybe<Rating>>>;
  referenceCode?: Maybe<Scalars['String']['output']>;
  token?: Maybe<SessionToken>;
  url?: Maybe<SessionUrl>;
  vat?: Maybe<Scalars['String']['output']>;
};

export type CreateQuotationInput = {
  date?: InputMaybe<Scalars['Date']['input']>;
  offerPrice: Scalars['Float']['input'];
  time?: InputMaybe<Scalars['String']['input']>;
  transactionId: Scalars['String']['input'];
};

export type CreateTransactionInput = {
  date: Scalars['Date']['input'];
  destinationAddress: AddressInput;
  distance: DistanceInput;
  flexible?: InputMaybe<Scalars['Boolean']['input']>;
  packages?: InputMaybe<Array<InputMaybe<PackageInput>>>;
  pickupAddress: AddressInput;
  stopoverAddresses?: InputMaybe<Array<InputMaybe<AddressInput>>>;
  time?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteAccountInput = {
  reason: Scalars['String']['input'];
};

export type Distance = {
  __typename?: 'Distance';
  price?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type DistanceInput = {
  price: Scalars['Float']['input'];
  value: Scalars['Float']['input'];
};

export type ForgotPasswordInput = {
  authType: AuthEnum;
  email: Scalars['String']['input'];
  language: LangEnum;
};

export enum GenderEnum {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export type ImageInput = {
  base64?: InputMaybe<Scalars['String']['input']>;
  mimetype?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum LangEnum {
  En = 'en',
  It = 'it'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptOrder?: Maybe<Response>;
  createQuotation?: Maybe<Response>;
  createTransaction?: Maybe<Response>;
  deleteAccount?: Maybe<Response>;
  forgotPassword?: Maybe<Response>;
  resetPassword?: Maybe<Response>;
  setRating?: Maybe<Response>;
  signIn?: Maybe<Session>;
  signOut?: Maybe<Response>;
  signUp?: Maybe<Session>;
  updateLanguage?: Maybe<Response>;
  updateNotificationToken?: Maybe<Response>;
  updateProfile?: Maybe<Session>;
  updateVerifiedEmail?: Maybe<Response>;
};


export type MutationAcceptOrderArgs = {
  input?: InputMaybe<AcceptOrderInput>;
};


export type MutationCreateQuotationArgs = {
  input?: InputMaybe<CreateQuotationInput>;
};


export type MutationCreateTransactionArgs = {
  input?: InputMaybe<CreateTransactionInput>;
};


export type MutationDeleteAccountArgs = {
  input?: InputMaybe<DeleteAccountInput>;
};


export type MutationForgotPasswordArgs = {
  input?: InputMaybe<ForgotPasswordInput>;
};


export type MutationResetPasswordArgs = {
  input?: InputMaybe<ResetPasswordInput>;
};


export type MutationSetRatingArgs = {
  input?: InputMaybe<SetRatingInput>;
};


export type MutationSignInArgs = {
  input?: InputMaybe<SignInInput>;
};


export type MutationSignUpArgs = {
  input?: InputMaybe<SignUpInput>;
};


export type MutationUpdateLanguageArgs = {
  lang: Scalars['String']['input'];
};


export type MutationUpdateNotificationTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateProfileArgs = {
  input?: InputMaybe<UpdateProfileInput>;
};


export type MutationUpdateVerifiedEmailArgs = {
  input?: InputMaybe<VerifiedEmail>;
};

export type Package = {
  __typename?: 'Package';
  category?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  heightValue?: Maybe<Scalars['Float']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  lengthValue?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  volumeValue?: Maybe<Scalars['Float']['output']>;
  weightValue?: Maybe<Scalars['Float']['output']>;
  widthValue?: Maybe<Scalars['Float']['output']>;
};

export type PackageInput = {
  category: Scalars['String']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  heightValue: Scalars['Float']['input'];
  image?: InputMaybe<ImageInput>;
  lengthValue: Scalars['Float']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  volumeValue: Scalars['Float']['input'];
  weightValue: Scalars['Float']['input'];
  widthValue: Scalars['Float']['input'];
};

export type PhoneCode = {
  __typename?: 'PhoneCode';
  code?: Maybe<Scalars['String']['output']>;
  dialCode?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  italianName?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Promo = {
  __typename?: 'Promo';
  code?: Maybe<Scalars['String']['output']>;
  disc?: Maybe<Scalars['Float']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  isPercent?: Maybe<Scalars['Boolean']['output']>;
  isValid?: Maybe<Scalars['Boolean']['output']>;
  labelEn?: Maybe<Scalars['String']['output']>;
  labelIt?: Maybe<Scalars['String']['output']>;
  percentDisc?: Maybe<Scalars['Float']['output']>;
  platformFee?: Maybe<Scalars['Float']['output']>;
  startDate?: Maybe<Scalars['Date']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
};

export type PromoFilter = {
  carrierFee: Scalars['Float']['input'];
  code: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  carrierList?: Maybe<Array<Maybe<Carrier>>>;
  phoneCodes?: Maybe<Array<Maybe<PhoneCode>>>;
  productCategories?: Maybe<Array<Maybe<ProductCategory>>>;
  promo?: Maybe<Promo>;
  quotations?: Maybe<Array<Maybe<Quotation>>>;
  senderList?: Maybe<Array<Maybe<Sender>>>;
  session?: Maybe<Session>;
  stripeChargeList?: Maybe<Array<Maybe<StripeCharge>>>;
  stripePaymentList?: Maybe<Array<Maybe<StripePayment>>>;
  transaction?: Maybe<Transaction>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};


export type QueryPromoArgs = {
  filter?: InputMaybe<PromoFilter>;
};


export type QueryQuotationsArgs = {
  filter?: InputMaybe<QuotationsFilter>;
};


export type QueryStripeChargeListArgs = {
  filter?: InputMaybe<StripeChargeListInput>;
};


export type QueryStripePaymentListArgs = {
  filter?: InputMaybe<StripePaymentListInput>;
};


export type QueryTransactionArgs = {
  filter?: InputMaybe<TransactionFilter>;
};


export type QueryTransactionsArgs = {
  filter?: InputMaybe<TransactionsFilter>;
};

export type Quotation = {
  __typename?: 'Quotation';
  carrierFee?: Maybe<Scalars['Float']['output']>;
  carrierId?: Maybe<Scalars['ID']['output']>;
  carrierRating?: Maybe<Rating>;
  code?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  destinationAddress?: Maybe<Address>;
  distance?: Maybe<Distance>;
  flexible?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  packages?: Maybe<Array<Maybe<Package>>>;
  pickupAddress?: Maybe<Address>;
  platformFee?: Maybe<Scalars['Float']['output']>;
  quotation?: Maybe<QuotationOffer>;
  sender?: Maybe<Sender>;
  senderId?: Maybe<Scalars['ID']['output']>;
  senderRating?: Maybe<Rating>;
  status?: Maybe<Array<Maybe<TransactionStatus>>>;
  stopoverAddresses?: Maybe<Array<Maybe<Address>>>;
  time?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Volume>;
  weight?: Maybe<Weight>;
};

export type QuotationOffer = {
  __typename?: 'QuotationOffer';
  carrier?: Maybe<Carrier>;
  carrierId?: Maybe<Scalars['ID']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  fleetType?: Maybe<Scalars['String']['output']>;
  isExpired?: Maybe<Scalars['Boolean']['output']>;
  offerPrice?: Maybe<Scalars['Float']['output']>;
  time?: Maybe<Scalars['String']['output']>;
};

export type QuotationsFilter = {
  isBooked?: InputMaybe<Scalars['Boolean']['input']>;
  isOwned?: InputMaybe<Scalars['Boolean']['input']>;
  minDate?: InputMaybe<Scalars['Date']['input']>;
  minQuotationDate?: InputMaybe<Scalars['Date']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type Rating = {
  __typename?: 'Rating';
  comment?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type ResetPasswordInput = {
  authType: AuthEnum;
  confirmNewPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  language: LangEnum;
  newPassword: Scalars['String']['input'];
};

export type Response = {
  __typename?: 'Response';
  data?: Maybe<Scalars['JSONObject']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Sender = {
  __typename?: 'Sender';
  address?: Maybe<Address>;
  authType?: Maybe<AuthEnum>;
  birthdate?: Maybe<Scalars['Date']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<GenderEnum>;
  id?: Maybe<Scalars['ID']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  ratingAverage?: Maybe<Scalars['Int']['output']>;
  ratings?: Maybe<Array<Maybe<Rating>>>;
  referenceCode?: Maybe<Scalars['String']['output']>;
  token?: Maybe<SessionToken>;
  url?: Maybe<SessionUrl>;
};

export type Session = {
  __typename?: 'Session';
  address?: Maybe<Address>;
  authType?: Maybe<AuthEnum>;
  birthdate?: Maybe<Scalars['Date']['output']>;
  company?: Maybe<SessionCompany>;
  country?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  fleetType?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<GenderEnum>;
  id?: Maybe<Scalars['ID']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  lastname?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  referenceCode?: Maybe<Scalars['String']['output']>;
  token?: Maybe<SessionToken>;
  url?: Maybe<SessionUrl>;
  vat?: Maybe<Scalars['String']['output']>;
};

export type SessionCompany = {
  __typename?: 'SessionCompany';
  address?: Maybe<Address>;
  name?: Maybe<Scalars['String']['output']>;
};

export type SessionToken = {
  __typename?: 'SessionToken';
  notification?: Maybe<Scalars['String']['output']>;
  session?: Maybe<Scalars['String']['output']>;
};

export type SessionUrl = {
  __typename?: 'SessionUrl';
  idCard?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  transportLicense?: Maybe<Scalars['String']['output']>;
};

export type SetRatingInput = {
  comment: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  value: Scalars['Float']['input'];
};

export type SignInInput = {
  authType: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  authType: Scalars['String']['input'];
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  gender?: InputMaybe<GenderEnum>;
  lang: LangEnum;
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export enum StatusEnum {
  Booked = 'booked',
  Decline = 'decline',
  Delivered = 'delivered',
  Delivering = 'delivering',
  Ongoing = 'ongoing'
}

export type StripeBillindDetailAddress = {
  __typename?: 'StripeBillindDetailAddress';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type StripeBillingDetail = {
  __typename?: 'StripeBillingDetail';
  address?: Maybe<StripeBillindDetailAddress>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type StripeCharge = {
  __typename?: 'StripeCharge';
  amount?: Maybe<Scalars['Float']['output']>;
  amount_captured?: Maybe<Scalars['Float']['output']>;
  amount_refunded?: Maybe<Scalars['Float']['output']>;
  billing_details?: Maybe<StripeBillingDetail>;
  calculated_statement_descriptor?: Maybe<Scalars['String']['output']>;
  created?: Maybe<Scalars['Date']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  receipt_url?: Maybe<Scalars['String']['output']>;
  refunded?: Maybe<Scalars['Boolean']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type StripeChargeListInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type StripePayment = {
  __typename?: 'StripePayment';
  amount?: Maybe<Scalars['Float']['output']>;
  amount_capturable?: Maybe<Scalars['Float']['output']>;
  amount_received?: Maybe<Scalars['Float']['output']>;
  created?: Maybe<Scalars['Date']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  payment_method_types?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  status?: Maybe<Scalars['String']['output']>;
};

export type StripePaymentListInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  carrier?: Maybe<Carrier>;
  carrierFee?: Maybe<Scalars['Float']['output']>;
  carrierId?: Maybe<Scalars['ID']['output']>;
  carrierRating?: Maybe<Rating>;
  code?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  destinationAddress?: Maybe<Address>;
  distance?: Maybe<Distance>;
  fleetType?: Maybe<Scalars['String']['output']>;
  flexible?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  packages?: Maybe<Array<Maybe<Package>>>;
  pickupAddress?: Maybe<Address>;
  platformFee?: Maybe<Scalars['Float']['output']>;
  sender?: Maybe<Sender>;
  senderId?: Maybe<Scalars['ID']['output']>;
  senderRating?: Maybe<Rating>;
  status?: Maybe<Array<Maybe<TransactionStatus>>>;
  stopoverAddresses?: Maybe<Array<Maybe<Address>>>;
  time?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Volume>;
  weight?: Maybe<Weight>;
};

export type TransactionFilter = {
  transactionId?: InputMaybe<Scalars['ID']['input']>;
};

export type TransactionStatus = {
  __typename?: 'TransactionStatus';
  createdAt?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<StatusEnum>;
};

export type TransactionsFilter = {
  isBooked?: InputMaybe<Scalars['Boolean']['input']>;
  isDeal?: InputMaybe<Scalars['Boolean']['input']>;
  isOwned?: InputMaybe<Scalars['Boolean']['input']>;
  minDate?: InputMaybe<Scalars['Date']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileCompanyInput = {
  address?: InputMaybe<AddressInput>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  address?: InputMaybe<AddressInput>;
  birthdate?: InputMaybe<Scalars['Date']['input']>;
  company?: InputMaybe<UpdateProfileCompanyInput>;
  firstname: Scalars['String']['input'];
  fleetType?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  lastname: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  url?: InputMaybe<UpdateProfileUrlInput>;
  vat?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileUrlInput = {
  idCard?: InputMaybe<ImageInput>;
  image?: InputMaybe<ImageInput>;
  transportLicense?: InputMaybe<ImageInput>;
};

export type User = Carrier | Sender;

export type VerifiedEmail = {
  authType: AuthEnum;
  email: Scalars['String']['input'];
};

export type Volume = {
  __typename?: 'Volume';
  price?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type Weight = {
  __typename?: 'Weight';
  price?: Maybe<Scalars['Float']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type SignInMutationVariables = Exact<{
  input?: InputMaybe<SignInInput>;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'Session', token?: { __typename?: 'SessionToken', session?: string | null } | null } | null };

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = { __typename?: 'Query', session?: { __typename?: 'Session', id?: string | null, authType?: AuthEnum | null, email?: string | null, firstname?: string | null, lastname?: string | null, gender?: GenderEnum | null, country?: string | null, phone?: string | null, referenceCode?: string | null, birthdate?: any | null, fleetType?: string | null, vat?: string | null, url?: { __typename?: 'SessionUrl', image?: string | null, idCard?: string | null, transportLicense?: string | null } | null, address?: { __typename?: 'Address', location?: string | null, coordinate?: Array<number | null> | null } | null, company?: { __typename?: 'SessionCompany', name?: string | null, address?: { __typename?: 'Address', location?: string | null, coordinate?: Array<number | null> | null } | null } | null } | null };

export type StripeChargetListQueryVariables = Exact<{
  filter?: InputMaybe<StripeChargeListInput>;
}>;


export type StripeChargetListQuery = { __typename?: 'Query', stripeChargeList?: Array<{ __typename?: 'StripeCharge', id?: string | null, status?: string | null, amount?: number | null, currency?: string | null, billing_details?: { __typename?: 'StripeBillingDetail', email?: string | null, name?: string | null, phone?: string | null, address?: { __typename?: 'StripeBillindDetailAddress', city?: string | null, country?: string | null, line1?: string | null, line2?: string | null, postal_code?: string | null } | null } | null } | null> | null };

export type GetSenderListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSenderListQuery = { __typename?: 'Query', senderList?: Array<{ __typename?: 'Sender', firstname?: string | null, email?: string | null, country?: string | null, phone?: string | null, gender?: GenderEnum | null, address?: { __typename?: 'Address', location?: string | null } | null } | null> | null };

export type GetCarrierListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCarrierListQuery = { __typename?: 'Query', carrierList?: Array<{ __typename?: 'Carrier', firstname?: string | null, email?: string | null, country?: string | null, phone?: string | null, gender?: GenderEnum | null, fleetType?: string | null } | null> | null };


export const SignInDocument = gql`
    mutation SignIn($input: SignInInput) {
  signIn(input: $input) {
    token {
      session
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SessionDocument = gql`
    query Session {
  session {
    id
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
    birthdate
    address {
      location
      coordinate
    }
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

/**
 * __useSessionQuery__
 *
 * To run a query within a React component, call `useSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionQuery(baseOptions?: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
      }
export function useSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionQuery, SessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
        }
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionQueryResult = Apollo.QueryResult<SessionQuery, SessionQueryVariables>;
export const StripeChargetListDocument = gql`
    query StripeChargetList($filter: StripeChargeListInput) {
  stripeChargeList(filter: $filter) {
    id
    status
    amount
    currency
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

/**
 * __useStripeChargetListQuery__
 *
 * To run a query within a React component, call `useStripeChargetListQuery` and pass it any options that fit your needs.
 * When your component renders, `useStripeChargetListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStripeChargetListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useStripeChargetListQuery(baseOptions?: Apollo.QueryHookOptions<StripeChargetListQuery, StripeChargetListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StripeChargetListQuery, StripeChargetListQueryVariables>(StripeChargetListDocument, options);
      }
export function useStripeChargetListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StripeChargetListQuery, StripeChargetListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StripeChargetListQuery, StripeChargetListQueryVariables>(StripeChargetListDocument, options);
        }
export type StripeChargetListQueryHookResult = ReturnType<typeof useStripeChargetListQuery>;
export type StripeChargetListLazyQueryHookResult = ReturnType<typeof useStripeChargetListLazyQuery>;
export type StripeChargetListQueryResult = Apollo.QueryResult<StripeChargetListQuery, StripeChargetListQueryVariables>;
export const GetSenderListDocument = gql`
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

/**
 * __useGetSenderListQuery__
 *
 * To run a query within a React component, call `useGetSenderListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSenderListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSenderListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSenderListQuery(baseOptions?: Apollo.QueryHookOptions<GetSenderListQuery, GetSenderListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSenderListQuery, GetSenderListQueryVariables>(GetSenderListDocument, options);
      }
export function useGetSenderListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSenderListQuery, GetSenderListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSenderListQuery, GetSenderListQueryVariables>(GetSenderListDocument, options);
        }
export type GetSenderListQueryHookResult = ReturnType<typeof useGetSenderListQuery>;
export type GetSenderListLazyQueryHookResult = ReturnType<typeof useGetSenderListLazyQuery>;
export type GetSenderListQueryResult = Apollo.QueryResult<GetSenderListQuery, GetSenderListQueryVariables>;
export const GetCarrierListDocument = gql`
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

/**
 * __useGetCarrierListQuery__
 *
 * To run a query within a React component, call `useGetCarrierListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCarrierListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCarrierListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCarrierListQuery(baseOptions?: Apollo.QueryHookOptions<GetCarrierListQuery, GetCarrierListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCarrierListQuery, GetCarrierListQueryVariables>(GetCarrierListDocument, options);
      }
export function useGetCarrierListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCarrierListQuery, GetCarrierListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCarrierListQuery, GetCarrierListQueryVariables>(GetCarrierListDocument, options);
        }
export type GetCarrierListQueryHookResult = ReturnType<typeof useGetCarrierListQuery>;
export type GetCarrierListLazyQueryHookResult = ReturnType<typeof useGetCarrierListLazyQuery>;
export type GetCarrierListQueryResult = Apollo.QueryResult<GetCarrierListQuery, GetCarrierListQueryVariables>;
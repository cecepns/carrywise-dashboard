import { Address } from '@/generated/graphql';

export type Timeline = {
  pickupAddress?: Address | null | undefined;
  stopoverAddresses?: Address[] | undefined;
  destinationAddress?: Address | null | undefined;
};

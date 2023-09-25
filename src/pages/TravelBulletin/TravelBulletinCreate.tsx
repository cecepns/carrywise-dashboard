import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { ENV } from '@/utils/env';
import { Button, Icon, Typography } from '@/components/atoms';
import { Input, RouteTimeline } from '@/components/molecules';
import { Address, useCreateCarrierTransactionMutation } from '@/generated/graphql';
import { AddressApi, InputSearchAddress } from '@/components/organisms';

const initialStopoverValue = (): Address => ({
  location: '',
  coordinate: [],
});

export const TravelBulletinCreate: React.FC = () => {
  const [address, setAddress] = useState({
    date: '',
    pickupAddress: { 
      location: '',
      coordinate: [0, 0],
    },
    destinationAddress: {
      location: '',
      coordinate: [0, 0],
    },
    space: 0
  });
  const [stopover, setStopover] = useState<Address[]>([]);
  const navigate = useNavigate();
  const [createCarrierTransaction, { loading }] =
    useCreateCarrierTransactionMutation();

  const dataAddress = useMemo(() => {
    if(address.destinationAddress || address.pickupAddress) {
      return {
        ...address,
        stopoverAddresses: stopover
      };
    }

    return {};
  }, [address, stopover]);

  console.log(dataAddress);

  const handleClickStopover = useCallback(
    (index: number) => (val: AddressApi) => {
      setStopover(prev =>
        prev.map((item, i) => {
          if (index === i) {
            return {
              coordinate: [
                parseFloat(val.lon.toString()) ?? 0,
                parseFloat(val.lat.toString()) ?? 0,
              ],
              location: val.display_name ?? ''
            };
          }
          return item;
        }),
      );
    },
    [],
  );

  const handleChangeStopover = useCallback(
    (index: number) => (val: string) => {
      setStopover(prev =>
        prev.map((item, i) => {
          if (index === i) {
            return {
              ...item,
              location: val
            };
          }
          return item;
        }),
      );
    },
    [],
  );

  const handleClickAddress = useCallback(
    (name:string) => (val:AddressApi) => {
      setAddress(prev => ({
        ...prev,
        [name]: {
          coordinate: [
            parseFloat(val.lon.toString()) ?? 0,
            parseFloat(val.lat.toString()) ?? 0,
          ],
          location: val.display_name ?? ''
        }
      }));
    }, []);

  const inputChangeHandler = useCallback((name:string) => (val:string) => {
    setAddress(prev => ({
      ...prev,
      [name]: {
        ...prev,
        location:val
      }
    }));
  }, []);

  const handleAddStopover = useCallback(() => {
    setStopover(prev => [...prev, initialStopoverValue()]);
  }, []);

  const handleDeleteStopover = useCallback(
    (index: number) => {
      setStopover(prev => prev.filter((_, i) => index !== i));
    },
    [],
  );

  const handleSubmit = useCallback(async () => {

    const coordinates = [
      address.pickupAddress?.coordinate?.join(','),
      ...(stopover ?? []).map(
        (stopover: Address | null) => {
          if (stopover?.coordinate) {
            return stopover?.coordinate?.join(',');
          }
          return '';
        },
      ),
      address.destinationAddress?.coordinate?.join(','),
    ].join(';');

    const raw = await fetch(
      `${ENV.DIRECTION_API}/directions/v5/mapbox/driving/${coordinates}?access_token=${ENV.MAPBOX_ACCESS_TOKEN}&alternatives=false&geometries=geojson&language=en&overview=simplified&steps=false`,
    );

    const res = await raw.json();
    if (res?.routes?.[0]) {
      const bestRoute = res.routes[0];

      createCarrierTransaction({
        fetchPolicy: 'network-only',
        variables: {
          input: {
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('hh:mm'),
            flexible: false,
            distance: Number(bestRoute.distance) ?? 0,
            pickupAddress: address.pickupAddress,
            destinationAddress: address.destinationAddress,
            stopoverAddresses: stopover,
          },
        },
        onCompleted: ({ createCarrierTransaction: res }) => {
          console.log(res);
          alert('Success add trips');
          navigate('/dashboard/travel-bulletin');
        },
        onError: e => {
          console.log(e);
          alert(e);
        },
      });
      
    }
    
  }, [address.destinationAddress, address.pickupAddress, createCarrierTransaction, navigate, stopover]);

  return (
    <div className="mt-12">
      <div className="flex justify-between mb-8">
        <Typography>
          Travel Bulletin
        </Typography>
        <div className="flex space-x-4">
          <Button className="w-[100px] bg-gray-400 hover:bg-gray-600" onClick={() => navigate('/dashboard/travel-bulletin')}> <Icon name="arrow-left"/> Back</Button>
          <Button className="w-1/2" onClick={handleSubmit} disabled={loading || !address.destinationAddress.location || !address.pickupAddress.location}> <Icon name="plus-circle"/> {loading ? 'Loading...' : 'Add Trips'} </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-8 col-span-2">
          <Input label="Departure day" type="datetime-local" onChange={inputChangeHandler('date')}/>
          <InputSearchAddress 
            label="Departure city"
            value={address.pickupAddress.location}
            onChange={inputChangeHandler('pickupAddress')}
            onClickAddress={handleClickAddress('pickupAddress')}
          />
          {stopover.map((item, idx) => (
            <div key={idx} className="flex space-x-3">
              <InputSearchAddress 
                label={`City ${idx + 1}`}
                value={item.location ?? ''}
                onChange={handleChangeStopover(idx)}
                onClickAddress={handleClickStopover(idx)}
              />
              <Button variant="text" onClick={() => handleDeleteStopover(idx)}> <Icon name="trash" className="text-red-500" type="solid"/></Button>
            </div>
          ))}
          <Button className="w-[130px]" variant="text" onClick={handleAddStopover}> <Icon name="plus-circle"/> Add stopover</Button>
          <InputSearchAddress 
            label="Destination"
            value={address.destinationAddress.location}
            onChange={inputChangeHandler('destinationAddress')}
            onClickAddress={handleClickAddress('destinationAddress')}
          />
          <Input label="Space available (m³)" type="number"/>
        </div>
        {(address.pickupAddress.location || address.destinationAddress.location) && (
          <RouteTimeline data={dataAddress}/>
        )}
      </div>
    </div> 
  );
};

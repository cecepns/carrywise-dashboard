import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { ENV } from '@/utils/env';
import { Button, Icon, Typography } from '@/components/atoms';
import { Input, RouteTimeline } from '@/components/molecules';
import { Address, useCreateTravelBoardMutation } from '@/generated/graphql';
import { AddressApi, InputSearchAddress } from '@/components/organisms';

const initialStopoverValue = (): Address => ({
  location: '',
  coordinate: [],
});

export const TravelBulletinCreate: React.FC = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    date: '',
    pickupAddress: { 
      location: '',
      coordinate: [0, 0],
    },
    destinationAddress: {
      location: '',
      coordinate: [0, 0],
    },
    fleetVolume: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [stopover, setStopover] = useState<Address[]>([]);
  const navigate = useNavigate();
  const [createCarrierTransaction, { loading: loadingCreateTrips }] =
    useCreateTravelBoardMutation();

  const dataAddress = useMemo(() => {
    if(form.destinationAddress || form.pickupAddress) {
      return {
        ...form,
        stopoverAddresses: stopover
      };
    }

    return {};
  }, [form, stopover]);

  const handleClickStopover = useCallback(
    (index: number) => (val: AddressApi) => {
      setStopover(prev =>
        prev.map((item, i) => {
          if (index === i) {
            return {
              coordinate: [
                parseFloat(val?.lon.toString() ?? 0),
                parseFloat(val?.lat.toString() ?? 0),
              ],
              location: val?.display_name ?? ''
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
      setForm(prev => ({
        ...prev,
        [name]: {
          coordinate: [
            parseFloat(val?.lon.toString() ?? 0),
            parseFloat(val?.lat.toString() ?? 0),
          ],
          location: val?.display_name ?? ''
        }
      }));
    }, []);

  const inputChangeHandler = useCallback((name:string) => (val:string) => {
    if(name === 'pickupAddress' || name === 'destinationAddress') {
      setForm(prev => ({
        ...prev,
        [name]: {
          coordinate: [0, 0],
          location: val
        }
      }));  
    } else {
      setForm(prev => ({
        ...prev,
        [name]: val
      }));
    }
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
    setLoading(true);
    const coordinates = [
      form.pickupAddress?.coordinate?.join(','),
      ...(stopover ?? []).map(
        (stopover: Address | null) => {
          if (stopover?.coordinate) {
            return stopover?.coordinate?.join(',');
          }
          return '';
        },
      ),
      form.destinationAddress?.coordinate?.join(','),
    ].join(';');

    try {
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
              ...form,
              date: moment(form.date).format('YYYY-MM-DD'),
              time: moment(form.date).format('hh:mm'),
              distance: Number(bestRoute.distance) ?? 0,
              fleetVolume: Number(form.fleetVolume) ?? 0,
              pickupAddress: form.pickupAddress,
              destinationAddress: form.destinationAddress,
              stopoverAddresses: stopover,
            },
          },
          onCompleted: ({ createTravelBoard: res }) => {
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
      setLoading(false);

    } catch (error) {
      setLoading(false);
      alert(error);
    }
    
  }, [form, stopover, createCarrierTransaction, navigate]);

  return (
    <div className="mt-12">
      <div className="flex justify-between mb-8">
        <Typography>
          Travel Bulletin
        </Typography>
        <div className="flex space-x-4">
          <Button className="w-[100px] bg-gray-400 hover:bg-gray-600" onClick={() => navigate('/dashboard/travel-bulletin')}> <Icon name="arrow-left"/> Back</Button>
          <Button className="w-1/2" disabled={
            loading ||
            loadingCreateTrips ||
            !form.destinationAddress.location ||
            !form.pickupAddress.location
          }
          onClick={handleSubmit}
          > 
            <Icon name="plus-circle"/> {loading ? 'Loading...' : 'Add Trips'} 
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-8 col-span-2">
          <Input label="Departure day" type="datetime-local" onChange={inputChangeHandler('date')}/>
          <Input label="Firstname" onChange={inputChangeHandler('firstname')}/>
          <Input label="Lastname" onChange={inputChangeHandler('lastname')}/>
          <InputSearchAddress 
            label="Departure city"
            value={form.pickupAddress.location}
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
            value={form.destinationAddress.location}
            onChange={inputChangeHandler('destinationAddress')}
            onClickAddress={handleClickAddress('destinationAddress')}
          />
          <Input label="Space available (m³)" type="number" onChange={inputChangeHandler('fleetVolume')}/>
        </div>
        {(form.pickupAddress.location || form.destinationAddress.location) && (
          <RouteTimeline data={dataAddress}/>
        )}
      </div>
    </div> 
  );
};

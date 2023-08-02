import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import moment from 'moment';

import { Timeline } from '@/type';
import { Address, Transaction } from '@/generated/graphql';
import { Icon, Typography } from '@/components/atoms';

type RouteTimeline = {
  startTime?: string | null;
  endTime?: boolean;
  data: Transaction | Timeline;
  onStopoverPress?: (timeline: Address, index: number) => void;
  onPress?: boolean | (() => void);
  size?: 'sm' | 'base';
  fleetType?: string | null;
};

export const RouteTimeline: React.FC<RouteTimeline> = memo(
  ({
    startTime,
    endTime = true,
    data,
    onStopoverPress,
    onPress = false,
    size = 'base',
    fleetType = null,
  }) => {
    const detail = useMemo(() => {
      if (data?.pickupAddress && data?.destinationAddress) {
        return [
          ...([data?.pickupAddress] ?? []),
          ...(data?.stopoverAddresses ?? []).map(stopover => ({
            ...stopover,
          })),
          ...([data?.destinationAddress] ?? []),
        ];
      }
      return [];
    }, [
      data?.destinationAddress,
      data?.pickupAddress,
      data?.stopoverAddresses,
    ]);

    const handlePressAdress = () => {
      if (!!onPress && typeof onPress === 'function') {
        onPress();
      }
      if (
        !!onPress &&
        typeof onPress === 'boolean' &&
        data?.pickupAddress?.coordinate &&
        data?.destinationAddress?.coordinate
      ) {
        console.log('hello');
        const url = `https://www.google.com/maps/dir/?api=1&origin=${data?.pickupAddress?.coordinate[1]},${data?.pickupAddress?.coordinate[0]}&destination=${data?.destinationAddress?.coordinate[1]},${data?.destinationAddress?.coordinate[0]}&travelmode=driving`;
        window.open(url);
      }
    };

    return (
      <div>
        {detail.map((route: Address, i: number) => (
          <div key={`${i.toString()}`} className="flex">
            {startTime && (
              <Typography className="w-12 text-gray-700 -mt-[6px]">
                {i === 0
                  ? moment(startTime, 'HH:mm').format('HH:mm')
                  : endTime &&
                    moment(startTime, 'HH:mm')
                      .add(route?.duration, 'seconds')
                      .format('HH:mm')}
              </Typography>
            )}
            <div className="flex-col items-center ml-1 mr-3">
              <div
                className={classNames(
                  'bg-blue-400 rounded-full border-2 border-blue-700',
                  {
                    'w-4 h-4': size === 'base',
                    'w-3 h-3': size === 'sm',
                  },
                )}
              />
              {detail.length - 1 !== i && (
                <div className="w-0 m-auto h-full border-r-2 border-gray-500 flex-1" />
              )}
            </div>
            <div
              onClick={() =>
                onStopoverPress && i > 0 && i < detail.length - 1
                  ? onStopoverPress(route, i)
                  : null
              }
              className={classNames(
                'flex-1 flex justify-between items-center -mt-[3px] pb-1',
                {
                  'pb-8': i !== detail.length - 1 && size === 'base',
                  'pb-2': i !== detail.length - 1 && size === 'sm',
                },
              )}>
              <div onClick={handlePressAdress}>
                <div className="flex-1">
                  <Typography
                    className={classNames('text-sm text-gray-800 cursor-pointer', {
                      'text-sm pb-2': size === 'sm' && detail.length - 1 !== i,
                    })}
                  >
                    {route.location}
                  </Typography>
                  {detail.length - 1 !== i &&
                    fleetType !== 'Unknown vehicles' && (
                    <Typography>{fleetType}</Typography>
                  )}
                </div>
              </div>
              {onStopoverPress && i > 0 && i < detail.length - 1 && (
                <Icon
                  name="chevron-right"
                  size="sm"
                  className="text-gray-500"
                />
              )}
            </div>
          </div>
        ))}
        {!!onPress && typeof onPress === 'boolean' && (
          <Typography className="text-xs text-red-500 pt-5">
            *Click on address to open Google Maps
          </Typography>
        )}
      </div>
    );
  },
);

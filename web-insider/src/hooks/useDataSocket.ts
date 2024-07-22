import { socket } from '@/helpers/socketClient';
import { cloneDeep, isArray, isEmpty, isEqual, isObject, merge } from 'lodash';
import { useEffect, useState } from 'react';

export const useDataSocket = <T>(
  eventName: string,
  keyUpdate?: {
    price?: string;
    percent_change_24h?: string;
    volume_24h?: string;
    volume_change_24h?: string;
    market_cap?: string;
  }
) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(eventName, setStateData);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off(eventName);
    };
  }, []);

  const setStateData = (newData: T | T[]) => {
    setData((preData) => {
      if (!preData) return preData;

      const newState = compareData(preData, newData);
      return newState ?? preData;
    });
  };
  const compareData = (preData: T | T[], newData: T | T[]) => {
    let newState = null;
    if (isEmpty(newData)) return null;

    if (isObject(preData) && !isArray(preData)) {
      let objectCheck: any = preData;
      objectCheck = (newData as any)[(preData as any).key];

      if (objectCheck?.quote?.USD) {
        if (!!keyUpdate?.price)
          objectCheck = {
            ...objectCheck,
            [keyUpdate?.price]: objectCheck?.quote?.USD?.price,
          };
        if (!!keyUpdate?.percent_change_24h)
          objectCheck = {
            ...objectCheck,
            [keyUpdate?.percent_change_24h]:
              objectCheck?.quote?.USD?.percent_change_24h,
          };
        if (!!keyUpdate?.volume_24h)
          objectCheck = {
            ...objectCheck,
            [keyUpdate?.volume_24h]: objectCheck?.quote?.USD?.volume_24h,
          };
        if (!!keyUpdate?.volume_change_24h)
          objectCheck = {
            ...objectCheck,
            [keyUpdate?.volume_change_24h]:
              objectCheck?.quote?.USD?.volume_change_24h,
          };
        if (!!keyUpdate?.market_cap)
          objectCheck = {
            ...objectCheck,
            [keyUpdate?.market_cap]: objectCheck?.quote?.USD?.market_cap,
          };
      }
      const dataClone = merge(preData, objectCheck);
      if (!!objectCheck) newState = cloneDeep(dataClone);
    }

    if (isArray(preData) && isObject(newData)) {
      const dataClone: any = cloneDeep(preData).map((dt: any) => {
        let objectCheck: any = newData[dt.key];
        const defaultData = {
          ...dt,
          isPriceIncrease: false,
          isPriceDecrease: false,
        };
        if (!objectCheck) return defaultData;

        if (!!dt.price && !!objectCheck?.quote?.USD.price) {
          objectCheck.isPriceIncrease = false;
          objectCheck.isPriceDecrease = false;
          if (dt.price > objectCheck?.quote?.USD.price)
            objectCheck.isPriceDecrease = true;
          else if (dt.price < objectCheck?.quote?.USD.price)
            objectCheck.isPriceIncrease = true;
        }

        if (objectCheck?.quote?.USD) {
          if (!!keyUpdate?.price)
            objectCheck = {
              ...objectCheck,
              [keyUpdate?.price]: objectCheck?.quote?.USD?.price,
            };
          if (!!keyUpdate?.percent_change_24h)
            objectCheck = {
              ...objectCheck,
              [keyUpdate?.percent_change_24h]:
                objectCheck?.quote?.USD?.percent_change_24h,
            };
          if (!!keyUpdate?.volume_24h)
            objectCheck = {
              ...objectCheck,
              [keyUpdate?.volume_24h]: objectCheck?.quote?.USD?.volume_24h,
            };
          if (!!keyUpdate?.volume_change_24h)
            objectCheck = {
              ...objectCheck,
              [keyUpdate?.volume_change_24h]:
                objectCheck?.quote?.USD?.volume_change_24h,
            };
          if (!!keyUpdate?.market_cap)
            objectCheck = {
              ...objectCheck,
              [keyUpdate?.market_cap]: objectCheck?.quote?.USD?.market_cap,
            };
        }

        return merge(dt, objectCheck);
      });
      if (!isEqual(dataClone, preData)) {
        newState = cloneDeep(dataClone);
      }
    }

    return newState;
  };

  return {
    data,
    isConnected,
    setDefaultData: (dt: T | null) => setData(dt),
  };
};

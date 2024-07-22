'use client';

import { useMemo } from 'react';
import CoinInfoFundraising from './CoinInfoFundraising';
import CoinInfoListing from './CoinInfoListing';
import CoinInfoPublicSale from './CoinInfoPublicSale';
import './style.scss';

const CoinInformation = ({ data }: any) => {
  const IsListing = useMemo(() => !data?.marketDataNotAvailable, [data]);

  const IsPublicSale = useMemo(
    () => data?.crowdsales?.length > 0 && !data?.hasFundingRounds,
    [data]
  );

  const IsFundraising = useMemo(() => data?.hasFundingRounds, [data]);

  if (IsListing) return <CoinInfoListing data={data} />;

  if (IsPublicSale) return <CoinInfoPublicSale data={data} />;

  if (IsFundraising) return <CoinInfoFundraising data={data} />;

  return null;
};

export default CoinInformation;

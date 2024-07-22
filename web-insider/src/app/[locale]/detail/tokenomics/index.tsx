'use client';

import { FetchCoinTokenomics } from '@/usecases/coin-info';
import TokenomicsInfo from './info/TokenomicsInfo';
import TokenAllocation from './token';
import { useEffect, useState } from 'react';

export default function Tokenomics(props:any) {
  const [tokenomics, setTokenomics] = useState(null)
  async function fetchTokenomics() {
    const token: any = await FetchCoinTokenomics({ coin_key: props.slug });
    setTokenomics(token)
  }

  useEffect(() => {
    fetchTokenomics()
  }, [])
  
  return (
    <div>
      {
        tokenomics ? (
          <div className='tokenomics fade-top'>
          <TokenomicsInfo tokenInfo={props.tokenInfo} data={tokenomics} />
          <div className='box-shadow-common p-6 bg-white rounded-lg'>
            <TokenAllocation tokenInfo={props.tokenInfo}  data={tokenomics} />
          </div>
        </div>
        ) : ''
      }
    </div>
  );
}

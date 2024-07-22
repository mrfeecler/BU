import React from 'react';
import InfoCharts from './info';
import CoinCompare from './compare/Compare2';

export const Overview = (props: any) => {
  return (
    <div className='overview fade-top'>
      <InfoCharts data={props.data} />
      <CoinCompare data={props.data} />
    </div>
  );
};

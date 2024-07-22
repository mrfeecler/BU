'use client';

import CommonTable from '@/components/CommonTable/common-table';
import HexagonItem from '@/components/Hexa/Hexagon';
import Text from '@/components/Text';
import { nFormatter } from '@/helpers';
import { COLOR_CHART } from '@/helpers/constants';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

const columns: ColumnsType<ITokenomics> = [
  {
    key: 'round',
    title: 'Round',
    width: 184,
    align: 'left',
    fixed: true,
    render: (_, value) => {
      return (
        <div key={value._id} className='flex items-center gap-3'>
          <HexagonItem color={value.activeColor} />
          <Text
            weight='semiBold'
            ellipsis
            className='!max-w-[62px] lg:!max-w-[110px]'
          >
            {value.name}
          </Text>
        </div>
      );
    },
  },
  {
    key: 'allowcationPercent',
    title: 'Allocation (%)',
    width: 107,
    align: 'left',
    render: (_, value) => {
      let allocation = nFormatter(value.tokens_percent, 2, '%', true);
      return allocation;
    },
  },
  {
    key: 'allowcationToken',
    title: 'Allocation (Token)',
    width: 140,
    align: 'left',
    render: (_, value) => {
      return nFormatter(value.tokens, 2, '');
    },
  },
  {
    key: 'tgeUnlock',
    title: 'TGE Unlock',
    width: 104,
    align: 'left',
    render: (_, value) => {
      let baches = value.batches;
      let tge = 0;
      for (let i in baches) {
        if (baches[i].is_tge) {
          tge += baches[i].unlock_percent;
        }
      }
      return tge + '%';
    },
  },
  {
    key: 'tokenReleaseSchedule',
    title: 'Token Release Schedule',
    align: 'left',
    width: 318,
    render: () => '-',
    // render: (_, value) => {
    //   return getTokenReleaseSchedule(
    //     value.unlock_frequency_value,
    //     value.unlock_frequency_type,
    //     value.vesting_duration_value
    //   );
    // },
  },
];
function getTokenReleaseSchedule(
  unlockFreValue: number,
  unlockFreType: string,
  vestingDurValue: number
) {
  if (
    unlockFreType != null &&
    unlockFreValue != null &&
    vestingDurValue != null
  ) {
    return (
      'Every ' +
      unlockFreValue +
      ' ' +
      unlockFreType +
      ' in ' +
      vestingDurValue +
      ' ' +
      unlockFreType
    );
  } else {
    return '-';
  }
}

const TokenomicsInfo = (props: any) => {
  const [allocations, setAllocations] = useState<any>([]);
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  useEffect(() => {
    let allocationsTemp = props.data?.datas?.allocations || [];
    let tokenInfoTemp = props.tokenInfo;
    if (allocationsTemp.length > 0) {
      allocationsTemp.map((item: any, i: number) => {
        item.activeColor = Object.values(COLOR_CHART)[i];
      });
    }
    setAllocations(allocationsTemp);
    setTokenInfo(tokenInfoTemp);
  }, [props]);

  return (
    <div className='tokenomics-info grid grid-cols-12 gap-4 mb-6'>
      <div className='col-span-12 lg:col-span-3'>
        <div className='box-shadow-common p-6 h-full rounded-lg'>
          <div className='border-b border-grey-300 pb-5 mb-6'>
            <div className='text-sm font-bold text-grey-700 mb-6'>
              Basic Metrics
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Total Supply</div>
              <div className='text-grey-700 text-sm'>
                {nFormatter(
                  tokenInfo?.totalSupply,
                  2,
                  tokenInfo?.symbol,
                  false,
                  true
                )}
              </div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Max Supply</div>
              <div className='text-grey-700 text-sm'>
                {nFormatter(
                  tokenInfo?.maxSupply,
                  2,
                  tokenInfo?.symbol,
                  false,
                  true
                )}
              </div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Initial Circ. Supply</div>

              <div className='text-grey-700 text-sm'>
                {nFormatter(tokenInfo?.circ, 2, tokenInfo?.symbol, false, true)}
              </div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Initial Maket Cap</div>
              <div className='text-grey-700 text-sm'>
                {nFormatter(tokenInfo?.marketCap, 2, '$')}
              </div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Inflation</div>
              <div className='text-grey-700 text-sm'>-</div>
            </div>
            <div className='flex items-center justify-between mb-3'>
              <div className='text-grey-500 text-sm'>Burn</div>
              <div className='text-grey-700 text-sm'>-</div>
            </div>
          </div>
          <div>
            <div className='text-sm font-bold text-grey-700 mb-6'>
              Token Use Case
            </div>
            <div className='text-grey-700 text-sm'>Updating...</div>
          </div>
        </div>
      </div>
      <div className='col-span-12 lg:col-span-9'>
        <div className='box-shadow-common p-6 rounded-lg h-full'>
          <div className='overflow-x-auto hide-scroll'>
            <CommonTable
              columns={columns}
              dataSource={allocations}
              pagination={{ position: ['none'] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenomicsInfo;

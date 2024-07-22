'use client';
import IconAngleDown from '@/assets/icons/IconAngleDown';
import IconCircle from '@/assets/icons/IconCircle';
import Calendar from '@/components/Calendar/Calendar';
import CommonTable from '@/components/CommonTable/common-table';
import Text from '@/components/Text';
import { nFormatter } from '@/helpers';
import { cn } from '@/helpers/functions';
import { Flex } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useState } from 'react';

const Past = ({ data, tokenInfo }: any) => {
  const [roundExpand, setRoundExpand] = useState<null | number>(null);

  const handleRoundExpand = (index: number) => {
    setRoundExpand((prev) => (prev === index ? null : index));
  };

  const columns: ColumnsType<IUpcomming> = [
    {
      key: 'date',
      title: 'Date',
      align: 'left',
      width: 270,
      render: (_, value) => {
        const time =
          Number(moment(value.unlockDate).format('X')) -
          Number(moment().format('X'));
        const aDay = 60 * 60 * 24;
        return (
          <div className='flex items-center gap-4'>
            <Calendar date={value.remainingTime} />
            <IconCircle color={time < aDay ? '#F89152' : '#9FA4B7'} />
            <Text
              className={cn(
                time < aDay ? '!text-[#F89152]' : '!text-[#9FA4B7]'
              )}
            >
              {moment(new Date(value.unlockDate || Date.now()).toISOString())
                .fromNow()
                .replace('in ', '')
                .replace('a ', '1 ')}
            </Text>
          </div>
        );
      },
    },
    {
      key: 'token',
      title: 'Tokens',
      width: 400,
      align: 'center',
      render: (_, value) => {
        return (
          <Flex vertical gap={8}>
            <Text weight='semiBold'>
              {nFormatter(value.token, 2, tokenInfo.symbol, false, true)}
            </Text>
            <Text size={12} type='secondary'>
              {nFormatter(value.tokensPercent, 2, '%', true)} of Total Supply
            </Text>
          </Flex>
        );
      },
    },
    {
      key: 'value',
      title: 'Value',
      width: 300,
      align: 'center',
      render: (_, value) => {
        return (
          <Flex vertical gap={8}>
            <Text weight='semiBold'>{nFormatter(value.value, 2, '$')}</Text>
            <Text size={12} type='secondary'>
              {nFormatter(value.percentOfMarketCap, 2, '%', true)} of M. Cap
            </Text>
          </Flex>
        );
      },
    },
    {
      key: 'rounds',
      title: 'Rounds',
      dataIndex: 'rounds',
      align: 'center',
      render: (value: any[], _, i) => {
        if (!value?.length) return '-';
        return (
          <Flex align='center' justify='flex-end' gap={40}>
            <Flex vertical gap={8}>
              {value
                .slice(0, roundExpand === i ? value.length : 2)
                .map((item) => {
                  return <RoundInfo item={item} />;
                })}
            </Flex>
            <Flex
              gap={8}
              align='center'
              onClick={() => handleRoundExpand(i)}
              className={cn(
                value.length > 2 ? 'cursor-pointer' : 'pointer-events-none'
              )}
            >
              <Text
                weight='semiBold'
                color={value.length > 2 ? 'primary' : undefined}
              >
                {value.length} {value.length > 1 ? 'Rounds' : 'Round'}
              </Text>
              <div
                className={cn(
                  'rotate-0 transition-all duration-300 ease-in-out',
                  roundExpand === i && 'rotate-180'
                )}
              >
                <IconAngleDown />
              </div>
            </Flex>
          </Flex>
        );
      },
    },
  ];

  function RoundInfo({ item }: any) {
    return (
      <Flex gap={4}>
        <Text size={12} type='secondary'>
          {item?.name}
        </Text>
        <Text size={12} type='secondary'>
          {nFormatter(item?.unlockPerRound, 2, tokenInfo.symbol, false, true)}
        </Text>
      </Flex>
    );
  }

  return (
    <div>
      <div className='overflow-x-auto hide-scroll'>
        <CommonTable columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default Past;

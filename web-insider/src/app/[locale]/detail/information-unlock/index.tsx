'use client';

import { IconUnLock } from '@/assets/icons';
import IconCheckedCompleted from '@/assets/icons/IconCheckedCompleted';
import CountdownTimer from '@/components/CountdownTimer/CountDownTimer';
import Text from '@/components/Text';
import { percentFormat } from '@/helpers';
import { Flex } from 'antd';
import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import './style.scss';

export default function InformationUnlock({ data }: any) {
  const countDownTime = data?.tokenUnlock
    ? new Date(data?.tokenUnlock.unlockChartRemainingTime)
    : new Date();

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {d}%',
      backgroundColor: '#ffffff',
      borderColor: '#ffffff',
    },
    color: [
      new graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0.5,
          color: 'rgb(84, 122, 255)',
        },
        {
          offset: 1,
          color: 'rgb(69, 81, 222)',
        },
      ]),
      'rgb(247, 147, 26)',
      '#ECEEFE',
      '#F1F4F7',
    ],
    series: [
      {
        name: 'Background',
        type: 'pie',
        radius: ['50%', '70%'],
        emptyCircleStyle: {
          color:
            data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0
              ? '#ECEEFE'
              : '#F1F4F7',
          borderColor:
            data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0
              ? '#ECEEFE'
              : '#F1F4F7',
          borderWidth: 3,
        },
      },
      {
        name: 'Access From',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 5,
          borderColor: '#ECEEFE',
          borderWidth: 3,
          margin: 10,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          focus: false,
          scale: false,
        },
        showEmptyCircle: false,
        data:
          data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0
            ? [
                {
                  value: data?.tokenUnlock?.unlockChartUnlocked,
                  name: 'Unlock',
                },
                {
                  value: data?.tokenUnlock?.unlockChartNextUnlock,
                  name: 'Next Unlock',
                },
                {
                  value: data?.tokenUnlock?.unlockChartLocked,
                  name: 'Lock',
                  itemStyle: {
                    opacity: 0,
                  },
                  tooltip: {
                    backgroundColor: '#ffffff00',
                    borderColor: '#ffffff00',
                    extraCssText: 'box-shadow: none;',
                    textStyle: {
                      color: '#ffffff00',
                    },
                  },
                },
              ]
            : [],
      },
    ],
  };

  return (
    <div className='chart'>
      <div className='relative'>
        <ReactECharts option={option} />
        <div className='chart__unlock'>
          {data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0 ? (
            <IconUnLock />
          ) : (
            ''
          )}
          <div>
            {data?.tokenUnlock && Object.keys(data?.tokenUnlock).length > 0 ? (
              <Text
                size={24}
                lineHeight={32}
                weight='bold'
                color='primary'
                noChildrenStyle
              >
                {percentFormat(data?.tokenUnlock?.unlockChartUnlocked, '', {
                  precision: 2,
                  noStyle: true,
                  noPlus: true,
                })}
              </Text>
            ) : (
              <span className='text-grey-200 text-2xl'>N/A</span>
            )}
          </div>
        </div>
      </div>
      <Flex justify='center' className='-mt-[24px]'>
        {data?.tokenUnlock &&
        Object.keys(data?.tokenUnlock).length > 0 &&
        data?.tokenUnlock?.unlockChartRemainingTime &&
        moment(data?.tokenUnlock?.unlockChartRemainingTime).isAfter(
          moment()
        ) ? (
          <CountdownTimer
            countDownName={'Next Unlock'}
            targetDate={countDownTime}
          />
        ) : (
          ''
        )}
      </Flex>

      {data &&
      data?.tokenUnlock &&
      Object.keys(data?.tokenUnlock).length > 0 &&
      data?.tokenUnlock?.unlockChartLocked === 100 ? (
        <div className='flex items-center justify-center gap-2'>
          Fully Vested <IconCheckedCompleted />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

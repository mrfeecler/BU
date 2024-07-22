'use client';

import Text from '@/components/Text';
import { COLOR_CHART } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { Flex, Tooltip } from 'antd';
import { default as ReactECharts } from 'echarts-for-react';
import { round } from 'lodash';
import { useMemo, useRef, useState } from 'react';
import { CategoryDistribution } from '../../types';
import './index.scss';

type Props = {
  data: CategoryDistribution[];
  [key: string]: any;
};

export default function Allocation(props: Props) {
  const refName = useRef<HTMLSpanElement>(null);
  const refNameTooltip = useRef<HTMLSpanElement>(null);
  const refPercent = useRef<HTMLSpanElement>(null);

  const [nameTooltip, setNameTooltip] = useState(props.data[0]?.name);

  const _dataECharts = useMemo(() => {
    if (props.data.length === 0) return [];

    const _othersTotal = props.data
      .slice(3)
      .reduce((sum, curr) => sum + curr.percentage, 0);

    return [
      ...props.data
        .slice(0, 3)
        .map((item) => ({ value: item.percentage, name: item.name })),
      { value: _othersTotal, name: 'Others' },
    ];
  }, [props.data]);

  const optionPie = useMemo(
    () => ({
      color: [
        COLOR_CHART.BITTER_LEMON,
        COLOR_CHART.MALACHITE,
        COLOR_CHART.PAOLO_VERONESE_GREEN,
        COLOR_CHART.TURQUOISE_SURF,
        COLOR_CHART.CERULEAN_FROST,
        COLOR_CHART.PLUMP_PURPLE,
        COLOR_CHART.PURPUREUS,
        COLOR_CHART.JAZZBERRY_JAM,
        COLOR_CHART.CERISE,
        COLOR_CHART.SUNSET_ORANGE,
      ],
      series: [
        {
          name: 'Launched Project Categories',
          type: 'pie',
          radius: ['50%', '70%'],
          itemStyle: {
            borderRadius: 5,
            borderColor: '#fff',
            borderWidth: 3,
          },
          label: {
            show: false,
          },
          showInLegend: false,
          labelLine: {
            show: false,
          },
          data: _dataECharts,
        },
      ],
    }),
    [_dataECharts]
  );

  const handleMouseOverChart = (param: any) => {
    if (refName.current) {
      refName.current.innerText = param.name || '';
      if (refNameTooltip.current)
        refNameTooltip.current.innerText = param.name || '';
    }
    if (refPercent.current)
      refPercent.current.innerText = param.percent ? param.percent + '%' : '';
  };

  const Chart = useMemo(() => {
    return (
      <ReactECharts
        option={optionPie}
        onEvents={{
          mouseover: handleMouseOverChart,
        }}
      />
    );
  }, [optionPie]);

  return (
    <Flex vertical align='center' className='allocations'>
      <Text
        weight='bold'
        size={16}
        lineHeight={24}
        className={'!text-[#4F4F4F]'}
      >
        Launched Project Categories
      </Text>
      <div className='flex flex-wrap justify-center'>
        <div className='allocations__table relative justify-center flex'>
          {Chart}
          <div
            className={cn(
              'absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4',
              'flex flex-col justify-center items-center'
            )}
          >
            {props.data.length === 0 && (
              <Text size={32} lineHeight={28} type='secondary'>
                N/A
              </Text>
            )}
            <Tooltip
              title={<Text size={12}>{nameTooltip}</Text>}
              onOpenChange={(open) => {
                if (open && refName.current) {
                  setNameTooltip(refName.current.innerText);
                }
              }}
              overlayClassName='tooltip-light'
            >
              <Text
                ref={refName}
                weight='bold'
                size={20}
                lineHeight={28}
                ellipsis={{
                  open: false,
                }}
                maxWidth={100}
              >
                {props.data[0]?.name}
              </Text>
            </Tooltip>
            <Text
              ref={refPercent}
              weight='semiBold'
              size={16}
              lineHeight={24}
              type='secondary'
            >
              {props.data[0]?.percentage &&
                round(props.data[0]?.percentage, 2) + '%'}
            </Text>
          </div>
        </div>

        <Flex vertical gap={12} align='start' justify='center'>
          {props.data.slice(0, 3).map((item, index) => (
            <Flex key={index} gap={13}>
              <span>
                <svg
                  className='w-4.5 h-5 hover:w-5.5 hover:h-6'
                  viewBox='0 0 18 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                    fill={optionPie.color[index]}
                  />
                </svg>
              </span>
              <Text>
                {item.name}: {round(item.percentage, 2)}%
              </Text>
            </Flex>
          ))}

          {props.data.length > 3 && (
            <Flex
              gap={13}
              onClick={props.toggleModal}
              className={'cursor-pointer'}
            >
              <span>
                <svg
                  className='w-4.5 h-5 hover:w-5.5 hover:h-6'
                  viewBox='0 0 18 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                    fill={optionPie.color[3]}
                  />
                </svg>
              </span>
              <Text>Other: {round(_dataECharts[3]?.value, 2)}%</Text>
            </Flex>
          )}
        </Flex>
      </div>
    </Flex>
  );
}

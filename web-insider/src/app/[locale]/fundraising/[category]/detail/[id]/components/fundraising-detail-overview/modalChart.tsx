'use client';

import { IconHexagon } from '@/assets/icons';
import Text from '@/components/Text';
import { COLOR_CHART } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Flex, Modal, Tooltip } from 'antd';
import ReactECharts from 'echarts-for-react';
import { round } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ItemCategoryBanker } from '../../../../types';

interface IChartData {
  labels: string[];
  datasets: Dataset[];
}
interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  hoverOffset: number;
  borderWidth: number;
  hoverBorderColor: string;
}

const ModalChart = ({ data }: { data: ItemCategoryBanker[] }) => {
  const refName = useRef<HTMLSpanElement>(null);
  const refPercent = useRef<HTMLSpanElement>(null);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [dataCheck, setDataCheck] = useState<
    (ItemCategoryBanker & { percent: number })[]
  >([]);

  const _renderLabels = () => {
    if (dataCheck.length === 0) return null;

    return (
      <>
        {dataCheck.slice(3).map((item, index) => (
          <li
            key={index}
            className={'flex items-center gap-3 '}
            style={{
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
              ][index],
            }}
          >
            <IconHexagon />
            <Text>
              {item.name}: {item.percent}%
            </Text>
          </li>
        ))}
      </>
    );
  };

  const _dataECharts = useMemo(() => {
    if (data.length === 0) return [];
    const allTotal = data.reduce((sum, curr) => sum + curr.count, 0);
    const othersTotal = data
      .slice(3)
      .reduce((sum, curr) => sum + curr.count, 0);

    return [
      ...data.slice(0, 3).map((item) => ({
        value: (item.count / allTotal) * 100,
        name: item.name,
      })),
      { value: (othersTotal / allTotal) * 100, name: 'Others' },
    ];
  }, [data]);

  const [nameTooltip, setNameTooltip] = useState(_dataECharts[0]?.name);

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
          name: 'Token Allocation',
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
    if (refName.current) refName.current.innerText = param.name || '';
    if (refPercent.current)
      refPercent.current.innerText = param.percent ? param.percent + '%' : '';
  };

  const Chart = useMemo(() => {
    return (
      <ReactECharts
        className='!w-[260px] !h-[260px]'
        option={optionPie}
        onEvents={{
          mouseover: handleMouseOverChart,
        }}
      />
    );
  }, [optionPie]);

  useEffect(() => {
    if (!data) return;
    const sumCount = data.reduce((a, b) => a + b.count, 0);
    const dataHasPercent = data.map((d) => ({
      ...d,
      percent: round((d.count / sumCount) * 100, 2),
    }));
    setDataCheck(dataHasPercent);
  }, [data]);
  return (
    <>
      <div className='allocations'>
        <div className='text-neutral-600 flex justify-center text-base font-jb leading-normal items-center'>
          Main Investment Categories
        </div>
        <div className='flex flex-wrap justify-center'>
          <div className='allocations__table relative justify-center flex'>
            {Chart}
            <div
              className={cn(
                'absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4',
                'flex flex-col justify-center items-center'
              )}
            >
              {_dataECharts.length === 0 && (
                <Text size={20} type='secondary'>
                  N/A
                </Text>
              )}
              {_dataECharts[0]?.name && (
                <Tooltip
                  title={<Text size={12}>{nameTooltip}</Text>}
                  overlayClassName='tooltip-light'
                  onOpenChange={(open) => {
                    if (open && refName.current)
                      setNameTooltip(refName.current.innerText);
                  }}
                >
                  <Text
                    ref={refName}
                    weight='bold'
                    size={20}
                    lineHeight={28}
                    ellipsis={{ open: false }}
                    maxWidth={100}
                  >
                    {_dataECharts[0]?.name}
                  </Text>
                </Tooltip>
              )}
              {_dataECharts[0]?.value && (
                <Text
                  ref={refPercent}
                  weight='semiBold'
                  size={16}
                  lineHeight={24}
                  type='secondary'
                >
                  {round(_dataECharts[0]?.value, 2) + '%'}
                </Text>
              )}
            </div>
          </div>

          <Flex vertical gap={12} align='start' justify='center'>
            {_dataECharts.slice(0, 3).map((item, index) => (
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
                  {item.name}: {round(item.value, 2)}%
                </Text>
              </Flex>
            ))}

            {_dataECharts.length > 3 && (
              <Flex gap={13} onClick={onOpen} className={'cursor-pointer'}>
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
      </div>
      <Modal
        title={<div className='text-xl'>Main Investment Categories Other</div>}
        open={isOpen}
        onOk={onClose}
        onCancel={onClose}
        footer={null}
      >
        <ul className='gap-3 flex flex-col mt-6'>{_renderLabels()}</ul>
      </Modal>
    </>
  );
};

export default ModalChart;

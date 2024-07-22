'use client';
import Text from '@/components/Text';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';
import { cn } from '@/helpers/functions';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Divider, Flex, Tooltip } from 'antd';
import { round } from 'lodash';
import { Fragment, useMemo } from 'react';
import { IGasItem, IMarqueeItem } from '../props';

const MarqueeItem = ({
  data,
  visibleTooltip,
  handleVisibleTooltip,
}: {
  data: IMarqueeItem;
  visibleTooltip?: boolean;
  handleVisibleTooltip?: (visible: boolean) => void;
}) => {
  const _renderTextDetail = () => {
    if (data.isFear) return renderFear();

    if (!data.percent && !data.coinPercent && data.coinPrice)
      return renderOnlyPrice;

    if (data.percent && !data.coinPercent && !data.coinPrice)
      return renderOnlyPercent;

    if (data.ratio) return renderOnlyRatio;

    if (!data.isGas && !data.isFear) return _renderTextNotGas();

    return _renderTextGas();
  };

  const renderOnlyRatio = <Text size={12}>{round(Number(data.ratio), 2)}</Text>;

  const renderOnlyPrice = (
    <Text size={12}>{currencyFormat(Number(data.coinPrice), '$')}</Text>
  );

  const renderOnlyPercent = useMemo(() => {
    let color = '';

    if (Number(data.percent) === 50) color = '!text-[#333747]';
    else if (Number(data.percent) > 50) color = '!text-[#1AB369]';
    else color = '!text-[#FA3363]';

    return (
      <Text size={12} className={cn(color)}>
        {round(Number(data.percent), 2)}%
      </Text>
    );
  }, [data]);

  const renderFear = () => {
    const getClassFear = (value: number) => {
      switch (true) {
        case value > 79:
          return '!text-[#4CB43C]';
        case value > 59:
          return '!text-[#AEB335]';
        case value > 39:
          return '!text-[#FF8D18]';
        case value > 19:
          return '!text-[#FF4D17]';
        default:
          return '!text-grey-700';
      }
    };

    return (
      <Flex align='center' gap={4}>
        <Text size={12}>{data.percent || 0}</Text>
        <Text
          size={12}
          className={cn(getClassFear(parseInt(data.percent as any)))}
        >
          {data.valueClassification ?? ''}
        </Text>
      </Flex>
    );
  };

  const _renderTextNotGas = () => {
    return (
      <Flex align='center' gap={4}>
        {data.coinPrice && (
          <Text size={12}>{nFormatter(Number(data.coinPrice), 2, '$')}</Text>
        )}
        {data.coinPercent && (
          <Text size={12}>{round(Number(data.coinPercent), 2)}%</Text>
        )}
        <Text size={12} className={'[&>p]:!m-0'}>
          {percentFormat(Number(data.percent))}
        </Text>
      </Flex>
    );
  };

  const _renderTextGas = () => {
    return (
      <Flex align='center' gap={4}>
        <Text size={12}>{data.percent}</Text>
        <Text size={12} className='capitalize'>
          {data.unit ?? ''}
        </Text>
        {visibleTooltip ? (
          <CaretUpOutlined style={{ color: '#9FA4B7' }} />
        ) : (
          <CaretDownOutlined style={{ color: '#9FA4B7' }} />
        )}
      </Flex>
    );
  };

  const _renderGwei = () => {
    if (!data.child) return null;
    const elements: JSX.Element[] = Object.keys(data.child).map(
      (key, index) => {
        const item: IGasItem = data.child[key];
        return (
          <Fragment key={index}>
            {index === 1 && (
              <Divider
                type='vertical'
                className='!h-[inherit] !border-[#E5E6EB]'
              />
            )}
            <Flex vertical align='center' gap={4}>
              <Text className='capitalize'>{key}</Text>
              <Text size={12} className='!text-primary-500 capitalize'>
                {item.price ? `${item.price} ${item.unit}` : '-'}
              </Text>
              <Text size={12} type='secondary' className='whitespace-nowrap'>
                {item.mins ? item.mins.replace(': 0 secs', '') : ''}
                {/* {item.costUsd ? '$' + round(item.costUsd, 2) : ''}
              {item.costUsd && item.timeToArrive ? <span>|</span> : ''}
              {item.timeToArrive} */}
              </Text>
            </Flex>
            {index === 1 && (
              <Divider
                type='vertical'
                className='!h-[inherit] !border-[#E5E6EB]'
              />
            )}
          </Fragment>
        );
      }
    );
    return <Flex gap={24}>{elements}</Flex>;
  };

  return (
    <Tooltip
      id='gas'
      open={data.isGas ? visibleTooltip : false}
      onOpenChange={handleVisibleTooltip}
      overlayClassName='gas-tooltip'
      className={cn(`flex items-center relative`, data.isGas && 'gas')}
      title={data.isGas ? _renderGwei() : null}
      color='white'
      mouseLeaveDelay={3}
    >
      <div className='flex items-center gap-1'>
        {data.icon ? data.icon : ''}
        <Text size={12} type='secondary'>
          {data.coinName}:
        </Text>
        {_renderTextDetail()}
      </div>
    </Tooltip>
  );
};

export default MarqueeItem;

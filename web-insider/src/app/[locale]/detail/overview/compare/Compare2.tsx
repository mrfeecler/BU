'use client';

import { IconAddCircle, IconArrowCircleRight } from '@/assets/icons';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { currencyFormat, percentFormat } from '@/helpers';
import { changeImageUrl, cn } from '@/helpers/functions';
import { Flex } from 'antd';
import Image from 'next/image';
import Slider from 'react-slick';
import { ICoinDataProps, Props } from './Compare.type';
import './index.scss';

export function CoinCompare(props: any) {
  const data = props.data?.compare || [];
  return (
    <div className='compare bg-white p-4 mb-6 rounded-lg'>
      <div className='flex flex-wrap justify-between items-center mb-4'>
        <div className='max-w-[424px]'>
          <button className='flex items-center gap-2'>
            <IconAddCircle />
            <div className='text-sm text-blueday-500' color={'blueday.500'}>
              Add coin to compare
            </div>
          </button>
        </div>
        <div className='text-red-500 underline text-sm font-normal cursor-pointer'>
          Delete all
        </div>
      </div>
      <RenderItemCoin data={data}>
        {data?.map((item: any, i: number) => (
          <div>
            <Flex
              vertical
              key={item.key}
              className={cn(
                'px-6 py-4 bg-grey-200 rounded-lg',
                'cursor-pointer mx-2'
              )}
            >
              <Flex align='center' justify='space-between'>
                <Image
                  src={changeImageUrl(item?.image?.native)}
                  alt=''
                  width={44}
                  height={44}
                />
                <Flex gap={4} vertical align='flex-end'>
                  <Image
                    src={`data:image/svg+xml;base64,${item.chart}`}
                    alt=''
                    width={154}
                    height={40}
                  />
                  <Text weight='semiBold' size={12}>
                    {percentFormat(item.price_change_in_24h) || '-'}
                  </Text>
                </Flex>
              </Flex>
              <Flex vertical>
                <Text type='secondary'>{item.name}</Text>
                <Flex gap={16} align='center' justify='space-between'>
                  <Text weight='bold' size={24} lineHeight={32}>
                    {item.price ? currencyFormat(item.price, '$') : '-'}
                  </Text>
                  {item.symbol && (
                    <Tag bordered>
                      <Text type='secondary' size={12}>
                        {item.symbol}
                      </Text>
                    </Tag>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </div>
        ))}
      </RenderItemCoin>
    </div>
  );
}

const NextArrow: React.FC<Props> = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <IconArrowCircleRight />
    </button>
  );
};

const PrevArrow: React.FC<Props> = ({ className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      <IconArrowCircleRight />
    </button>
  );
};

const RenderItemCoin = ({ data, children }: ICoinDataProps) => {
  const settings = {
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: true,
    infinite: false,
    initialSlide: 0,
    useTransform: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (data?.length >= 5) {
    return <Slider {...settings}>{children}</Slider>;
  } else {
    return (
      <div
        className={cn(
          'grid grid-cols-[repeat(auto-fill, minmax(312px, 1fr))]',
          'gap-y-2'
        )}
      >
        {children}
      </div>
    );
  }
};

export default CoinCompare;

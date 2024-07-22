'use client';

import { IconBell, IconCaretDown, IconSave, IconStar } from '@/assets/icons';
import IconFdv from '@/assets/icons/IconFdv';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { currencyFormat, nFormatter, percentFormat } from '@/helpers';
import { changeImageUrl, cn } from '@/helpers/functions';
import { IDetail } from '@/models/IDetail';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Divider, Flex, Popover, Select, Tooltip } from 'antd';
import { round } from 'lodash';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InformationUnlock from '../information-unlock';
import Contracts from './Contracts';
import Backers from './popup/backers/Backers';
import Categories from './popup/categories/Categories';
import Fdv from './popup/fdv/Fdv';
import IntroduceCoin from './popup/introduce-coin/IntroduceCoin';
import Links from './popup/links/Links';
import './style.scss';

export default function CoinInfoListing({ data }: any) {
  const locale = useLocale();

  let newData = data as IDetail;
  const [price, setPrice] = useState(newData?.price);
  const [timeSelect, setTimeSelect] = useState('24H');
  const [histData, setHistData] = useState<any>(newData?.histData);
  const [atlPrice, setAtlPrice] = useState<any>(
    newData?.histData?.low[timeSelect]?.USD
  );
  const [athPrice, setAthPrice] = useState<any>(
    newData?.histData?.high[timeSelect]?.USD
  );

  const handlePriceChange = (value: string) => {
    setTimeSelect(value);
    let atlPrice = histData?.low[value]?.USD;
    let athPrice = histData?.high[value]?.USD;
    if (value === 'YTD') {
      atlPrice = newData?.atlPrice?.USD;
      athPrice = newData?.athPrice?.USD;
    }
    setAtlPrice(atlPrice);
    setAthPrice(athPrice);
  };

  // const handleRedirectTopCoin = useCallback(() => {
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setPrice(newData?.price);
      setHistData(newData?.histData);
      setAtlPrice(newData?.histData?.low[timeSelect]?.USD);
      setAthPrice(newData?.histData?.high[timeSelect]?.USD);
    }, 300);
  }, [data]);

  return (
    <div>
      <div className='bg-white py-6 px-2 md:px-6 coin-detail'>
        <div className='flex flex-col md:flex-row justify-between pb-6 border-b border-grey-300'>
          <div className='flex items-center gap-4 mb-4 md:mb-0'>
            <Popover
              placement='topLeft'
              content={<IntroduceCoin data={newData} />}
              overlayClassName='[&_.ant-popover-arrow]:!left-[30px]'
            >
              <img
                src={changeImageUrl(newData?.image?.x150)}
                alt=''
                width={76}
                height={76}
                className='rounded-full min-w-[76px] max-w-[76px]'
              />
            </Popover>
            <div>
              <Flex align='center' wrap='wrap' className='mb-3' gap={16}>
                <Flex align='center' gap={8}>
                  <Popover
                    placement='topLeft'
                    content={<IntroduceCoin data={newData} />}
                  >
                    <Text weight='bold' size={24} lineHeight={32}>
                      {newData?.name}
                    </Text>
                  </Popover>
                  <Tag>
                    <Text type='secondary' size={12}>
                      {newData?.symbol}
                    </Text>
                  </Tag>
                </Flex>
                <Divider
                  type='vertical'
                  className='!h-6 !border-[#D1D2DC] !border-[1.5px]'
                />
                <Tooltip
                  title={<Text size={12}>Reviews & Ratings</Text>}
                  overlayClassName='tooltip-light'
                >
                  <Flex align='center' gap={8}>
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <IconStar />
                    <span className='text-sm md:text-base'>5.0</span>
                  </Flex>
                </Tooltip>
              </Flex>
              <div className='hidden md:flex gap-2 item-center'>
                {newData?.rank && (
                  <Link
                    target='_blank'
                    href={`/${locale}?tab=all_coin`}
                    className={cn(
                      'flex items-center px-2 py-0.5 rounded text-xs',
                      'text-grey-500 font-medium bg-grey-200'
                    )}
                  >
                    #{newData?.rank}
                  </Link>
                )}
                {/* <span className='flex items-center px-2 py-0.5 rounded text-xs text-grey-500 font-medium bg-grey-200'>
                  #{newData?.wallet} in {data?.category}
                </span> */}
                <span className='flex items-center px-2 py-0.5 rounded text-xs text-grey-500 font-medium bg-grey-200'>
                  <img
                    src='/coin-info/accumulating.png'
                    alt=''
                    width={12}
                    height={12}
                    className='mr-2'
                  />
                  Accumulating
                </span>
              </div>
            </div>
          </div>
          <div className='flex item-center gap-3 md:hidden'>
            <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap'>
              #{newData?.rank}
            </span>
            <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap'>
              #{newData?.wallet} in Wallet
            </span>
            <span className='flex items-center px-2 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap'>
              <img
                src='/coin-info/accumulating.png'
                alt=''
                width={12}
                height={12}
                className='mr-2'
              />
              Accumulating
            </span>
          </div>
          <div className='block mt-4 md:mt-0'>
            <div className='flex justify-start md:justify-end flex-wrap gap-4 coin__actions mb-3'>
              <Tooltip
                title={<Text size={12}>Add to Watchlist</Text>}
                overlayClassName='tooltip-light'
              >
                <button
                  disabled
                  className={cn(
                    'action p-2 rounded border opacity-50',
                    'border-grey-300 cursor-not-allowed'
                  )}
                >
                  <IconSave />
                </button>
              </Tooltip>
              <Tooltip
                title={<Text size={12}>Edit</Text>}
                overlayClassName='tooltip-light'
              >
                <button
                  disabled
                  className={cn(
                    'action p-2 rounded border opacity-50',
                    'border-grey-300 cursor-not-allowed'
                  )}
                >
                  <PencilSquareIcon className='w-5 h-5' />
                </button>
              </Tooltip>
              <Tooltip
                title={<Text size={12}>Price Alert</Text>}
                overlayClassName='tooltip-light'
              >
                <button
                  disabled
                  className={cn(
                    'action p-2 rounded border opacity-50',
                    'border-grey-300 cursor-not-allowed'
                  )}
                >
                  <IconBell />
                </button>
              </Tooltip>
            </div>
            <div className='flex justify-start md:justify-end flex-wrap gap-2'>
              <span className='text-sm text-grey-500'>Categories</span>
              <div className='flex gap-2'>
                {data?.category && (
                  <Link
                    href={`/en/categories/${data?.categoryId}?slug=${data?.category_slug}`}
                    target='_blank'
                    className={cn(
                      'flex items-center px-2 rounded text-xs text-grey-500',
                      'font-medium bg-grey-200 whitespace-nowrap cursor-pointer'
                    )}
                  >
                    {data?.category}
                  </Link>
                )}

                {data?.subCategories?.length > 0 &&
                  data?.subCategories?.slice(0, 2)?.map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/en/categories/${item?.id}?slug=${item?.slug}`}
                      target='_blank'
                      className={cn(
                        'flex items-center px-2 rounded text-xs text-grey-500',
                        'font-medium bg-grey-200 whitespace-nowrap cursor-pointer'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>

              {data?.subCategories?.length > 3 && (
                <Popover
                  placement='bottomRight'
                  content={<Categories data={newData} />}
                >
                  <span className='flex items-center px-2 rounded text-xs text-primary-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'>
                    See All
                  </span>
                </Popover>
              )}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-6 md:grid-cols-12'>
          <div className='col-span-6 md:col-span-9 xl:col-span-10'>
            <div className='gap-4 md:gap-[35px] xl:gap-[70px] 2xl:gap-[110px] mt-6 flex flex-wrap'>
              <div className='w-full max-w-[420px]'>
                <div className='flex flex-wrap gap-2 md:gap-4 items-center'>
                  <span className='text-xl md:text-4xl font-extrabold font-jeb text-grey-700'>
                    {price
                      ? currencyFormat(price, '$', {
                          displayFull: true,
                        })
                      : '-'}
                  </span>
                  <span className='text-sp-green-500 text-xs md:text-base font-jsb font-semibold'>
                    {percentFormat(newData?.price_change_in_24h)}
                  </span>
                </div>
                <div className='flex items-center flex-wrap gap-2 pt-6 pb-3 text-grey-700'>
                  {atlPrice ? (
                    <span>{currencyFormat(atlPrice, '$')}</span>
                  ) : (
                    <span>0</span>
                  )}
                  <div className='relative w-[90px] max-w-[90px]'>
                    {price && athPrice ? (
                      <div
                        className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20'
                        style={{
                          width:
                            (price / athPrice) * 100 > 100
                              ? 100 + '%'
                              : (price / athPrice) * 100 + '%',
                        }}
                      ></div>
                    ) : (
                      <div
                        className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-20'
                        style={{ width: 0 + '%' }}
                      ></div>
                    )}
                    <div className='locked bg-grey-300 w-full h-1.5 rounded-xl'></div>
                  </div>
                  {athPrice ? (
                    <span className='mr-2'>
                      {currencyFormat(athPrice, '$')}
                    </span>
                  ) : (
                    <span>0</span>
                  )}
                  <Select
                    bordered={false}
                    defaultValue='24H'
                    suffixIcon={
                      <div
                        className={
                          cn()
                          // selectTimeVisible && 'rotate-180'
                        }
                      >
                        <IconCaretDown width={12} height={12} />
                      </div>
                    }
                    className={cn(
                      '!h-5 !font-jm !bg-[#EEF2F6] !rounded !min-w-[60px]',
                      '[&_.ant-select-selection-item>.ant-typography]:!text-xs',
                      '[&_.ant-select-selection-item>.ant-typography]:!font-jm',
                      '[&_.ant-select-selection-item>.ant-typography]:!text-[#9FA4B7]',
                      '[&_.ant-select-selector]:!px-2'
                    )}
                    onChange={handlePriceChange}
                    options={[
                      {
                        value: '24H',
                        label: <Text weight='semiBold'>24h</Text>,
                      },
                      { value: '7D', label: <Text weight='semiBold'>7d</Text> },
                      {
                        value: '30D',
                        label: <Text weight='semiBold'>1m</Text>,
                      },
                      { value: '3M', label: <Text weight='semiBold'>3m</Text> },
                      { value: '6M', label: <Text weight='semiBold'>6m</Text> },
                      { value: '1Y', label: <Text weight='semiBold'>1y</Text> },
                      {
                        value: 'YTD',
                        label: <Text weight='semiBold'>All</Text>,
                      },
                    ]}
                  />
                </div>
                {newData?.idoPrice?.USD && (
                  <div className='flex items-center mb-1 gap-1'>
                    <span className='text-grey-500 text-sm'>
                      {newData?.idoPriceType} Price:
                    </span>
                    <span className='text-grey-700 text-sm mr-1 font-jsb font-semibold'>
                      {currencyFormat(newData?.idoPrice?.USD, '$')}
                    </span>
                    <span className='text-xs text-sp-green-500'>
                      {price
                        ? `${round(price / newData?.idoPrice?.USD, 2)}x`
                        : null}
                    </span>
                  </div>
                )}
                {!!newData?.earlyStagePricePrice && (
                  <div className='flex items-center mb-1 gap-1'>
                    <span className='text-grey-500 text-sm'>
                      {newData?.earlyStagePriceRound} Price:
                    </span>
                    <span className='text-grey-700 text-sm mr-1 font-jsb font-semibold'>
                      {currencyFormat(newData?.earlyStagePricePrice || 0, '$')}
                    </span>
                    <span className='text-xs text-sp-green-500'>
                      (
                      {price
                        ? currencyFormat(newData?.earlyStagePriceROI || 0, '')
                        : 0}
                      x)
                    </span>
                  </div>
                )}
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 md:gap-y-9 gap-x-[60px]'>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Market Cap</div>
                  <div className='text-grey-700 flex flex-wrap items-center gap-1 font-jsb font-semibold'>
                    {currencyFormat(Number(newData?.marketCap), '$', {
                      numberRound: 3,
                    })}
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Volume 24h</div>
                  <div className='text-grey-700 flex flex-wrap items-center gap-1 font-jsb font-semibold'>
                    {currencyFormat(Number(newData?.volume24h), '$', {
                      numberRound: 2,
                    })}
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Vol/MCap 24h</div>
                  <div className='text-grey-700 font-jsb font-semibold'>
                    {newData?.volMCap24h
                      ? percentFormat(newData?.volMCap24h, '', {
                          noSymbol: true,
                          noStyle: true,
                          noPlus: true,
                        })
                      : '-'}
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm flex gap-1 items-center'>
                    <Popover content={<Fdv />}>
                      <div className='flex items-center gap-1'>
                        FDV <IconFdv />
                      </div>
                    </Popover>
                  </div>
                  <div className='text-grey-700 font-jsb font-semibold'>
                    {currencyFormat(Number(newData?.fdv), '$', {
                      numberRound: 2,
                    })}
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Circ.Supply</div>
                  <div className='text-grey-700 flex flex-wrap items-center gap-1 font-jsb font-semibold'>
                    {nFormatter(newData?.circ, 2, '$')}
                    <span className='text-grey-500 text-xs'>
                      ({newData?.percentOfCircSupply}%)
                    </span>
                  </div>
                </div>
                <div className='category'>
                  <div className='text-grey-500 text-sm'>Total Supply</div>
                  <div className='text-grey-700 flex flex-wrap items-center font-jsb font-semibold'>
                    {nFormatter(
                      parseFloat(newData?.totalSupply),
                      2,
                      newData?.symbol.toUpperCase(),
                      false,
                      true
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-4 xl:gap-8 2xl:gap-[110px] flex-wrap'>
              {newData?.tokens && newData?.tokens.length > 0 && (
                <Flex vertical gap={8} className='mt-3 xl:mt-7'>
                  <span className='text-grey-500 text-sm mb-1'>Contracts</span>
                  <Contracts tokens={newData?.tokens} />
                </Flex>
              )}

              <div className='flex flex-wrap gap-4 md:gap-8 xl:gap-[110px] xl:mt-7'>
                <Links links={newData?.links} />
                <Backers
                  backers={newData?.backers}
                  hasDetail={!!data?.fundraisings}
                />
              </div>
            </div>
          </div>
          <div className='col-span-6 md:col-span-3 xl:col-span-2'>
            <InformationUnlock data={newData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// export default CoinInformation;

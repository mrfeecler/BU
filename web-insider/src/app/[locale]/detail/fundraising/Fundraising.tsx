'use client';

import IconFundraisingRoundsArrow from '@/assets/icons/IconFundraisingRoundsArrow';
import IconFundraisingRoundsDetail from '@/assets/icons/IconFundraisingRoundsDetail';
import BackerList, { BackerItem } from '@/components/BackerList/BackerList';
import Text from '@/components/Text';
import { currencyFormat, nFormatter } from '@/helpers';
import { cn } from '@/helpers/functions';
import { FetchCoinFundraising } from '@/usecases/coin-info';
import { Divider, Flex } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const Fundraising = (props: any) => {
  const searchParams = useSearchParams();
  const target = searchParams.get('target');

  const refDetail = useRef<HTMLDivElement>(null);
  const refBacker = useRef<HTMLDivElement>(null);

  const [overView, setOverview] = useState<any>([]);
  const [fundraisings, setFundraisings] = useState<IFundraisings[]>([]);
  const symbol = props.data?.symbol || '';

  const PricePerRound: any[] = useMemo(() => {
    if (
      !!overView?.pricePerRoundName?.length &&
      !!overView?.pricePerRoundPrice?.length
    ) {
      return overView?.pricePerRoundName.map((item: any, index: any) => {
        return {
          name: item,
          price: overView?.pricePerRoundPrice[index],
        };
      });
    }
    return [];
  }, [overView]);

  const handleGoToDetail = () => {
    if (refDetail.current)
      refDetail.current.scrollIntoView({
        behavior: 'smooth',
      });
  };

  useEffect(() => {
    fetchFundraising();
  }, []);

  async function fetchFundraising() {
    let res: any = await FetchCoinFundraising({
      coin_key: props.slug,
      limit: 100,
    });
    setOverview(res?.overview);
    let fundraisings = res?.fundraisings || [];

    for (let i in fundraisings) {
      fundraisings[i].id = i;
      fundraisings[i].isVisible = false;
    }
    setFundraisings(fundraisings);
    return res;
  }

  const handleToggle = (itemId: any) => {
    setFundraisings((prevItems) => {
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, isVisible: !item.isVisible } : item
      );
    });
  };

  useLayoutEffect(() => {
    if (target === 'backer') {
      setTimeout(() => {
        if (refBacker.current)
          refBacker.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
      }, 500);
    }
  }, [target]);

  return (
    <Flex vertical>
      <Flex vertical gap={8} className='pb-3'>
        <Text weight='bold' size={20} lineHeight={28}>
          Overview
        </Text>
        <Flex vertical gap={24}>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 md:col-span-6 bg-white rounded-lg box-shadow-common'>
              <div className='w-full px-6 py-2 border-b border-solid border-grey-200 flex justify-center items-center'>
                <Text weight='bold' size={16} lineHeight={24}>
                  Summary
                </Text>
              </div>
              <div className='w-full p-6 flex flex-wrap items-center justify-around gap-4'>
                <Flex vertical gap={4} align='center'>
                  <Text type='secondary' size={12}>
                    Total Funds Raised
                  </Text>
                  <Text weight='semiBold' size={16} lineHeight={24}>
                    {overView?.totalFundRaised
                      ? nFormatter(overView?.totalFundRaised | 0, 2, '$')
                      : '-'}
                  </Text>
                </Flex>
                <Flex vertical gap={4} align='center'>
                  <Text type='secondary' size={12}>
                    AVG Price
                  </Text>
                  <Text weight='semiBold' size={16} lineHeight={24}>
                    {overView?.avgPrice
                      ? nFormatter(overView?.avgPrice | 0, 2, '$')
                      : '-'}
                  </Text>
                </Flex>
                <Flex vertical gap={4} align='center'>
                  <Text type='secondary' size={12}>
                    Rounds
                  </Text>
                  <Text weight='semiBold' size={16} lineHeight={24}>
                    {overView?.round_number ? overView?.round_number : '-'}
                  </Text>
                </Flex>
                <Flex vertical gap={4} align='center'>
                  <Text type='secondary' size={12}>
                    Lead Backers
                  </Text>
                  <Text weight='semiBold' size={16} lineHeight={24}>
                    {overView?.leadBackers ? overView?.leadBackers : '-'}
                  </Text>
                </Flex>
              </div>
            </div>
            <div className='col-span-12 md:col-span-6 bg-white rounded-lg box-shadow-common'>
              <div className='w-full px-6 py-2 border-b border-solid border-grey-200 flex justify-center items-center'>
                <Text weight='bold' size={16} lineHeight={24}>
                  Price Per Round
                </Text>
              </div>
              <div className='w-full p-6 flex flex-wrap items-center justify-around gap-4'>
                {PricePerRound.slice(0, 4).map((item, i) => {
                  return (
                    <Flex key={i} vertical gap={4} align='center'>
                      <Text type='secondary' size={12}>
                        {item.name}
                      </Text>
                      <Text weight='semiBold' size={16} lineHeight={24}>
                        {item.price ? currencyFormat(item.price, '$') : '-'}
                      </Text>
                    </Flex>
                  );
                })}
                {PricePerRound.length > 4 && (
                  <Flex align='center'>
                    <Text
                      color='primary'
                      size={12}
                      onClick={handleGoToDetail}
                      className={'cursor-pointer'}
                    >
                      +{PricePerRound.length - 4} Rounds
                    </Text>
                  </Flex>
                )}
              </div>
            </div>
          </div>
          <div className='bg-white rounded-lg box-shadow-common'>
            <div
              ref={refBacker}
              className='w-full px-6 py-2 border-b border-solid border-grey-200 flex justify-center items-center'
            >
              <Text weight='bold' size={16} lineHeight={24}>
                Backer{' '}
                <Text type='secondary' size={16} lineHeight={24}>
                  {overView?.backers_count}
                </Text>
              </Text>
            </div>
            <BackerList
              hasTier
              backers={overView?.totalBackers}
              initNumber={4}
              type={'backer'}
              onMore={handleGoToDetail}
            />
          </div>
        </Flex>
      </Flex>
      <Flex ref={refDetail} vertical gap={8} className='py-3'>
        <Text weight='bold' size={20} lineHeight={28}>
          Details
        </Text>
        {fundraisings.map((item, index) => (
          <div key={index} className='box-shadow-common'>
            <Flex
              gap={24}
              align='center'
              onClick={() => handleToggle(item.id)}
              className='cursor-pointer'
            >
              <Flex
                justify='space-between'
                wrap='wrap'
                gap={24}
                align='flex-start'
                flex={1}
                className={cn('p-4')}
              >
                <div className='flex flex-col gap-6'>
                  <Flex gap={8} align='center' className='min-h-[52px]'>
                    <IconFundraisingRoundsDetail />
                    <Text
                      weight='bold'
                      size={20}
                      lineHeight={28}
                      ellipsis
                      maxWidth={200}
                      className={'min-w-40'}
                    >
                      {item.type}
                    </Text>
                  </Flex>
                  {item.isVisible ? (
                    <div>
                      <Link
                        target='_blank'
                        href={item?.linkToAnnouncement}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Text weight='semiBold' color='primary'>
                          {item?.date
                            ? moment(item?.date).format('DD MMM YYYY')
                            : '-'}
                        </Text>
                      </Link>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='flex flex-col gap-6 item-center'>
                  <Flex vertical gap={8} align='center'>
                    <Text type='secondary'>Price</Text>
                    <Text weight='semiBold' size={16} lineHeight={24}>
                      {item?.price ? currencyFormat(item?.price, '$') : '-'}
                    </Text>
                  </Flex>
                  {item.isVisible && item?.valuation && (
                    <Text type='secondary'>
                      Valuation:{' '}
                      <Text type='secondary' weight='semiBold'>
                        {item?.valuation
                          ? currencyFormat(item?.valuation || 0, '$')
                          : ''}
                      </Text>
                    </Text>
                  )}
                </div>
                <div className='flex flex-col gap-6 item-center'>
                  <Flex vertical gap={8} align='center'>
                    <Text type='secondary'>Raise</Text>
                    <Text weight='semiBold' size={16} lineHeight={24}>
                      {item?.raised
                        ? currencyFormat(item?.raised | 0, '$')
                        : '-'}
                    </Text>
                  </Flex>
                  {item.isVisible && item?.tokensOffered ? (
                    <Flex gap={2}>
                      <Text type='secondary'>Tokens Offered:</Text>
                      <Text type='secondary' weight='semiBold'>
                        {item?.tokensOffered
                          ? currencyFormat(item.tokensOffered || 0, '$')
                          : ''}
                      </Text>
                      {item?.percenOfTokens && (
                        <Text type='secondary' weight='semiBold'>
                          (
                          {item?.percenOfTokens
                            ? nFormatter(item?.percenOfTokens, 2, '%', true)
                            : '-'}
                          )
                        </Text>
                      )}
                    </Flex>
                  ) : (
                    ''
                  )}
                </div>
                <div className='flex flex-col gap-6 item-center'>
                  <Flex vertical gap={8} align='center'>
                    <Text type='secondary'>ROI</Text>
                    <Text weight='semiBold' size={16} lineHeight={24}>
                      {item?.roi
                        ? nFormatter(item.roi || 0, 2, 'x', true)
                        : '-'}
                    </Text>
                  </Flex>
                  {item.isVisible && item?.athROI ? (
                    <Text type='secondary'>
                      ATH ROI:{' '}
                      <Text type='secondary' weight='semiBold'>
                        {item?.athROI
                          ? nFormatter(item.athROI || 0, 2, 'x', true)
                          : ''}
                      </Text>
                    </Text>
                  ) : (
                    ''
                  )}
                </div>
                <div className='flex flex-col gap-6 item-center'>
                  <Flex vertical gap={8} align='center'>
                    <Text type='secondary'>Unlocked</Text>
                    <Text weight='semiBold' size={16} lineHeight={24}>
                      {item?.unlockedPercent
                        ? nFormatter(item.unlockedPercent | 0, 2, '%', true)
                        : '-'}
                    </Text>
                  </Flex>
                  {item.isVisible ? (
                    item?.unlockedTokens && item?.unlockedValue ? (
                      <Text type='secondary'>
                        {item?.unlockedTokens
                          ? currencyFormat(item.unlockedTokens || 0, symbol)
                          : '-'}{' '}
                        ~{' '}
                        {item?.unlockedValue
                          ? currencyFormat(item.unlockedValue || 0, symbol)
                          : '-'}
                      </Text>
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )}
                </div>
              </Flex>
              <div
                className={
                  'min-w-[100px] flex items-start justify-center transition-all ' +
                  (item.isVisible ? 'rotate-180' : '')
                }
              >
                <IconFundraisingRoundsArrow />
              </div>
            </Flex>
            {item?.backers && item?.backers.length > 0 ? (
              <>
                {item.isVisible && (
                  <Divider className='!border-[#E5E6EB] !m-0' />
                )}
                <Flex
                  gap={16}
                  vertical
                  align='center'
                  className={cn('py-6', !item.isVisible && '!hidden')}
                >
                  <Text
                    type='secondary'
                    weight='bold'
                    size={16}
                    lineHeight={24}
                  >
                    Backers {item?.backers.length}
                  </Text>
                  <div
                    className={cn(
                      'w-full px-6 grid grid-cols-1 md:grid-cols-3',
                      'lg:grid-cols-4 xl:grid-cols-5 gap-6 items-start'
                    )}
                  >
                    {item?.backers.map((item: any, index: any) => (
                      <div className='flex justify-start items-center'>
                        <BackerItem key={index} item={item} hasTier />
                      </div>
                    ))}
                  </div>
                </Flex>
              </>
            ) : (
              ''
            )}
          </div>
        ))}
      </Flex>
    </Flex>
  );
};

export default Fundraising;

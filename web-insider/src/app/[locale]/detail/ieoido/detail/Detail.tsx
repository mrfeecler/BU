'use client';
import IconFundraisingRoundsArrow from '@/assets/icons/IconFundraisingRoundsArrow';
import Text from '@/components/Text';
import { currencyFormat, nFormatter } from '@/helpers';
import { changeImageUrl, cn } from '@/helpers/functions';
import { Flex } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useEffect, useState } from 'react';

const Detail = forwardRef(({ ieoidos, tokenInfo, refDetail }: any) => {
  useEffect(() => {
    for (let i in ieoidos) {
      ieoidos[i].isVisible = false;
      ieoidos[i].id = i;
    }
  }, []);

  return (
    <Flex vertical ref={refDetail} gap={8}>
      <Text weight='bold' size={20} lineHeight={28}>
        Detail
      </Text>
      <div>
        {ieoidos?.map((item: any, i: number) => {
          return <ItemDetail key={i} item={item} symbol={tokenInfo.symbol} />;
        })}
      </div>
    </Flex>
  );
});

export function ItemDetail({ item, symbol }: any) {
  const [isVisible, setVisible] = useState(item.isVisible);
  const handleToggle = (itemId: any) => {
    setVisible(!isVisible);
  };
  return (
    <div
      key={item.id}
      onClick={() => handleToggle(item)}
      className={cn('box-shadow-common cursor-pointer')}
    >
      <Flex gap={24} align='center'>
        <Flex
          justify='space-between'
          wrap='wrap'
          gap={24}
          align='flex-start'
          flex={1}
          className={cn('p-4')}
        >
          <Flex vertical gap={24}>
            <Flex align='center' gap={8} className='min-h-[52px]'>
              {item.logo ? (
                <Image
                  width={40}
                  height={40}
                  src={changeImageUrl(item.logo)}
                  alt='dao'
                />
              ) : (
                ''
              )}
              <Text
                weight='bold'
                size={20}
                lineHeight={28}
                ellipsis
                maxWidth={200}
                className={'min-w-40'}
              >
                {item.name}
              </Text>
            </Flex>
            {isVisible && !!item?.time_start && !!item?.time_end ? (
              <div>
                <Link
                  target='_blank'
                  href={item?.linkToAnnouncement || '#'}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(!item?.time_link && 'pointer-events-none')}
                >
                  <Text
                    weight='semiBold'
                    color={!!item?.time_link ? 'primary' : undefined}
                  >
                    {item?.time_start
                      ? moment(item?.time_start).format('DD MMM YYYY')
                      : '-'}{' '}
                    -{' '}
                    {item?.time_end
                      ? moment(item?.time_end).format('DD MMM YYYY')
                      : '-'}
                  </Text>
                </Link>
              </div>
            ) : (
              ''
            )}
          </Flex>
          <Flex vertical gap={24} align='center'>
            <Flex vertical align='center' gap={8}>
              <Text type='secondary'>Price</Text>
              <Text weight='semiBold' size={16} lineHeight={24}>
                {item?.price.USD ? currencyFormat(item?.price.USD, '$') : '-'}
              </Text>
            </Flex>
            {isVisible && !!item?.valuation ? (
              <Flex gap={2} align='center'>
                <Text type='secondary'>Valuation:</Text>
                <Text type='secondary' weight='semiBold'>
                  {item?.valuation ? nFormatter(item?.valuation, 2, '$') : '-'}
                </Text>
              </Flex>
            ) : (
              ''
            )}
          </Flex>
          <Flex vertical gap={24} align='center'>
            <Flex vertical align='center' gap={8}>
              <Text type='secondary'>Raise</Text>
              <Text weight='semiBold' size={16} lineHeight={24}>
                {item?.raised ? nFormatter(item?.raised, 2, '$') : '-'}
              </Text>
            </Flex>
            {isVisible && !!item?.tokensOffered ? (
              <Flex gap={2} align='center'>
                <Text type='secondary'>Tokens Offered:</Text>
                {item?.tokensOffered && item?.percenOfTokens ? (
                  <Flex align='center' gap={2}>
                    <Text type='secondary' weight='semiBold'>
                      {item?.tokensOffered
                        ? nFormatter(
                            item?.tokensOffered,
                            2,
                            symbol,
                            false,
                            true
                          )
                        : '-'}
                    </Text>
                    <Text type='secondary' weight='semiBold'>
                      (
                      {item?.percenOfTokens
                        ? nFormatter(item?.percenOfTokens, 2, '%', true)
                        : '-'}
                      )
                    </Text>
                  </Flex>
                ) : (
                  '-'
                )}
              </Flex>
            ) : (
              ''
            )}
          </Flex>
          <Flex vertical gap={24} align='center'>
            <Flex vertical align='center' gap={8}>
              <Text type='secondary'>ROI</Text>
              <Text
                weight='semiBold'
                size={16}
                lineHeight={24}
                color={
                  item?.roi > 1
                    ? 'success'
                    : item?.roi < 1
                      ? 'danger'
                      : undefined
                }
              >
                {item?.roi ? <>{nFormatter(item?.roi, 2, '')}x</> : '-'}
              </Text>
            </Flex>
            {isVisible && !!item?.athROI ? (
              <Flex gap={2} align='center'>
                <Text type='secondary'>ATH ROI:</Text>
                <Text type='secondary' weight='semiBold'>
                  {item?.athROI ? nFormatter(item?.athROI, 2, '') : '-'}
                </Text>
              </Flex>
            ) : (
              ''
            )}
          </Flex>
          <Flex vertical gap={24} align='center'>
            <Flex vertical align='center' gap={8}>
              <Text type='secondary'>Unlocked</Text>
              <Text weight='semiBold' size={16} lineHeight={24}>
                {!!Number(item?.unlockedPercent)
                  ? nFormatter(item?.unlockedPercent, 2, symbol)
                  : '-'}
              </Text>
            </Flex>
            {isVisible ? (
              !!Number(item?.unlockedTokens) &&
              !!Number(item?.unlockedValue) ? (
                <Flex gap={2} align='center'>
                  <Text type='secondary' weight='semiBold'>
                    {item?.unlockedTokens
                      ? nFormatter(item?.unlockedTokens, 2, symbol)
                      : '-'}
                  </Text>
                  <Text type='secondary' weight='semiBold'>
                    ~
                  </Text>
                  <Text type='secondary' weight='semiBold'>
                    {item?.unlockedValue
                      ? nFormatter(item?.unlockedValue, 2, '$')
                      : '-'}
                  </Text>
                </Flex>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </Flex>
        </Flex>
        <div
          className={
            'min-w-[100px] flex items-start justify-center transition-all ' +
            (isVisible ? 'rotate-180' : '')
          }
        >
          <IconFundraisingRoundsArrow />
        </div>
      </Flex>
    </div>
  );
}

export default Detail;

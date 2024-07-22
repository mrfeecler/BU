import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { currencyFormat, nFormatter } from '@/helpers';
import { changeImageUrl } from '@/helpers/functions';
import { Flex } from 'antd';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

const Overview = (props: any) => {
  const overView = props?.overView;
  const ieoidos = props?.ieoidos;

  const locale = useLocale();

  const IeoIdos = useMemo(() => {
    return (ieoidos || [])?.map((item: any) => ({
      ...item,
      tier: 1,
    }));
  }, [ieoidos]);
  return (
    <Flex vertical gap={8} className='mb-6'>
      <Text weight='bold' size={20} lineHeight={28}>
        Overview
      </Text>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='box-shadow-common'>
          <div className='p-6 text-center border-b border-grey-300'>
            <Text weight='bold' size={16} lineHeight={24}>
              Summary
            </Text>
          </div>
          <div className='p-6'>
            <div className='flex items-center justify-between gap-4 flex-wrap'>
              <Flex vertical gap={8} align='center'>
                <Text size={12} type='secondary'>
                  Total Raise
                </Text>
                <Text weight='semiBold' size={16} lineHeight={24}>
                  {overView?.totalRaise
                    ? nFormatter(overView?.totalRaise, 2, '$')
                    : '-'}
                </Text>
              </Flex>
              <Flex vertical gap={8} align='center'>
                <Text size={12} type='secondary'>
                  Avg Price
                </Text>
                <Text weight='semiBold' size={16} lineHeight={24}>
                  {overView?.avgPrice
                    ? currencyFormat(overView?.avgPrice, '$', {
                        numberRound: 4,
                      })
                    : '-'}
                </Text>
              </Flex>
              <Flex vertical gap={8} align='center'>
                <Text size={12} type='secondary'>
                  Total Tokens Offered
                </Text>
                <Text weight='semiBold' size={16} lineHeight={24}>
                  {overView?.totalTokensOffered
                    ? nFormatter(
                        overView?.totalTokensOffered,
                        2,
                        props?.tokenInfo?.symbol,
                        false,
                        true
                      )
                    : '-'}
                </Text>
              </Flex>
            </div>
          </div>
        </div>
        <div className='box-shadow-common'>
          <Flex justify='center' className='p-6 border-b border-grey-300'>
            <Flex gap={2}>
              <Text weight='bold' size={16} lineHeight={24}>
                Launchpads
              </Text>
              <Text type='secondary' weight='bold' size={16} lineHeight={24}>
                {IeoIdos?.length || 0}
              </Text>
            </Flex>
          </Flex>
          <Flex
            wrap='wrap'
            align='center'
            justify='space-around'
            gap={16}
            className='w-full p-6'
          >
            {IeoIdos.slice(0, 3).map((item: any, i: number) => {
              return (
                <Flex key={i} gap={12} align='center'>
                  <Link
                    target='_blank'
                    href={`/${locale}/ieo-ido/top-ido-launchpads/${item.key}`}
                  >
                    <Image
                      src={changeImageUrl(item?.logo)}
                      height={48}
                      width={48}
                      alt={item.name}
                    />
                  </Link>
                  <Flex vertical gap={4}>
                    <Link
                      target='_blank'
                      href={`/${locale}/ieo-ido/top-ido-launchpads/${item.key}`}
                    >
                      <Text>{item.name}</Text>
                    </Link>
                    <Link
                      target='_blank'
                      href={`/${locale}/ieo-ido/top-ido-launchpads`}
                    >
                      <Tag>
                        <Text type='secondary' size={12}>
                          Tier {item.tier}
                        </Text>
                      </Tag>
                    </Link>
                  </Flex>
                </Flex>
              );
            })}
            {IeoIdos.length > 3 && (
              <Flex align='center'>
                <Text
                  color='primary'
                  size={12}
                  onClick={props.handleScroll}
                  className={'cursor-pointer'}
                >
                  +{IeoIdos.length - 3} Launchpads
                </Text>
              </Flex>
            )}
          </Flex>
        </div>
      </div>
    </Flex>
  );
};

export default Overview;

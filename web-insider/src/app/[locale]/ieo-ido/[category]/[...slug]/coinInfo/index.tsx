'use client';

import Text from '@/components/Text';
import { nFormatter, percentFormat } from '@/helpers';
import { changeImageUrl, cn } from '@/helpers/functions';
import { Avatar, Divider, Flex, Modal, Popover } from 'antd';
import { round } from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { IeoIdoCategory, getIconLink } from '../../config';
import { LaunchPadInfomationType } from '../../types';
import Allocation from '../allocation';
import MainCategories from '../main-categories';
import './index.scss';

type PropsType = {
  info?: LaunchPadInfomationType;
};

const CoinInformation = (props: PropsType) => {
  const { info } = props;
  const _sortedCategories = useMemo(
    () =>
      info?.categoriesDistribution?.sort(
        (a, b) => round(b.percentage, 2) - round(a.percentage, 2)
      ) || [],
    [info]
  );
  const { locale } = useParams<{
    locale: string;
  }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSupportedOpen, setIsModalSupportedOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Modal
        title={
          <div className='text-2xl'>Launched Project Categories Other</div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        styles={{
          header: {
            marginBottom: 24,
          },
        }}
      >
        <MainCategories data={_sortedCategories} />
      </Modal>

      <Modal
        open={isModalSupportedOpen}
        onCancel={() => setIsModalSupportedOpen(false)}
        title={
          <Text weight='bold' size={24}>
            Supported Blockchain Platforms
          </Text>
        }
        footer={false}
        width={466}
      >
        <div className='max-h-[418px] overflow-y-auto mt-6'>
          <Flex vertical gap={16}>
            {info?.tokenPlatforms?.map((token, index) => (
              <Flex key={index} gap={12} align='center'>
                <Avatar
                  key={token.key}
                  src={changeImageUrl(token.iconUrl)}
                  alt={token.name}
                />

                <Text weight='semiBold'>{token.name}</Text>
              </Flex>
            ))}
          </Flex>
        </div>
      </Modal>

      <Flex vertical gap={24} className='container-shadow p-4 md:p-6'>
        <Flex wrap='wrap' gap={16} className='launchpad-information'>
          <div className='w-[76px] h-[76px]'>
            <img
              width={76}
              height={76}
              alt={''}
              src={changeImageUrl(info?.icon || '')}
              className='rounded-full'
            />
          </div>
          <Flex vertical gap={12}>
            <Text weight='bold' lineHeight={32} size={24}>
              {info?.name}
            </Text>
            <Flex wrap='wrap' gap={12} align='center'>
              <Link
                href={`/${locale}/ieo-ido/${IeoIdoCategory.topIdoLaunchpads}`}
                className='coins__tag'
              >
                <Text
                  type='secondary'
                  size={12}
                  className='px-2 rounded bg-[#EEF2F6]'
                >
                  Tier 1
                </Text>
              </Link>

              <Divider
                type='vertical'
                className='!border-[#9FA4B7] !h-[18px] !m-0'
              />

              <Flex gap={2} align='center'>
                <Text size={12} type='secondary'>
                  Year of Foundation:
                </Text>
                <Text size={12}>
                  {info?.foundationDate
                    ? moment(info?.foundationDate).format('YYYY')
                    : '-'}
                </Text>
              </Flex>

              <span className='w-[6px] h-[6px] bg-[#D1D2DC] rounded-full' />

              <div
                onClick={() => setIsModalSupportedOpen(true)}
                className='flex items-center avatar-wrapper'
              >
                <Avatar.Group maxCount={4} className='pointer-events-none'>
                  {info?.tokenPlatforms?.map((token, index) => (
                    <Avatar
                      key={token.key}
                      src={changeImageUrl(token.iconUrl)}
                      alt={token.name}
                    />
                  ))}
                </Avatar.Group>
              </div>
            </Flex>
          </Flex>
        </Flex>
        <Divider className='!border-[#E5E6EB] !m-0' />
        <div className='grid gap-y-4 lg:gap-y-0 lg:gap-4 lg:grid-cols-5'>
          <div className='flex flex-col gap-6 lg:col-span-3'>
            <div className='grid gap-4 md:grid-cols-2'>
              <Flex vertical gap={8}>
                <Flex align='center' gap={4}>
                  <Text type='secondary'>Token:</Text>
                  {info?.nativeToken ? (
                    <Link
                      target='_blank'
                      href={`/${locale}/detail/${info?.nativeToken?.symbol}`}
                    >
                      <Flex gap={6} align='center'>
                        <img
                          width={20}
                          height={20}
                          src={changeImageUrl(info?.nativeToken?.icon || '')}
                          alt={info?.name}
                        />
                        <Text weight='semiBold'>
                          {info?.nativeToken?.symbol}
                        </Text>
                      </Flex>
                    </Link>
                  ) : (
                    '-'
                  )}
                </Flex>
                <Flex gap={16} align='center'>
                  <Text weight='extraBold' size={40} lineHeight={48}>
                    {info?.enterPrice
                      ? nFormatter(Number(info?.enterPrice), 2, '$')
                      : ''}
                  </Text>
                  {info?.priceChangeIn24h && (
                    <Text
                      weight='semiBold'
                      size={16}
                      lineHeight={24}
                      noChildrenStyle
                    >
                      {percentFormat(Number(info?.priceChangeIn24h))}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <div className='grid grid-cols-2'>
                <Flex vertical gap={24}>
                  <Flex vertical>
                    <Text type='secondary'>Total Funds Raise</Text>
                    <Text
                      weight='semiBold'
                      size={16}
                      lineHeight={24}
                      noChildrenStyle
                    >
                      {nFormatter(Number(info?.totalFundsRaised), 2, '$')}
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text type='secondary'>Current Avg ROI (USD)</Text>
                    <Flex gap={4} align='center'>
                      {!info?.avgRoi?.current &&
                        !info?.avgRoi?.currentPercent && (
                          <Text weight='semiBold' size={16} lineHeight={24}>
                            -
                          </Text>
                        )}
                      <Text
                        weight='semiBold'
                        size={16}
                        lineHeight={24}
                        noChildrenStyle
                      >
                        {info?.avgRoi?.current
                          ? round(Number(info?.avgRoi?.current), 2) + 'x'
                          : !info?.avgRoi?.currentPercent
                            ? ''
                            : '-'}
                      </Text>
                      <Text weight='semiBold' size={12} noChildrenStyle>
                        {info?.avgRoi?.currentPercent
                          ? percentFormat(Number(info?.avgRoi?.currentPercent))
                          : !info?.avgRoi?.current
                            ? ''
                            : '-'}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex vertical gap={24}>
                  <Flex vertical>
                    <Text type='secondary'>Number of IDOs</Text>
                    <Text
                      weight='semiBold'
                      size={16}
                      lineHeight={24}
                      noChildrenStyle
                    >
                      {Number(info?.projectsCount) || '-'}
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text type='secondary'>ATH Avg ROI (USD)</Text>
                    <Flex gap={4} align='center'>
                      {!info?.avgRoi?.ath && !info?.avgRoi?.athPercent && (
                        <Text weight='semiBold' size={16} lineHeight={24}>
                          -
                        </Text>
                      )}
                      <Text
                        weight='semiBold'
                        size={16}
                        lineHeight={24}
                        noChildrenStyle
                      >
                        {info?.avgRoi?.ath
                          ? round(Number(info?.avgRoi?.ath), 2) + 'x'
                          : !info?.avgRoi?.athPercent
                            ? ''
                            : '-'}
                      </Text>
                      <Text weight='semiBold' size={12} noChildrenStyle>
                        {info?.avgRoi?.athPercent
                          ? percentFormat(Number(info?.avgRoi?.athPercent))
                          : !info?.avgRoi?.ath
                            ? ''
                            : '-'}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </div>
            </div>
            <div className='coins__links'>
              <Text type='secondary'>Links</Text>
              <div className='flex mt-2 gap-4 xl:gap-5 py-[6px]'>
                {info?.links?.slice(0, 3).map((item, index) => {
                  const _iconLink = getIconLink(item.type);

                  return (
                    _iconLink && (
                      <Link target='_blank' key={index} href={item.value}>
                        {_iconLink}
                      </Link>
                    )
                  );
                }) || '-'}

                {(info?.links?.length || 0) > 3 && (
                  <Popover
                    trigger='hover'
                    placement='bottom'
                    content={
                      <div className='flex items-center gap-5'>
                        {info?.links?.slice(3).map((item, index) => (
                          <Link target='_blank' key={index} href={item.value}>
                            {getIconLink(item.type)}
                          </Link>
                        ))}
                      </div>
                    }
                  >
                    <div
                      className={cn(
                        'w-7 h-7 bg-slate-100 rounded-3xl flex-col cursor-pointer',
                        'justify-center items-center gap-2.5 inline-flex'
                      )}
                    >
                      <Text weight='semiBold' size={12}>
                        +{info?.links?.slice(3).length}
                      </Text>
                    </div>
                  </Popover>
                )}
              </div>
            </div>
          </div>
          <div
            className={cn('lg:col-span-2 lg:border-l lg:border-l-[#E5E6EB]')}
          >
            <Allocation data={_sortedCategories} toggleModal={toggleModal} />
          </div>
        </div>
      </Flex>
    </>
  );
};

export default CoinInformation;

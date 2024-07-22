'use client';

import {
  IconDiscord,
  IconGithub,
  IconInfo,
  IconLinkedIn,
  IconMedium,
  IconTelegram,
  IconTwitter,
} from '@/assets/icons';
import { IconFacebook } from '@/assets/icons/IconFacebook';
import { IconTikTok } from '@/assets/icons/IconTikTok';
import IconWeb from '@/assets/icons/IconWeb';
import Text from '@/components/Text';
import { changeImageUrl, cn } from '@/helpers/functions';
import { Divider, Flex, Tooltip } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { IBankerDetail } from '../../../../types';
import ModalChart from './modalChart';

const linksIcon: AnyObject = {
  web: <IconWeb />,
  twitter: <IconTwitter />,
  medium: <IconMedium />,
  telegram: <IconTelegram />,
  tiktok: <IconTikTok width={28} height={28} />,
  facebook: <IconFacebook />,
  github: <IconGithub />,
  discord: <IconDiscord />,
  linkedin: <IconLinkedIn />,
};

const FundraisingDetailOverview = (props: IBankerDetail) => {
  const { data } = props;
  const locale = useLocale();

  const renderIconLink = (item: any) => {
    if (!item.value) {
      return <span key={item.value}>{linksIcon[item.type]}</span>;
    }
    return (
      <a href={item.value} target={'_blank'} key={item.value}>
        {linksIcon[item.type]}
      </a>
    );
  };

  const _renderFlag = (country: string) => {
    const ic = `/Flag/Country=${country}, Style=Flag, Radius=Off.svg`;
    return country ? <img src={ic} width={32} height={18} /> : '';
  };

  const _renderLinks = () => {
    const { links } = data;
    const elements: JSX.Element[] = links
      ?.slice(0, 4)
      .map((item) => renderIconLink(item));
    const linksExtend = links?.slice(4);

    return (
      <>
        {links?.length === 0 && '-'}
        {elements}
        {links?.length > 4 && (
          <Tooltip
            placement='bottom'
            overlayClassName='tooltip-light_large'
            title={
              <Flex wrap='wrap' gap={20} className='w-full md:max-w-[220px]'>
                {...Array.from(Array(linksExtend?.length).keys()).map(
                  (item: any) => {
                    return renderIconLink(linksExtend[item]);
                  }
                )}
              </Flex>
            }
          >
            <Text
              weight='semiBold'
              size={12}
              className={cn(
                '!flex items-center justify-center w-7 h-7',
                'rounded-full bg-grey-300 text-center cursor-pointer'
              )}
            >
              +{links.length - 4}
            </Text>
          </Tooltip>
        )}
      </>
    );
  };

  return (
    <Flex
      vertical
      gap={24}
      className='overview bg-white p-6 pb-4 container-shadow'
    >
      {/* overview top */}
      <div className='flex justify-center md:justify-start'>
        <div className='flex gap-4 flex-col md:flex-row justify-center items-center'>
          {data?.logo ? (
            <img
              width={76}
              height={76}
              src={changeImageUrl(data.logo)}
              alt={data.name}
            />
          ) : (
            ''
          )}
          <div className='flex flex-col gap-3'>
            <Text weight='bold' size={24} lineHeight={32}>
              {data?.name || null}
            </Text>
            <div className='flex justify-center md:justify-start item-center gap-3'>
              <div className='flex items-center gap-1'>
                <Link
                  target='_blank'
                  href={`/${locale}/fundraising/top-backers`}
                  className='bg-grey-200 px-2 rounded cursor-pointer'
                >
                  <Text type='secondary' size={12}>
                    {data.type || null}
                  </Text>
                </Link>
                {data?.tier && (
                  <Link
                    target='_blank'
                    href={`/${locale}/fundraising/top-backers`}
                    className='bg-grey-200 px-2 rounded cursor-pointer'
                  >
                    <Text type='secondary' size={12}>
                      Tier {data.tier}
                    </Text>
                  </Link>
                )}
              </div>
              {data.location && (
                <Tooltip title={data.location} overlayClassName='tooltip-light'>
                  <Link
                    target='_blank'
                    href={`/${locale}/fundraising/top-backers`}
                    className='cursor-pointer'
                  >
                    {_renderFlag(data.location)}
                  </Link>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
      <Divider className='!m-0 !border-[#E5E6EB]' />
      {/* overview body */}
      <div className='flex flex-1 flex-col-reverse md:flex-row py-2 gap-6 md:gap-0 mt-10 md:mt-0'>
        {/* body left */}
        <div className='flex flex-[2] flex-col md:flex-row gap-6 p-6 border-left-content'>
          <div className='flex-[2] flex flex-col gap-6'>
            <div className='flex flex-col gap-2'>
              <Text type='secondary'>Total Investments</Text>
              <Text weight='extraBold' size={40} lineHeight={48}>
                {data.totalInvesments ? data.totalInvesments : '-'}
              </Text>
            </div>

            <div className='flex flex-col gap-2 md:mt-14'>
              <Text type='secondary'>Links</Text>
              <div className='flex gap-4 xl:gap-5 py-[6px]'>
                {_renderLinks()}
              </div>
            </div>
          </div>
          <div className='flex-[3] flex'>
            <div className='w-full flex flex-col gap-6'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center'>
                  <div className='flex flex-col gap-2 flex-1'>
                    <Text type='secondary'>Lead Rounds</Text>
                    <Text weight='semiBold' size={16} lineHeight={24}>
                      {data.leadRounds ? data.leadRounds : '-'}
                    </Text>
                  </div>

                  <div className='flex flex-col gap-2 flex-1'>
                    <Text type='secondary'>Raised</Text>
                    <Text weight='semiBold' size={16} lineHeight={24}>
                      {data.raised ? data.raised : '-'}
                    </Text>
                  </div>
                </div>
                <div className='flex items-center'>
                  <div className='flex flex-col gap-2 flex-1'>
                    <Text type='secondary'>Unicorns</Text>
                    <Text weight='semiBold' size={16} lineHeight={24}>
                      {data.unicorns ? data.unicorns : '-'}
                    </Text>
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <Text type='secondary'>Gainers</Text>
                    <Text weight='semiBold' size={16} lineHeight={24}>
                      {data.gainers ? data.gainers : '-'}
                    </Text>
                  </div>
                </div>
              </div>
              {data.introduction && (
                <Flex vertical gap={8}>
                  <div className='flex items-center gap-2'>
                    <IconInfo />
                    <Text weight='bold'>About</Text>
                  </div>
                  <div
                    className={cn(
                      'list-disc m-0 p-0 text-sm text-ellipsis',
                      'text-[#4F4F4F] font-jm leading-5 line-clamp-4'
                    )}
                    dangerouslySetInnerHTML={{
                      __html: data.introduction,
                    }}
                  />
                </Flex>
              )}
            </div>
          </div>
        </div>
        {/* body right */}
        <ModalChart data={data.categories} />
      </div>
    </Flex>
  );
};

export default FundraisingDetailOverview;

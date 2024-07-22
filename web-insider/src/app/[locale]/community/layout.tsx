'use client';
import IconNotification from '@/assets/icons/IconNotification';
import IconOnlyUser from '@/assets/icons/IconOnlyUser';
import IconTaskSquare from '@/assets/icons/IconTaskSquare';
import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Divider, Flex } from 'antd';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, cloneElement, memo, useState } from 'react';

type TCommunity = {
  community: ReactNode;
};
const Community: FC<TCommunity> = ({ community }) => {
  const locale = useLocale();
  const router = useRouter();

  const [tabActive, setTabActive] = useState('top-kols');

  const Tabs = [
    {
      key: 'airdrops',
      title: 'Airdrops',
      icon: <IconTaskSquare />,
      disabled: true,
    },
    {
      key: 'research',
      title: 'Research',
      icon: <IconOnlyUser />,
      disabled: true,
      dot: true,
    },
    {
      key: 'top-kols',
      title: 'Top KOLs',
      icon: <IconNotification />,
    },
    {
      key: 'top-active-users',
      title: 'Top Active Users',
      icon: <IconOnlyUser />,
      disabled: true,
    },
  ];

  const handleTabClick = (key: string) => {
    setTabActive(key);
    router.push(`/${locale}/community/${key}`);
  };

  return (
    <Flex>
      <Flex vertical gap={24} className='pt-7 pr-[52px] pb-5 pl-8 bg-white'>
        {Tabs.map((tab) => {
          return (
            <Flex
              key={tab.key}
              gap={8}
              align='center'
              onClick={() => !tab.disabled && handleTabClick(tab.key)}
              className={cn(
                tab.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              {cloneElement(tab.icon, {
                fill: tabActive === tab.key ? '#3440DA' : undefined,
              })}
              <Text
                size={16}
                weight={tabActive === tab.key ? 'semiBold' : 'light'}
                className={cn(tabActive === tab.key && '!text-[#3440DA]')}
              >
                {tab.title}
              </Text>
              {tab.dot && <div className='w-2 h-2 rounded-3xl bg-[#D71858]' />}
            </Flex>
          );
        })}
      </Flex>
      <Divider
        type='vertical'
        className='!m-0 !h-[inherit] !border-[#E5E6EB]'
      />
      {community}
    </Flex>
  );
};

export default memo(Community);

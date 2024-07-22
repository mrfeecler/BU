'use client';

import IconCaretDownHeader from '@/assets/icons/home/header/IconCaretDownHeader';
import IconCheckCircle from '@/assets/icons/home/header/IconCheckCircle';
import Text from '@/components/Text';
import type { MenuProps } from 'antd';
import { Dropdown, Flex, Typography } from 'antd';
import { useState } from 'react';

const SwitcherCurrency = () => {
  // const currency = localStorage.getItem('currency')
  const [cur] = useState('usd');

  const LabelItem = (key: string, label: string) => {
    return (
      <Flex gap={8} align='center' justify='space-between'>
        <Typography.Text className='!font-semibold !font-jm grow min-w-14'>
          {label}
        </Typography.Text>
        {key === cur && <IconCheckCircle />}
      </Flex>
    );
  };

  const items: MenuProps['items'] = [
    {
      key: 'usd',
      label: LabelItem('usd', 'USD'),
    },
    // {
    //   key: 'vnd',
    //   label: LabelItem('vnd', 'VND'),
    // },
  ];

  // const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
  //   localStorage.setItem('currency', key)
  // };

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [cur],
        className: '[&>li]:!p-3 !p-3',
      }}
      placement='bottomRight'
    >
      <Flex gap={4} align='center' className='cursor-pointer'>
        <Text>{cur.toUpperCase()}</Text>
        <IconCaretDownHeader />
      </Flex>
    </Dropdown>
  );
};

export default SwitcherCurrency;

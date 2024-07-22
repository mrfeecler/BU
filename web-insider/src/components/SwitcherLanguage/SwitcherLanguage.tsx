'use client';

import IconCaretDownHeader from '@/assets/icons/home/header/IconCaretDownHeader';
import IconCheckCircle from '@/assets/icons/home/header/IconCheckCircle';
import IconUK from '@/assets/icons/home/header/IconUK';
import IconVN from '@/assets/icons/home/header/IconVN';
import Text from '@/components/Text';
import type { MenuProps } from 'antd';
import { Dropdown, Flex, Typography } from 'antd';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { usePathname, useRouter } from '../../helpers/navigation';
import './index.scss';

const SwitcherLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [lang] = useState(locale);

  const [selectedKeys, setSelectedKeys] = useState([lang]);

  const LabelItem = (key: string, label: string) => {
    return (
      <Flex gap={8} align='center' justify='space-between'>
        {key === 'en' && <IconUK />}
        {key === 'vn' && <IconVN />}
        <Typography.Text className='!font-semibold !font-jm grow min-w-20'>
          {label}
        </Typography.Text>
        {key === lang && <IconCheckCircle />}
      </Flex>
    );
  };

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: LabelItem('en', 'English'),
    },
    {
      key: 'vn',
      label: LabelItem('vn', 'Vietnamese'),
    },
  ];

  const langList = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'vn',
      label: 'Vietnamese',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    router.replace(pathname, { locale: key });
    setSelectedKeys([key]);
  };

  const getLabelLanguage = (key: string) => {
    return langList.find((item) => item?.key === key)?.label;
  };

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys,
        className: '[&>li]:!p-3 !p-3',
        // onClick: handleMenuClick,
      }}
      placement='bottomRight'
    >
      <Flex gap={4} align='center' className='cursor-pointer'>
        <Text>{getLabelLanguage(lang)}</Text>
        <IconCaretDownHeader />
      </Flex>
    </Dropdown>
  );
};

export default SwitcherLanguage;

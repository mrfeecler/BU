'use client';

import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Button, Divider, Flex } from 'antd';
import CoinTableInfo from '..';
import './index.scss';

const DetailTabs = () => {
  const tags = [
    {
      value: 'spot',
      disabled: false,
      label: 'Spot',
      component: <CoinTableInfo />,
    },
    {
      value: 'future',
      disabled: true,
      label: 'Future',
      component: '',
    },
  ];

  const trans = {
    value: 'transparency',
    disabled: true,
    label: 'Transparency',
    component: '',
  };

  return (
    <Flex wrap='wrap' gap={16} className='header-filter__options'>
      {tags.map((tag) => (
        <Button
          key={tag.value}
          disabled={tag.disabled}
          className={cn(
            '!rounded-lg !px-5 !py-3 !flex items-center',
            'spot' === tag.value && 'active',
            tag.disabled &&
              'opacity-50 !text-grey-700 !border-[1.5px] !border-[#E5E6EB]'
          )}
        >
          <Text color={!tag.disabled ? 'parent' : undefined}>{tag.label}</Text>
        </Button>
      ))}
      <Divider
        type='vertical'
        className='!h-[inherit] !border-[1.5px] !border-[#9FA4B7] !m-0'
      />
      <Button
        key={trans.value}
        disabled={trans.disabled}
        className={cn(
          '!rounded-lg !px-5 !py-3 !flex items-center',
          'spot' === trans.value && 'active',
          trans.disabled &&
            'opacity-50 !text-grey-700 !border-[1.5px] !border-[#E5E6EB]'
        )}
      >
        <Text>{trans.label}</Text>
      </Button>
    </Flex>
  );
};

export default DetailTabs;

'use client';

import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { Button, Flex } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import Spot from '../table';
import './index.scss';

const ExchangeTabs = () => {
  const router = useRouter();
  const params = useParams<{ locale: string; category: string }>();
  const tags = [
    {
      value: 'spot',
      disabled: false,
      label: 'Spot',
      component: <Spot />,
    },
    {
      value: '2',
      disabled: true,
      label: 'Derivatives',
      component: '',
    },
    {
      value: '3',
      disabled: true,
      label: 'Dex',
      component: '',
    },
    {
      value: '4',
      disabled: true,
      label: 'Lending',
      component: '',
    },
    {
      value: '5',
      disabled: true,
      label: 'CEX Transparency',
      component: '',
    },
  ];

  return (
    <Flex wrap='wrap' gap={16} className='header-filter__options'>
      {tags.map((tag) => (
        <Button
          key={tag.value}
          disabled={tag.disabled}
          className={cn(tag.value === 'spot' && 'active')}
          // onClick={() =>
          //   router.push(`/${params.locale}/exchanges/`)
          // }
        >
          <Text type={tag.disabled ? 'secondary' : undefined} color='parent'>
            {tag.label}
          </Text>
        </Button>
      ))}
    </Flex>
  );
};

export default ExchangeTabs;

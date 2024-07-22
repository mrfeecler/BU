'use client';
import { Button, Flex } from 'antd';
import './styles.scss';

import { IconCustomCointTab } from '@/assets/icons/home/IconCustomCoinTab';
import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { getFundraisingTags } from '../../config';
import { IHeaderFilter } from '../../types';
import SearchSelect from '../search-select';

export default function HeadFilter({ onChange, layout }: IHeaderFilter) {
  const router = useRouter();
  const params = useParams<{ locale: string; category: string }>();
  const tags = getFundraisingTags();

  const ColorButton = useCallback(
    (item: any) => {
      if (params.category === item.value) return 'white';
      if (item.disabled) return undefined;
      return 'parent';
    },
    [params]
  );

  return (
    <Flex vertical gap={16} className='header-filter'>
      <Flex wrap='wrap' gap={16} className='header-filter__options'>
        {tags.map((tag) => (
          <Button
            key={tag.value}
            size='large'
            disabled={tag.disabled}
            className={cn(
              params.category === tag.value && 'active',
              tag.disabled && '!bg-white',
              '!px-5 !py-3 !flex !items-center'
            )}
            onClick={() =>
              router.push(`/${params.locale}/fundraising/${tag.value}`)
            }
          >
            <Text
              type={tag.disabled ? 'secondary' : undefined}
              color={ColorButton(tag)}
            >
              {tag.label}
            </Text>
          </Button>
        ))}
      </Flex>

      <Flex gap={8} wrap='wrap' justify='space-between'>
        <Flex gap={8}>
          <SearchSelect layout={layout} onChange={onChange} />
          <Button className='!bg-white' disabled>
            <Flex align='center' gap={8}>
              <IconFilterCoinTab />
              <Text type='secondary'>Filters</Text>
            </Flex>
          </Button>
        </Flex>
        {params.category === 'top-backers' && (
          <Button className='!bg-white' disabled>
            <Flex align='center' gap={8}>
              <IconCustomCointTab />
              <Text type='secondary'>Customize</Text>
            </Flex>
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

'use client';
import { Button, Flex } from 'antd';
import { useState } from 'react';

import { IconCustomCointTab } from '@/assets/icons/home/IconCustomCoinTab';
import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import Text from '@/components/Text';
import { CategoryCoinsFilterType } from '../types';
import SearchSelect from './search-select';

export default function HeadFilter({
  onFilter,
}: {
  onFilter: (filter: CategoryCoinsFilterType) => void;
}) {
  const [keys, setSearchKeys] = useState<string[]>([]);

  return (
    <div className='filter flex justify-between'>
      <Flex gap={8} align='center'>
        <SearchSelect
          placeholder='Filter coins'
          onFilterChange={(keys) => {
            if (keys.length) {
              setSearchKeys(keys);
              onFilter({ search_key: keys });
            } else {
              onFilter({});
            }
          }}
        />
        <div className='hidden xl:block md:block'>
          <Button
            disabled
            className='!bg-white !h-11 !rounded-lg !py-0 !px-5'
            onClick={() => onFilter({ search_key: keys })}
          >
            <Flex align='center' gap={8}>
              <IconFilterCoinTab />
              <Text type='secondary'>Filters</Text>
            </Flex>
          </Button>
        </div>
      </Flex>
      <div className='hidden xl:block md:block'>
        <Button disabled className='!bg-white !h-11 !rounded-lg !py-0 !px-5'>
          <Flex align='center' gap={8}>
            <IconCustomCointTab />
            <Text type='secondary'>Customize</Text>
          </Flex>
        </Button>
      </div>
    </div>
  );
}
